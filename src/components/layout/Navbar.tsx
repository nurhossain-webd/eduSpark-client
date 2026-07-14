"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  LayoutDashboard,
  LogOut,
  Menu,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import Container from "@/components/ui/Container";

interface NavItem {
  label: string;
  href: string;
}

interface AuthUser {
  id: string;
  name: string;
  email: string;
  image: string;
  role: "user" | "admin";
}

const publicNavItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Courses",
    href: "/courses",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const authenticatedNavItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Courses",
    href: "/courses",
  },
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Add Course",
    href: "/dashboard/add-course",
  },
  {
    label: "Manage Courses",
    href: "/dashboard/manage-courses",
  },
  {
    label: "About",
    href: "/about",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthChecked, setIsAuthChecked] =
    useState<boolean>(false);

  useEffect(() => {
    function loadStoredUser(): void {
      const accessToken = localStorage.getItem(
        "eduspark_access_token",
      );

      const storedUser = localStorage.getItem(
        "eduspark_user",
      );

      if (!accessToken || !storedUser) {
        setUser(null);
        setIsAuthChecked(true);
        return;
      }

      try {
        const parsedUser: AuthUser = JSON.parse(storedUser);

        setUser(parsedUser);
      } catch (error) {
        console.error("Unable to read stored user:", error);

        localStorage.removeItem("eduspark_access_token");
        localStorage.removeItem("eduspark_user");

        setUser(null);
      } finally {
        setIsAuthChecked(true);
      }
    }

    loadStoredUser();

    window.addEventListener("storage", loadStoredUser);

    return () => {
      window.removeEventListener("storage", loadStoredUser);
    };
  }, [pathname]);

  function closeMenu(): void {
    setIsMenuOpen(false);
  }

  function isActiveRoute(href: string): boolean {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  }

  function handleLogout(): void {
    localStorage.removeItem("eduspark_access_token");
    localStorage.removeItem("eduspark_user");

    setUser(null);
    closeMenu();

    router.push("/");
    router.refresh();
  }

  const navItems = user
    ? authenticatedNavItems
    : publicNavItems;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <Container>
        <nav className="flex min-h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={closeMenu}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Sparkles size={20} />
            </span>

            <span className="text-xl font-bold text-slate-900">
              Edu
              <span className="text-blue-600">
                Spark
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-6 xl:flex">
            {navItems.map((item: NavItem) => {
              const isActive = isActiveRoute(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition ${
                    isActive
                      ? "text-blue-600"
                      : "text-slate-600 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 xl:flex">
            {!isAuthChecked ? (
              <div className="h-10 w-28 animate-pulse rounded-lg bg-slate-100" />
            ) : user ? (
              <>
                <div className="flex items-center gap-3 rounded-xl bg-slate-100 px-3 py-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <UserRound size={17} />
                  </div>

                  <div className="max-w-32">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {user.name}
                    </p>

                    <p className="truncate text-xs capitalize text-slate-500">
                      {user.role}
                    </p>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
                >
                  <LayoutDashboard size={17} />
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() =>
              setIsMenuOpen((currentValue) => !currentValue)
            }
            aria-label={
              isMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 xl:hidden"
          >
            {isMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </nav>

        {isMenuOpen && (
          <div className="border-t border-slate-200 py-4 xl:hidden">
            {user && (
              <div className="mb-4 flex items-center gap-3 rounded-xl bg-slate-100 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <UserRound size={20} />
                </div>

                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-900">
                    {user.name}
                  </p>

                  <p className="truncate text-sm text-slate-500">
                    {user.email}
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1">
              {navItems.map((item: NavItem) => {
                const isActive = isActiveRoute(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 border-t border-slate-200 pt-4">
              {user ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="rounded-lg border border-slate-300 px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={closeMenu}
                    className="rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}