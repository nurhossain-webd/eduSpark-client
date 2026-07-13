import Link from "next/link";
import {
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  Palette,
  ShieldCheck,
} from "lucide-react";
import Container from "@/components/ui/Container";

interface Category {
  title: string;
  description: string;
  courseCount: number;
  href: string;
  icon: React.ElementType;
}

const categories: Category[] = [
  {
    title: "Web Development",
    description:
      "Learn modern frontend, backend, and full-stack development skills.",
    courseCount: 24,
    href: "/courses?category=Web%20Development",
    icon: Code2,
  },
  {
    title: "UI/UX Design",
    description:
      "Create user-friendly interfaces and meaningful digital experiences.",
    courseCount: 16,
    href: "/courses?category=UI%2FUX%20Design",
    icon: Palette,
  },
  {
    title: "Data Science",
    description:
      "Work with data, analytics, visualization, and machine learning.",
    courseCount: 18,
    href: "/courses?category=Data%20Science",
    icon: Database,
  },
  {
    title: "Cyber Security",
    description:
      "Understand digital security, ethical hacking, and risk protection.",
    courseCount: 12,
    href: "/courses?category=Cyber%20Security",
    icon: ShieldCheck,
  },
  {
    title: "Artificial Intelligence",
    description:
      "Explore AI concepts, automation, and intelligent applications.",
    courseCount: 14,
    href: "/courses?category=Artificial%20Intelligence",
    icon: BrainCircuit,
  },
  {
    title: "Business Skills",
    description:
      "Improve leadership, communication, productivity, and career skills.",
    courseCount: 20,
    href: "/courses?category=Business%20Skills",
    icon: BriefcaseBusiness,
  },
];

export default function Categories() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Explore Categories
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Find the right path for your goals
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Choose from practical learning categories designed to help you build
            valuable skills and move forward with confidence.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category: Category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                href={category.href}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Icon size={24} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {category.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                  {category.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-sm font-semibold text-slate-500">
                    {category.courseCount} courses
                  </span>

                  <span className="text-sm font-semibold text-blue-600">
                    Explore
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}