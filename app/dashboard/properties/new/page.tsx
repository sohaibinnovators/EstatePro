import type { Metadata } from "next";
import { PropertySubmissionForm } from "@/components/properties/PropertySubmissionForm";

export const metadata: Metadata = {
  title: "Add New Property",
};

export default function NewPropertyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl font-semibold text-navy">
          Add New Property
        </h2>
        <p className="mt-1 text-sm text-muted">
          Multi-step demo submission with local preview and browser storage.
        </p>
      </div>
      <PropertySubmissionForm />
    </div>
  );
}
