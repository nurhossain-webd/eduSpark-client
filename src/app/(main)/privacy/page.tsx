import Link from "next/link";
import {
  ArrowLeft,
  Cookie,
  Database,
  Eye,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

import Container from "@/components/ui/Container";

interface PrivacySection {
  title: string;
  description: string;
  points: string[];
  icon: React.ElementType;
}

const privacySections: PrivacySection[] = [
  {
    title: "Information we collect",
    description:
      "EduSpark collects only the information required to provide account, course, and learning services.",
    icon: Database,
    points: [
      "Your name and email address during registration",
      "Securely hashed account password",
      "Course enrollment and learning-progress information",
      "Course reviews submitted through your account",
      "Basic technical information needed to operate the website",
    ],
  },
  {
    title: "How we use your information",
    description:
      "The information you provide is used to operate and improve the EduSpark learning platform.",
    icon: UserRoundCheck,
    points: [
      "Create and manage your EduSpark account",
      "Authenticate your identity when you sign in",
      "Display your enrolled courses and learning progress",
      "Associate course reviews with your account",
      "Protect the platform against unauthorized access",
    ],
  },
  {
    title: "Data security",
    description:
      "EduSpark applies reasonable technical measures to protect account and application information.",
    icon: LockKeyhole,
    points: [
      "Passwords are stored as secure bcrypt hashes",
      "Protected API requests require JWT authentication",
      "Administrative actions require authorization checks",
      "Secret credentials are stored in environment variables",
      "Database access is restricted through MongoDB configuration",
    ],
  },
  {
    title: "Cookies and browser storage",
    description:
      "EduSpark may use browser storage to maintain your signed-in experience.",
    icon: Cookie,
    points: [
      "Authentication information may be stored in local browser storage",
      "Stored data is removed when you log out",
      "You can clear stored website information through your browser",
      "EduSpark does not use browser storage to sell personal information",
    ],
  },
  {
    title: "Your choices and rights",
    description:
      "You may control certain information connected to your EduSpark account.",
    icon: Eye,
    points: [
      "You may stop using the platform at any time",
      "You may leave courses from the My Courses page",
      "You may request correction or deletion of account information",
      "You may contact EduSpark with privacy-related questions",
    ],
  },
];

export default function PrivacyPage() {
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
              <ShieldCheck size={29} />
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Privacy Policy
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              How EduSpark handles your information
            </h1>

            <p className="mt-5 leading-7 text-slate-600">
              This privacy policy explains what information EduSpark collects,
              how it is used, and the steps taken to protect your account and
              learning data.
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
              <h2 className="text-2xl font-bold text-slate-900">
                Our privacy commitment
              </h2>

              <p className="mt-4 leading-8 text-slate-600">
                EduSpark is an online learning platform designed to help users
                discover courses, manage enrollments, and develop practical
                skills. We aim to collect only the information needed to provide
                these services and to handle that information responsibly.
              </p>
            </article>

            {privacySections.map((section: PrivacySection) => {
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

            <article className="rounded-3xl bg-slate-900 p-7 text-white md:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                <Mail size={23} />
              </div>

              <h2 className="mt-6 text-2xl font-bold">
                Privacy questions
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                Contact the EduSpark team when you have a question about this
                policy, your stored information, or an account-related privacy
                request.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:privacy@eduspark.com"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700"
                >
                  privacy@eduspark.com
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