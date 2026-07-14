import { notFound } from "next/navigation";

import EditCourseForm from "@/components/dashboard/EditCourseForm";

interface Course {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  language: string;
  price: number;
  rating: number;
  students: number;
  duration: string;
  lessons: number;
  image: string;
  instructor: string;
  featured: boolean;
}

interface CourseApiResponse {
  success: boolean;
  data?: Course;
}

interface EditCoursePageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getCourse(
  courseId: string,
): Promise<Course | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error("NEXT_PUBLIC_API_URL is not defined.");
    return null;
  }

  try {
    const response = await fetch(
      `${apiUrl}/api/courses/${courseId}`,
      {
        cache: "no-store",
      },
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Failed to retrieve the course.");
    }

    const result: CourseApiResponse = await response.json();

    return result.data ?? null;
  } catch (error) {
    console.error("Edit course fetch error:", error);
    return null;
  }
}

export default async function EditCoursePage({
  params,
}: EditCoursePageProps) {
  const { id } = await params;

  const course = await getCourse(id);

  if (!course) {
    notFound();
  }

  return <EditCourseForm course={course} />;
}