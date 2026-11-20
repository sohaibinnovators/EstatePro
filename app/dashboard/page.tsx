"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useFavorites } from "@/components/favorites/FavoritesProvider";
import { useCatalog } from "@/components/catalog/CatalogProvider";
import { getInquiries } from "@/lib/inquiries";
import {
  RECENT_VIEWS_EVENT,
  getRecentViews,
  type RecentView,
} from "@/lib/recently-viewed";
import { getNotifications } from "@/lib/notifications";
import { relativeTime } from "@/lib/storage";
import type { InquiryRecord, PropertyType, UserProperty } from "@/lib/types";
import {
  formatPrice,
  propertyTypeLabel,
  statusLabel,
} from "@/lib/utils";

export default function DashboardOverviewPage() {
  const { userProperties, catalog, ready: catalogReady } = useCatalog();
  const { count: savedCount, ids: savedIds, ready: favReady } =
    useFavorites();
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [views, setViews] = useState<RecentView[]>([]);
  const [activity, setActivity] = useState(
    () => [] as ReturnType<typeof getNotifications>,
  );

  useEffect(() => {
    const hydrate = window.setTimeout(() => {
      setInquiries(getInquiries());
      setViews(getRecentViews());
      setActivity(getNotifications().slice(0, 6));
    }, 0);

    function onViews() {
      setViews(getRecentViews());
    }
    function onInquiries() {
      setInquiries(getInquiries());
    }
    function onNotes() {
      setActivity(getNotifications().slice(0, 6));
    }
    function onReset() {
      onViews();
      onInquiries();
      onNotes();
    }

    window.addEventListener(RECENT_VIEWS_EVENT, onViews);
    window.addEventListener("estatepro:inquiries-change", onInquiries);
    window.addEventListener("estatepro:notifications-change", onNotes);
    window.addEventListener("estatepro:demo-reset", onReset);
    return () => {
      window.clearTimeout(hydrate);
      window.removeEventListener(RECENT_VIEWS_EVENT, onViews);
      window.removeEventListener("estatepro:inquiries-change", onInquiries);
      window.removeEventListener("estatepro:notifications-change", onNotes);
      window.removeEventListener("estatepro:demo-reset", onReset);
    };
  }, []);

  const stats = useMemo(() => {
    const total = userProperties.length;
    const active = userProperties.filter((p) => p.listingStatus === "active")
      .length;
    const pending = userProperties.filter((p) => p.listingStatus === "pending")
      .length;
    const drafts = userProperties.filter((p) => p.listingStatus === "draft")
      .length;
    return { total, active, pending, drafts };
  }, [userProperties]);

  const statusBars = useMemo(() => {
    const rows = [
      { label: "Active", value: stats.active },
      { label: "Pending", value: stats.pending },
      { label: "Draft", value: stats.drafts },
    ];
    const max = Math.max(...rows.map((r) => r.value), 1);
    return rows.map((r) => ({ ...r, pct: (r.value / max) * 100 }));
  }, [stats]);

  const typeBars = useMemo(() => {
    const counts: Record<PropertyType, number> = {
      house: 0,
      apartment: 0,
      plot: 0,
      commercial: 0,
    };
    for (const p of userProperties) counts[p.type] += 1;
    const rows = (
      Object.entries(counts) as [PropertyType, number][]
    ).map(([type, value]) => ({
      label: propertyTypeLabel(type),
      value,
    }));
    const max = Math.max(...rows.map((r) => r.value), 1);
    return rows.map((r) => ({ ...r, pct: (r.value / max) * 100 }));
  }, [userProperties]);

  const recentProperties = useMemo(
    () =>
      [...userProperties]
        .sort(
          (a, b) =>
            new Date(b.updatedAt || b.listedDate).getTime() -
            new Date(a.updatedAt || a.listedDate).getTime(),
        )
        .slice(0, 4),
    [userProperties],
  );

  const recentInquiries = useMemo(
    () =>
      [...inquiries]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime(),
        )
        .slice(0, 4),
    [inquiries],
  );

  const recentViewedProps = useMemo(() => {
    return views
      .map((v) => {
        const property = catalog.find((p) => p.id === v.id);
        return property ? { property, viewedAt: v.viewedAt } : null;
      })
      .filter(Boolean)
      .slice(0, 4) as {
      property: (typeof catalog)[number];
      viewedAt: string;
    }[];
  }, [views, catalog]);

  const savedPreview = useMemo(() => {
    return savedIds
      .map((id) => catalog.find((p) => p.id === id))
      .filter(Boolean)
      .slice(0, 4);
  }, [savedIds, catalog]);

  const ready = catalogReady && favReady;

  if (!ready) {
    return <p className="text-muted">Loading dashboard…</p>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl font-semibold text-navy">
            Overview
          </h2>
          <p className="mt-1 text-sm text-muted">
            Live counts from this browser&apos;s local demo data.
          </p>
        </div>
        <Button href="/dashboard/properties/new" variant="gold">
          Add New Property
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Stat label="Submitted properties" value={stats.total} />
        <Stat label="Active listings" value={stats.active} />
        <Stat label="Pending listings" value={stats.pending} />
        <Stat label="Saved properties" value={savedCount} />
        <Stat label="Inquiries" value={inquiries.length} />
      </div>

      {stats.total === 0 &&
      inquiries.length === 0 &&
      savedCount === 0 &&
      views.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-white px-6 py-12 text-center">
          <h3 className="font-display text-2xl font-semibold text-navy">
            Welcome to your demo dashboard
          </h3>
          <p className="mx-auto mt-2 max-w-md text-muted">
            Submit a property, save favorites, or receive inquiry demos to see
            activity here.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button href="/dashboard/properties/new" variant="gold">
              Add property
            </Button>
            <Button href="/properties" variant="secondary">
              Browse listings
            </Button>
          </div>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartPanel title="Properties by listing status">
          {stats.total === 0 ? (
            <p className="text-sm text-muted">No submitted properties yet.</p>
          ) : (
            <BarList rows={statusBars} />
          )}
        </ChartPanel>
        <ChartPanel title="Properties by type">
          {stats.total === 0 ? (
            <p className="text-sm text-muted">No type data yet.</p>
          ) : (
            <BarList rows={typeBars} />
          )}
        </ChartPanel>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel
          title="Saved properties"
          empty="No saved properties yet."
          actionHref="/dashboard/saved"
          actionLabel="View saved"
        >
          {savedPreview.map((p) =>
            p ? (
              <div
                key={p.id}
                className="border-b border-border py-3 last:border-0"
              >
                <Link
                  href={`/properties/${p.slug}`}
                  className="font-medium text-navy hover:underline"
                >
                  {p.title}
                </Link>
                <p className="mt-1 text-sm text-muted">
                  {statusLabel(p.status)} · {formatPrice(p.price, p.status)}
                </p>
              </div>
            ) : null,
          )}
        </Panel>

        <Panel
          title="Recently viewed"
          empty="No recently viewed properties yet."
          actionHref="/"
          actionLabel="Browse"
        >
          {recentViewedProps.map(({ property, viewedAt }) => (
            <div
              key={property.id}
              className="border-b border-border py-3 last:border-0"
            >
              <Link
                href={`/properties/${property.slug}`}
                className="font-medium text-navy hover:underline"
              >
                {property.title}
              </Link>
              <p className="mt-1 text-xs text-muted">
                Viewed {relativeTime(viewedAt)}
              </p>
            </div>
          ))}
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel
          title="Recently added properties"
          empty="No submitted properties yet."
          actionHref="/dashboard/properties"
          actionLabel="Manage"
        >
          {recentProperties.map((p) => (
            <PropertyRow key={p.id} property={p} />
          ))}
        </Panel>

        <Panel
          title="Inquiry activity"
          empty="No demo inquiries stored yet."
          actionHref="/dashboard/inquiries"
          actionLabel="View all"
        >
          {recentInquiries.map((inq) => (
            <div
              key={inq.id}
              className="border-b border-border py-3 last:border-0"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-navy">
                    {inq.propertyTitle || inq.agentName || "Inquiry"}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-muted">
                    {inq.message}
                  </p>
                </div>
                <span className="shrink-0 text-xs uppercase tracking-wide text-gold">
                  {inq.status}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted">
                {relativeTime(inq.createdAt)} · {inq.name}
              </p>
            </div>
          ))}
        </Panel>
      </div>

      <Panel
        title="Recent user activity"
        empty="No local activity notifications yet."
        actionHref="/dashboard/notifications"
        actionLabel="Activity center"
      >
        {activity.map((n) => (
          <div
            key={n.id}
            className="border-b border-border py-3 last:border-0"
          >
            <p className="font-medium text-navy">{n.title}</p>
            <p className="mt-1 line-clamp-2 text-sm text-muted">{n.message}</p>
            <p className="mt-1 text-xs text-muted">
              {relativeTime(n.createdAt)}
            </p>
          </div>
        ))}
      </Panel>

      {stats.drafts > 0 ? (
        <p className="text-sm text-muted">
          You also have {stats.drafts} draft listing
          {stats.drafts === 1 ? "" : "s"}.
        </p>
      ) : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-white p-4 shadow-[var(--shadow-sm)]">
      <p className="text-xs font-semibold uppercase tracking-wide text-gold">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl font-semibold text-navy">
        {value}
      </p>
    </div>
  );
}

function ChartPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-white p-5 shadow-[var(--shadow-sm)]">
      <h3 className="font-display text-xl font-semibold text-navy">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function BarList({
  rows,
}: {
  rows: { label: string; value: number; pct: number }[];
}) {
  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.label}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-muted">{row.label}</span>
            <span className="font-medium text-navy">{row.value}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-bg">
            <div
              className="h-full rounded-full bg-gold"
              style={{ width: `${row.pct}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Panel({
  title,
  empty,
  actionHref,
  actionLabel,
  children,
}: {
  title: string;
  empty: string;
  actionHref: string;
  actionLabel: string;
  children: React.ReactNode;
}) {
  const hasChildren = Array.isArray(children)
    ? children.filter(Boolean).length > 0
    : Boolean(children);

  return (
    <section className="rounded-xl border border-border bg-white p-5 shadow-[var(--shadow-sm)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-navy">{title}</h3>
        <Link
          href={actionHref}
          className="text-sm font-medium text-navy underline-offset-4 hover:underline"
        >
          {actionLabel}
        </Link>
      </div>
      {hasChildren ? children : <p className="text-sm text-muted">{empty}</p>}
    </section>
  );
}

function PropertyRow({ property }: { property: UserProperty }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border py-3 last:border-0">
      <div>
        <Link
          href={`/dashboard/properties/${property.id}/edit`}
          className="font-medium text-navy hover:underline"
        >
          {property.title}
        </Link>
        <p className="mt-1 text-sm text-muted">
          {statusLabel(property.status)} · {propertyTypeLabel(property.type)} ·{" "}
          {formatPrice(property.price, property.status)}
        </p>
      </div>
      <span className="shrink-0 text-xs uppercase tracking-wide text-gold">
        {property.listingStatus}
      </span>
    </div>
  );
}
