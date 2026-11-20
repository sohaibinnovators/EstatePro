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
  COMPARE_EVENT,
  COMPARE_KEY,
  MAX_COMPARE,
  clearCompare,
  getCompareIds,
  removeCompareId,
  toggleCompareId,
} from "@/lib/compare";

type CompareContextValue = {
  ids: string[];
  ready: boolean;
  count: number;
  max: number;
  isCompared: (id: string) => boolean;
  toggle: (id: string) => { added: boolean; rejected?: "full" | "duplicate" };
  remove: (id: string) => void;
  clear: () => void;
};

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hydrate = window.setTimeout(() => {
      setIds(getCompareIds());
      setReady(true);
    }, 0);

    function onStorage(e: StorageEvent) {
      if (e.key === COMPARE_KEY) setIds(getCompareIds());
    }
    function onCustom(e: Event) {
      const detail = (e as CustomEvent<string[]>).detail;
      if (Array.isArray(detail)) setIds(detail);
      else setIds(getCompareIds());
    }

    window.addEventListener("storage", onStorage);
    window.addEventListener(COMPARE_EVENT, onCustom);
    window.addEventListener("estatepro:demo-reset", onCustom);
    return () => {
      window.clearTimeout(hydrate);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(COMPARE_EVENT, onCustom);
      window.removeEventListener("estatepro:demo-reset", onCustom);
    };
  }, []);

  const toggle = useCallback((id: string) => {
    const result = toggleCompareId(id);
    setIds(result.ids);
    return { added: result.added, rejected: result.rejected };
  }, []);

  const remove = useCallback((id: string) => {
    setIds(removeCompareId(id));
  }, []);

  const clear = useCallback(() => {
    setIds(clearCompare());
  }, []);

  const value = useMemo<CompareContextValue>(
    () => ({
      ids,
      ready,
      count: ids.length,
      max: MAX_COMPARE,
      isCompared: (id: string) => ids.includes(id),
      toggle,
      remove,
      clear,
    }),
    [ids, ready, toggle, remove, clear],
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare(): CompareContextValue {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
