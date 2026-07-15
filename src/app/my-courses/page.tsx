"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Clock3,
  LoaderCircle,
  LogIn,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";

import { getAuthHeaders } from "@/lib/auth";
import BackToHomeButton from "@/components/ui/BackToHomeButton";

interface Course {
  _id: string;
  title: string;
  shortDescription: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  lessons: number;
  image: string;
  instructor: string;
}

interface Enrollment {
  _id: string;
  course: Course;
  progress: number;
  status: "active" | "completed";
  enrolledAt: string;
}

interface EnrollmentsApiResponse {
  success: boolean;
  message?: string;
  data?: Enrollment[];
}

interface DeleteEnrollmentApiResponse {
  success: boolean;
  message?: string;
}

type PageStatus =
  | "loading"
  | "ready"
  | "logged-out"
  | "error";

export default function MyCoursesPage() {
  const router = useRouter();

  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [pageStatus, setPageStatus] =
    useState<PageStatus>("loading");
  const [message, setMessage] = useState<string>("");
  const [removingId, setRemovingId] =
    useState<string | null>(null);

  function clearAuthentication(): void {
    localStorage.removeItem("eduspark_access_token");
    localStorage.removeItem("eduspark_user");
  }

  useEffect(() => {
    async function loadEnrollments(): Promise<void> {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const accessToken = localStorage.getItem(
        "eduspark_access_token",
      );

      if (!accessToken) {
        setPageStatus("logged-out");
        return;
      }

      if (!apiUrl) {
        setMessage("Frontend API URL is not configured.");
        setPageStatus("error");
        return;
      }

      try {
        const response = await fetch(
          `${apiUrl}/api/enrollments/my`,
          {
            method: "GET",
            headers: getAuthHeaders(),
            cache: "no-store",
          },
        );

        const result: EnrollmentsApiResponse =
          await response.json();

        if (response.status === 401) {
          clearAuthentication();
          setPageStatus("logged-out");
          return;
        }

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Unable to retrieve your enrolled courses.",
          );
        }

        const validEnrollments = (result.data ?? []).filter(
          (enrollment: Enrollment) =>
            enrollment.course &&
            typeof enrollment.course === "object",
        );

        setEnrollments(validEnrollments);
        setPageStatus("ready");
      } catch (error) {
        console.error("My courses request failed:", error);

        setMessage(
          error instanceof Error
            ? error.message
            : "Unable to retrieve your enrolled courses.",
        );

        setPageStatus("error");
      }
    }

    void loadEnrollments();
  }, []);

  async function handleRemoveEnrollment(
    enrollment: Enrollment,
  ): Promise<void> {
    const confirmed = window.confirm(
      `Are you sure you want to leave "${enrollment.course.title}"?`,
    );

    if (!confirmed) {
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      setMessage("Frontend API URL is not configured.");
      return;
    }

    setRemovingId(enrollment._id);
    setMessage("");

    try {
      const response = await fetch(
        `${apiUrl}/api/enrollments/${enrollment._id}`,
        {
          method: "DELETE",
          headers: getAuthHeaders(),
        },
      );

      const result: DeleteEnrollmentApiResponse =
        await response.json();

      if (response.status === 401) {
        clearAuthentication();
        router.push("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to remove this enrollment.",
        );
      }

      setEnrollments((currentEnrollments) =>
        currentEnrollments.filter(
          (currentEnrollment) =>
            currentEnrollment._id !== enrollment._id,
        ),
      );

      setMessage("Enrollment removed successfully.");
    } catch (error) {
      console.error("Remove enrollment failed:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to remove this enrollment.",
      );
    } finally {
      setRemovingId(null);
    }
  }

  if (pageStatus === "loading") {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <LoaderCircle
            size={40}
            className="mx-auto animate-spin text-blue-600"
          />

          <p className="mt-4 font-semibold text-slate-700">
            Loading your courses...
          </p>
        </div>
      </main>
    );
  }

  if (pageStatus === "logged-out") {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <LogIn size={31} />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Login required
          </h1>

          <p className="mt-4 leading-7 text-slate-600">
            Sign in to view and manage your enrolled courses.
          </p>

          <Link
            href="/login?redirect=/my-courses"
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  if (pageStatus === "error") {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-lg rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">
            Unable to load courses
          </h1>

          <p className="mt-4 leading-7 text-red-600">
            {message}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-7 min-h-12 rounded-xl bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white py-9">
        <div className="text-right mx-5"><BackToHomeButton></BackToHomeButton></div>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            My Learning
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            My Courses
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Continue learning from the courses you have enrolled in.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {message && (
            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {message}
            </div>
          )}

          {enrollments.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <BookOpen
                size={46}
                className="mx-auto text-blue-600"
              />

              <h2 className="mt-5 text-2xl font-bold text-slate-900">
                You have not enrolled in any courses
              </h2>

              <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
                Explore EduSpark courses and enroll in a course
                that supports your learning goals.
              </p>

              <Link
                href="/courses"
                className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700"
              >
                Explore Courses
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {enrollments.map((enrollment: Enrollment) => {
                const course = enrollment.course;

                return (
                  <article
                    key={enrollment._id}
                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative h-52 overflow-hidden bg-slate-200">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />

                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-blue-600">
                        {course.category}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-sm font-medium text-slate-500">
                        By {course.instructor}
                      </p>

                      <h2 className="mt-2 line-clamp-2 text-xl font-bold text-slate-900">
                        {course.title}
                      </h2>

                      <p className="mt-3 line-clamp-2 flex-1 text-sm leading-6 text-slate-600">
                        {course.shortDescription}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <BookOpen size={16} />
                          {course.lessons} lessons
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Clock3 size={16} />
                          {course.duration}
                        </span>
                      </div>

                      <div className="mt-5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-slate-600">
                            Progress
                          </span>

                          <span className="font-semibold text-blue-600">
                            {enrollment.progress}%
                          </span>
                        </div>

                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-blue-600"
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(0, enrollment.progress),
                              )}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-200 pt-5">
                        <Link
                          href={`/courses/${course._id}`}
                          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                          Continue
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveEnrollment(enrollment)
                          }
                          disabled={
                            removingId === enrollment._id
                          }
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-red-200 px-4 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {removingId === enrollment._id ? (
                            <LoaderCircle
                              size={17}
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2 size={17} />
                          )}

                          Leave
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}