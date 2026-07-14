"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  LoaderCircle,
  Save,
} from "lucide-react";
import { FormEvent, useState } from "react";

interface Course {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  language: string;
  price: number;
  rating: number;
  students: number;
  duration: string;
  lessons: number;
  image: string;
  instructor: string;
  featured: boolean;
}

interface EditCourseFormProps {
  course: Course;
}

interface CourseFormData {
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  language: string;
  price: string;
  rating: string;
  students: string;
  duration: string;
  lessons: string;
  image: string;
  instructor: string;
  featured: boolean;
}

interface ApiResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

const categories: string[] = [
  "Web Development",
  "UI/UX Design",
  "Data Science",
  "Cyber Security",
  "Artificial Intelligence",
  "Business Skills",
];

export default function EditCourseForm({
  course,
}: EditCourseFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<CourseFormData>({
    title: course.title,
    shortDescription: course.shortDescription,
    description: course.description,
    category: course.category,
    level: course.level,
    language: course.language,
    price: course.price.toString(),
    rating: course.rating.toString(),
    students: course.students.toString(),
    duration: course.duration,
    lessons: course.lessons.toString(),
    image: course.image,
    instructor: course.instructor,
    featured: course.featured,
  });

  const [isSubmitting, setIsSubmitting] =
    useState<boolean>(false);

  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  function updateField<K extends keyof CourseFormData>(
    field: K,
    value: CourseFormData[K],
  ): void {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }));

    setMessage("");
    setIsSuccess(false);
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

    setIsSubmitting(true);
    setMessage("");
    setIsSuccess(false);

    const payload = {
      title: formData.title.trim(),
      shortDescription: formData.shortDescription.trim(),
      description: formData.description.trim(),
      category: formData.category,
      level: formData.level,
      language: formData.language.trim(),
      price: Number(formData.price),
      rating: Number(formData.rating),
      students: Number(formData.students),
      duration: formData.duration.trim(),
      lessons: Number(formData.lessons),
      image: formData.image.trim(),
      instructor: formData.instructor.trim(),
      featured: formData.featured,
    };

    try {
      const response = await fetch(
        `${apiUrl}/api/courses/${course._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const result: ApiResponse = await response.json();

      if (!response.ok) {
        const firstValidationError = result.errors
          ? Object.values(result.errors).flat()[0]
          : undefined;

        setMessage(
          firstValidationError ??
            result.message ??
            "Unable to update the course.",
        );

        return;
      }

      setIsSuccess(true);
      setMessage("Course updated successfully.");

      setTimeout(() => {
        router.push("/dashboard/manage-courses");
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error("Update course request failed:", error);

      setMessage(
        "Unable to connect to the backend. Make sure the Express server is running.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white py-8">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/dashboard/manage-courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to Manage Courses
          </Link>

          <div className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Course Management
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Edit course
            </h1>

            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Update the course information and save your changes.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Course title
                </label>

                <input
                  id="title"
                  type="text"
                  required
                  minLength={3}
                  maxLength={120}
                  value={formData.title}
                  onChange={(event) =>
                    updateField("title", event.target.value)
                  }
                  className="min-h-12 w-full rounded-xl border border-slate-300 px-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="shortDescription"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Short description
                </label>

                <textarea
                  id="shortDescription"
                  required
                  minLength={10}
                  maxLength={180}
                  rows={3}
                  value={formData.shortDescription}
                  onChange={(event) =>
                    updateField(
                      "shortDescription",
                      event.target.value,
                    )
                  }
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />

                <p className="mt-1 text-right text-xs text-slate-500">
                  {formData.shortDescription.length}/180
                </p>
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full description
                </label>

                <textarea
                  id="description"
                  required
                  minLength={30}
                  rows={7}
                  value={formData.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Category
                </label>

                <select
                  id="category"
                  required
                  value={formData.category}
                  onChange={(event) =>
                    updateField("category", event.target.value)
                  }
                  className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  {categories.map((category: string) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="level"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Course level
                </label>

                <select
                  id="level"
                  value={formData.level}
                  onChange={(event) =>
                    updateField(
                      "level",
                      event.target.value as CourseFormData["level"],
                    )
                  }
                  className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="instructor"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Instructor name
                </label>

                <input
                  id="instructor"
                  type="text"
                  required
                  value={formData.instructor}
                  onChange={(event) =>
                    updateField("instructor", event.target.value)
                  }
                  className="min-h-12 w-full rounded-xl border border-slate-300 px-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="language"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Language
                </label>

                <input
                  id="language"
                  type="text"
                  required
                  value={formData.language}
                  onChange={(event) =>
                    updateField("language", event.target.value)
                  }
                  className="min-h-12 w-full rounded-xl border border-slate-300 px-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Price
                </label>

                <input
                  id="price"
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(event) =>
                    updateField("price", event.target.value)
                  }
                  className="min-h-12 w-full rounded-xl border border-slate-300 px-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="duration"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Duration
                </label>

                <input
                  id="duration"
                  type="text"
                  required
                  value={formData.duration}
                  onChange={(event) =>
                    updateField("duration", event.target.value)
                  }
                  className="min-h-12 w-full rounded-xl border border-slate-300 px-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="lessons"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Lessons
                </label>

                <input
                  id="lessons"
                  type="number"
                  required
                  min="1"
                  step="1"
                  value={formData.lessons}
                  onChange={(event) =>
                    updateField("lessons", event.target.value)
                  }
                  className="min-h-12 w-full rounded-xl border border-slate-300 px-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="rating"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Rating
                </label>

                <input
                  id="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(event) =>
                    updateField("rating", event.target.value)
                  }
                  className="min-h-12 w-full rounded-xl border border-slate-300 px-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="students"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Students
                </label>

                <input
                  id="students"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.students}
                  onChange={(event) =>
                    updateField("students", event.target.value)
                  }
                  className="min-h-12 w-full rounded-xl border border-slate-300 px-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Image URL
                </label>

                <input
                  id="image"
                  type="url"
                  required
                  value={formData.image}
                  onChange={(event) =>
                    updateField("image", event.target.value)
                  }
                  className="min-h-12 w-full rounded-xl border border-slate-300 px-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(event) =>
                      updateField("featured", event.target.checked)
                    }
                    className="mt-1 h-4 w-4 accent-blue-600"
                  />

                  <span>
                    <span className="block font-semibold text-slate-900">
                      Featured course
                    </span>

                    <span className="mt-1 block text-sm text-slate-600">
                      Show this course in the featured section.
                    </span>
                  </span>
                </label>
              </div>
            </div>

            {message && (
              <div
                className={`mt-6 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
                  isSuccess
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {isSuccess && <CheckCircle2 size={19} />}
                {message}
              </div>
            )}

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
              <Link
                href="/dashboard/manage-courses"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 px-6 font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle
                      size={19}
                      className="animate-spin"
                    />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save size={19} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}