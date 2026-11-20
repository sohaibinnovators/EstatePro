"use client";

import { Suspense, useEffect, useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { Button } from "@/components/ui/Button";
import { IconClose, IconMenu } from "@/components/icons";

function SidebarFallback() {
  return <div className="h-48 animate-pulse rounded-md bg-bg" />;
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="min-h-[calc(100vh-4.5rem)] bg-bg">
      <div className="border-b border-border bg-navy">
        <div className="container-ep flex items-center justify-between py-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Dashboard
            </p>
            <h1 className="mt-1 font-display text-2xl font-semibold text-white md:text-3xl">
              Your EstatePro workspace
            </h1>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="lg:hidden"
            onClick={() => setOpen(true)}
            aria-expanded={open}
          >
            <IconMenu className="h-4 w-4" />
            Menu
          </Button>
        </div>
      </div>

      <div className="container-ep grid gap-8 py-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden rounded-xl border border-border bg-white p-4 shadow-[var(--shadow-sm)] lg:block lg:self-start">
          <Suspense fallback={<SidebarFallback />}>
            <DashboardSidebar />
          </Suspense>
        </aside>
        <div className="min-w-0">
          <Suspense fallback={<p className="text-muted">Loading…</p>}>
            {children}
          </Suspense>
        </div>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[60] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Dashboard menu"
        >
          <button
            type="button"
            className="absolute inset-0 bg-navy/50"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] overflow-y-auto bg-white p-4 shadow-[var(--shadow)]">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display text-xl font-semibold text-navy">
                Dashboard
              </p>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <IconClose className="h-5 w-5" />
              </button>
            </div>
            <Suspense fallback={<SidebarFallback />}>
              <DashboardSidebar onNavigate={() => setOpen(false)} />
            </Suspense>
          </div>
        </div>
      ) : null}
    </div>
  );
}
