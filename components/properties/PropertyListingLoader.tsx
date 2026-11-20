import { Suspense } from "react";
import type { Property, PropertyStatus } from "@/lib/types";
import { PropertyListing } from "./PropertyListing";

export function PropertyListingLoader({
  properties,
  lockedStatus = "all",
  showStatusFilter = true,
  title,
  description,
}: {
  properties: Property[];
  lockedStatus?: PropertyStatus | "all";
  showStatusFilter?: boolean;
  title: string;
  description: string;
}) {
  return (
    <Suspense
      fallback={
        <div className="container-ep py-24 text-center text-muted">
          Loading listings…
        </div>
      }
    >
      <PropertyListing
        properties={properties}
        lockedStatus={lockedStatus}
        showStatusFilter={showStatusFilter}
        title={title}
        description={description}
      />
    </Suspense>
  );
}
