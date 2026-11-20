"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { IconSearch } from "@/components/icons";
import { cn } from "@/lib/utils";
import {
  ALL_AREAS,
  CITIES,
  PROPERTY_TYPES,
  buildListingHref,
  propertyTypeLabel,
} from "@/lib/property-search";
import { recordRecentSearch } from "@/lib/recent-searches";

export function HeroSearch() {
  const router = useRouter();
  const [status, setStatus] = useState<"sale" | "rent">("sale");
  const [type, setType] = useState("all");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    let city = "";
    let area = "";
    if ((CITIES as readonly string[]).includes(location)) {
      city = location;
    } else if (ALL_AREAS.includes(location)) {
      area = location;
      city =
        location.includes("Lahore")
          ? "Lahore"
          : location.includes("Karachi")
            ? "Karachi"
            : location.includes("Islamabad")
              ? "Islamabad"
              : "";
    }

    if (city || area) {
      recordRecentSearch({ city, area });
    }

    const base = status === "sale" ? "/buy" : "/rent";
    router.push(
      buildListingHref(
        base,
        {
          type: type === "all" ? "all" : (type as "house" | "apartment" | "plot" | "commercial"),
          city,
          area,
          minPrice,
          maxPrice,
          page: 1,
        },
        status,
      ),
    );
  }

  return (
    <div className="animate-fade-up delay-300 w-full max-w-4xl rounded-xl border border-white/15 bg-white/95 p-4 shadow-[var(--shadow)] backdrop-blur-md md:p-5">
      <div className="mb-4 flex gap-1 rounded-md bg-bg p-1">
        {(
          [
            { value: "sale", label: "Buy" },
            { value: "rent", label: "Rent" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setStatus(tab.value)}
            aria-pressed={status === tab.value}
            className={cn(
              "flex-1 rounded-md py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
              status === tab.value
                ? "bg-navy text-white"
                : "text-muted hover:text-navy",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form
        onSubmit={onSubmit}
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
      >
        <Select
          aria-label="Property type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          options={[
            { value: "all", label: "Property Type" },
            ...PROPERTY_TYPES.map((t) => ({
              value: t,
              label: propertyTypeLabel(t),
            })),
          ]}
        />
        <Select
          aria-label="Location or city"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          options={[
            { value: "", label: "City / Area" },
            ...CITIES.map((city) => ({ value: city, label: city })),
            ...ALL_AREAS.map((area) => ({ value: area, label: area })),
          ]}
        />
        <Input
          aria-label="Minimum price"
          type="number"
          placeholder="Min price (PKR)"
          min={0}
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <Input
          aria-label="Maximum price"
          type="number"
          placeholder="Max price (PKR)"
          min={0}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <Button
          type="submit"
          variant="gold"
          className="w-full sm:col-span-2 lg:col-span-1"
        >
          <IconSearch className="h-4 w-4" />
          Search
        </Button>
      </form>
    </div>
  );
}
