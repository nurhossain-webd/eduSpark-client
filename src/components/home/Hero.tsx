import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CircleCheck,
  Play,
  Star,
  Users,
} from "lucide-react";
import Container from "@/components/ui/Container";

const heroFeatures: string[] = [
  "Expert-led courses",
  "Flexible learning",
  "Practical skills",
];

export default function Hero() {
  return (
    <section className="overflow-hidden bg-slate-50">
      <Container>
        <div className="grid min-h-[70vh] items-center gap-12 py-16 lg:grid-cols-2 lg:py-20">
          {/* Left content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              <Star size={16} className="fill-blue-600" />
              Learn from experienced instructors
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Build skills that create a{" "}
              <span className="text-blue-600">brighter future.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Discover practical online courses designed to help you learn
              valuable skills, advance your career, and achieve your personal
              goals.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/courses"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Explore Courses
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/about"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
              >
                <Play size={18} />
                How It Works
              </Link>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {heroFeatures.map((feature: string) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm font-medium text-slate-600"
                >
                  <CircleCheck size={18} className="text-blue-600" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Right content */}
          <div className="relative">
            <div className="absolute -left-8 top-12 hidden h-24 w-24 rounded-full bg-amber-300/40 blur-2xl lg:block" />

            <div className="absolute -right-8 bottom-12 hidden h-32 w-32 rounded-full bg-blue-300/40 blur-3xl lg:block" />

            <div className="relative rounded-3xl bg-slate-900 p-6 shadow-2xl sm:p-8">
              <div className="rounded-2xl bg-white p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Featured Learning Path
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-slate-900">
                      Full-Stack Web Development
                    </h2>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <BookOpen size={24} />
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-slate-100 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-600">
                      Course progress
                    </span>

                    <span className="font-semibold text-blue-600">72%</span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-[72%] rounded-full bg-blue-600" />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-slate-200 p-4">
                    <BookOpen size={20} className="text-blue-600" />

                    <p className="mt-3 text-2xl font-bold text-slate-900">42</p>

                    <p className="text-sm text-slate-500">Lessons</p>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4">
                    <Users size={20} className="text-amber-500" />

                    <p className="mt-3 text-2xl font-bold text-slate-900">
                      1.8K
                    </p>

                    <p className="text-sm text-slate-500">Students</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-200 p-4">
                  <div>
                    <p className="text-sm text-slate-500">Instructor</p>

                    <p className="font-semibold text-slate-900">
                      Sarah Anderson
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={18} className="fill-amber-500" />
                    <span className="font-semibold text-slate-900">4.9</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between text-white">
                <div>
                  <p className="text-sm text-slate-400">Learning community</p>

                  <p className="mt-1 text-xl font-bold">12,000+ learners</p>
                </div>

                <div className="flex -space-x-3">
                  {["A", "N", "R", "S"].map((letter: string) => (
                    <div
                      key={letter}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-900 bg-blue-600 text-sm font-bold text-white"
                    >
                      {letter}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}