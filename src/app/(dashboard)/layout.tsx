import Link from "next/link";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dashboard Header */}
      <header className="bg-primary border-b border-muted/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-primary-foreground">Slate360</Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-muted-foreground hover:text-primary-foreground">
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
