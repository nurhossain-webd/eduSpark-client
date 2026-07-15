"use client";

import {
  CheckCircle2,
  LoaderCircle,
  LogIn,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getAuthHeaders } from "@/lib/auth";

interface Course {
  _id: string;
}

interface Enrollment {
  _id: string;
  course: Course | string;
  progress: number;
  status: "active" | "completed";
}

interface EnrollmentApiResponse {
  success: boolean;
  message?: string;
  data?: Enrollment[];
}

interface CreateEnrollmentApiResponse {
  success: boolean;
  message?: string;
  data?: Enrollment;
}

interface CourseEnrollButtonProps {
  courseId: string;
}

type EnrollmentStatus =
  | "checking"
  | "logged-out"
  | "available"
  | "enrolling"
  | "enrolled"
  | "error";

export default function CourseEnrollButton({
  courseId,
}: CourseEnrollButtonProps) {
  const router = useRouter();

  const [status, setStatus] =
    useState<EnrollmentStatus>("checking");

  const [message, setMessage] = useState<string>("");

  function clearAuthentication(): void {
    localStorage.removeItem("eduspark_access_token");
    localStorage.removeItem("eduspark_user");
  }

  useEffect(() => {
    async function checkEnrollment(): Promise<void> {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const accessToken = localStorage.getItem(
        "eduspark_access_token",
      );

      if (!accessToken) {
        setStatus("logged-out");
        return;
      }

      if (!apiUrl) {
        setStatus("error");
        setMessage("Frontend API URL is not configured.");
        return;
      }

      try {
        const response = await fetch(
          `${apiUrl}/api/enrollments/my`,
          {
            method: "GET",
            headers: getAuthHeaders(),
            cache: "no-store",
          },
        );

        const result: EnrollmentApiResponse =
          await response.json();

        if (response.status === 401) {
          clearAuthentication();
          setStatus("logged-out");
          return;
        }

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Unable to check enrollment status.",
          );
        }

        const enrollments = result.data ?? [];

        const isAlreadyEnrolled = enrollments.some(
          (enrollment: Enrollment) => {
            if (typeof enrollment.course === "string") {
              return enrollment.course === courseId;
            }

            return enrollment.course._id === courseId;
          },
        );

        setStatus(
          isAlreadyEnrolled ? "enrolled" : "available",
        );
      } catch (error) {
        console.error(
          "Enrollment status check failed:",
          error,
        );

        setStatus("error");
        setMessage(
          error instanceof Error
            ? error.message
            : "Unable to check enrollment status.",
        );
      }
    }

    void checkEnrollment();
  }, [courseId]);

  function handleLoginRedirect(): void {
    router.push(
      `/login?redirect=/courses/${courseId}`,
    );
  }

  async function handleEnroll(): Promise<void> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const accessToken = localStorage.getItem(
      "eduspark_access_token",
    );

    if (!accessToken) {
      handleLoginRedirect();
      return;
    }

    if (!apiUrl) {
      setStatus("error");
      setMessage("Frontend API URL is not configured.");
      return;
    }

    setStatus("enrolling");
    setMessage("");

    try {
      const response = await fetch(
        `${apiUrl}/api/enrollments`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            courseId,
          }),
        },
      );

      const result: CreateEnrollmentApiResponse =
        await response.json();

      if (response.status === 401) {
        clearAuthentication();
        router.push(
          `/login?redirect=/courses/${courseId}`,
        );
        return;
      }

      if (response.status === 409) {
        setStatus("enrolled");
        setMessage(
          result.message ||
            "You are already enrolled in this course.",
        );

        return;
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to enroll in this course.",
        );
      }

      setStatus("enrolled");
      setMessage(
        result.message ||
          "You enrolled in this course successfully.",
      );

      router.refresh();
    } catch (error) {
      console.error("Course enrollment failed:", error);

      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to enroll in this course.",
      );
    }
  }

  return (
    <div>
      {status === "checking" && (
        <button
          type="button"
          disabled
          className="inline-flex min-h-12 w-full cursor-wait items-center justify-center gap-2 rounded-xl bg-slate-200 px-5 font-semibold text-slate-600"
        >
          <LoaderCircle
            size={19}
            className="animate-spin"
          />
          Checking Enrollment...
        </button>
      )}

      {status === "logged-out" && (
        <button
          type="button"
          onClick={handleLoginRedirect}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 font-semibold text-white transition hover:bg-blue-700"
        >
          <LogIn size={19} />
          Login to Enroll
        </button>
      )}

      {status === "available" && (
        <button
          type="button"
          onClick={handleEnroll}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-5 font-semibold text-white transition hover:bg-blue-700"
        >
          Enroll Now
        </button>
      )}

      {status === "enrolling" && (
        <button
          type="button"
          disabled
          className="inline-flex min-h-12 w-full cursor-wait items-center justify-center gap-2 rounded-xl bg-blue-400 px-5 font-semibold text-white"
        >
          <LoaderCircle
            size={19}
            className="animate-spin"
          />
          Enrolling...
        </button>
      )}

      {status === "enrolled" && (
        <button
          type="button"
          disabled
          className="inline-flex min-h-12 w-full cursor-default items-center justify-center gap-2 rounded-xl bg-green-600 px-5 font-semibold text-white"
        >
          <CheckCircle2 size={19} />
          Already Enrolled
        </button>
      )}

      {status === "error" && (
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-red-300 bg-red-50 px-5 font-semibold text-red-700 transition hover:bg-red-100"
        >
          Try Again
        </button>
      )}

      {message && (
        <p
          className={`mt-3 text-sm leading-6 ${
            status === "enrolled"
              ? "text-green-700"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}