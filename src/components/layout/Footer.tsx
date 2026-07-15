import Link from "next/link";
import {
  BookOpen,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import Container from "@/components/ui/Container";

interface FooterLink {
  label: string;
  href: string;
}

const learningLinks: FooterLink[] = [
  {
    label: "All Courses",
    href: "/courses",
  },
  {
    label: "My Courses",
    href: "/my-courses",
  },
  {
    label: "Web Development",
    href: "/courses?category=Web%20Development",
  },
  {
    label: "Data Science",
    href: "/courses?category=Data%20Science",
  },
  {
    label: "UI/UX Design",
    href: "/courses?category=UI%2FUX%20Design",
  },
];

const companyLinks: FooterLink[] = [
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Help & Support",
    href: "/support",
  },
];

const legalLinks: FooterLink[] = [
  {
    label: "Privacy Policy",
    href: "/privacy",
  },
  {
    label: "Terms & Conditions",
    href: "/terms",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <BookOpen size={23} />
              </span>

              <span className="text-2xl font-bold text-white">
                Edu
                <span className="text-blue-400">
                  Spark
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-md leading-7 text-slate-400">
              EduSpark helps learners build practical, career-focused
              skills through structured courses, experienced instructors,
              and meaningful learning experiences.
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <a
                href="mailto:support@eduspark.com"
                className="flex w-fit items-center gap-3 transition hover:text-blue-400"
              >
                <Mail size={17} />
                support@eduspark.com
              </a>

              <a
                href="tel:+8801322901105"
                className="flex w-fit items-center gap-3 transition hover:text-blue-400"
              >
                <Phone size={17} />
                +880 1322-901105
              </a>

              <div className="flex items-start gap-3 text-slate-400">
                <MapPin
                  size={17}
                  className="mt-1 shrink-0"
                />

                <span>
                  Mirpur DOHS, Dhaka, Bangladesh
                </span>
              </div>
            </div>

            <div className="mt-7 flex items-center gap-3">
              <a
                href="https://github.com/nurhossain-webd"
                target="_blank"
                rel="noreferrer"
                aria-label="EduSpark on GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                <FaGithub size={19} />
              </a>

              <a
                href="https://www.linkedin.com/in/hossain-riyad"
                target="_blank"
                rel="noreferrer"
                aria-label="EduSpark on LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                <FaLinkedin size={19} />
              </a>

              <a
                href="mailto:support@eduspark.com"
                aria-label="Email EduSpark"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                <Mail size={19} />
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Learning
            </h2>

            <nav className="mt-5 flex flex-col gap-3">
              {learningLinks.map((link: FooterLink) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit text-sm text-slate-400 transition hover:text-blue-400"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h2>

            <nav className="mt-5 flex flex-col gap-3">
              {companyLinks.map((link: FooterLink) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit text-sm text-slate-400 transition hover:text-blue-400"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Legal
            </h2>

            <nav className="mt-5 flex flex-col gap-3">
              {legalLinks.map((link: FooterLink) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit text-sm text-slate-400 transition hover:text-blue-400"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-sm font-semibold text-white">
                Need help?
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Visit our support page for account, enrollment, and
                course assistance.
              </p>

              <Link
                href="/support"
                className="mt-4 inline-flex text-sm font-semibold text-blue-400 transition hover:text-blue-300"
              >
                Open Support
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-800 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} EduSpark. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link
              href="/privacy"
              className="transition hover:text-blue-400"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-blue-400"
            >
              Terms
            </Link>

            <Link
              href="/support"
              className="transition hover:text-blue-400"
            >
              Support
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}