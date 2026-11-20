"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import {
  deleteInquiry,
  getInquiries,
  updateInquiryStatus,
} from "@/lib/inquiries";
import type { InquiryRecord, InquiryStatus } from "@/lib/types";

export default function DashboardInquiriesPage() {
  const [items, setItems] = useState<InquiryRecord[]>([]);
  const [selected, setSelected] = useState<InquiryRecord | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function refresh() {
    setItems(getInquiries());
  }

  useEffect(() => {
    const id = window.setTimeout(() => refresh(), 0);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl font-semibold text-navy">
          My Inquiries
        </h2>
        <p className="mt-1 text-sm text-muted">
          Locally stored demonstration inquiries from Phase 3 forms — not real
          agent messages.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-white px-6 py-14 text-center">
          <h3 className="font-display text-2xl font-semibold text-navy">
            No inquiries yet
          </h3>
          <p className="mt-2 text-muted">
            Submit a property or agent inquiry on a public page to see it here.
          </p>
          <Button href="/properties" variant="gold" className="mt-5">
            Browse properties
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-white shadow-[var(--shadow-sm)]">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border bg-bg text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Property / Agent</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((inq) => (
                <tr key={inq.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 whitespace-nowrap text-muted">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-navy">
                      {inq.propertyTitle || inq.agentName || "Inquiry"}
                    </p>
                    <p className="text-xs text-muted">
                      {inq.propertyRef || inq.type}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-navy">{inq.name}</p>
                    <p className="text-xs text-muted">{inq.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      className="rounded-md border border-border bg-white px-2 py-1 text-xs"
                      value={inq.status}
                      onChange={(e) => {
                        updateInquiryStatus(
                          inq.id,
                          e.target.value as InquiryStatus,
                        );
                        refresh();
                      }}
                    >
                      <option value="new">New</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="text-xs font-semibold text-navy underline-offset-2 hover:underline"
                        onClick={() => setSelected(inq)}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="text-xs font-semibold text-red-700 underline-offset-2 hover:underline"
                        onClick={() => setDeleteId(inq.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-navy/50"
            aria-label="Close"
            onClick={() => setSelected(null)}
          />
          <div className="relative w-full max-w-lg rounded-xl border border-border bg-white p-6 shadow-[var(--shadow)]">
            <h3 className="font-display text-2xl font-semibold text-navy">
              Inquiry details
            </h3>
            <dl className="mt-4 space-y-2 text-sm">
              <Row label="Date" value={new Date(selected.createdAt).toLocaleString()} />
              <Row label="Name" value={selected.name} />
              <Row label="Email" value={selected.email} />
              <Row label="Phone" value={selected.phone || "—"} />
              <Row label="Reference" value={selected.propertyRef || "—"} />
              <Row
                label="Property"
                value={selected.propertyTitle || "—"}
              />
              <Row label="Status" value={selected.status} />
            </dl>
            <p className="mt-4 rounded-md bg-bg p-3 text-sm text-muted">
              {selected.message}
            </p>
            <p className="mt-3 text-xs text-muted">
              Demo record stored in localStorage only.
            </p>
            <Button
              type="button"
              variant="secondary"
              className="mt-5"
              onClick={() => setSelected(null)}
            >
              Close
            </Button>
          </div>
        </div>
      ) : null}

      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete inquiry?"
        description="This removes the demo inquiry from local storage."
        confirmLabel="Delete"
        danger
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            deleteInquiry(deleteId);
            refresh();
            if (selected?.id === deleteId) setSelected(null);
          }
          setDeleteId(null);
        }}
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border py-1.5">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium text-navy">{value}</dd>
    </div>
  );
}
