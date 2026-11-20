import { readStorageJson, writeStorageJson } from "./storage";

export const RECENT_VIEWS_KEY = "estatepro:recently-viewed";
export const RECENT_VIEWS_EVENT = "estatepro:recently-viewed-change";
export const MAX_RECENT_VIEWS = 12;

export type RecentView = { id: string; viewedAt: string };

export function getRecentViews(): RecentView[] {
  const data = readStorageJson<unknown>(RECENT_VIEWS_KEY, []);
  if (!Array.isArray(data)) return [];
  return data
    .filter(
      (item): item is RecentView =>
        !!item &&
        typeof item === "object" &&
        typeof (item as RecentView).id === "string" &&
        typeof (item as RecentView).viewedAt === "string",
    )
    .sort(
      (a, b) =>
        new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime(),
    )
    .slice(0, MAX_RECENT_VIEWS);
}

export function recordPropertyView(id: string): RecentView[] {
  if (!id) return getRecentViews();
  const now = new Date().toISOString();
  const rest = getRecentViews().filter((v) => v.id !== id);
  const next = [{ id, viewedAt: now }, ...rest].slice(0, MAX_RECENT_VIEWS);
  writeStorageJson(RECENT_VIEWS_KEY, next);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(RECENT_VIEWS_EVENT, { detail: next }));
  }
  return next;
}

export function pruneRecentViews(validIds: Set<string>): RecentView[] {
  const next = getRecentViews().filter((v) => validIds.has(v.id));
  writeStorageJson(RECENT_VIEWS_KEY, next);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(RECENT_VIEWS_EVENT, { detail: next }));
  }
  return next;
}

export function clearRecentViews(): void {
  writeStorageJson(RECENT_VIEWS_KEY, []);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(RECENT_VIEWS_EVENT, { detail: [] }));
  }
}
