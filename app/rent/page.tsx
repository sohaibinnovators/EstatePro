import type { Metadata } from "next";
import { Suspense } from "react";
import { MergedPropertyListing } from "@/components/properties/MergedPropertyListing";

export const metadata: Metadata = {
  title: "Rental Properties",
  description:
    "Find apartments and houses for rent in DHA, Bahria Town, Gulberg, Clifton, and F-7.",
};

export default function RentPage() {
  return (
    <Suspense
      fallback={
        <div className="container-ep py-24 text-center text-muted">
          Loading listings…
        </div>
      }
    >
      <MergedPropertyListing
        lockedStatus="rent"
        showStatusFilter={false}
        title="Rental Properties"
        description="Discover demonstration rentals with filters for neighborhood, bedrooms, bathrooms, and monthly budget."
      />
    </Suspense>
  );
}
