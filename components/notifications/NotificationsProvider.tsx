"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  NOTIFICATIONS_EVENT,
  NOTIFICATIONS_KEY,
  type AppNotification,
  clearNotifications,
  deleteNotification,
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  pushNotification,
  unreadCount,
} from "@/lib/notifications";

type NotificationsContextValue = {
  items: AppNotification[];
  ready: boolean;
  unread: number;
  push: typeof pushNotification;
  markRead: (id: string) => void;
  markAllRead: () => void;
  remove: (id: string) => void;
  clearAll: () => void;
};

const NotificationsContext =
  createContext<NotificationsContextValue | null>(null);

export function NotificationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<AppNotification[]>([]);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    setItems(getNotifications());
  }, []);

  useEffect(() => {
    const hydrate = window.setTimeout(() => {
      refresh();
      setReady(true);
    }, 0);

    function onStorage(e: StorageEvent) {
      if (e.key === NOTIFICATIONS_KEY) refresh();
    }
    function onCustom() {
      refresh();
    }

    window.addEventListener("storage", onStorage);
    window.addEventListener(NOTIFICATIONS_EVENT, onCustom);
    window.addEventListener("estatepro:demo-reset", onCustom);
    return () => {
      window.clearTimeout(hydrate);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(NOTIFICATIONS_EVENT, onCustom);
      window.removeEventListener("estatepro:demo-reset", onCustom);
    };
  }, [refresh]);

  const value = useMemo<NotificationsContextValue>(
    () => ({
      items,
      ready,
      unread: unreadCount(items),
      push: (input) => {
        const record = pushNotification(input);
        setItems(getNotifications());
        return record;
      },
      markRead: (id) => setItems(markNotificationRead(id)),
      markAllRead: () => setItems(markAllNotificationsRead()),
      remove: (id) => setItems(deleteNotification(id)),
      clearAll: () => setItems(clearNotifications()),
    }),
    [items, ready],
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications(): NotificationsContextValue {
  const ctx = useContext(NotificationsContext);
  if (!ctx) {
    throw new Error(
      "useNotifications must be used within NotificationsProvider",
    );
  }
  return ctx;
}
