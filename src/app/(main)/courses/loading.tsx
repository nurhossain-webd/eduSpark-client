import Container from "@/components/ui/Container";

function CourseCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="h-48 animate-pulse bg-slate-200" />

      <div className="p-5">
        <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />

        <div className="mt-4 h-6 w-full animate-pulse rounded bg-slate-200" />

        <div className="mt-2 h-6 w-3/4 animate-pulse rounded bg-slate-200" />

        <div className="mt-4 space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100" />
        </div>

        <div className="mt-5 flex gap-4">
          <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="h-5 w-24 animate-pulse rounded bg-slate-200" />
          <div className="h-6 w-16 animate-pulse rounded bg-slate-200" />
        </div>

        <div className="mt-5 h-10 w-full animate-pulse rounded-xl bg-slate-200" />
      </div>
    </article>
  );
}

export default function CoursesLoading() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white py-8">
        <Container>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="w-full max-w-3xl">
              <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />

              <div className="mt-3 h-10 w-full max-w-xl animate-pulse rounded bg-slate-200" />

              <div className="mt-4 h-5 w-full max-w-2xl animate-pulse rounded bg-slate-100" />
            </div>

            <div className="h-16 w-36 animate-pulse rounded-xl bg-blue-100" />
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <div className="flex items-center justify-between gap-5">
            <div>
              <div className="h-7 w-36 animate-pulse rounded bg-slate-200" />
              <div className="mt-2 h-4 w-24 animate-pulse rounded bg-slate-100" />
            </div>

            <div className="h-10 w-40 animate-pulse rounded-lg bg-slate-200" />
          </div>

          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }, (_, index) => (
              <CourseCardSkeleton key={index} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}