"use client";

import { LoaderCircle, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  useEffect,
  useState,
} from "react";

interface DashboardAuthGuardProps {
  children: ReactNode;
}

interface AuthUser {
  id: string;
  name: string;
  email: string;
  image: string;
  role: "user" | "admin";
}

type AccessStatus =
  | "checking"
  | "allowed"
  | "forbidden";

export default function DashboardAuthGuard({
  children,
}: DashboardAuthGuardProps) {
  const router = useRouter();

  const [accessStatus, setAccessStatus] =
    useState<AccessStatus>("checking");

  useEffect(() => {
    const accessToken = localStorage.getItem(
      "eduspark_access_token",
    );

    const storedUser = localStorage.getItem(
      "eduspark_user",
    );

    if (!accessToken || !storedUser) {
      localStorage.removeItem("eduspark_access_token");
      localStorage.removeItem("eduspark_user");

      router.replace("/login");
      return;
    }

    try {
      const user: AuthUser = JSON.parse(storedUser);

      if (user.role !== "admin") {
        setAccessStatus("forbidden");
        return;
      }

      setAccessStatus("allowed");
    } catch (error) {
      console.error("Invalid stored user data:", error);

      localStorage.removeItem("eduspark_access_token");
      localStorage.removeItem("eduspark_user");

      router.replace("/login");
    }
  }, [router]);

  if (accessStatus === "checking") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <LoaderCircle
            size={40}
            className="mx-auto animate-spin text-blue-600"
          />

          <p className="mt-4 font-semibold text-slate-700">
            Checking administrator access...
          </p>
        </div>
      </main>
    );
  }

  if (accessStatus === "forbidden") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <ShieldAlert size={32} />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-red-600">
            Access Denied
          </p>

          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            Administrator access required
          </h1>

          <p className="mt-4 leading-7 text-slate-600">
            Your account can browse EduSpark courses, but it does
            not have permission to access the course management
            dashboard.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <Link
              href="/courses"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-5 font-semibold text-white transition hover:bg-blue-700"
            >
              Browse Courses
            </Link>

            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 px-5 font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}