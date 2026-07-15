"use client";

import Link from "next/link";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { FormEvent, useState } from "react";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string[];
  password?: string[];
}

interface AuthUser {
  id: string;
  name: string;
  email: string;
  image: string;
  role: "user" | "admin";
}

interface LoginApiResponse {
  success: boolean;
  message: string;
  data?: {
    user: AuthUser;
    accessToken: string;
  };
  errors?: LoginErrors;
}

const initialFormData: LoginFormData = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] =
    useState<LoginFormData>(initialFormData);

  const [errors, setErrors] = useState<LoginErrors>({});
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] =
    useState<boolean>(false);

  const [showPassword, setShowPassword] =
    useState<boolean>(false);

  function updateField(
    field: keyof LoginFormData,
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

    setMessage("");
    setIsSuccess(false);
  }

  function fillDemoCredentials(
  accountType: "user" | "admin",
): void {
  if (accountType === "admin") {
    setFormData({
      email: "admin@eduspark.com",
      password: "Admin123!",
    });
  } else {
    setFormData({
      email: "user@eduspark.com",
      password: "User123!",
    });
  }

  setErrors({});
  setMessage("");
  setIsSuccess(false);
}

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      setMessage("Frontend API URL is not configured.");
      setIsSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setMessage("");
    setIsSuccess(false);

    try {
      const response = await fetch(
        `${apiUrl}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const result: LoginApiResponse =
        await response.json();

      if (!response.ok || !result.data) {
        setErrors(result.errors ?? {});
        setMessage(
          result.message || "Unable to sign in.",
        );

        return;
      }

      localStorage.setItem(
        "eduspark_access_token",
        result.data.accessToken,
      );

      localStorage.setItem(
        "eduspark_user",
        JSON.stringify(result.data.user),
      );

      setIsSuccess(true);
      setMessage("Login successful. Redirecting...");

   const requestedRedirect = searchParams.get("redirect");

const safeRedirect =
  requestedRedirect?.startsWith("/") &&
  !requestedRedirect.startsWith("//")
    ? requestedRedirect
    : null;

const destination =
  safeRedirect ??
  (result.data.user.role === "admin"
    ? "/dashboard"
    : "/my-courses");

setTimeout(() => {
  router.push(destination);
  router.refresh();
}, 800);
    } catch (error) {
      console.error("Login request failed:", error);

      setMessage(
        "Unable to connect to the backend. Make sure the Express server is running.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left information panel */}
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
              Welcome Back
            </p>

            <h1 className="mt-5 text-5xl font-bold leading-tight">
              Continue building skills that move you forward.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Sign in to access your dashboard, manage courses,
              and continue your EduSpark learning journey.
            </p>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-300">
                Demo account
              </p>

              <div className="mt-4 space-y-2 text-sm text-slate-300">
                <p>
                  <span className="font-semibold text-white">
                    Email:
                  </span>{" "}
                  user@eduspark.com
                </p>

                <p>
                  <span className="font-semibold text-white">
                    Password:
                  </span>{" "}
                  User123!
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} EduSpark. All rights
            reserved.
          </p>
        </section>

        {/* Login form */}
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

            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Account Login
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Welcome back
            </h2>

            <p className="mt-3 text-slate-600">
              Enter your account details to continue.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
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

              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <Link
                    href="/support"
                    className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                  >
                    Forgot password?
                  </Link>
                </div>

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
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="min-h-12 w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
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

              {message && (
                <div
                  className={`rounded-xl border px-4 py-3 text-sm ${
                    isSuccess
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}

                {!isSubmitting && <ArrowRight size={19} />}
              </button>

             <div className="grid gap-3 sm:grid-cols-2">
  <button
    type="button"
    onClick={() => fillDemoCredentials("user")}
    disabled={isSubmitting}
    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
  >
    Demo User
  </button>

  <button
    type="button"
    onClick={() => fillDemoCredentials("admin")}
    disabled={isSubmitting}
    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 font-semibold text-blue-700 transition hover:border-blue-600 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
  >
    Demo Admin
  </button>
</div>
            </form>

            <p className="mt-7 text-center text-sm text-slate-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
