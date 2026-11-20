import { readStorageJson, writeStorageJson } from "./storage";

export const RECENT_SEARCHES_KEY = "estatepro:recent-searches";
export const RECENT_SEARCHES_EVENT = "estatepro:recent-searches-change";
export const MAX_RECENT_SEARCHES = 8;

export type RecentSearch = {
  label: string;
  city?: string;
  area?: string;
  searchedAt: string;
};

export function getRecentSearches(): RecentSearch[] {
  const data = readStorageJson<unknown>(RECENT_SEARCHES_KEY, []);
  if (!Array.isArray(data)) return [];
  return data
    .filter(
      (item): item is RecentSearch =>
        !!item &&
        typeof item === "object" &&
        typeof (item as RecentSearch).label === "string",
    )
    .slice(0, MAX_RECENT_SEARCHES);
}

export function recordRecentSearch(input: {
  city?: string;
  area?: string;
}): RecentSearch[] {
  const city = input.city?.trim() || "";
  const area = input.area?.trim() || "";
  if (!city && !area) return getRecentSearches();

  const label = area || city;
  const rest = getRecentSearches().filter(
    (s) => s.label.toLowerCase() !== label.toLowerCase(),
  );
  const next = [
    {
      label,
      city: city || undefined,
      area: area || undefined,
      searchedAt: new Date().toISOString(),
    },
    ...rest,
  ].slice(0, MAX_RECENT_SEARCHES);

  writeStorageJson(RECENT_SEARCHES_KEY, next);
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(RECENT_SEARCHES_EVENT, { detail: next }),
    );
  }
  return next;
}

export function clearRecentSearches(): void {
  writeStorageJson(RECENT_SEARCHES_KEY, []);
}
