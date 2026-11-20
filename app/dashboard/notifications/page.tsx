"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useNotifications } from "@/components/notifications/NotificationsProvider";
import { relativeTime } from "@/lib/storage";
import { cn } from "@/lib/utils";

export default function NotificationsPage() {
  const {
    items,
    ready,
    unread,
    markRead,
    markAllRead,
    remove,
    clearAll,
  } = useNotifications();
  const [confirmClear, setConfirmClear] = useState(false);

  if (!ready) return <p className="text-muted">Loading activity…</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl font-semibold text-navy">
            Activity Center
          </h2>
          <p className="mt-1 text-sm text-muted">
            Local demo notifications stored in this browser — not live messages
            from agents or users.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {unread > 0 ? (
            <Button type="button" variant="secondary" size="sm" onClick={markAllRead}>
              Mark all read
            </Button>
          ) : null}
          {items.length > 0 ? (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setConfirmClear(true)}
            >
              Clear all
            </Button>
          ) : null}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-white px-6 py-14 text-center">
          <h3 className="font-display text-2xl font-semibold text-navy">
            No notifications yet
          </h3>
          <p className="mx-auto mt-2 max-w-md text-muted">
            Submit a listing, save a favorite, or send a demo inquiry to see
            activity here.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((n) => (
            <li
              key={n.id}
              className={cn(
                "rounded-xl border border-border bg-white p-4 shadow-[var(--shadow-sm)]",
                !n.read && "border-gold/40 bg-gold/5",
              )}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-medium text-navy">{n.title}</p>
                  <p className="mt-1 text-sm text-muted">{n.message}</p>
                  <p className="mt-2 text-xs text-muted">
                    {relativeTime(n.createdAt)} ·{" "}
                    {n.read ? "Read" : "Unread"}
                  </p>
                  {n.href ? (
                    <Link
                      href={n.href}
                      className="mt-2 inline-block text-sm font-medium text-navy underline-offset-2 hover:underline"
                      onClick={() => markRead(n.id)}
                    >
                      Open related page
                    </Link>
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-2">
                  {!n.read ? (
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => markRead(n.id)}
                    >
                      Mark read
                    </Button>
                  ) : null}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(n.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        open={confirmClear}
        title="Clear all notifications?"
        description="This permanently removes every local demo notification stored in this browser."
        confirmLabel="Clear all"
        danger
        onCancel={() => setConfirmClear(false)}
        onConfirm={() => {
          clearAll();
          setConfirmClear(false);
        }}
      />
    </div>
  );
}
