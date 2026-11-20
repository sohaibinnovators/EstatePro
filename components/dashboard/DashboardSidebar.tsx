"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Overview", exact: true },
  { href: "/dashboard/properties", label: "My Properties" },
  { href: "/dashboard/properties/new", label: "Add New Property" },
  { href: "/dashboard/saved", label: "Saved Properties" },
  { href: "/dashboard/inquiries", label: "My Inquiries" },
  { href: "/dashboard/notifications", label: "Activity Center" },
  { href: "/dashboard/settings", label: "Settings" },
];

export function DashboardSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1" aria-label="Dashboard">
      {links.map((link) => {
        const active = link.exact
          ? pathname === link.href
          : pathname === link.href || pathname.startsWith(`${link.href}/`);
        // Avoid "My Properties" matching "/dashboard/properties/new"
        const isActive =
          link.href === "/dashboard/properties"
            ? pathname === "/dashboard/properties" ||
              (pathname.startsWith("/dashboard/properties/") &&
                !pathname.startsWith("/dashboard/properties/new"))
            : active;

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={cn(
              "block rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-navy text-white"
                : "text-muted hover:bg-bg hover:text-navy",
            )}
          >
            {link.label}
          </Link>
        );
      })}
      <Link
        href="/"
        onClick={onNavigate}
        className="mt-4 block rounded-md px-3 py-2.5 text-sm font-medium text-gold hover:bg-bg"
      >
        ← Back to site
      </Link>
    </nav>
  );
}
