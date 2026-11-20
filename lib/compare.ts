import { readStorageJson, writeStorageJson } from "./storage";

export const COMPARE_KEY = "estatepro:compare";
export const COMPARE_EVENT = "estatepro:compare-change";
export const MAX_COMPARE = 3;

export function getCompareIds(): string[] {
  const data = readStorageJson<unknown>(COMPARE_KEY, []);
  if (!Array.isArray(data)) return [];
  return [...new Set(data.filter((id): id is string => typeof id === "string"))].slice(
    0,
    MAX_COMPARE,
  );
}

export function setCompareIds(ids: string[]): string[] {
  const unique = [...new Set(ids.filter(Boolean))].slice(0, MAX_COMPARE);
  writeStorageJson(COMPARE_KEY, unique);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(COMPARE_EVENT, { detail: unique }));
  }
  return unique;
}

export function isCompared(id: string, ids = getCompareIds()): boolean {
  return ids.includes(id);
}

export function toggleCompareId(id: string): {
  ids: string[];
  added: boolean;
  rejected?: "full" | "duplicate";
} {
  const current = getCompareIds();
  if (current.includes(id)) {
    return { ids: setCompareIds(current.filter((x) => x !== id)), added: false };
  }
  if (current.length >= MAX_COMPARE) {
    return { ids: current, added: false, rejected: "full" };
  }
  return { ids: setCompareIds([...current, id]), added: true };
}

export function removeCompareId(id: string): string[] {
  return setCompareIds(getCompareIds().filter((x) => x !== id));
}

export function clearCompare(): string[] {
  return setCompareIds([]);
}
