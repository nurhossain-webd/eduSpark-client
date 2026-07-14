"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  GraduationCap,
  Home,
  LayoutDashboard,
  Menu,
  PlusCircle,
  X,
} from "lucide-react";
import { useState } from "react";

interface DashboardLink {
  label: string;
  href: string;
  icon: React.ElementType;
}

const dashboardLinks: DashboardLink[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Add Course",
    href: "/dashboard/add-course",
    icon: PlusCircle,
  },
  {
    label: "Manage Courses",
    href: "/dashboard/manage-courses",
    icon: BookOpen,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState<boolean>(false);

  function closeMobileMenu(): void {
    setIsMobileMenuOpen(false);
  }

  return (
    <>
      {/* Mobile header */}
      <header className="sticky top-0 z-40 flex min-h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={closeMobileMenu}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
            <GraduationCap size={21} />
          </span>

          <span className="text-xl font-bold text-slate-900">
            Edu<span className="text-blue-600">Spark</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={() =>
            setIsMobileMenuOpen((currentValue) => !currentValue)
          }
          aria-label={
            isMobileMenuOpen
              ? "Close dashboard menu"
              : "Open dashboard menu"
          }
          aria-expanded={isMobileMenuOpen}
          className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100"
        >
          {isMobileMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </header>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <button
          type="button"
          aria-label="Close dashboard navigation"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-slate-900 text-white transition-transform duration-300 lg:translate-x-0 ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="flex min-h-20 items-center justify-between border-b border-white/10 px-6">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-3"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
              <GraduationCap size={25} />
            </span>

            <span className="text-2xl font-bold">
              Edu<span className="text-blue-400">Spark</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={closeMobileMenu}
            aria-label="Close dashboard menu"
            className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        <div className="border-b border-white/10 px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Management Panel
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Manage EduSpark courses and platform content.
          </p>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {dashboardLinks.map((item: DashboardLink) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={`flex min-h-12 items-center gap-3 rounded-xl px-4 text-sm font-semibold transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex min-h-12 items-center gap-3 rounded-xl px-4 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <Home size={20} />
            Back to Website
          </Link>
        </div>
      </aside>
    </>
  );
}