import { cn } from "@/lib/utils";

interface GlassyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassyCard({ children, className, hoverEffect = false, ...props }: GlassyCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300",
        hoverEffect && "hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-white/5 hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {/* Noise texture overlay for "high-end" feel (optional, can be added via CSS later) */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
