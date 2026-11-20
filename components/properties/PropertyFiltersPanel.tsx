"use client";

import type { PropertyFilters, PropertyStatus, PropertyType } from "@/lib/types";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import {
  CITIES,
  PROPERTY_TYPES,
  SORT_OPTIONS,
  getAreasForCity,
  propertyTypeLabel,
} from "@/lib/property-search";

const bedOptions = [
  { value: "any", label: "Any Beds" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
  { value: "5", label: "5+" },
];

const bathOptions = [
  { value: "any", label: "Any Baths" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
  { value: "5", label: "5+" },
];

export function PropertyFiltersPanel({
  filters,
  showStatusFilter,
  onChange,
  onClear,
  compact = false,
}: {
  filters: PropertyFilters;
  showStatusFilter: boolean;
  onChange: <K extends keyof PropertyFilters>(
    key: K,
    value: PropertyFilters[K],
  ) => void;
  onClear: () => void;
  compact?: boolean;
}) {
  const areaOptions = [
    { value: "", label: "All Areas" },
    ...getAreasForCity(filters.city).map((area) => ({
      value: area,
      label: area,
    })),
  ];

  return (
    <div className={compact ? "space-y-3" : "space-y-4"}>
      <div
        className={
          compact
            ? "grid gap-3"
            : "grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        }
      >
        <Input
          placeholder="Search properties..."
          value={filters.query}
          onChange={(e) => onChange("query", e.target.value)}
          aria-label="Search properties"
        />
        <Select
          options={[
            { value: "", label: "All Cities" },
            ...CITIES.map((city) => ({ value: city, label: city })),
          ]}
          value={filters.city}
          onChange={(e) => onChange("city", e.target.value)}
          aria-label="City"
        />
        <Select
          options={areaOptions}
          value={filters.area}
          onChange={(e) => onChange("area", e.target.value)}
          aria-label="Area / location"
        />
        <Select
          options={[
            { value: "all", label: "All Types" },
            ...PROPERTY_TYPES.map((type) => ({
              value: type,
              label: propertyTypeLabel(type),
            })),
          ]}
          value={filters.type}
          onChange={(e) =>
            onChange("type", e.target.value as PropertyType | "all")
          }
          aria-label="Property type"
        />
        {showStatusFilter ? (
          <Select
            options={[
              { value: "all", label: "Buy & Rent" },
              { value: "sale", label: "For Sale" },
              { value: "rent", label: "For Rent" },
            ]}
            value={filters.status}
            onChange={(e) =>
              onChange("status", e.target.value as PropertyStatus | "all")
            }
            aria-label="Listing type"
          />
        ) : null}
        <Input
          type="number"
          placeholder="Min price (PKR)"
          value={filters.minPrice}
          onChange={(e) => onChange("minPrice", e.target.value)}
          aria-label="Minimum price"
          min={0}
        />
        <Input
          type="number"
          placeholder="Max price (PKR)"
          value={filters.maxPrice}
          onChange={(e) => onChange("maxPrice", e.target.value)}
          aria-label="Maximum price"
          min={0}
        />
        <Select
          options={bedOptions}
          value={filters.bedrooms}
          onChange={(e) => onChange("bedrooms", e.target.value)}
          aria-label="Bedrooms"
        />
        <Select
          options={bathOptions}
          value={filters.bathrooms}
          onChange={(e) => onChange("bathrooms", e.target.value)}
          aria-label="Bathrooms"
        />
        <Input
          type="number"
          placeholder="Min area"
          value={filters.minArea}
          onChange={(e) => onChange("minArea", e.target.value)}
          aria-label="Minimum area"
          min={0}
        />
        <Input
          type="number"
          placeholder="Max area"
          value={filters.maxArea}
          onChange={(e) => onChange("maxArea", e.target.value)}
          aria-label="Maximum area"
          min={0}
        />
        <Select
          options={SORT_OPTIONS}
          value={filters.sort}
          onChange={(e) =>
            onChange("sort", e.target.value as PropertyFilters["sort"])
          }
          aria-label="Sort"
        />
      </div>
      <div className="flex justify-end">
        <Button type="button" variant="ghost" size="sm" onClick={onClear}>
          Clear all filters
        </Button>
      </div>
    </div>
  );
}
