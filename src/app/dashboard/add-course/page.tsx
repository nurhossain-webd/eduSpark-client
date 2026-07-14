"use client";
import { getAuthHeaders } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ImageIcon,
  LoaderCircle,
  PlusCircle,
} from "lucide-react";
import { FormEvent, useState } from "react";

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
  data?: {
    _id: string;
  };
  errors?: Record<string, string[]>;
}

const initialFormData: CourseFormData = {
  title: "",
  shortDescription: "",
  description: "",
  category: "",
  level: "Beginner",
  language: "English",
  price: "",
  rating: "0",
  students: "0",
  duration: "",
  lessons: "",
  image: "",
  instructor: "",
  featured: false,
};

const categories: string[] = [
  "Web Development",
  "UI/UX Design",
  "Data Science",
  "Cyber Security",
  "Artificial Intelligence",
  "Business Skills",
];

export default function AddCoursePage() {
  const router = useRouter();

  const [formData, setFormData] =
    useState<CourseFormData>(initialFormData);

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
     const response = await fetch(`${apiUrl}/api/courses`, {
  method: "POST",
  headers: getAuthHeaders(),
  body: JSON.stringify(payload),
});

      const result: ApiResponse = await response.json();
      if (response.status === 401) {
  localStorage.removeItem("eduspark_access_token");
  localStorage.removeItem("eduspark_user");

  router.push("/login");
  return;
}

      if (!response.ok) {
        const firstValidationError = result.errors
          ? Object.values(result.errors).flat()[0]
          : undefined;

        setMessage(
          firstValidationError ??
            result.message ??
            "Unable to create the course.",
        );

        return;
      }

      setIsSuccess(true);
      setMessage("Course created successfully.");
      setFormData(initialFormData);

      setTimeout(() => {
        router.push("/courses");
        router.refresh();
      }, 1200);
    } catch (error) {
      console.error("Create course request failed:", error);

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
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to Courses
          </Link>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Course Management
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Add a new course
              </h1>

              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                Enter complete and accurate course information. The new course
                will be saved in MongoDB and displayed on the courses page.
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <PlusCircle size={28} />
            </div>
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
                  placeholder="Example: Complete Next.js Development"
                  className="min-h-12 w-full rounded-xl border border-slate-300 px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
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
                  placeholder="Write a short summary for the course card."
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
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
                  placeholder="Explain the course content, objectives, and learning experience."
                  className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
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
                  className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="">Select a category</option>

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
                  className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
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
                  minLength={2}
                  value={formData.instructor}
                  onChange={(event) =>
                    updateField("instructor", event.target.value)
                  }
                  placeholder="Example: Sarah Anderson"
                  className="min-h-12 w-full rounded-xl border border-slate-300 px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
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
                  placeholder="Example: English"
                  className="min-h-12 w-full rounded-xl border border-slate-300 px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Price in USD
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
                  placeholder="79"
                  className="min-h-12 w-full rounded-xl border border-slate-300 px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
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
                  placeholder="Example: 20 Hours"
                  className="min-h-12 w-full rounded-xl border border-slate-300 px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="lessons"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Number of lessons
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
                  placeholder="45"
                  className="min-h-12 w-full rounded-xl border border-slate-300 px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="rating"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Initial rating
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
                  className="min-h-12 w-full rounded-xl border border-slate-300 px-4 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="students"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Initial students
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
                  className="min-h-12 w-full rounded-xl border border-slate-300 px-4 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Course image URL
                </label>

                <div className="relative">
                  <ImageIcon
                    size={19}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="image"
                    type="url"
                    required
                    value={formData.image}
                    onChange={(event) =>
                      updateField("image", event.target.value)
                    }
                    placeholder="https://images.unsplash.com/..."
                    className="min-h-12 w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
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
                      Mark as featured
                    </span>

                    <span className="mt-1 block text-sm leading-6 text-slate-600">
                      Featured courses may appear on the EduSpark homepage.
                    </span>
                  </span>
                </label>
              </div>
            </div>

            {message && (
              <div
                className={`mt-6 flex items-start gap-3 rounded-xl border px-4 py-3 ${
                  isSuccess
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {isSuccess ? (
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
                ) : (
                  <BookOpen size={20} className="mt-0.5 shrink-0" />
                )}

                <p className="text-sm leading-6">{message}</p>
              </div>
            )}

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
              <Link
                href="/courses"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
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
                    <LoaderCircle size={19} className="animate-spin" />
                    Creating Course...
                  </>
                ) : (
                  <>
                    <PlusCircle size={19} />
                    Add Course
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