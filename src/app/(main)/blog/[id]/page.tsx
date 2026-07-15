import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  UserRound,
} from "lucide-react";

import Container from "@/components/ui/Container";
import {
  blogPosts,
  getBlogPostById,
} from "@/data/blog-posts";

interface BlogDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams(): Array<{
  id: string;
}> {
  return blogPosts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({
  params,
}: BlogDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = getBlogPostById(id);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetailsPage({
  params,
}: BlogDetailsPageProps) {
  const { id } = await params;
  const post = getBlogPostById(id);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((blogPost) => blogPost.id !== post.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white py-10">
        <Container>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to Blog
          </Link>

          <div className="mx-auto mt-8 max-w-4xl text-center">
            <span className="inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700">
              {post.category}
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">
              {post.title}
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              {post.excerpt}
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <UserRound size={17} />
                {post.author}
              </span>

              <span className="flex items-center gap-2">
                <CalendarDays size={17} />
                {post.date}
              </span>

              <span className="flex items-center gap-2">
                <Clock3 size={17} />
                {post.readingTime}
              </span>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="relative aspect-[16/8] overflow-hidden rounded-3xl bg-slate-200 shadow-lg">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>

            <article className="mx-auto mt-10 max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
              <div className="space-y-10">
                {post.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {section.heading}
                    </h2>

                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="leading-8 text-slate-600"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {section.points && (
                      <ul className="mt-6 space-y-3">
                        {section.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-3 rounded-xl bg-slate-50 p-4"
                          >
                            <CheckCircle2
                              size={20}
                              className="mt-0.5 shrink-0 text-blue-600"
                            />

                            <span className="leading-6 text-slate-700">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              <div className="mt-10 border-t border-slate-200 pt-7">
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Written by
                </p>

                <div className="mt-4 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                    <UserRound size={25} />
                  </div>

                  <div>
                    <p className="font-bold text-slate-900">
                      {post.author}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      EduSpark instructor and contributor
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-200 bg-white py-14">
        <Container>
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Continue Reading
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Related articles
              </h2>
            </div>

            <Link
              href="/blog"
              className="hidden items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700 sm:inline-flex"
            >
              View all articles
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <article
                key={relatedPost.id}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
              >
                <div className="relative h-44 overflow-hidden bg-slate-200">
                  <Image
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                    {relatedPost.category}
                  </p>

                  <h3 className="mt-3 line-clamp-2 text-lg font-bold leading-7 text-slate-900">
                    {relatedPost.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm text-slate-500">
                    {relatedPost.readingTime}
                  </p>

                  <Link
                    href={`/blog/${relatedPost.id}`}
                    className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700"
                  >
                    Read article
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}