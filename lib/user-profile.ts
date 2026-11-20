import type { UserProfile } from "./types";
import { readStorageJson, writeStorageJson } from "./storage";

export const USER_PROFILE_KEY = "estatepro:user-profile";
export const USER_PROFILE_EVENT = "estatepro:user-profile-change";

export const DEFAULT_PROFILE: UserProfile = {
  displayName: "Demo User",
  email: "demo@estatepro.com",
  phone: "",
  avatarDataUrl: "",
  updatedAt: "",
};

export function getUserProfile(): UserProfile {
  const data = readStorageJson<unknown>(USER_PROFILE_KEY, null);
  if (!data || typeof data !== "object") return { ...DEFAULT_PROFILE };
  const p = data as Partial<UserProfile>;
  return {
    displayName:
      typeof p.displayName === "string" && p.displayName.trim()
        ? p.displayName.trim()
        : DEFAULT_PROFILE.displayName,
    email:
      typeof p.email === "string" && p.email.trim()
        ? p.email.trim()
        : DEFAULT_PROFILE.email,
    phone: typeof p.phone === "string" ? p.phone : "",
    avatarDataUrl:
      typeof p.avatarDataUrl === "string" ? p.avatarDataUrl : "",
    updatedAt: typeof p.updatedAt === "string" ? p.updatedAt : "",
  };
}

export function saveUserProfile(
  patch: Partial<Omit<UserProfile, "updatedAt">>,
): UserProfile {
  const next: UserProfile = {
    ...getUserProfile(),
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  writeStorageJson(USER_PROFILE_KEY, next);
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(USER_PROFILE_EVENT, { detail: next }),
    );
  }
  return next;
}

export function resetUserProfile(): UserProfile {
  const next = { ...DEFAULT_PROFILE, updatedAt: new Date().toISOString() };
  writeStorageJson(USER_PROFILE_KEY, next);
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(USER_PROFILE_EVENT, { detail: next }),
    );
  }
  return next;
}
