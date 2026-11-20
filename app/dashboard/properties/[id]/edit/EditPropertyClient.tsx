"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PropertySubmissionForm } from "@/components/properties/PropertySubmissionForm";
import { Button } from "@/components/ui/Button";
import { getUserPropertyById } from "@/lib/user-properties";
import type { UserProperty } from "@/lib/types";

export function EditPropertyClient() {
  const params = useParams<{ id: string }>();
  const [property, setProperty] = useState<UserProperty | null | undefined>(
    undefined,
  );

  useEffect(() => {
    const id = window.setTimeout(() => {
      setProperty(getUserPropertyById(params.id) ?? null);
    }, 0);
    return () => window.clearTimeout(id);
  }, [params.id]);

  if (property === undefined) {
    return <p className="text-muted">Loading listing…</p>;
  }

  if (!property) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-white px-6 py-14 text-center">
        <h2 className="font-display text-2xl font-semibold text-navy">
          Listing not found
        </h2>
        <p className="mt-2 text-muted">
          This ID is not in your local demo submissions.
        </p>
        <Button href="/dashboard/properties" variant="gold" className="mt-5">
          Back to My Properties
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl font-semibold text-navy">
          Edit property
        </h2>
        <p className="mt-1 text-sm text-muted">
          Updating only your submitted listing — original EstatePro sample data
          stays unchanged.
        </p>
      </div>
      <PropertySubmissionForm existing={property} />
    </div>
  );
}
