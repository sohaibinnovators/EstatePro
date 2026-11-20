import type { Metadata } from "next";
import { SignupForm } from "@/components/forms/SignupForm";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your EstatePro account.",
};

export default function SignupPage() {
  return (
    <div className="container-ep flex justify-center py-14 md:py-20">
      <div className="w-full max-w-md rounded-xl border border-border bg-white p-6 shadow-[var(--shadow)] md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          EstatePro
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-navy">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-muted">
          Join EstatePro. Registration is UI-only in Phase 1.
        </p>
        <div className="mt-8">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
