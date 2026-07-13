import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <p className="text-sm font-semibold text-blue-600">404</p>

        <h1 className="mt-2 text-4xl font-bold text-slate-900">
          Page not found
        </h1>

        <p className="mt-4 text-slate-600">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
