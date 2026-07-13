export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Instructor {
  name: string;
  designation: string;
  avatar: string;
}

export interface CourseReview {
  id: string;
  studentName: string;
  studentImage: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Course {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  level: CourseLevel;
  language: string;
  price: number;
  rating: number;
  totalReviews: number;
  enrolledStudents: number;
  duration: string;
  lessons: number;
  image: string;
  gallery: string[];
  instructor: Instructor;
  curriculum: string[];
  reviews: CourseReview[];
  featured: boolean;
  createdBy?: string;
  createdAt: string;
  updatedAt?: string;
}
