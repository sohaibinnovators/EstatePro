"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  RECENT_SEARCHES_EVENT,
  getRecentSearches,
  type RecentSearch,
} from "@/lib/recent-searches";
import { buildListingHref } from "@/lib/property-search";

export function RecentSearches() {
  const [searches, setSearches] = useState<RecentSearch[]>([]);

  useEffect(() => {
    function refresh() {
      setSearches(getRecentSearches());
    }
    refresh();
    window.addEventListener(RECENT_SEARCHES_EVENT, refresh);
    window.addEventListener("estatepro:demo-reset", refresh);
    return () => {
      window.removeEventListener(RECENT_SEARCHES_EVENT, refresh);
      window.removeEventListener("estatepro:demo-reset", refresh);
    };
  }, []);

  if (searches.length === 0) return null;

  return (
    <div className="container-ep pb-4 pt-2">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
        Recent searches
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {searches.map((s) => {
          const href = buildListingHref("/properties", {
            city: s.city || "",
            area: s.area || "",
            page: 1,
          });
          return (
            <Link
              key={`${s.label}-${s.searchedAt}`}
              href={href}
              className="rounded-md border border-border bg-white px-3 py-1.5 text-sm text-navy hover:border-gold"
            >
              {s.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
