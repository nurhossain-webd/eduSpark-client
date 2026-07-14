"use client";

import { Filter, RotateCcw, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface CourseFiltersProps {
  search: string;
  category: string;
  level: string;
  sort: string;
}

const categories: string[] = [
  "Web Development",
  "UI/UX Design",
  "Data Science",
  "Cyber Security",
  "Artificial Intelligence",
  "Business Skills",
];

const levels: string[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

const sortOptions = [
  {
    label: "Newest",
    value: "newest",
  },
  {
    label: "Oldest",
    value: "oldest",
  },
  {
    label: "Price: Low to High",
    value: "price-low",
  },
  {
    label: "Price: High to Low",
    value: "price-high",
  },
  {
    label: "Highest Rated",
    value: "rating",
  },
  {
    label: "Most Popular",
    value: "popular",
  },
];

export default function CourseFilters({
  search,
  category,
  level,
  sort,
}: CourseFiltersProps) {
  const hasActiveFilters =
    Boolean(search) ||
    Boolean(category) ||
    Boolean(level) ||
    sort !== "newest";

  const [isOpen, setIsOpen] = useState<boolean>(hasActiveFilters);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-end gap-3">
        {hasActiveFilters && (
          <Link
            href="/courses"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-red-300 hover:text-red-600"
          >
            <RotateCcw size={16} />
            Clear Filters
          </Link>
        )}

        <button
          type="button"
          onClick={() => setIsOpen((currentValue) => !currentValue)}
          aria-expanded={isOpen}
          className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          {isOpen ? <X size={17} /> : <Filter size={17} />}

          {isOpen ? "Close Filters" : "Search & Filters"}
        </button>
      </div>

      {isOpen && (
        <form
          action="/courses"
          method="GET"
          className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1fr_auto]">
            <div>
              <label
                htmlFor="search"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Search
              </label>

              <div className="relative">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="search"
                  name="search"
                  type="search"
                  defaultValue={search}
                  placeholder="Title or instructor"
                  className="min-h-11 w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-11 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                defaultValue={category}
                className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              >
                <option value="">All categories</option>

                {categories.map((categoryItem: string) => (
                  <option key={categoryItem} value={categoryItem}>
                    {categoryItem}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="level"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Level
              </label>

              <select
                id="level"
                name="level"
                defaultValue={level}
                className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              >
                <option value="">All levels</option>

                {levels.map((levelItem: string) => (
                  <option key={levelItem} value={levelItem}>
                    {levelItem}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="sort"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Sort by
              </label>

              <select
                id="sort"
                name="sort"
                defaultValue={sort}
                className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="min-h-11 w-full rounded-xl bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700 xl:w-auto"
              >
                Apply
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}