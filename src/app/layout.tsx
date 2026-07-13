import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "EduSpark | Learn Today, Lead Tomorrow",
    template: "%s | EduSpark",
  },
  description:
    "Discover practical online courses taught by experienced instructors and build skills for your future.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}