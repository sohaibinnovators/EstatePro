import { readStorageJson, writeStorageJson } from "./storage";

export const NOTIFICATIONS_KEY = "estatepro:notifications";
export const NOTIFICATIONS_EVENT = "estatepro:notifications-change";
export const MAX_NOTIFICATIONS = 40;

export type NotificationType =
  | "property_submitted"
  | "property_updated"
  | "property_status"
  | "inquiry"
  | "favorite_added"
  | "favorite_removed"
  | "compare"
  | "system";

export type AppNotification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  href?: string;
};

function createId(): string {
  return `ntf_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function emit(list: AppNotification[]) {
  writeStorageJson(NOTIFICATIONS_KEY, list);
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(NOTIFICATIONS_EVENT, { detail: list }),
    );
  }
  return list;
}

function normalize(item: unknown): AppNotification | null {
  if (!item || typeof item !== "object") return null;
  const n = item as Partial<AppNotification>;
  if (typeof n.id !== "string" || typeof n.title !== "string") return null;
  return {
    id: n.id,
    type: (n.type as NotificationType) || "system",
    title: n.title,
    message: typeof n.message === "string" ? n.message : "",
    createdAt:
      typeof n.createdAt === "string" ? n.createdAt : new Date().toISOString(),
    read: Boolean(n.read),
    href: typeof n.href === "string" ? n.href : undefined,
  };
}

export function getNotifications(): AppNotification[] {
  const data = readStorageJson<unknown>(NOTIFICATIONS_KEY, []);
  if (!Array.isArray(data)) return [];
  return data
    .map(normalize)
    .filter((x): x is AppNotification => Boolean(x))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, MAX_NOTIFICATIONS);
}

export function pushNotification(
  input: Omit<AppNotification, "id" | "createdAt" | "read"> & {
    read?: boolean;
  },
): AppNotification {
  const record: AppNotification = {
    ...input,
    id: createId(),
    createdAt: new Date().toISOString(),
    read: input.read ?? false,
  };
  emit([record, ...getNotifications()].slice(0, MAX_NOTIFICATIONS));
  return record;
}

export function markNotificationRead(id: string): AppNotification[] {
  const next = getNotifications().map((n) =>
    n.id === id ? { ...n, read: true } : n,
  );
  return emit(next);
}

export function markAllNotificationsRead(): AppNotification[] {
  return emit(getNotifications().map((n) => ({ ...n, read: true })));
}

export function deleteNotification(id: string): AppNotification[] {
  return emit(getNotifications().filter((n) => n.id !== id));
}

export function clearNotifications(): AppNotification[] {
  return emit([]);
}

export function unreadCount(list = getNotifications()): number {
  return list.filter((n) => !n.read).length;
}
