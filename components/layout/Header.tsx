"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { IconClose, IconHeart, IconMenu } from "@/components/icons";
import { useFavorites } from "@/components/favorites/FavoritesProvider";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { useCompare } from "@/components/compare/CompareProvider";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/buy", label: "Buy" },
  { href: "/rent", label: "Rent" },
  { href: "/properties", label: "Properties" },
  { href: "/compare", label: "Compare" },
  { href: "/saved", label: "Saved" },
  { href: "/agents", label: "Agents" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const { count, ready } = useFavorites();
  const { count: compareCount, ready: compareReady } = useCompare();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => setOpen(false), 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-border/80 bg-white/95 shadow-[var(--shadow-sm)] backdrop-blur-md"
          : "border-transparent bg-white",
      )}
    >
      <div className="container-ep flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Logo />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-2.5 py-2 text-sm font-medium transition-colors xl:px-3",
                  active ? "text-navy" : "text-muted hover:text-navy",
                )}
              >
                {link.label}
                {link.href === "/saved" && ready && count > 0 ? (
                  <span className="ml-1 text-xs text-gold">({count})</span>
                ) : null}
                {link.href === "/compare" && compareReady && compareCount > 0 ? (
                  <span className="ml-1 text-xs text-gold">({compareCount})</span>
                ) : null}
                {active ? (
                  <span className="mt-1 block h-0.5 rounded-full bg-gold" />
                ) : (
                  <span className="mt-1 block h-0.5" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <NotificationBell />
          <Link
            href="/saved"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-md text-navy transition hover:bg-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label={`Saved properties${ready && count ? `, ${count} saved` : ""}`}
          >
            <IconHeart className="h-5 w-5" filled={ready && count > 0} />
            {ready && count > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-navy">
                {count}
              </span>
            ) : null}
          </Link>
          <Button href="/dashboard" variant="ghost" size="sm">
            Dashboard
          </Button>
          <Button
            href="/list-property"
            variant="gold"
            size="sm"
            className="hidden xl:inline-flex"
          >
            List Your Property
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <IconClose className="h-6 w-6" />
          ) : (
            <IconMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      {open ? (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-white lg:hidden">
          <nav
            className="container-ep flex flex-col gap-1 py-4"
            aria-label="Mobile"
          >
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-3 text-base font-medium",
                    active ? "bg-bg text-navy" : "text-muted",
                  )}
                >
                  {link.label}
                  {link.href === "/saved" && ready && count > 0
                    ? ` (${count})`
                    : ""}
                  {link.href === "/compare" &&
                  compareReady &&
                  compareCount > 0
                    ? ` (${compareCount})`
                    : ""}
                </Link>
              );
            })}
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
              <Button href="/dashboard/notifications" variant="secondary">
                Activity center
              </Button>
              <Button href="/dashboard" variant="secondary">
                Dashboard
              </Button>
              <Button href="/login" variant="secondary">
                Login
              </Button>
              <Button href="/signup" variant="secondary">
                Sign Up
              </Button>
              <Button href="/list-property" variant="gold">
                List Your Property
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
