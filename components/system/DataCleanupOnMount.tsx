"use client";

import { useEffect } from "react";
import { pruneStalePropertyReferences } from "@/lib/data-cleanup";
import { USER_PROPERTIES_EVENT } from "@/lib/user-properties";

/** Prunes stale favorites/compare/views/inquiries when the catalog changes. */
export function DataCleanupOnMount() {
  useEffect(() => {
    pruneStalePropertyReferences();
    function onChange() {
      pruneStalePropertyReferences();
    }
    window.addEventListener(USER_PROPERTIES_EVENT, onChange);
    window.addEventListener("estatepro:demo-reset", onChange);
    return () => {
      window.removeEventListener(USER_PROPERTIES_EVENT, onChange);
      window.removeEventListener("estatepro:demo-reset", onChange);
    };
  }, []);

  return null;
}
