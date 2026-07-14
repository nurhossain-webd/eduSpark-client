"use client";

import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  useEffect,
  useState,
} from "react";

interface DashboardAuthGuardProps {
  children: ReactNode;
}

export default function DashboardAuthGuard({
  children,
}: DashboardAuthGuardProps) {
  const router = useRouter();

  const [isCheckingAuth, setIsCheckingAuth] =
    useState<boolean>(true);

  const [isAuthenticated, setIsAuthenticated] =
    useState<boolean>(false);

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
      JSON.parse(storedUser);

      setIsAuthenticated(true);
      setIsCheckingAuth(false);
    } catch (error) {
      console.error("Invalid stored user data:", error);

      localStorage.removeItem("eduspark_access_token");
      localStorage.removeItem("eduspark_user");

      router.replace("/login");
    }
  }, [router]);

  if (isCheckingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <LoaderCircle
            size={38}
            className="mx-auto animate-spin text-blue-600"
          />

          <p className="mt-4 font-semibold text-slate-700">
            Checking your account...
          </p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}