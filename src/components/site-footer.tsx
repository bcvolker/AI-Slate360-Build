import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  const links = [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/cookies", label: "Cookies" },
    { href: "/security", label: "Security" },
  ];

  return (
    <footer className="border-t border-white/10 bg-black py-16 text-zinc-400">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        <div className="flex flex-col gap-4 max-w-xs">
          <Link href="/" className="flex items-center gap-2">
            <Image 
                src="/slate360newlogo.png" 
                alt="Slate360" 
                width={160} 
                height={45} 
                className="h-10 w-auto object-contain" 
            />
          </Link>
          <p className="text-sm text-zinc-500 leading-relaxed">
            The Operating System for the Physical World. Unifying design, construction, and robotics in one platform.
          </p>
        </div>
        
        <div className="flex flex-col md:items-end gap-4">
          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Slate360 Inc. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
