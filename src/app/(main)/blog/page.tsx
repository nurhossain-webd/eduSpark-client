import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock3,
  UserRound,
} from "lucide-react";

import Container from "@/components/ui/Container";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readingTime: string;
  image: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "learn-typescript-effectively",
    title: "How to Learn TypeScript Effectively as a Beginner",
    excerpt:
      "Understand the most important TypeScript concepts and follow a practical learning path without becoming overwhelmed.",
    category: "Web Development",
    author: "Sarah Anderson",
    date: "July 10, 2026",
    readingTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "build-strong-portfolio",
    title: "Five Ways to Build a Strong Developer Portfolio",
    excerpt:
      "Create a professional portfolio that demonstrates your skills through meaningful projects, clear case studies, and clean presentation.",
    category: "Career",
    author: "Michael Chen",
    date: "July 7, 2026",
    readingTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "ui-design-principles",
    title: "Essential UI Design Principles for Modern Websites",
    excerpt:
      "Improve usability and visual consistency by applying hierarchy, spacing, contrast, alignment, and responsive design principles.",
    category: "UI/UX Design",
    author: "Emma Wilson",
    date: "July 3, 2026",
    readingTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "consistent-online-learning",
    title: "How to Stay Consistent While Learning Online",
    excerpt:
      "Use realistic goals, focused study sessions, progress tracking, and active practice to maintain a sustainable learning routine.",
    category: "Learning Tips",
    author: "Aisha Rahman",
    date: "June 28, 2026",
    readingTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "data-science-roadmap",
    title: "A Practical Data Science Roadmap for Beginners",
    excerpt:
      "Explore a structured path covering Python, statistics, data analysis, visualization, machine learning, and portfolio projects.",
    category: "Data Science",
    author: "Daniel Carter",
    date: "June 23, 2026",
    readingTime: "9 min read",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "cybersecurity-habits",
    title: "Simple Cybersecurity Habits Every Student Should Follow",
    excerpt:
      "Protect your accounts and devices by using secure passwords, multifactor authentication, updates, and safe browsing habits.",
    category: "Cyber Security",
    author: "David Miller",
    date: "June 18, 2026",
    readingTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=80",
  },
];

export default function BlogPage() {
  const featuredPost =
    blogPosts.find((post: BlogPost) => post.featured) ??
    blogPosts[0];

  const remainingPosts = blogPosts.filter(
    (post: BlogPost) => post.id !== featuredPost.id,
  );

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Compact introduction */}
      <section className="border-b border-slate-200 bg-white py-10">
        <Container>
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-blue-600">
              <BookOpen size={18} />

              <p className="text-sm font-semibold uppercase tracking-wider">
                EduSpark Blog
              </p>
            </div>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Practical ideas for learning and career growth
            </h1>

            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Explore useful articles about technology, design, career
              preparation, online learning, and professional development.
            </p>
          </div>
        </Container>
      </section>

      {/* Featured article */}
      <section className="py-10">
        <Container>
          <article className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
            <div className="relative min-h-72 lg:min-h-[430px]">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  Featured
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {featuredPost.category}
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-bold leading-tight text-slate-900">
                {featuredPost.title}
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                {featuredPost.excerpt}
              </p>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-500">
                <span className="flex items-center gap-2">
                  <UserRound size={16} />
                  {featuredPost.author}
                </span>

                <span className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  {featuredPost.date}
                </span>

                <span className="flex items-center gap-2">
                  <Clock3 size={16} />
                  {featuredPost.readingTime}
                </span>
              </div>

              <Link
                href={`/blog/${featuredPost.id}`}
                className="mt-7 inline-flex w-fit items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Read article
                <ArrowRight size={18} />
              </Link>
            </div>
          </article>
        </Container>
      </section>

      {/* Article cards */}
      <section className="pb-16">
        <Container>
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-slate-900">
              Latest articles
            </h2>

            <p className="mt-2 text-slate-600">
              New insights and practical resources from EduSpark instructors.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {remainingPosts.map((post: BlogPost) => (
              <article
                key={post.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-52 overflow-hidden bg-slate-200">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm">
                    {post.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={14} />
                      {post.date}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Clock3 size={14} />
                      {post.readingTime}
                    </span>
                  </div>

                  <h3 className="mt-4 line-clamp-2 text-xl font-bold leading-7 text-slate-900">
                    {post.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">
                    {post.excerpt}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="flex items-center gap-2 text-sm text-slate-500">
                      <UserRound size={15} />
                      {post.author}
                    </span>

                    <Link
                      href={`/blog/${post.id}`}
                      aria-label={`Read ${post.title}`}
                      className="inline-flex items-center gap-1 font-semibold text-blue-600 transition hover:text-blue-700"
                    >
                      Read
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 bg-white py-14">
        <Container>
          <div className="flex flex-col gap-6 rounded-3xl bg-slate-900 px-6 py-10 text-white sm:px-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold">
                Turn useful ideas into practical skills
              </h2>

              <p className="mt-3 leading-7 text-slate-300">
                Explore EduSpark courses and continue learning through
                structured lessons and practical projects.
              </p>
            </div>

            <Link
              href="/courses"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Courses
              <ArrowRight size={18} />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
