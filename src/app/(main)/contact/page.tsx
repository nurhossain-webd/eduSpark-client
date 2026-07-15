import Link from "next/link";
import {
  Clock3,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
} from "lucide-react";

import Container from "@/components/ui/Container";

interface ContactMethod {
  title: string;
  value: string;
  description: string;
  href?: string;
  icon: React.ElementType;
}

const contactMethods: ContactMethod[] = [
  {
    title: "Email",
    value: "support@eduspark.com",
    description:
      "Send questions about accounts, courses, enrollment, or technical issues.",
    href: "mailto:support@eduspark.com",
    icon: Mail,
  },
  {
    title: "Phone",
    value: "+880 1322-901105",
    description:
      "Call the support team during normal service hours.",
    href: "tel:+8801322901105",
    icon: Phone,
  },
  {
    title: "Location",
    value: "Mirpur DOHS, Dhaka, Bangladesh",
    description:
      "EduSpark provides online learning services from Bangladesh.",
    icon: MapPin,
  },
  {
    title: "Support Hours",
    value: "Sat–Thu, 10:00 AM–7:00 PM",
    description:
      "Messages received outside support hours will be reviewed later.",
    icon: Clock3,
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white py-12">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <MessageSquareText size={28} />
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Contact EduSpark
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              We are here to help
            </h1>

            <p className="mt-5 leading-7 text-slate-600">
              Contact the EduSpark team for account support, course
              information, enrollment questions, or general feedback.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {contactMethods.map((method: ContactMethod) => {
              const Icon = method.icon;

              const content = (
                <>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <Icon size={23} />
                  </div>

                  <h2 className="mt-5 text-xl font-bold text-slate-900">
                    {method.title}
                  </h2>

                  <p className="mt-2 font-semibold text-blue-600">
                    {method.value}
                  </p>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {method.description}
                  </p>
                </>
              );

              return method.href ? (
                <a
                  key={method.title}
                  href={method.href}
                  className="block h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                >
                  {content}
                </a>
              ) : (
                <article
                  key={method.title}
                  className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  {content}
                </article>
              );
            })}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Send a Message
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Tell us how we can help
              </h2>

              <form
                action="mailto:support@eduspark.com"
                method="POST"
                encType="text/plain"
                className="mt-7 grid gap-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Full name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Enter your full name"
                      className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Email address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="Enter your email address"
                      className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="What do you need help with?"
                    className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    rows={7}
                    placeholder="Describe your question or issue."
                    className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </article>

            <aside className="rounded-3xl bg-slate-900 p-7 text-white">
              <h2 className="text-2xl font-bold">
                Need immediate guidance?
              </h2>

              <p className="mt-4 leading-7 text-slate-300">
                Visit the support page for answers about course enrollment,
                account access, and dashboard permissions.
              </p>

              <Link
                href="/support"
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-5 font-semibold text-white transition hover:bg-blue-700"
              >
                Open Support
              </Link>

              <div className="mt-7 border-t border-white/10 pt-6">
                <p className="text-sm text-slate-400">
                  General support
                </p>

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
