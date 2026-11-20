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
  FAVORITES_EVENT,
  getFavoriteIds,
  removeFavoriteId,
  setFavoriteIds,
  toggleFavoriteId,
} from "@/lib/favorites";

type FavoritesContextValue = {
  ids: string[];
  ready: boolean;
  count: number;
  isFavorite: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hydrate = window.setTimeout(() => {
      setIds(getFavoriteIds());
      setReady(true);
    }, 0);

    function onStorage(e: StorageEvent) {
      if (e.key === "estatepro:favorites") {
        setIds(getFavoriteIds());
      }
    }

    function onCustom(e: Event) {
      const detail = (e as CustomEvent<string[]>).detail;
      if (Array.isArray(detail)) setIds(detail);
      else setIds(getFavoriteIds());
    }

    window.addEventListener("storage", onStorage);
    window.addEventListener(FAVORITES_EVENT, onCustom);
    return () => {
      window.clearTimeout(hydrate);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(FAVORITES_EVENT, onCustom);
    };
  }, []);

  const toggle = useCallback((id: string) => {
    setIds(toggleFavoriteId(id));
  }, []);

  const remove = useCallback((id: string) => {
    setIds(removeFavoriteId(id));
  }, []);

  const clear = useCallback(() => {
    setIds(setFavoriteIds([]));
  }, []);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      ids,
      ready,
      count: ids.length,
      isFavorite: (id: string) => ids.includes(id),
      toggle,
      remove,
      clear,
    }),
    [ids, ready, toggle, remove, clear],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return ctx;
}
