import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock3,
  Globe2,
  GraduationCap,
  Layers3,
  Star,
  Users,
} from "lucide-react";
import RelatedCourses from "@/components/courses/RelatedCourses";

import CourseEnrollButton from "@/components/courses/CourseEnrollButton";
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

interface CourseApiResponse {
  success: boolean;
  message?: string;
  data?: Course;
}

interface CourseDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getCourse(courseId: string): Promise<Course | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error("NEXT_PUBLIC_API_URL is not defined.");
    return null;
  }

  try {
    const response = await fetch(
      `${apiUrl}/api/courses/${courseId}`,
      {
        cache: "no-store",
      },
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Failed to retrieve the course.");
    }

    const result: CourseApiResponse = await response.json();

    return result.data ?? null;
  } catch (error) {
    console.error("Course details fetch error:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: CourseDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourse(id);

  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: course.title,
    description: course.shortDescription,
  };
}

export default async function CourseDetailsPage({
  params,
}: CourseDetailsPageProps) {
  const { id } = await params;
  const course = await getCourse(id);

  if (!course) {
    notFound();
  }

  const learningPoints: string[] = [
    `Complete ${course.lessons} structured lessons`,
    `Learn at a ${course.level.toLowerCase()} level`,
    `Study practical ${course.category.toLowerCase()} concepts`,
    `Access course content in ${course.language}`,
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-slate-900 py-10 text-white">
        <Container>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Courses
          </Link>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold">
                  {course.category}
                </span>

                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-semibold">
                  {course.level}
                </span>
              </div>

              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                {course.title}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                {course.shortDescription}
              </p>

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
                <span className="flex items-center gap-2">
                  <GraduationCap size={18} className="text-blue-400" />
                  Instructor: {course.instructor}
                </span>

                <span className="flex items-center gap-2">
                  <Star
                    size={18}
                    className="fill-amber-500 text-amber-500"
                  />
                  {course.rating} rating
                </span>

                <span className="flex items-center gap-2">
                  <Users size={18} className="text-blue-400" />
                  {course.students.toLocaleString()} students
                </span>
              </div>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-slate-800 shadow-2xl">
              <Image
                src={course.image}
                alt={course.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <div className="space-y-8">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-2xl font-bold text-slate-900">
                  Course Overview
                </h2>

                <p className="mt-5 whitespace-pre-line leading-8 text-slate-600">
                  {course.description}
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-2xl font-bold text-slate-900">
                  What you will learn
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {learningPoints.map((point: string) => (
                    <div
                      key={point}
                      className="flex gap-3 rounded-xl bg-slate-50 p-4"
                    >
                      <CheckCircle2
                        size={20}
                        className="mt-0.5 shrink-0 text-blue-600"
                      />

                      <p className="text-sm leading-6 text-slate-700">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-2xl font-bold text-slate-900">
                  Instructor
                </h2>

                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                    <GraduationCap size={30} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {course.instructor}
                    </h3>

                    <p className="mt-1 text-sm text-slate-600">
                      EduSpark {course.category} Instructor
                    </p>
                  </div>
                </div>
              </article>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Course price
                </p>

                <p className="mt-2 text-4xl font-bold text-blue-600">
                  ${course.price}
                </p>

                <div className="mt-6">
                  <CourseEnrollButton courseId={course._id} />
                </div>

                <div className="mt-6 space-y-4 border-t border-slate-200 pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock3 size={17} />
                      Duration
                    </span>

                    <span className="text-sm font-semibold text-slate-900">
                      {course.duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2 text-sm text-slate-600">
                      <BookOpen size={17} />
                      Lessons
                    </span>

                    <span className="text-sm font-semibold text-slate-900">
                      {course.lessons}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2 text-sm text-slate-600">
                      <Layers3 size={17} />
                      Level
                    </span>

                    <span className="text-sm font-semibold text-slate-900">
                      {course.level}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2 text-sm text-slate-600">
                      <Globe2 size={17} />
                      Language
                    </span>

                    <span className="text-sm font-semibold text-slate-900">
                      {course.language}
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
            </section>

      <RelatedCourses
        currentCourseId={course._id}
        category={course.category}
      />
    </main>
  );
}