"use client";

import { SavedPropertiesClient } from "@/components/properties/SavedPropertiesClient";

export default function DashboardSavedPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-3xl font-semibold text-navy">
          Saved Properties
        </h2>
        <p className="mt-1 text-sm text-muted">
          Synced with the public Saved page via the same favorites storage.
        </p>
      </div>
      <SavedPropertiesClient />
    </div>
  );
}
