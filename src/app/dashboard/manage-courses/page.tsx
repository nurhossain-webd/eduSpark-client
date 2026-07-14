import Link from "next/link";
import {
  BookOpen,
  PlusCircle,
  RefreshCw,
} from "lucide-react";

import ManageCoursesClient from "@/components/dashboard/ManageCoursesClient";

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

interface CoursesApiResponse {
  success: boolean;
  data: Course[];
}

async function getCourses(): Promise<Course[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error("NEXT_PUBLIC_API_URL is not defined.");
    return [];
  }

  try {
    const response = await fetch(
      `${apiUrl}/api/courses?page=1&limit=50&sort=newest`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to retrieve courses.");
    }

    const result: CoursesApiResponse = await response.json();

    return result.data;
  } catch (error) {
    console.error("Manage courses fetch error:", error);
    return [];
  }
}

export default async function ManageCoursesPage() {
  const courses = await getCourses();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white py-8">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Course Management
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Manage courses
              </h1>

              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                View all EduSpark courses and remove courses that
                are no longer required.
              </p>
            </div>

            <Link
              href="/dashboard/add-course"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 font-semibold text-white transition hover:bg-blue-700"
            >
              <PlusCircle size={18} />
              Add Course
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <BookOpen size={22} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Total courses
                </p>

                <p className="text-2xl font-bold text-slate-900">
                  {courses.length}
                </p>
              </div>
            </div>

            <Link
              href="/dashboard/manage-courses"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
            >
              <RefreshCw size={16} />
              Refresh list
            </Link>
          </div>

          <ManageCoursesClient
            initialCourses={courses}
          />
        </div>
      </section>
    </main>
  );
}
