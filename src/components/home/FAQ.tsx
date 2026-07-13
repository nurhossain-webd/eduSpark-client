"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Container from "@/components/ui/Container";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How do I start learning on EduSpark?",
    answer:
      "Create an account, browse the available courses, choose the course that matches your goals, and begin learning at your own pace.",
  },
  {
    question: "Can I access my courses from mobile devices?",
    answer:
      "Yes. EduSpark is fully responsive, so you can access your courses from mobile phones, tablets, laptops, and desktop computers.",
  },
  {
    question: "Do I receive a certificate after completing a course?",
    answer:
      "Yes. Learners receive a course completion certificate after finishing the required lessons and course activities.",
  },
  {
    question: "Can I learn at my own pace?",
    answer:
      "Yes. EduSpark courses are designed for flexible learning, so you can study according to your own schedule.",
  },
  {
    question: "Are the instructors experienced professionals?",
    answer:
      "Yes. EduSpark instructors are selected based on their professional experience, practical knowledge, and ability to explain concepts clearly.",
  },
  {
    question: "Can I become an instructor on EduSpark?",
    answer:
      "Yes. Registered users can submit courses for review and manage the courses they have created through the protected dashboard.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggleItem(index: number): void {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? null : index,
    );
  }

  return (
    <section className="bg-white py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Frequently Asked Questions
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Everything you need to know before you start
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-slate-600">
              Find answers to common questions about learning, course access,
              certificates, instructors, and the EduSpark platform.
            </p>

            <div className="mt-8 rounded-2xl bg-slate-900 p-6 text-white">
              <h3 className="text-xl font-bold">
                Still have questions?
              </h3>

              <p className="mt-3 leading-7 text-slate-300">
                Visit our support page or contact the EduSpark team for
                additional help.
              </p>

              <a
                href="/support"
                className="mt-5 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Visit Support
              </a>
            </div>
          </div>

          <div className="space-y-4">
            {faqItems.map((item: FAQItem, index: number) => {
              const isOpen = openIndex === index;

              return (
                <article
                  key={item.question}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                  >
                    <span className="text-base font-semibold text-slate-900 md:text-lg">
                      {item.question}
                    </span>

                    <ChevronDown
                      size={21}
                      className={`shrink-0 text-blue-600 transition duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-200 px-6 py-5">
                      <p className="leading-7 text-slate-600">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}