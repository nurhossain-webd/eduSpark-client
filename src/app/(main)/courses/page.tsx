import Link from "next/link";
import { BookOpen } from "lucide-react";

import Container from "@/components/ui/Container";

export default function CoursesPage() {
  return (
    <section className="min-h-[70vh] bg-slate-50 py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <BookOpen size={28} />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Explore Courses
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Discover practical courses for your goals
          </h1>

          <p className="mt-5 leading-7 text-slate-600">
            The complete courses listing page with search, filters, sorting,
            pagination, and real backend data will be added in the next step.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Return Home
          </Link>
        </div>
      </Container>
    </section>
  );
}
