import type { Metadata } from "next";
import Link from "next/link";
import { PropertySubmissionForm } from "@/components/properties/PropertySubmissionForm";

export const metadata: Metadata = {
  title: "List Your Property",
  description:
    "Submit a demonstration property listing to EstatePro. Stored locally in your browser for Phase 4.",
};

export default function ListPropertyPage() {
  return (
    <div>
      <div className="border-b border-border bg-navy">
        <div className="container-ep py-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Sellers & landlords
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-white md:text-5xl">
            List Your Property
          </h1>
          <p className="mt-3 max-w-2xl text-white/70">
            Complete the multi-step demo form, preview your listing, and save it
            locally. Manage submissions anytime in your{" "}
            <Link href="/dashboard" className="text-gold underline-offset-2 hover:underline">
              dashboard
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="container-ep py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <PropertySubmissionForm redirectTo="/dashboard/properties" />
        </div>
      </div>
    </div>
  );
}
