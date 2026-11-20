"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useCatalog } from "@/components/catalog/CatalogProvider";
import {
  deleteUserProperty,
  updateUserListingStatus,
} from "@/lib/user-properties";
import { cleanupAfterPropertyDelete } from "@/lib/data-cleanup";
import { pushNotification } from "@/lib/notifications";
import type { ListingLifecycle, UserProperty } from "@/lib/types";
import { formatPrice, propertyTypeLabel, statusLabel } from "@/lib/utils";

export default function MyPropertiesPage() {
  const { userProperties, ready, refresh } = useCatalog();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (!ready) return <p className="text-muted">Loading properties…</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl font-semibold text-navy">
            My Properties
          </h2>
          <p className="mt-1 text-sm text-muted">
            Manage listings you submitted in this browser. Demo catalog
            properties are never modified here.
          </p>
        </div>
        <Button href="/dashboard/properties/new" variant="gold">
          Add New Property
        </Button>
      </div>

      {userProperties.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-white px-6 py-14 text-center">
          <h3 className="font-display text-2xl font-semibold text-navy">
            No submitted properties
          </h3>
          <p className="mt-2 text-muted">
            Create your first demo listing to manage it here.
          </p>
          <Button href="/dashboard/properties/new" variant="gold" className="mt-5">
            Add property
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {userProperties.map((property) => (
            <PropertyManageCard
              key={property.id}
              property={property}
              onStatus={(status) => {
                const prev = property.listingStatus;
                updateUserListingStatus(property.id, status);
                if (prev !== status) {
                  pushNotification({
                    type: "property_status",
                    title: "Listing status changed",
                    message: `"${property.title}" is now ${status}.`,
                    href: `/dashboard/properties/${property.id}/edit`,
                  });
                }
                refresh();
              }}
              onDelete={() => setDeleteId(property.id)}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete this listing?"
        description="This removes the demo listing from this browser only. It cannot be undone."
        confirmLabel="Delete"
        danger
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            deleteUserProperty(deleteId);
            cleanupAfterPropertyDelete(deleteId);
            refresh();
          }
          setDeleteId(null);
        }}
      />
    </div>
  );
}

function PropertyManageCard({
  property,
  onStatus,
  onDelete,
}: {
  property: UserProperty;
  onStatus: (status: ListingLifecycle) => void;
  onDelete: () => void;
}) {
  return (
    <article className="rounded-xl border border-border bg-white p-5 shadow-[var(--shadow-sm)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-gold/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-navy">
              {property.listingStatus}
            </span>
            <span className="text-xs text-muted">
              Ref EP-{property.id.toUpperCase()}
            </span>
          </div>
          <h3 className="mt-2 font-display text-2xl font-semibold text-navy">
            {property.title}
          </h3>
          <p className="mt-1 text-sm text-muted">
            {statusLabel(property.status)} · {propertyTypeLabel(property.type)} ·{" "}
            {formatPrice(property.price, property.status)}
          </p>
          <p className="mt-1 text-sm text-muted">{property.location}</p>
          {property.imagesAreTemporary ? (
            <p className="mt-2 text-xs text-amber-700">
              Some images could not be fully persisted after refresh.
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button href={`/properties/${property.slug}`} variant="secondary" size="sm">
            Preview
          </Button>
          <Button
            href={`/dashboard/properties/${property.id}/edit`}
            variant="secondary"
            size="sm"
          >
            Edit
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
        <p className="mr-2 text-sm text-muted">Status:</p>
        {(["draft", "pending", "active"] as ListingLifecycle[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onStatus(s)}
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
              property.listingStatus === s
                ? "bg-navy text-white"
                : "border border-border text-muted"
            }`}
          >
            {s}
          </button>
        ))}
        <Link
          href={`/dashboard/properties/${property.id}/edit`}
          className="ml-auto text-sm font-medium text-navy underline-offset-4 hover:underline"
        >
          Update details
        </Link>
      </div>
    </article>
  );
}
