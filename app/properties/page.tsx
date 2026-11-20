import type { Metadata } from "next";
import { Suspense } from "react";
import { MergedPropertyListing } from "@/components/properties/MergedPropertyListing";

export const metadata: Metadata = {
  title: "All Properties",
  description:
    "Browse all EstatePro demonstration listings for sale and rent across Lahore, Karachi, and Islamabad.",
};

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="container-ep py-24 text-center text-muted">
          Loading listings…
        </div>
      }
    >
      <MergedPropertyListing
        lockedStatus="all"
        showStatusFilter
        title="All Properties"
        description="Search the full EstatePro demonstration inventory — buy, rent, and every property type across key Pakistan markets."
      />
    </Suspense>
  );
}
