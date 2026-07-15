import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CircleHelp,
  Mail,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";

import Container from "@/components/ui/Container";

interface SupportOption {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  linkText: string;
}

const supportOptions: SupportOption[] = [
  {
    title: "Course Support",
    description:
      "Get help with course access, enrollment, lessons, and learning progress.",
    icon: BookOpen,
    href: "/courses",
    linkText: "Browse Courses",
  },
  {
    title: "Account Support",
    description:
      "Find help with registration, login, account access, and authentication.",
    icon: ShieldCheck,
    href: "/login",
    linkText: "Go to Login",
  },
  {
    title: "General Questions",
    description:
      "Contact the EduSpark team for general questions, feedback, or assistance.",
    icon: MessageSquareText,
    href: "/contact",
    linkText: "Contact Us",
  },
];

const frequentlyAskedQuestions = [
  {
    question: "How do I enroll in a course?",
    answer:
      "Open a course details page, sign in to your account, and click the Enroll Now button.",
  },
  {
    question: "Where can I find my enrolled courses?",
    answer:
      "After logging in, select My Courses from the navigation menu to view all your enrolled courses.",
  },
  {
    question: "Can I leave an enrolled course?",
    answer:
      "Yes. Open the My Courses page and use the Leave button on the course you no longer want to continue.",
  },
  {
    question: "Why can I not access the admin dashboard?",
    answer:
      "The course-management dashboard is available only to accounts with the administrator role.",
  },
];

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white py-12">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <CircleHelp size={28} />
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Help and Support
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              How can we help you?
            </h1>

            <p className="mt-5 leading-7 text-slate-600">
              Find answers to common questions or contact the EduSpark team for
              additional assistance.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {supportOptions.map((option: SupportOption) => {
              const Icon = option.icon;

              return (
                <article
                  key={option.title}
                  className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <Icon size={24} />
                  </div>

                  <h2 className="mt-5 text-xl font-bold text-slate-900">
                    {option.title}
                  </h2>

                  <p className="mt-3 flex-1 leading-7 text-slate-600">
                    {option.description}
                  </p>

                  <Link
                    href={option.href}
                    className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700"
                  >
                    {option.linkText}
                    <ArrowRight size={17} />
                  </Link>
                </article>
              );
            })}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_360px]">
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Common Questions
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Frequently asked questions
              </h2>

              <div className="mt-7 space-y-4">
                {frequentlyAskedQuestions.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <summary className="cursor-pointer list-none font-semibold text-slate-900">
                      <span className="flex items-center justify-between gap-4">
                        {item.question}

                        <span className="text-xl text-blue-600 transition group-open:rotate-45">
                          +
                        </span>
                      </span>
                    </summary>

                    <p className="mt-4 border-t border-slate-200 pt-4 leading-7 text-slate-600">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </article>

            <aside className="rounded-3xl bg-slate-900 p-7 text-white">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                <Mail size={23} />
              </div>

              <h2 className="mt-6 text-2xl font-bold">
                Still need assistance?
              </h2>

              <p className="mt-4 leading-7 text-slate-300">
                Send your question through our contact page, and the EduSpark
                support team will help you.
              </p>

              <Link
                href="/contact"
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 font-semibold text-white transition hover:bg-blue-700"
              >
                Contact Support
                <ArrowRight size={18} />
              </Link>

              <div className="mt-7 border-t border-white/10 pt-6">
                <p className="text-sm text-slate-400">Support email</p>

                <a
                  href="mailto:support@eduspark.com"
                  className="mt-2 inline-block font-semibold text-white transition hover:text-blue-300"
                >
                  support@eduspark.com
                </a>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
