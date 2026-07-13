import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Star, Users } from "lucide-react";
import Container from "@/components/ui/Container";

interface Instructor {
  id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  students: number;
  courses: number;
  expertise: string;
}

const instructors: Instructor[] = [
  {
    id: "sarah-anderson",
    name: "Sarah Anderson",
    role: "Full-Stack Developer",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&crop=faces&w=800&h=800&q=80",
    rating: 4.9,
    students: 3250,
    courses: 8,
    expertise: "React, Next.js, Node.js",
  },
  {
    id: "michael-chen",
    name: "Michael Chen",
    role: "Data Science Instructor",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&crop=faces&w=800&h=800&q=80",
    rating: 4.8,
    students: 2840,
    courses: 6,
    expertise: "Python, Machine Learning, Analytics",
  },
  {
    id: "emma-wilson",
    name: "Emma Wilson",
    role: "UI/UX Designer",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&crop=faces&w=800&h=800&q=80",
    rating: 4.9,
    students: 1980,
    courses: 5,
    expertise: "Figma, Prototyping, User Research",
  },
  {
    id: "david-miller",
    name: "David Miller",
    role: "Cyber Security Specialist",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&w=800&h=800&q=80",
    rating: 4.7,
    students: 1640,
    courses: 4,
    expertise: "Network Security, Ethical Hacking",
  },
];

export default function Instructors() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Top Instructors
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Learn from experienced professionals
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Our instructors combine practical experience with clear teaching
              to help learners build useful and career-focused skills.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700"
          >
            Explore their courses
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {instructors.map((instructor: Instructor) => (
            <article
              key={instructor.id}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-slate-200">
                <Image
                  src={instructor.image}
                  alt={`${instructor.name}, ${instructor.role}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover object-center transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-xl font-bold text-slate-900">
                  {instructor.name}
                </h3>

                <p className="mt-1 text-sm font-medium text-blue-600">
                  {instructor.role}
                </p>

                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                  {instructor.expertise}
                </p>

                <div className="mt-5 grid grid-cols-3 gap-2 border-t border-slate-200 pt-4 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1">
                      <Star
                        size={16}
                        className="fill-amber-500 text-amber-500"
                      />

                      <span className="font-semibold text-slate-900">
                        {instructor.rating}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-slate-500">Rating</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-center gap-1">
                      <Users size={16} className="text-blue-600" />

                      <span className="font-semibold text-slate-900">
                        {instructor.students.toLocaleString()}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-slate-500">Students</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-center gap-1">
                      <BookOpen size={16} className="text-blue-600" />

                      <span className="font-semibold text-slate-900">
                        {instructor.courses}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-slate-500">Courses</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}