import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  Star,
  Users,
} from "lucide-react";

import Container from "@/components/ui/Container";

interface Course {
  _id: string;
  title: string;
  shortDescription: string;
  category: string;
  instructor: string;
  image: string;
  price: number;
  rating: number;
  students: number;
  lessons: number;
  duration: string;
  featured: boolean;
}

interface CoursesApiResponse {
  success: boolean;
  data: Course[];
}

async function getFeaturedCourses(): Promise<Course[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error("NEXT_PUBLIC_API_URL is not defined.");
    return [];
  }

  try {
    const response = await fetch(`${apiUrl}/api/courses`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch courses.");
    }

    const result: CoursesApiResponse = await response.json();

    return result.data
      .filter((course: Course) => course.featured)
      .slice(0, 4);
  } catch (error) {
    console.error("Featured courses fetch error:", error);
    return [];
  }
}

export default async function FeaturedCourses() {
  const featuredCourses = await getFeaturedCourses();

  return (
    <section className="bg-slate-50 py-20">
      <Container>
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Featured Courses
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Popular courses chosen by learners
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Explore practical courses created to help you develop valuable
              skills and achieve your learning goals.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700"
          >
            View all courses
            <ArrowRight size={18} />
          </Link>
        </div>

        {featuredCourses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <BookOpen className="mx-auto text-blue-600" size={42} />

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              No featured courses available
            </h3>

            <p className="mx-auto mt-3 max-w-lg text-slate-600">
              Add a course with the featured option enabled, and it will appear
              here automatically.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {featuredCourses.map((course: Course) => (
              <article
                key={course._id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-52 overflow-hidden bg-slate-200">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-blue-600 shadow-sm">
                    {course.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm font-medium text-slate-500">
                    By {course.instructor}
                  </p>

                  <h3 className="mt-2 line-clamp-2 text-xl font-bold leading-7 text-slate-900">
                    {course.title}
                  </h3>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
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

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-1">
                      <Star
                        size={17}
                        className="fill-amber-500 text-amber-500"
                      />

                      <span className="font-semibold text-slate-900">
                        {course.rating}
                      </span>

                      <span className="flex items-center gap-1 text-sm text-slate-500">
                        <Users size={15} />
                        {course.students.toLocaleString()}
                      </span>
                    </div>

                    <span className="text-xl font-bold text-blue-600">
                      ${course.price}
                    </span>
                  </div>

                  <Link
                    href={`/courses/${course._id}`}
                    className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}