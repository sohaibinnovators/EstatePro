import { Suspense } from "react";
import { EditPropertyClient } from "./EditPropertyClient";

export default function EditPropertyPage() {
  return (
    <Suspense fallback={<p className="text-muted">Loading listing…</p>}>
      <EditPropertyClient />
    </Suspense>
  );
}
