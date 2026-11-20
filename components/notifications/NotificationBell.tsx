"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useNotifications } from "./NotificationsProvider";
import { relativeTime } from "@/lib/storage";
import { cn } from "@/lib/utils";

export function NotificationBell() {
  const router = useRouter();
  const { items, unread, ready, markRead, markAllRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const preview = items.slice(0, 5);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label={`Notifications${ready && unread ? `, ${unread} unread` : ""}`}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-md text-navy transition hover:bg-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        <BellIcon className="h-5 w-5" />
        {ready && unread > 0 ? (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-navy">
            {unread > 9 ? "9+" : unread}
          </span>
        ) : null}
      </button>

      {open ? (
        <div
          className="absolute right-0 z-[70] mt-2 w-[min(100vw-2rem,22rem)] rounded-xl border border-border bg-white shadow-[var(--shadow)]"
          role="dialog"
          aria-label="Activity notifications"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="text-sm font-semibold text-navy">Activity</p>
            {unread > 0 ? (
              <button
                type="button"
                className="text-xs font-medium text-gold hover:underline"
                onClick={() => markAllRead()}
              >
                Mark all read
              </button>
            ) : null}
          </div>
          <p className="border-b border-border bg-bg px-4 py-2 text-[11px] text-muted">
            Local demo notifications only — not real-time messages.
          </p>
          <ul className="max-h-72 overflow-auto">
            {preview.length === 0 ? (
              <li className="px-4 py-8 text-center text-sm text-muted">
                No activity yet.
              </li>
            ) : (
              preview.map((n) => (
                <li key={n.id}>
                  <button
                    type="button"
                    className={cn(
                      "w-full border-b border-border px-4 py-3 text-left last:border-0 hover:bg-bg",
                      !n.read && "bg-gold/5",
                    )}
                    onClick={() => {
                      markRead(n.id);
                      setOpen(false);
                      if (n.href) router.push(n.href);
                    }}
                  >
                    <p className="text-sm font-medium text-navy">{n.title}</p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-muted">
                      {n.message}
                    </p>
                    <p className="mt-1 text-[11px] text-muted">
                      {relativeTime(n.createdAt)}
                    </p>
                  </button>
                </li>
              ))
            )}
          </ul>
          <div className="border-t border-border px-4 py-2">
            <Link
              href="/dashboard/notifications"
              className="text-xs font-medium text-navy underline-offset-2 hover:underline"
              onClick={() => setOpen(false)}
            >
              Open activity center
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path d="M6 9a6 6 0 1 1 12 0c0 7 3 7 3 7H3s3 0 3-7" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  );
}
