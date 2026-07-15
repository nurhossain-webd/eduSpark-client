"use client";

import {
  CheckCircle2,
  LoaderCircle,
  MessageSquareText,
  Star,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  FormEvent,
  useMemo,
  useState,
} from "react";

import { getAuthHeaders } from "@/lib/auth";

interface CourseReview {
  _id?: string;
  user: string;
  studentName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface CourseReviewsProps {
  courseId: string;
  reviews: CourseReview[];
  rating: number;
  totalReviews: number;
}

interface ReviewApiResponse {
  success: boolean;
  message: string;
  errors?: {
    rating?: string[];
    comment?: string[];
  };
}

function formatReviewDate(dateValue: string): string {
  const reviewDate = new Date(dateValue);

  if (Number.isNaN(reviewDate.getTime())) {
    return "Recently";
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(reviewDate);
}

function RatingStars({
  rating,
  size = 18,
}: {
  rating: number;
  size?: number;
}) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const starNumber = index + 1;
        const isFilled = starNumber <= Math.round(rating);

        return (
          <Star
            key={starNumber}
            size={size}
            className={
              isFilled
                ? "fill-amber-500 text-amber-500"
                : "text-slate-300"
            }
          />
        );
      })}
    </div>
  );
}

export default function CourseReviews({
  courseId,
  reviews,
  rating,
  totalReviews,
}: CourseReviewsProps) {
  const router = useRouter();

  const [selectedRating, setSelectedRating] =
    useState<number>(5);

  const [comment, setComment] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] =
    useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] =
    useState<boolean>(false);

  const displayedReviews = useMemo(
    () =>
      [...reviews].sort(
        (firstReview, secondReview) =>
          new Date(secondReview.createdAt).getTime() -
          new Date(firstReview.createdAt).getTime(),
      ),
    [reviews],
  );

  function clearStoredAuthentication(): void {
    localStorage.removeItem("eduspark_access_token");
    localStorage.removeItem("eduspark_user");

    window.dispatchEvent(new Event("auth-changed"));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      setMessage("Frontend API URL is not configured.");
      setIsSuccess(false);
      return;
    }

    const accessToken = localStorage.getItem(
      "eduspark_access_token",
    );

    if (!accessToken) {
      router.push(
        `/login?redirect=/courses/${courseId}`,
      );

      return;
    }

    const trimmedComment = comment.trim();

    if (trimmedComment.length < 10) {
      setMessage(
        "Your review must contain at least 10 characters.",
      );
      setIsSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setMessage("");
    setIsSuccess(false);

    try {
      const response = await fetch(
        `${apiUrl}/api/courses/${courseId}/reviews`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            rating: selectedRating,
            comment: trimmedComment,
          }),
        },
      );

      const result: ReviewApiResponse =
        await response.json();

      if (response.status === 401) {
        clearStoredAuthentication();

        router.push(
          `/login?redirect=/courses/${courseId}`,
        );

        return;
      }

      if (!response.ok) {
        const firstValidationError = result.errors
          ? Object.values(result.errors).flat()[0]
          : undefined;

        setMessage(
          firstValidationError ??
            result.message ??
            "Unable to submit the review.",
        );

        setIsSuccess(false);
        return;
      }

      setMessage("Review submitted successfully.");
      setIsSuccess(true);
      setSelectedRating(5);
      setComment("");

      setTimeout(() => {
        router.refresh();
      }, 700);
    } catch (error) {
      console.error("Review submission failed:", error);

      setMessage(
        "Unable to connect to the backend. Make sure the Express server is running.",
      );

      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-5 border-b border-slate-200 pb-7 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Student Feedback
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Reviews and ratings
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Feedback submitted by students enrolled in this
            course.
          </p>
        </div>

        <div className="flex min-w-44 items-center gap-4 rounded-2xl bg-slate-50 p-4">
          <div>
            <p className="text-3xl font-bold text-slate-900">
              {rating.toFixed(1)}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {totalReviews}{" "}
              {totalReviews === 1 ? "review" : "reviews"}
            </p>
          </div>

          <RatingStars rating={rating} />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <MessageSquareText size={21} />
          </div>

          <div>
            <h3 className="font-bold text-slate-900">
              Write a review
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              You must be logged in and enrolled in this course.
              Each student can submit one review.
            </p>
          </div>
        </div>

        <fieldset className="mt-6">
          <legend className="text-sm font-semibold text-slate-700">
            Your rating
          </legend>

          <div className="mt-3 flex flex-wrap gap-2">
            {Array.from({ length: 5 }, (_, index) => {
              const ratingValue = index + 1;
              const isSelected =
                ratingValue <= selectedRating;

              return (
                <button
                  key={ratingValue}
                  type="button"
                  onClick={() =>
                    setSelectedRating(ratingValue)
                  }
                  aria-label={`Give ${ratingValue} star${
                    ratingValue === 1 ? "" : "s"
                  }`}
                  className="rounded-lg p-1 transition hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-100"
                >
                  <Star
                    size={27}
                    className={
                      isSelected
                        ? "fill-amber-500 text-amber-500"
                        : "text-slate-300"
                    }
                  />
                </button>
              );
            })}

            <span className="ml-2 self-center text-sm font-semibold text-slate-700">
              {selectedRating}/5
            </span>
          </div>
        </fieldset>

        <div className="mt-5">
          <label
            htmlFor="reviewComment"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Review comment
          </label>

          <textarea
            id="reviewComment"
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
              setMessage("");
              setIsSuccess(false);
            }}
            minLength={10}
            maxLength={500}
            rows={5}
            placeholder="Describe what you liked about the course and how it supported your learning."
            className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />

          <p className="mt-1 text-right text-xs text-slate-500">
            {comment.length}/500
          </p>
        </div>

        {message && (
          <div
            className={`mt-4 flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${
              isSuccess
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {isSuccess && (
              <CheckCircle2
                size={18}
                className="mt-0.5 shrink-0"
              />
            )}

            <p>{message}</p>
          </div>
        )}

        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle
                  size={18}
                  className="animate-spin"
                />
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </button>
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-slate-900">
          Student reviews
        </h3>

        {displayedReviews.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
            <MessageSquareText
              size={38}
              className="mx-auto text-blue-600"
            />

            <h4 className="mt-4 text-lg font-bold text-slate-900">
              No reviews yet
            </h4>

            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">
              Enrolled students can submit the first review for
              this course.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            {displayedReviews.map(
              (review: CourseReview, index: number) => (
                <div
                  key={
                    review._id ??
                    `${review.user}-${review.createdAt}-${index}`
                  }
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <UserRound size={21} />
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-900">
                          {review.studentName}
                        </h4>

                        <p className="mt-1 text-xs text-slate-500">
                          {formatReviewDate(review.createdAt)}
                        </p>
                      </div>
                    </div>

                    <RatingStars
                      rating={review.rating}
                      size={17}
                    />
                  </div>

                  <p className="mt-4 leading-7 text-slate-600">
                    {review.comment}
                  </p>
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </article>
  );
}