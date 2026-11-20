import type { Metadata } from "next";
import { SavedPropertiesClient } from "@/components/properties/SavedPropertiesClient";

export const metadata: Metadata = {
  title: "Saved Properties",
  description:
    "View properties you saved on EstatePro. Favorites are stored locally in your browser.",
};

export default function SavedPage() {
  return (
    <div>
      <div className="border-b border-border bg-navy">
        <div className="container-ep py-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Favorites
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-white md:text-5xl">
            Saved Properties
          </h1>
          <p className="mt-3 max-w-2xl text-white/70">
            Your shortlist lives in this browser — no login required for this
            demo phase.
          </p>
        </div>
      </div>
      <SavedPropertiesClient />
    </div>
  );
}
