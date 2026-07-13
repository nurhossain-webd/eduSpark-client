import {
  Award,
  Clock3,
  Infinity,
  Laptop2,
  ShieldCheck,
  Users,
} from "lucide-react";
import Container from "@/components/ui/Container";

interface Benefit {
  title: string;
  description: string;
  icon: React.ElementType;
}

const benefits: Benefit[] = [
  {
    title: "Expert Instructors",
    description:
      "Learn from experienced professionals who explain concepts clearly and share practical industry knowledge.",
    icon: Users,
  },
  {
    title: "Flexible Learning",
    description:
      "Study at your own pace and access your lessons whenever it fits your personal schedule.",
    icon: Clock3,
  },
  {
    title: "Practical Projects",
    description:
      "Build real-world projects that strengthen your skills and improve your professional portfolio.",
    icon: Laptop2,
  },
  {
    title: "Lifetime Access",
    description:
      "Return to your purchased courses anytime and continue learning without unnecessary time limits.",
    icon: Infinity,
  },
  {
    title: "Verified Certificates",
    description:
      "Receive course completion certificates that demonstrate your learning achievements and commitment.",
    icon: Award,
  },
  {
    title: "Secure Platform",
    description:
      "Your account and learning information are protected using secure and reliable platform practices.",
    icon: ShieldCheck,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Why EduSpark
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              A better way to learn practical skills
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-slate-600">
              EduSpark combines flexible learning, experienced instructors, and
              career-focused content to help learners build useful skills with
              confidence.
            </p>

            <div className="mt-8 rounded-2xl bg-slate-900 p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-300">
                Our Learning Promise
              </p>

              <h3 className="mt-3 text-2xl font-bold">
                Learn clearly. Practice confidently. Grow continuously.
              </h3>

              <p className="mt-4 leading-7 text-slate-300">
                Every EduSpark course is designed to help learners understand
                concepts, apply their knowledge, and make measurable progress.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {benefits.map((benefit: Benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.title}
                  className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-white hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}