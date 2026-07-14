"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Eye,
  LoaderCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import { getAuthHeaders } from "@/lib/auth";

interface Course {
  _id: string;
  title: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  students: number;
  image: string;
  instructor: string;
}

interface ManageCoursesClientProps {
  initialCourses: Course[];
}

interface DeleteApiResponse {
  success: boolean;
  message: string;
}

export default function ManageCoursesClient({
  initialCourses,
}: ManageCoursesClientProps) {
  const router = useRouter();

  const [courses, setCourses] =
    useState<Course[]>(initialCourses);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  function clearStoredAuthentication(): void {
    localStorage.removeItem("eduspark_access_token");
    localStorage.removeItem("eduspark_user");
  }

  async function handleDelete(course: Course): Promise<void> {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${course.title}"?`,
    );

    if (!confirmed) {
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      setMessage("Frontend API URL is not configured.");
      setIsError(true);
      return;
    }

    const accessToken = localStorage.getItem(
      "eduspark_access_token",
    );

    if (!accessToken) {
      setMessage("Please sign in before deleting a course.");
      setIsError(true);

      setTimeout(() => {
        router.push("/login");
      }, 800);

      return;
    }

    setDeletingId(course._id);
    setMessage("");
    setIsError(false);

    try {
      const response = await fetch(
        `${apiUrl}/api/courses/${course._id}`,
        {
          method: "DELETE",
          headers: getAuthHeaders(),
        },
      );

      const result: DeleteApiResponse =
        await response.json();

      if (response.status === 401) {
        clearStoredAuthentication();

        setMessage(
          result.message ||
            "Your login session has expired. Please sign in again.",
        );

        setIsError(true);

        setTimeout(() => {
          router.push("/login");
          router.refresh();
        }, 1000);

        return;
      }

      if (!response.ok) {
        setMessage(
          result.message || "Unable to delete the course.",
        );
        setIsError(true);
        return;
      }

      setCourses((currentCourses) =>
        currentCourses.filter(
          (currentCourse) =>
            currentCourse._id !== course._id,
        ),
      );

      setMessage("Course deleted successfully.");
      setIsError(false);

      router.refresh();
    } catch (error) {
      console.error("Delete course request failed:", error);

      setMessage(
        "Unable to connect to the backend. Make sure the Express server is running.",
      );

      setIsError(true);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      {message && (
        <div
          className={`mb-6 rounded-xl border px-4 py-3 text-sm ${
            isError
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-green-200 bg-green-50 text-green-700"
          }`}
        >
          {message}
        </div>
      )}

      {courses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <BookOpen
            size={44}
            className="mx-auto text-blue-600"
          />

          <h2 className="mt-5 text-2xl font-bold text-slate-900">
            No courses available
          </h2>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
            Add your first course to start managing EduSpark course
            content.
          </p>

          <Link
            href="/dashboard/add-course"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Add Course
          </Link>
        </div>
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px]">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                      Course
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                      Category
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                      Level
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                      Price
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                      Students
                    </th>

                    <th className="px-5 py-4 text-right text-sm font-semibold text-slate-700">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {courses.map((course: Course) => (
                    <tr
                      key={course._id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-200">
                            <Image
                              src={course.image}
                              alt={course.title}
                              fill
                              sizes="96px"
                              className="object-cover"
                            />
                          </div>

                          <div>
                            <h3 className="line-clamp-1 max-w-xs font-bold text-slate-900">
                              {course.title}
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                              By {course.instructor}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {course.category}
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                          {course.level}
                        </span>
                      </td>

                      <td className="px-5 py-4 font-semibold text-blue-600">
                        ${course.price}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {course.students.toLocaleString()}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/courses/${course._id}`}
                            aria-label={`View ${course.title}`}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-slate-600 transition hover:border-blue-600 hover:text-blue-600"
                          >
                            <Eye size={18} />
                          </Link>

                          <Link
                            href={`/dashboard/edit-course/${course._id}`}
                            aria-label={`Edit ${course.title}`}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-amber-200 text-amber-600 transition hover:bg-amber-50"
                          >
                            <Pencil size={18} />
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(course)
                            }
                            disabled={
                              deletingId === course._id
                            }
                            aria-label={`Delete ${course.title}`}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {deletingId === course._id ? (
                              <LoaderCircle
                                size={18}
                                className="animate-spin"
                              />
                            ) : (
                              <Trash2 size={18} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-5 lg:hidden">
            {courses.map((course: Course) => (
              <article
                key={course._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="relative h-48 bg-slate-200">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      {course.category}
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {course.level}
                    </span>
                  </div>

                  <h2 className="mt-4 text-xl font-bold text-slate-900">
                    {course.title}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    By {course.instructor}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-200 pt-4">
                    <div>
                      <p className="text-xs text-slate-500">
                        Price
                      </p>

                      <p className="mt-1 font-bold text-blue-600">
                        ${course.price}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Students
                      </p>

                      <p className="mt-1 font-bold text-slate-900">
                        {course.students.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <Link
                      href={`/courses/${course._id}`}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
                    >
                      <Eye size={17} />
                      View
                    </Link>

                    <Link
                      href={`/dashboard/edit-course/${course._id}`}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-amber-200 font-semibold text-amber-600 transition hover:bg-amber-50"
                    >
                      <Pencil size={17} />
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(course)}
                      disabled={deletingId === course._id}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-red-200 font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {deletingId === course._id ? (
                        <>
                          <LoaderCircle
                            size={17}
                            className="animate-spin"
                          />
                          Deleting
                        </>
                      ) : (
                        <>
                          <Trash2 size={17} />
                          Delete
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}