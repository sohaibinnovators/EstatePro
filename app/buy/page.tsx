import type { Metadata } from "next";
import { Suspense } from "react";
import { MergedPropertyListing } from "@/components/properties/MergedPropertyListing";

export const metadata: Metadata = {
  title: "Buy Properties",
  description:
    "Browse houses, apartments, plots, and commercial properties for sale across Lahore, Karachi, and Islamabad.",
};

export default function BuyPage() {
  return (
    <Suspense
      fallback={
        <div className="container-ep py-24 text-center text-muted">
          Loading listings…
        </div>
      }
    >
      <MergedPropertyListing
        lockedStatus="sale"
        showStatusFilter={false}
        title="Buy Properties"
        description="Explore demonstration homes and plots for sale — filter by city, area, type, and budget in PKR."
      />
    </Suspense>
  );
}
