"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Property, UserProperty } from "@/lib/types";
import { properties as demoProperties } from "@/lib/data/properties";
import {
  USER_PROPERTIES_EVENT,
  getUserProperties,
} from "@/lib/user-properties";

type CatalogContextValue = {
  ready: boolean;
  demoProperties: Property[];
  userProperties: UserProperty[];
  /** Demo catalog + active user listings (user never overwrites demo IDs). */
  catalog: Property[];
  refresh: () => void;
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: React.ReactNode }) {
  const [userProperties, setUserProperties] = useState<UserProperty[]>([]);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    setUserProperties(getUserProperties());
  }, []);

  useEffect(() => {
    const hydrate = window.setTimeout(() => {
      refresh();
      setReady(true);
    }, 0);
    function onCustom() {
      refresh();
    }
    function onStorage(e: StorageEvent) {
      if (e.key === "estatepro:user-properties") refresh();
    }
    window.addEventListener(USER_PROPERTIES_EVENT, onCustom);
    window.addEventListener("storage", onStorage);
    return () => {
      window.clearTimeout(hydrate);
      window.removeEventListener(USER_PROPERTIES_EVENT, onCustom);
      window.removeEventListener("storage", onStorage);
    };
  }, [refresh]);

  const catalog = useMemo(() => {
    const active = ready
      ? userProperties.filter((p) => p.listingStatus === "active")
      : [];
    const demoIds = new Set(demoProperties.map((p) => p.id));
    const safeUser = active.filter((p) => !demoIds.has(p.id));
    return [...safeUser, ...demoProperties];
  }, [ready, userProperties]);

  const value = useMemo(
    () => ({
      ready,
      demoProperties,
      userProperties,
      catalog,
      refresh,
    }),
    [ready, userProperties, catalog, refresh],
  );

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
}

export function useCatalog(): CatalogContextValue {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used within CatalogProvider");
  return ctx;
}
