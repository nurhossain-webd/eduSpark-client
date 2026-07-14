import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Clock3,
  Star,
  Users,
} from "lucide-react";

import CourseFilters from "@/components/courses/CourseFilters";
import Container from "@/components/ui/Container";

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
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalCourses: number;
  limit: number;
}

interface CoursesApiResponse {
  success: boolean;
  data: Course[];
  pagination: Pagination;
}

interface CoursesPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    level?: string;
    sort?: string;
    page?: string;
  }>;
}

const emptyResponse: CoursesApiResponse = {
  success: false,
  data: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalCourses: 0,
    limit: 8,
  },
};

async function getCourses(
  queryString: string,
): Promise<CoursesApiResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error("NEXT_PUBLIC_API_URL is not defined.");
    return emptyResponse;
  }

  try {
    const response = await fetch(
      `${apiUrl}/api/courses?${queryString}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to retrieve courses.");
    }

    const result: CoursesApiResponse = await response.json();

    return result;
  } catch (error) {
    console.error("Courses fetch error:", error);
    return emptyResponse;
  }
}

function createPageUrl(
  page: number,
  currentParameters: {
    search: string;
    category: string;
    level: string;
    sort: string;
  },
): string {
  const parameters = new URLSearchParams();

  if (currentParameters.search) {
    parameters.set("search", currentParameters.search);
  }

  if (currentParameters.category) {
    parameters.set("category", currentParameters.category);
  }

  if (currentParameters.level) {
    parameters.set("level", currentParameters.level);
  }

  if (
    currentParameters.sort &&
    currentParameters.sort !== "newest"
  ) {
    parameters.set("sort", currentParameters.sort);
  }

  parameters.set("page", page.toString());

  return `/courses?${parameters.toString()}`;
}

export default async function CoursesPage({
  searchParams,
}: CoursesPageProps) {
  const resolvedSearchParams = await searchParams;

  const search = resolvedSearchParams.search?.trim() ?? "";
  const category = resolvedSearchParams.category ?? "";
  const level = resolvedSearchParams.level ?? "";
  const sort = resolvedSearchParams.sort ?? "newest";

  const parsedPage = Number(resolvedSearchParams.page);

  const page =
    Number.isFinite(parsedPage) && parsedPage > 0
      ? Math.floor(parsedPage)
      : 1;

  const apiParameters = new URLSearchParams({
    page: page.toString(),
    limit: "8",
    sort,
  });

  if (search) {
    apiParameters.set("search", search);
  }

  if (category) {
    apiParameters.set("category", category);
  }

  if (level) {
    apiParameters.set("level", level);
  }

  const result = await getCourses(apiParameters.toString());

  const currentParameters = {
    search,
    category,
    level,
    sort,
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Compact introduction */}
      <section className="border-b border-slate-200 bg-white py-8">
        <Container>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Explore Courses
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Find the right course for your goals
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
                Explore practical courses created to support your personal and
                professional growth.
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 px-5 py-3 text-blue-700">
              <p className="text-sm font-medium">Available courses</p>

              <p className="text-2xl font-bold">
                {result.pagination.totalCourses}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          {/* Results and filter button */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  All courses
                </h2>

                <p className="mt-1 text-sm text-slate-600">
                  {result.pagination.totalCourses}{" "}
                  {result.pagination.totalCourses === 1
                    ? "course"
                    : "courses"}{" "}
                  found
                </p>
              </div>

              <CourseFilters
                search={search}
                category={category}
                level={level}
                sort={sort}
              />
            </div>
          </div>

          {/* Course cards */}
          {result.data.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <BookOpen
                size={42}
                className="mx-auto text-blue-600"
              />

              <h3 className="mt-5 text-2xl font-bold text-slate-900">
                No courses found
              </h3>

              <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
                No courses match the selected search options. Clear the filters
                or add a new course to the database.
              </p>

              <Link
                href="/courses"
                className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                View All Courses
              </Link>
            </div>
          ) : (
            <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {result.data.map((course: Course) => (
                <article
                  key={course._id}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-200">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-blue-600 shadow-sm">
                      {course.category}
                    </span>

                    <span className="absolute right-3 top-3 rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold text-white">
                      {course.level}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-sm font-medium text-slate-500">
                      By {course.instructor}
                    </p>

                    <h3 className="mt-2 line-clamp-2 text-lg font-bold leading-7 text-slate-900">
                      {course.title}
                    </h3>

                    <p className="mt-3 line-clamp-2 flex-1 text-sm leading-6 text-slate-600">
                      {course.shortDescription}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <BookOpen size={15} />
                        {course.lessons} lessons
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Clock3 size={15} />
                        {course.duration}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-1">
                        <Star
                          size={16}
                          className="fill-amber-500 text-amber-500"
                        />

                        <span className="font-semibold text-slate-900">
                          {course.rating}
                        </span>

                        <span className="ml-1 flex items-center gap-1 text-xs text-slate-500">
                          <Users size={14} />
                          {course.students.toLocaleString()}
                        </span>
                      </div>

                      <span className="text-xl font-bold text-blue-600">
                        ${course.price}
                      </span>
                    </div>

                    <Link
                      href={`/courses/${course._id}`}
                      className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      View Details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {result.pagination.totalPages > 1 && (
            <nav
              aria-label="Course pagination"
              className="mt-10 flex flex-wrap items-center justify-center gap-2"
            >
              {result.pagination.currentPage > 1 && (
                <Link
                  href={createPageUrl(
                    result.pagination.currentPage - 1,
                    currentParameters,
                  )}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
                >
                  Previous
                </Link>
              )}

              {Array.from(
                {
                  length: result.pagination.totalPages,
                },
                (_, index: number) => index + 1,
              ).map((pageNumber: number) => {
                const isCurrentPage =
                  pageNumber === result.pagination.currentPage;

                return (
                  <Link
                    key={pageNumber}
                    href={createPageUrl(
                      pageNumber,
                      currentParameters,
                    )}
                    aria-current={
                      isCurrentPage ? "page" : undefined
                    }
                    className={`flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-semibold transition ${
                      isCurrentPage
                        ? "bg-blue-600 text-white"
                        : "border border-slate-300 bg-white text-slate-700 hover:border-blue-600 hover:text-blue-600"
                    }`}
                  >
                    {pageNumber}
                  </Link>
                );
              })}

              {result.pagination.currentPage <
                result.pagination.totalPages && (
                <Link
                  href={createPageUrl(
                    result.pagination.currentPage + 1,
                    currentParameters,
                  )}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
                >
                  Next
                </Link>
              )}
            </nav>
          )}
        </Container>
      </section>
    </main>
  );
}