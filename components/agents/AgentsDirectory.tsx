"use client";

import { useMemo, useState } from "react";
import type { Agent } from "@/lib/types";
import { AgentCard } from "./AgentCard";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { filterAgents } from "@/lib/data/agents";
import { CITIES } from "@/lib/property-search";

export function AgentsDirectory({
  agents,
  listingCounts,
}: {
  agents: Agent[];
  listingCounts: Record<string, number>;
}) {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [specialty, setSpecialty] = useState("");

  const specialties = useMemo(() => {
    return [...new Set(agents.flatMap((a) => a.specialties))].sort();
  }, [agents]);

  const filtered = useMemo(
    () => filterAgents(agents, { query, city, specialty }, listingCounts),
    [agents, query, city, specialty, listingCounts],
  );

  function clear() {
    setQuery("");
    setCity("");
    setSpecialty("");
  }

  return (
    <div className="container-ep py-12 md:py-16">
      <div className="rounded-xl border border-border bg-white p-4 shadow-[var(--shadow-sm)] md:p-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Input
            placeholder="Search by name or focus…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search agents"
          />
          <Select
            aria-label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            options={[
              { value: "", label: "All cities" },
              ...CITIES.map((c) => ({ value: c, label: c })),
            ]}
          />
          <Select
            aria-label="Specialization"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            options={[
              { value: "", label: "All specializations" },
              ...specialties.map((s) => ({ value: s, label: s })),
            ]}
          />
          <Button type="button" variant="ghost" onClick={clear}>
            Clear filters
          </Button>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">
        Showing{" "}
        <span className="font-semibold text-navy">{filtered.length}</span> of{" "}
        <span className="font-semibold text-navy">{agents.length}</span> agents
      </p>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-border bg-white px-6 py-14 text-center">
          <h2 className="font-display text-2xl font-semibold text-navy">
            No agents match
          </h2>
          <p className="mt-2 text-muted">
            Try another city, specialty, or clear your search.
          </p>
          <Button type="button" variant="gold" className="mt-5" onClick={clear}>
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              listingCount={listingCounts[agent.id] ?? 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}
