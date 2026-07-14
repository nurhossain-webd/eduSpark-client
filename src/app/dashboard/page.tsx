import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  CircleDollarSign,
  PlusCircle,
  Star,
  Users,
} from "lucide-react";

import DashboardCharts from "@/components/dashboard/DashboardCharts";

interface Course {
  _id: string;
  title: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  rating: number;
  students: number;
  image: string;
  instructor: string;
  createdAt: string;
}

interface CoursesApiResponse {
  success: boolean;
  data: Course[];
}

interface CategoryChartItem {
  name: string;
  courses: number;
}

interface LevelChartItem {
  name: string;
  value: number;
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
      throw new Error("Failed to retrieve dashboard courses.");
    }

    const result: CoursesApiResponse = await response.json();

    return result.data;
  } catch (error) {
    console.error("Dashboard courses fetch error:", error);
    return [];
  }
}

function createCategoryData(
  courses: Course[],
): CategoryChartItem[] {
  const categoryCounts = courses.reduce<Record<string, number>>(
    (counts, course) => {
      counts[course.category] =
        (counts[course.category] ?? 0) + 1;

      return counts;
    },
    {},
  );

  return Object.entries(categoryCounts).map(
    ([name, courseCount]) => ({
      name,
      courses: courseCount,
    }),
  );
}

function createLevelData(
  courses: Course[],
): LevelChartItem[] {
  const levelCounts: Record<Course["level"], number> = {
    Beginner: 0,
    Intermediate: 0,
    Advanced: 0,
  };

  courses.forEach((course) => {
    levelCounts[course.level] += 1;
  });

  return Object.entries(levelCounts).map(
    ([name, value]) => ({
      name,
      value,
    }),
  );
}

export default async function DashboardPage() {
  const courses = await getCourses();

  const totalCourses = courses.length;

  const totalStudents = courses.reduce(
    (total, course) => total + course.students,
    0,
  );

  const estimatedRevenue = courses.reduce(
    (total, course) =>
      total + course.price * course.students,
    0,
  );

  const averageRating =
    courses.length > 0
      ? courses.reduce(
          (total, course) => total + course.rating,
          0,
        ) / courses.length
      : 0;

  const categoryData = createCategoryData(courses);
  const levelData = createLevelData(courses);
  const recentCourses = courses.slice(0, 5);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white py-8">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Overview
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                EduSpark Dashboard
              </h1>

              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                Review course statistics, learning activity, and
                recently added content.
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

      <section className="py-8">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Summary cards */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Courses
                  </p>

                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    {totalCourses}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <BookOpen size={23} />
                </div>
              </div>

              <Link
                href="/dashboard/manage-courses"
                className="mt-5 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Manage courses
              </Link>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Students
                  </p>

                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    {totalStudents.toLocaleString()}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Users size={23} />
                </div>
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Across all available courses
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Average Rating
                  </p>

                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    {averageRating.toFixed(1)}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <Star size={23} />
                </div>
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Average across all courses
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Estimated Revenue
                  </p>

                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    ${estimatedRevenue.toLocaleString()}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <CircleDollarSign size={23} />
                </div>
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Price multiplied by students
              </p>
            </article>
          </div>

          {/* Charts */}
          <div className="mt-8">
            <DashboardCharts
              categoryData={categoryData}
              levelData={levelData}
            />
          </div>

          {/* Recent courses */}
          <article className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Recently added courses
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  The latest courses added to EduSpark.
                </p>
              </div>

              <Link
                href="/dashboard/manage-courses"
                className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
              >
                View all courses
              </Link>
            </div>

            {recentCourses.length === 0 ? (
              <div className="px-6 py-14 text-center">
                <BookOpen
                  size={40}
                  className="mx-auto text-blue-600"
                />

                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  No courses available
                </h3>

                <p className="mt-2 text-slate-600">
                  Add a course to display dashboard information.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-200">
                {recentCourses.map((course) => (
                  <div
                    key={course._id}
                    className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-200">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate font-bold text-slate-900">
                          {course.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {course.category} · {course.level}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-6 sm:justify-end">
                      <div className="text-right">
                        <p className="font-bold text-blue-600">
                          ${course.price}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {course.students.toLocaleString()} students
                        </p>
                      </div>

                      <Link
                        href={`/courses/${course._id}`}
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </article>
        </div>
      </section>
    </main>
  );
}
