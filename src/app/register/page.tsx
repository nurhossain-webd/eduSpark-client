"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterErrors {
  name?: string[];
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
}

interface RegisterResponse {
  success: boolean;
  message: string;
  errors?: RegisterErrors;
}

const initialFormData: RegisterFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] =
    useState<RegisterFormData>(initialFormData);

  const [errors, setErrors] = useState<RegisterErrors>({});
  const [serverMessage, setServerMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  function updateField(
    field: keyof RegisterFormData,
    value: string,
  ): void {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));

    setServerMessage("");
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    setIsSubmitting(true);
    setErrors({});
    setServerMessage("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result: RegisterResponse = await response.json();

      if (!response.ok) {
        setErrors(result.errors ?? {});
        setServerMessage(result.message);
        return;
      }

      setFormData(initialFormData);
      setServerMessage(result.message);

      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (error) {
      console.error("Registration request failed:", error);

      setServerMessage(
        "Unable to connect to the server. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left side */}
        <section className="hidden bg-slate-900 px-12 py-16 text-white lg:flex lg:flex-col lg:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
              <GraduationCap size={25} />
            </span>

            <span className="text-2xl font-bold">
              Edu<span className="text-blue-400">Spark</span>
            </span>
          </Link>

          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
              Start Learning Today
            </p>

            <h1 className="mt-5 text-5xl font-bold leading-tight">
              Build practical skills for a brighter future.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Join learners who are developing career-focused skills through
              practical courses, experienced instructors, and flexible
              learning.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-2xl font-bold">150+</p>
                <p className="mt-1 text-sm text-slate-400">Courses</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-2xl font-bold">12K+</p>
                <p className="mt-1 text-sm text-slate-400">Learners</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-2xl font-bold">50+</p>
                <p className="mt-1 text-sm text-slate-400">Instructors</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} EduSpark. All rights reserved.
          </p>
        </section>

        {/* Right side */}
        <section className="flex items-center justify-center px-4 py-12 sm:px-8 lg:px-12">
          <div className="w-full max-w-lg">
            <Link
              href="/"
              className="mb-10 flex items-center gap-2 lg:hidden"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <GraduationCap size={23} />
              </span>

              <span className="text-xl font-bold text-slate-900">
                Edu<span className="text-blue-600">Spark</span>
              </span>
            </Link>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Create Account
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Join EduSpark
              </h2>

              <p className="mt-3 text-slate-600">
                Create your account and start learning practical skills.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full name
                </label>

                <div className="relative">
                  <UserRound
                    size={19}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className="min-h-12 w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {errors.name?.[0] && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.name[0]}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    placeholder="Enter your email address"
                    autoComplete="email"
                    className="min-h-12 w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {errors.email?.[0] && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.email[0]}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(event) =>
                      updateField("password", event.target.value)
                    }
                    placeholder="Create a password"
                    autoComplete="new-password"
                    className="min-h-12 w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((currentValue) => !currentValue)
                    }
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

                {errors.password?.[0] && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password[0]}
                  </p>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Confirm password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(event) =>
                      updateField("confirmPassword", event.target.value)
                    }
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    className="min-h-12 w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (currentValue) => !currentValue,
                      )
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirmed password"
                        : "Show confirmed password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

                {errors.confirmPassword?.[0] && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.confirmPassword[0]}
                  </p>
                )}
              </div>

              {serverMessage && (
                <div
                  className={`rounded-xl border px-4 py-3 text-sm ${
                    serverMessage.includes("successfully")
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  {serverMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {isSubmitting ? "Creating account..." : "Create Account"}

                {!isSubmitting && <ArrowRight size={19} />}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
