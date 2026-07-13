import {
  BookOpenCheck,
  GraduationCap,
  Star,
  Users,
} from "lucide-react";
import Container from "@/components/ui/Container";

interface Statistic {
  label: string;
  value: string;
  description: string;
  icon: React.ElementType;
}

const statistics: Statistic[] = [
  {
    label: "Active Learners",
    value: "12,000+",
    description: "Students currently developing new skills.",
    icon: Users,
  },
  {
    label: "Professional Courses",
    value: "150+",
    description: "Practical courses across in-demand categories.",
    icon: BookOpenCheck,
  },
  {
    label: "Expert Instructors",
    value: "50+",
    description: "Experienced professionals sharing real knowledge.",
    icon: GraduationCap,
  },
  {
    label: "Learner Satisfaction",
    value: "98%",
    description: "Positive feedback from our learning community.",
    icon: Star,
  },
];

export default function Statistics() {
  return (
    <section className="bg-blue-600 py-20 text-white">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-100">
            Learning Impact
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Growing together through practical education
          </h2>

          <p className="mt-4 leading-7 text-blue-100">
            EduSpark supports learners with accessible courses, experienced
            instructors, and a community focused on continuous growth.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {statistics.map((statistic: Statistic) => {
            const Icon = statistic.icon;

            return (
              <article
                key={statistic.label}
                className="h-full rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/15"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-600">
                  <Icon size={24} />
                </div>

                <p className="mt-5 text-4xl font-bold">
                  {statistic.value}
                </p>

                <h3 className="mt-2 text-lg font-semibold">
                  {statistic.label}
                </h3>

                <p className="mt-3 text-sm leading-6 text-blue-100">
                  {statistic.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}