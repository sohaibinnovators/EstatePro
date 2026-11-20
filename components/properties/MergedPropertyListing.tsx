"use client";

import { useMemo } from "react";
import type { PropertyStatus } from "@/lib/types";
import { useCatalog } from "@/components/catalog/CatalogProvider";
import { PropertyListing } from "./PropertyListing";

export function MergedPropertyListing({
  lockedStatus = "all",
  showStatusFilter = true,
  title,
  description,
}: {
  lockedStatus?: PropertyStatus | "all";
  showStatusFilter?: boolean;
  title: string;
  description: string;
}) {
  const { catalog, ready } = useCatalog();

  const properties = useMemo(() => {
    if (lockedStatus === "all") return catalog;
    return catalog.filter((p) => p.status === lockedStatus);
  }, [catalog, lockedStatus]);

  if (!ready) {
    return (
      <div className="container-ep py-24 text-center text-muted">
        Loading listings…
      </div>
    );
  }

  return (
    <PropertyListing
      properties={properties}
      lockedStatus={lockedStatus}
      showStatusFilter={showStatusFilter}
      title={title}
      description={description}
    />
  );
}
