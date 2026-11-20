"use client";

import { useEffect } from "react";
import { recordPropertyView } from "@/lib/recently-viewed";

/** Records a valid property detail view in localStorage. */
export function TrackPropertyView({ propertyId }: { propertyId: string }) {
  useEffect(() => {
    if (!propertyId) return;
    recordPropertyView(propertyId);
  }, [propertyId]);

  return null;
}
