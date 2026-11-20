"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import {
  DEFAULT_PROFILE,
  getUserProfile,
  resetUserProfile,
  saveUserProfile,
} from "@/lib/user-profile";
import { DEMO_RESET_KEYS, resetAllDemoLocalData } from "@/lib/demo-reset";
import type { UserProfile } from "@/lib/types";

export default function DashboardSettingsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmDemoReset, setConfirmDemoReset] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const id = window.setTimeout(() => setProfile(getUserProfile()), 0);
    return () => window.clearTimeout(id);
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!profile.displayName.trim()) next.displayName = "Display name is required.";
    if (
      !profile.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)
    ) {
      next.email = "Enter a valid email.";
    }
    setErrors(next);
    if (Object.keys(next).length) {
      setMessage("");
      return;
    }
    const saved = saveUserProfile({
      displayName: profile.displayName.trim(),
      email: profile.email.trim(),
      phone: profile.phone.trim(),
      avatarDataUrl: profile.avatarDataUrl,
    });
    setProfile(saved);
    setMessage("Demo profile saved locally in this browser.");
  }

  async function onAvatar(file: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((e) => ({ ...e, avatar: "Choose an image file." }));
      return;
    }
    if (file.size > 1.5 * 1024 * 1024) {
      setErrors((e) => ({ ...e, avatar: "Keep avatar under 1.5MB." }));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setProfile((p) => ({
        ...p,
        avatarDataUrl: String(reader.result || ""),
      }));
      setErrors((e) => ({ ...e, avatar: "" }));
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl font-semibold text-navy">
          Settings
        </h2>
        <p className="mt-1 text-sm text-muted">
          Demo profile only — no authentication, passwords, or account
          registration.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        noValidate
        className="max-w-xl space-y-4 rounded-xl border border-border bg-white p-6 shadow-[var(--shadow-sm)]"
      >
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border border-border bg-bg">
            {profile.avatarDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatarDataUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-muted">
                No photo
              </div>
            )}
          </div>
          <div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                void onAvatar(e.target.files?.[0] || null);
                e.target.value = "";
              }}
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => fileRef.current?.click()}
            >
              Upload preview
            </Button>
            {profile.avatarDataUrl ? (
              <button
                type="button"
                className="ml-3 text-sm text-muted underline-offset-2 hover:underline"
                onClick={() =>
                  setProfile((p) => ({ ...p, avatarDataUrl: "" }))
                }
              >
                Remove
              </button>
            ) : null}
            {errors.avatar ? (
              <p className="mt-1 text-xs text-red-600">{errors.avatar}</p>
            ) : null}
          </div>
        </div>

        <Input
          label="Display name"
          value={profile.displayName}
          onChange={(e) =>
            setProfile((p) => ({ ...p, displayName: e.target.value }))
          }
          error={errors.displayName}
          required
        />
        <Input
          label="Email"
          type="email"
          value={profile.email}
          onChange={(e) =>
            setProfile((p) => ({ ...p, email: e.target.value }))
          }
          error={errors.email}
          required
        />
        <Input
          label="Phone (optional)"
          type="tel"
          value={profile.phone}
          onChange={(e) =>
            setProfile((p) => ({ ...p, phone: e.target.value }))
          }
        />

        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="submit" variant="gold">
            Save profile
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setConfirmReset(true)}
          >
            Reset demo profile
          </Button>
        </div>
        {message ? <p className="text-sm text-navy-muted">{message}</p> : null}
      </form>

      <section className="max-w-xl rounded-xl border border-border bg-white p-6 shadow-[var(--shadow-sm)]">
        <h3 className="font-display text-2xl font-semibold text-navy">
          Reset demo data
        </h3>
        <p className="mt-2 text-sm text-muted">
          Clears locally stored demo activity in this browser. Sample catalog
          properties and agents are never modified.
        </p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted">
          <li>Submitted properties and drafts</li>
          <li>Demo profile</li>
          <li>Favorites / saved properties</li>
          <li>Comparison selections</li>
          <li>Recently viewed history</li>
          <li>Recent searches</li>
          <li>Inquiries</li>
          <li>Local activity notifications</li>
        </ul>
        <p className="mt-3 text-xs text-muted">
          Storage keys: {DEMO_RESET_KEYS.join(", ")}
        </p>
        <Button
          type="button"
          variant="primary"
          className="mt-5 bg-red-700 hover:bg-red-800"
          onClick={() => setConfirmDemoReset(true)}
        >
          Reset all demo local data
        </Button>
      </section>

      <ConfirmDialog
        open={confirmReset}
        title="Reset demo profile?"
        description="This restores the default demo name and email in local storage."
        confirmLabel="Reset"
        onCancel={() => setConfirmReset(false)}
        onConfirm={() => {
          setProfile(resetUserProfile());
          setMessage("Demo profile reset.");
          setConfirmReset(false);
        }}
      />

      <ConfirmDialog
        open={confirmDemoReset}
        title="Reset all demo local data?"
        description="This permanently removes submitted listings, drafts, favorites, comparisons, recently viewed items, recent searches, inquiries, notifications, and the demo profile from this browser. Built-in sample properties and agents are kept."
        confirmLabel="Reset everything"
        danger
        onCancel={() => setConfirmDemoReset(false)}
        onConfirm={() => {
          resetAllDemoLocalData();
          setProfile(DEFAULT_PROFILE);
          setConfirmDemoReset(false);
          setMessage("All demo local data was reset.");
          router.refresh();
        }}
      />
    </div>
  );
}
