import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  Star,
} from "lucide-react";

interface Course {
  _id: string;
  title: string;
  shortDescription: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  rating: number;
  duration: string;
  lessons: number;
  image: string;
  instructor: string;
}

interface CoursesApiResponse {
  success: boolean;
  data: Course[];
}

interface RelatedCoursesProps {
  currentCourseId: string;
  category: string;
}

async function getRelatedCourses(
  currentCourseId: string,
  category: string,
): Promise<Course[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error("NEXT_PUBLIC_API_URL is not defined.");
    return [];
  }

  const queryParameters = new URLSearchParams({
    category,
    page: "1",
    limit: "8",
    sort: "rating",
  });

  try {
    const response = await fetch(
      `${apiUrl}/api/courses?${queryParameters.toString()}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Unable to retrieve related courses.");
    }

    const result: CoursesApiResponse = await response.json();

    return result.data
      .filter(
        (course: Course) =>
          course._id !== currentCourseId,
      )
      .slice(0, 3);
  } catch (error) {
    console.error("Related courses fetch error:", error);
    return [];
  }
}

export default async function RelatedCourses({
  currentCourseId,
  category,
}: RelatedCoursesProps) {
  const relatedCourses = await getRelatedCourses(
    currentCourseId,
    category,
  );

  if (relatedCourses.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-slate-200 bg-white py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Continue Learning
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Related courses
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Explore more courses from the {category} category.
            </p>
          </div>

          <Link
            href={`/courses?category=${encodeURIComponent(
              category,
            )}`}
            className="inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700"
          >
            View all in {category}
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {relatedCourses.map((course: Course) => (
            <article
              key={course._id}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-52 overflow-hidden bg-slate-200">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm">
                  {course.category}
                </span>

                <span className="absolute right-4 top-4 rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold text-white">
                  {course.level}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="text-sm font-medium text-slate-500">
                  By {course.instructor}
                </p>

                <h3 className="mt-2 line-clamp-2 text-xl font-bold leading-7 text-slate-900">
                  {course.title}
                </h3>

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

                <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
                  <span className="flex items-center gap-1.5">
                    <Star
                      size={17}
                      className="fill-amber-500 text-amber-500"
                    />

                    <span className="font-semibold text-slate-900">
                      {course.rating}
                    </span>
                  </span>

                  <span className="text-xl font-bold text-blue-600">
                    ${course.price}
                  </span>
                </div>

                <Link
                  href={`/courses/${course._id}`}
                  className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  View Details
                  <ArrowRight size={17} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}