import Navbar from "@/components/layout/Navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({
  children,
}: Readonly<MainLayoutProps>) {
  return (
    <>
      <Navbar />

      <main>{children}</main>
    </>
  );
}