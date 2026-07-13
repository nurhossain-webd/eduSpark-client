import Link from "next/link";
import Container from "@/components/ui/Container";
import { Code2, Mail, MessageCircle, Users } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              Edu<span className="text-blue-500">Spark</span>
            </h2>

            <p className="mt-4 text-sm leading-7">
              Learn practical skills from industry experts and build your future
              with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/courses"
                  className="hover:text-blue-400 transition"
                >
                  Courses
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-blue-400 transition">
                  About
                </Link>
              </li>

              <li>
                <Link href="/blog" className="hover:text-blue-400 transition">
                  Blog
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-400 transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Support</h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/support"
                  className="hover:text-blue-400 transition"
                >
                  Help Center
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="hover:text-blue-400 transition"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="hover:text-blue-400 transition"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact</h3>

            <p className="text-sm">support@eduspark.com</p>

            <p className="mt-2 text-sm">+880 1700 000000</p>

            <div className="mt-5 flex gap-4">
              <Link
                href="https://github.com/YOUR_USERNAME"
                target="_blank"
                className="transition hover:text-blue-400"
              >
                <Code2 size={20} />
              </Link>

              <Link
                href="https://linkedin.com/in/YOUR_PROFILE"
                target="_blank"
                className="transition hover:text-blue-400"
              >
                <Users size={20} />
              </Link>

              <Link
                href="/contact"
                className="transition hover:text-blue-400"
              >
                <MessageCircle size={20} />
              </Link>

              <a
                href="mailto:support@eduspark.com"
                className="transition hover:text-blue-400"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 py-6 text-center text-sm">
          © {new Date().getFullYear()} EduSpark. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}