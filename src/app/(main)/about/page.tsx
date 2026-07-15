import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Lightbulb,
  Target,
  Users,
} from "lucide-react";

import Container from "@/components/ui/Container";

interface ValueItem {
  title: string;
  description: string;
  icon: React.ElementType;
}

const values: ValueItem[] = [
  {
    title: "Practical Learning",
    description:
      "Courses focus on useful skills, real examples, and project-based learning.",
    icon: Lightbulb,
  },
  {
    title: "Accessible Education",
    description:
      "EduSpark helps learners study at their own pace from any device.",
    icon: BookOpen,
  },
  {
    title: "Career Growth",
    description:
      "Learning paths are designed to support personal development and professional goals.",
    icon: Target,
  },
];

const platformHighlights: string[] = [
  "Structured courses with clear learning outcomes",
  "Responsive course browsing and enrollment",
  "Real student reviews and ratings",
  "Secure authentication with user and admin roles",
  "Personal My Courses learning area",
  "Professional course-management dashboard",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white py-14">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                About EduSpark
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Practical learning for meaningful growth
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                EduSpark is an online learning platform where students can
                discover courses, enroll securely, track their learning, and
                develop useful skills through structured content.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/courses"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700"
                >
                  Explore Courses
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-900 p-7 text-white shadow-xl sm:p-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">
                <GraduationCap size={29} />
              </div>

              <h2 className="mt-6 text-3xl font-bold">
                Learn. Practice. Progress.
              </h2>

              <p className="mt-4 leading-7 text-slate-300">
                EduSpark combines a modern learning experience with secure
                full-stack technology, responsive design, and user-focused
                features.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-3xl font-bold">100%</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Responsive
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-3xl font-bold">24/7</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Course access
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Our Values
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              What guides the EduSpark experience
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Every part of the platform is designed to make learning clear,
              practical, and easy to access.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((item: ValueItem) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-white py-14">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Platform Highlights
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
                A complete learning platform
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                EduSpark brings together course discovery, authentication,
                enrollment, reviews, dashboards, and administration in one
                consistent experience.
              </p>
            </div>

            <div className="grid gap-3">
              {platformHighlights.map((highlight: string) => (
                <div
                  key={highlight}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />

                  <p className="leading-6 text-slate-700">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <Users
                size={30}
                className="mx-auto text-blue-600"
              />

              <p className="mt-4 text-3xl font-bold text-slate-900">
                Learner-focused
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Designed around clear navigation and useful learning features.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <BookOpen
                size={30}
                className="mx-auto text-blue-600"
              />

              <p className="mt-4 text-3xl font-bold text-slate-900">
                Practical courses
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Course information is structured around skills and outcomes.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <GraduationCap
                size={30}
                className="mx-auto text-blue-600"
              />

              <p className="mt-4 text-3xl font-bold text-slate-900">
                Continuous growth
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Students can enroll, continue learning, and review courses.
              </p>
            </article>
          </div>
        </Container>
      </section>
    </main>
  );
}
