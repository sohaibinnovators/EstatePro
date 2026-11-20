"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";
import { cn } from "@/lib/utils";

export function SharePropertyButton({
  slug,
  title,
  className,
}: {
  slug: string;
  title: string;
  className?: string;
}) {
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);

  async function getUrl() {
    return `${window.location.origin}/properties/${slug}`;
  }

  async function copyLink() {
    const url = await getUrl();
    try {
      await navigator.clipboard.writeText(url);
      toast("Property link copied.", "success");
      return true;
    } catch {
      try {
        const el = document.createElement("textarea");
        el.value = url;
        el.setAttribute("readonly", "");
        el.style.position = "fixed";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(el);
        if (ok) {
          toast("Property link copied.", "success");
          return true;
        }
      } catch {
        /* fall through */
      }
      toast("Could not copy the link.", "error");
      return false;
    }
  }

  async function onShare() {
    if (busy) return;
    setBusy(true);
    try {
      const url = await getUrl();
      if (typeof navigator.share === "function") {
        try {
          await navigator.share({ title, text: title, url });
          toast("Share sheet opened.", "success");
          return;
        } catch (err) {
          if (err instanceof DOMException && err.name === "AbortError") return;
          // Fall back to copy
        }
      }
      await copyLink();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        type="button"
        disabled={busy}
        onClick={() => void onShare()}
        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-white px-3 text-sm font-medium text-navy shadow-[var(--shadow-sm)] transition hover:border-gold disabled:opacity-60"
      >
        <ShareIcon className="h-4 w-4" />
        Share
      </button>
      <button
        type="button"
        disabled={busy}
        onClick={() => void copyLink()}
        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-white px-3 text-sm font-medium text-navy shadow-[var(--shadow-sm)] transition hover:border-gold disabled:opacity-60"
      >
        Copy link
      </button>
    </div>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
    </svg>
  );
}
