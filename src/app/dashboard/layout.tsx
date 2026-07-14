import DashboardAuthGuard from "@/components/dashboard/DashboardAuthGuard";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: Readonly<DashboardLayoutProps>) {
  return (
    <DashboardAuthGuard>
      <div className="min-h-screen bg-slate-50">
        <DashboardSidebar />

        <div className="lg:pl-72">
          {children}
        </div>
      </div>
    </DashboardAuthGuard>
  );
}