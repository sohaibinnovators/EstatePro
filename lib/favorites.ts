import { readStorageJson, writeStorageJson } from "./storage";

export const FAVORITES_KEY = "estatepro:favorites";
export const FAVORITES_EVENT = "estatepro:favorites-change";

export function getFavoriteIds(): string[] {
  const ids = readStorageJson<unknown>(FAVORITES_KEY, []);
  if (!Array.isArray(ids)) return [];
  return ids.filter((id): id is string => typeof id === "string");
}

export function setFavoriteIds(ids: string[]): string[] {
  const unique = [...new Set(ids.filter(Boolean))];
  writeStorageJson(FAVORITES_KEY, unique);
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(FAVORITES_EVENT, { detail: unique }),
    );
  }
  return unique;
}

export function isFavoriteId(id: string, ids = getFavoriteIds()): boolean {
  return ids.includes(id);
}

export function toggleFavoriteId(id: string): string[] {
  const current = getFavoriteIds();
  const next = current.includes(id)
    ? current.filter((x) => x !== id)
    : [...current, id];
  return setFavoriteIds(next);
}

export function removeFavoriteId(id: string): string[] {
  return setFavoriteIds(getFavoriteIds().filter((x) => x !== id));
}
