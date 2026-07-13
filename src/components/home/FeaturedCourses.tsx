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

interface FeaturedCourse {
  id: string;
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
}

const featuredCourses: FeaturedCourse[] = [
  {
    id: "full-stack-web-development",
    title: "Complete Full-Stack Web Development",
    shortDescription:
      "Build modern web applications using React, Next.js, Node.js, and MongoDB.",
    category: "Web Development",
    instructor: "Sarah Anderson",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    price: 79,
    rating: 4.9,
    students: 1840,
    lessons: 42,
    duration: "18 hours",
  },
  {
    id: "ui-ux-design-fundamentals",
    title: "UI/UX Design Fundamentals",
    shortDescription:
      "Learn user research, wireframing, prototyping, and interface design.",
    category: "UI/UX Design",
    instructor: "Emma Wilson",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80",
    price: 59,
    rating: 4.8,
    students: 1260,
    lessons: 30,
    duration: "12 hours",
  },
  {
    id: "data-science-python",
    title: "Data Science with Python",
    shortDescription:
      "Analyze data, create visualizations, and build practical machine learning projects.",
    category: "Data Science",
    instructor: "Michael Chen",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    price: 89,
    rating: 4.9,
    students: 2130,
    lessons: 48,
    duration: "22 hours",
  },
  {
    id: "cyber-security-basics",
    title: "Cyber Security Essentials",
    shortDescription:
      "Understand network security, common threats, and practical protection methods.",
    category: "Cyber Security",
    instructor: "David Miller",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
    price: 69,
    rating: 4.7,
    students: 980,
    lessons: 34,
    duration: "15 hours",
  },
];

export default function FeaturedCourses() {
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

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featuredCourses.map((course: FeaturedCourse) => (
            <article
              key={course.id}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-52 overflow-hidden">
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
                  href={`/courses/${course.id}`}
                  className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}