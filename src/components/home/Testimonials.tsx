import Image from "next/image";
import { Quote, Star } from "lucide-react";
import Container from "@/components/ui/Container";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  message: string;
  course: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Aisha Rahman",
    role: "Frontend Developer",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&crop=faces&w=300&h=300&q=80",
    rating: 5,
    message:
      "EduSpark helped me understand modern frontend development in a clear and practical way. The projects gave me confidence to apply for development roles.",
    course: "Full-Stack Web Development",
  },
  {
    id: 2,
    name: "Daniel Carter",
    role: "Data Analyst",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=faces&w=300&h=300&q=80",
    rating: 5,
    message:
      "The lessons were well structured and easy to follow. I especially liked the practical exercises because they helped me apply each concept immediately.",
    course: "Data Science with Python",
  },
  {
    id: 3,
    name: "Sophia Martinez",
    role: "UI/UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&crop=faces&w=300&h=300&q=80",
    rating: 5,
    message:
      "The UI and UX course improved both my design process and portfolio. The instructor explained user research and prototyping with useful real-world examples.",
    course: "UI/UX Design Fundamentals",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-slate-50 py-20">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Student Stories
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            What learners say about EduSpark
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Discover how EduSpark learners are building practical skills,
            improving their confidence, and moving forward in their careers.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial: Testimonial) => (
            <article
              key={testimonial.id}
              className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map(
                    (_, index: number) => (
                      <Star
                        key={index}
                        size={18}
                        className="fill-amber-500 text-amber-500"
                      />
                    ),
                  )}
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Quote size={21} />
                </div>
              </div>

              <blockquote className="mt-6 flex-1 text-base leading-8 text-slate-600">
                “{testimonial.message}”
              </blockquote>

              <div className="mt-6 border-t border-slate-200 pt-5">
                <p className="mb-4 text-sm">
                  <span className="font-semibold text-slate-900">
                    Course:
                  </span>{" "}
                  <span className="text-blue-600">{testimonial.course}</span>
                </p>

                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-slate-200">
                    <Image
                      src={testimonial.image}
                      alt={`${testimonial.name}, ${testimonial.role}`}
                      fill
                      sizes="56px"
                      className="object-cover object-center"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      {testimonial.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}