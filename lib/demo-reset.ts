import { setFavoriteIds, FAVORITES_KEY } from "./favorites";
import { clearCompare, COMPARE_KEY } from "./compare";
import { clearRecentViews, RECENT_VIEWS_KEY } from "./recently-viewed";
import { clearRecentSearches, RECENT_SEARCHES_KEY } from "./recent-searches";
import { clearNotifications, NOTIFICATIONS_KEY } from "./notifications";
import { INQUIRIES_KEY } from "./inquiries";
import {
  PROPERTY_DRAFT_KEY,
  USER_PROPERTIES_KEY,
} from "./user-properties";
import { USER_PROFILE_KEY } from "./user-profile";
import { removeStorageKey, writeStorageJson } from "./storage";

/** Keys wiped by the dashboard demo reset (sample catalog is never touched). */
export const DEMO_RESET_KEYS = [
  USER_PROPERTIES_KEY,
  PROPERTY_DRAFT_KEY,
  USER_PROFILE_KEY,
  INQUIRIES_KEY,
  FAVORITES_KEY,
  COMPARE_KEY,
  RECENT_VIEWS_KEY,
  RECENT_SEARCHES_KEY,
  NOTIFICATIONS_KEY,
] as const;

export function resetAllDemoLocalData(): void {
  for (const key of DEMO_RESET_KEYS) {
    removeStorageKey(key);
  }
  // Re-emit empty states for live providers
  setFavoriteIds([]);
  clearCompare();
  clearRecentViews();
  clearRecentSearches();
  clearNotifications();
  writeStorageJson(USER_PROPERTIES_KEY, []);
  writeStorageJson(INQUIRIES_KEY, []);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("estatepro:demo-reset"));
    window.dispatchEvent(
      new CustomEvent("estatepro:user-properties-change", { detail: [] }),
    );
    window.dispatchEvent(
      new CustomEvent("estatepro:user-profile-change", { detail: null }),
    );
    window.dispatchEvent(
      new CustomEvent("estatepro:inquiries-change", { detail: [] }),
    );
  }
}
