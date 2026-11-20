"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const explore = [
  { href: "/buy", label: "Buy" },
  { href: "/rent", label: "Rent" },
  { href: "/properties", label: "All Properties" },
  { href: "/compare", label: "Compare Properties" },
  { href: "/saved", label: "Saved Properties" },
  { href: "/agents", label: "Agents" },
  { href: "/list-property", label: "List Your Property" },
  { href: "/dashboard", label: "Dashboard" },
];

const company = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/login", label: "Login" },
  { href: "/signup", label: "Sign Up" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleNewsletter(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }
    setMessage("Thanks — you're on the list. (Demo only)");
    setEmail("");
  }

  return (
    <footer className="mt-auto bg-navy text-white">
      <div className="container-ep grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="lg:col-span-1">
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            Find Your Place. Build Your Future. A frontend demonstration of
            property discovery across Lahore, Karachi, and Islamabad.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5">
            {explore.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-white/70 transition-colors hover:text-white focus-visible:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">
            Company
          </h3>
          <ul className="mt-4 space-y-2.5">
            {company.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-1.5 text-sm text-white/70">
            <p>Demo office · Gulberg III, Lahore</p>
            <p>Coverage: Lahore, Karachi, Islamabad</p>
            <p>
              <a href="tel:+9242111000000" className="hover:text-white">
                +92 42 111 000 000
              </a>
            </p>
            <p>
              <a href="mailto:hello@estatepro.com" className="hover:text-white">
                hello@estatepro.com
              </a>
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">
            Newsletter
          </h3>
          <p className="mt-4 text-sm text-white/70">
            Demo signup only — no email is sent.
          </p>
          <form onSubmit={handleNewsletter} className="mt-4 space-y-3">
            <Input
              type="email"
              name="newsletter"
              placeholder="Your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setMessage("");
              }}
              className="border-white/15 bg-white/5 text-white placeholder:text-white/40 focus:border-gold"
              aria-label="Email for newsletter"
            />
            <Button type="submit" variant="gold" className="w-full">
              Subscribe
            </Button>
            {message ? (
              <p className="text-xs text-gold-soft" role="status">
                {message}
              </p>
            ) : null}
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-ep flex flex-col gap-2 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 EstatePro. All rights reserved.</p>
          <p>Frontend demo — local browser data only.</p>
        </div>
      </div>
    </footer>
  );
}
