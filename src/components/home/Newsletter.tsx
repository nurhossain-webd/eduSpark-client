"use client";

import { FormEvent, useState } from "react";
import { Mail, Send } from "lucide-react";
import Container from "@/components/ui/Container";

export default function Newsletter() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setMessage("Please enter your email address.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmedEmail)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setMessage("Thank you for subscribing to EduSpark!");
    setEmail("");
  }

  return (
    <section className="bg-slate-50 py-20">
      <Container>
        <div className="overflow-hidden rounded-3xl bg-slate-900 px-6 py-12 text-white shadow-xl sm:px-10 lg:px-16 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                <Mail size={24} />
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-blue-300">
                EduSpark Newsletter
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Get useful learning updates in your inbox
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-slate-300">
                Subscribe to receive course updates, practical learning tips,
                career resources, and important EduSpark announcements.
              </p>
            </div>

            <div>
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl bg-white p-4 shadow-lg sm:p-5"
                noValidate
              >
                <label
                  htmlFor="newsletter-email"
                  className="mb-2 block text-sm font-semibold text-slate-900"
                >
                  Email address
                </label>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setMessage("");
                    }}
                    placeholder="Enter your email address"
                    className="min-h-12 flex-1 rounded-lg border border-slate-300 px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />

                  <button
                    type="submit"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700"
                  >
                    Subscribe
                    <Send size={18} />
                  </button>
                </div>

                {message && (
                  <p
                    className={`mt-3 text-sm ${
                      message.startsWith("Thank")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {message}
                  </p>
                )}

                <p className="mt-4 text-xs leading-5 text-slate-500">
                  By subscribing, you agree to receive learning updates from
                  EduSpark. You can unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}