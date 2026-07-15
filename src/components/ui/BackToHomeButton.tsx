"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackToHomeButton() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 shadow-sm transition hover:border-blue-600 hover:text-blue-600"
    >
      <ArrowLeft size={18} />
      Back to Home
    </Link>
  );
}