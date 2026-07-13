interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({
  children,
}: Readonly<MainLayoutProps>) {
  return <>{children}</>;
}
