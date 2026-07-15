import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  BookOpenCheck,
  FileText,
  Gavel,
  Mail,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

import Container from "@/components/ui/Container";

interface TermsSection {
  title: string;
  description: string;
  points: string[];
  icon: React.ElementType;
}

const termsSections: TermsSection[] = [
  {
    title: "Account responsibilities",
    description:
      "Users are responsible for providing accurate information and protecting access to their EduSpark account.",
    icon: UserCheck,
    points: [
      "Provide accurate registration information",
      "Keep your password and login details confidential",
      "Do not share access tokens or account credentials",
      "Notify EduSpark if you suspect unauthorized account access",
      "Use only one account for your own learning activities",
    ],
  },
  {
    title: "Acceptable use",
    description:
      "EduSpark must be used responsibly and only for lawful educational purposes.",
    icon: ShieldCheck,
    points: [
      "Do not attempt to damage, disrupt, or overload the platform",
      "Do not access another user’s account or private information",
      "Do not submit harmful, abusive, or misleading content",
      "Do not use automated tools to misuse platform services",
      "Do not copy or redistribute protected course materials without permission",
    ],
  },
  {
    title: "Course enrollment and access",
    description:
      "Course enrollment provides access to learning information available through EduSpark.",
    icon: BookOpenCheck,
    points: [
      "Users must sign in before enrolling in a course",
      "Enrolled courses appear on the My Courses page",
      "Users may leave a course from their learning dashboard",
      "Course availability and content may change when necessary",
      "Enrollment does not transfer ownership of course materials",
    ],
  },
  {
    title: "Reviews and user content",
    description:
      "Users may submit course reviews when they are enrolled in the relevant course.",
    icon: FileText,
    points: [
      "Reviews should describe genuine learning experiences",
      "Reviews must not contain abusive or unlawful content",
      "Users may submit only one review per course",
      "EduSpark may remove content that violates these terms",
      "Submitted reviews may be displayed publicly with the user’s name",
    ],
  },
  {
    title: "Administrator access",
    description:
      "Course management features are available only to users with administrator authorization.",
    icon: Gavel,
    points: [
      "Administrators may create, update, and delete courses",
      "Administrator access must not be shared",
      "Unauthorized management attempts may be blocked",
      "Administrative actions may affect public course information",
      "Role permissions are verified through secure backend APIs",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white py-12">
        <Container>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to Home
          </Link>

          <div className="mx-auto mt-8 max-w-3xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <FileText size={29} />
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Terms and Conditions
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Rules for using EduSpark
            </h1>

            <p className="mt-5 leading-7 text-slate-600">
              These terms explain the responsibilities, permissions, and
              conditions that apply when using the EduSpark learning platform.
            </p>

            <p className="mt-4 text-sm text-slate-500">
              Last updated: July 2026
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="mx-auto max-w-4xl space-y-6">
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <AlertTriangle size={23} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Agreement to these terms
                  </h2>

                  <p className="mt-4 leading-8 text-slate-600">
                    By creating an account, enrolling in courses, submitting
                    reviews, or using EduSpark services, you agree to follow
                    these terms and all applicable laws.
                  </p>
                </div>
              </div>
            </article>

            {termsSections.map((section: TermsSection) => {
              const Icon = section.icon;

              return (
                <article
                  key={section.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                      <Icon size={23} />
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">
                        {section.title}
                      </h2>

                      <p className="mt-3 leading-7 text-slate-600">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {section.points.map((point: string) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 rounded-xl bg-slate-50 p-4"
                      >
                        <ShieldCheck
                          size={18}
                          className="mt-0.5 shrink-0 text-blue-600"
                        />

                        <span className="text-sm leading-6 text-slate-700">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Service availability and changes
              </h2>

              <p className="mt-4 leading-8 text-slate-600">
                EduSpark may update features, modify course information, perform
                maintenance, or temporarily restrict access when necessary to
                protect or improve the platform.
              </p>

              <p className="mt-4 leading-8 text-slate-600">
                These terms may also be updated when the platform changes.
                Continued use of EduSpark after an update means that you accept
                the revised terms.
              </p>
            </article>

            <article className="rounded-3xl bg-slate-900 p-7 text-white md:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                <Mail size={23} />
              </div>

              <h2 className="mt-6 text-2xl font-bold">
                Questions about these terms
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                Contact EduSpark when you need clarification about account use,
                course access, reviews, administrator permissions, or any other
                part of these terms.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:legal@eduspark.com"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700"
                >
                  legal@eduspark.com
                </a>

                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-6 font-semibold text-white transition hover:bg-white/10"
                >
                  Contact Page
                </Link>
              </div>
            </article>
          </div>
        </Container>
      </section>
    </main>
  );
}