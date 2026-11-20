import type {
  ActiveFilterChip,
  Property,
  PropertyFilters,
  PropertyStatus,
  PropertyType,
  SortOption,
} from "./types";

export const PROPERTY_TYPES: PropertyType[] = [
  "house",
  "apartment",
  "plot",
  "commercial",
];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export const PAGE_SIZE = 6;

export const CITIES = ["Lahore", "Karachi", "Islamabad"] as const;

export const AREAS_BY_CITY: Record<string, string[]> = {
  Lahore: ["DHA Lahore", "Bahria Town Lahore", "Gulberg Lahore"],
  Karachi: ["DHA Karachi", "Clifton Karachi", "Bahria Town Karachi"],
  Islamabad: ["F-7 Islamabad", "DHA Islamabad", "Bahria Town Islamabad"],
};

export const ALL_AREAS = Object.values(AREAS_BY_CITY).flat();

export function createDefaultFilters(
  lockedStatus: PropertyStatus | "all" = "all",
): PropertyFilters {
  return {
    query: "",
    status: lockedStatus,
    type: "all",
    city: "",
    area: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "any",
    bathrooms: "any",
    minArea: "",
    maxArea: "",
    sort: "newest",
    page: 1,
  };
}

function firstParam(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

function parsePositiveInt(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
}

function parseOptionalNumberString(value: string | undefined): string {
  if (!value) return "";
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? String(Math.floor(n)) : "";
}

export function parseFiltersFromSearchParams(
  params: URLSearchParams | Record<string, string | string[] | undefined>,
  lockedStatus: PropertyStatus | "all" = "all",
): PropertyFilters {
  const get = (key: string) => {
    if (params instanceof URLSearchParams) {
      return params.get(key) ?? undefined;
    }
    return firstParam(params[key]);
  };

  const defaults = createDefaultFilters(lockedStatus);

  const typeRaw = get("type") ?? "all";
  const type = (PROPERTY_TYPES as string[]).includes(typeRaw)
    ? (typeRaw as PropertyType)
    : "all";

  let status: PropertyStatus | "all" = lockedStatus;
  if (lockedStatus === "all") {
    const statusRaw = get("status");
    status =
      statusRaw === "sale" || statusRaw === "rent" ? statusRaw : "all";
  }

  const cityRaw = get("city") ?? "";
  const city = (CITIES as readonly string[]).includes(cityRaw) ? cityRaw : "";

  const areaRaw = get("area") ?? get("location") ?? "";
  const area = ALL_AREAS.includes(areaRaw)
    ? areaRaw
    : city && AREAS_BY_CITY[city]?.includes(areaRaw)
      ? areaRaw
      : ALL_AREAS.find((a) => a.toLowerCase() === areaRaw.toLowerCase()) ||
        "";

  // Support legacy location=City or location=Area from homepage links
  let resolvedCity = city;
  let resolvedArea = area;
  if (!resolvedCity && !resolvedArea) {
    const loc = get("location") ?? "";
    if ((CITIES as readonly string[]).includes(loc)) {
      resolvedCity = loc;
    } else if (ALL_AREAS.includes(loc)) {
      resolvedArea = loc;
      resolvedCity =
        Object.entries(AREAS_BY_CITY).find(([, areas]) =>
          areas.includes(loc),
        )?.[0] ?? "";
    }
  }

  if (resolvedArea && !resolvedCity) {
    resolvedCity =
      Object.entries(AREAS_BY_CITY).find(([, areas]) =>
        areas.includes(resolvedArea),
      )?.[0] ?? "";
  }

  const sortRaw = get("sort") ?? "newest";
  const allowedSorts: SortOption[] = [
    "newest",
    "oldest",
    "price-asc",
    "price-desc",
  ];
  const sort = allowedSorts.includes(sortRaw as SortOption)
    ? (sortRaw as SortOption)
    : "newest";

  const beds = get("beds") ?? get("bedrooms") ?? "any";
  const baths = get("baths") ?? get("bathrooms") ?? "any";

  return {
    query: (get("q") ?? get("query") ?? "").trim(),
    status,
    type,
    city: resolvedCity,
    area: resolvedArea,
    minPrice: parseOptionalNumberString(get("min") ?? get("minPrice")),
    maxPrice: parseOptionalNumberString(get("max") ?? get("maxPrice")),
    bedrooms: ["any", "1", "2", "3", "4", "5"].includes(beds) ? beds : "any",
    bathrooms: ["any", "1", "2", "3", "4", "5"].includes(baths)
      ? baths
      : "any",
    minArea: parseOptionalNumberString(get("minArea")),
    maxArea: parseOptionalNumberString(get("maxArea")),
    sort,
    page: parsePositiveInt(get("page"), defaults.page),
  };
}

export function filtersToSearchParams(
  filters: PropertyFilters,
  lockedStatus: PropertyStatus | "all" = "all",
): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.query.trim()) params.set("q", filters.query.trim());
  if (lockedStatus === "all" && filters.status !== "all") {
    params.set("status", filters.status);
  }
  if (filters.type !== "all") params.set("type", filters.type);
  if (filters.city) params.set("city", filters.city);
  if (filters.area) params.set("area", filters.area);
  if (filters.minPrice) params.set("min", filters.minPrice);
  if (filters.maxPrice) params.set("max", filters.maxPrice);
  if (filters.bedrooms !== "any") params.set("beds", filters.bedrooms);
  if (filters.bathrooms !== "any") params.set("baths", filters.bathrooms);
  if (filters.minArea) params.set("minArea", filters.minArea);
  if (filters.maxArea) params.set("maxArea", filters.maxArea);
  if (filters.sort !== "newest") params.set("sort", filters.sort);
  if (filters.page > 1) params.set("page", String(filters.page));

  return params;
}

export function buildListingHref(
  basePath: string,
  filters: Partial<PropertyFilters>,
  lockedStatus: PropertyStatus | "all" = "all",
): string {
  const merged = { ...createDefaultFilters(lockedStatus), ...filters };
  const qs = filtersToSearchParams(merged, lockedStatus).toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export function filterProperties(
  properties: Property[],
  filters: PropertyFilters,
): Property[] {
  let result = [...properties];

  if (filters.status !== "all") {
    result = result.filter((p) => p.status === filters.status);
  }

  if (filters.type !== "all") {
    result = result.filter((p) => p.type === filters.type);
  }

  if (filters.city) {
    result = result.filter(
      (p) => p.city.toLowerCase() === filters.city.toLowerCase(),
    );
  }

  if (filters.area) {
    const areaQ = filters.area.toLowerCase();
    result = result.filter(
      (p) =>
        p.areaName.toLowerCase() === areaQ ||
        p.location.toLowerCase().includes(areaQ),
    );
  }

  if (filters.query.trim()) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.areaName.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q),
    );
  }

  const min = filters.minPrice ? Number(filters.minPrice) : null;
  const max = filters.maxPrice ? Number(filters.maxPrice) : null;
  if (min !== null && !Number.isNaN(min)) {
    result = result.filter((p) => p.price >= min);
  }
  if (max !== null && !Number.isNaN(max)) {
    result = result.filter((p) => p.price <= max);
  }

  if (filters.bedrooms !== "any") {
    const beds = Number(filters.bedrooms);
    if (!Number.isNaN(beds)) {
      result = result.filter((p) => p.bedrooms >= beds);
    }
  }

  if (filters.bathrooms !== "any") {
    const baths = Number(filters.bathrooms);
    if (!Number.isNaN(baths)) {
      result = result.filter((p) => p.bathrooms >= baths);
    }
  }

  const minArea = filters.minArea ? Number(filters.minArea) : null;
  const maxArea = filters.maxArea ? Number(filters.maxArea) : null;
  if (minArea !== null && !Number.isNaN(minArea)) {
    result = result.filter((p) => p.area >= minArea);
  }
  if (maxArea !== null && !Number.isNaN(maxArea)) {
    result = result.filter((p) => p.area <= maxArea);
  }

  return sortProperties(result, filters.sort);
}

export function sortProperties(
  properties: Property[],
  sort: SortOption,
): Property[] {
  const sorted = [...properties];

  switch (sort) {
    case "oldest":
      return sorted.sort(
        (a, b) =>
          new Date(a.listedDate).getTime() - new Date(b.listedDate).getTime(),
      );
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "newest":
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime(),
      );
  }
}

export function getActiveFilterChips(
  filters: PropertyFilters,
  lockedStatus: PropertyStatus | "all",
): ActiveFilterChip[] {
  const chips: ActiveFilterChip[] = [];

  if (filters.query.trim()) {
    chips.push({
      key: "query",
      label: `Search: “${filters.query.trim()}”`,
      clear: { query: "", page: 1 },
    });
  }

  if (lockedStatus === "all" && filters.status !== "all") {
    chips.push({
      key: "status",
      label: filters.status === "sale" ? "For Sale" : "For Rent",
      clear: { status: "all", page: 1 },
    });
  }

  if (filters.type !== "all") {
    chips.push({
      key: "type",
      label: propertyTypeLabel(filters.type),
      clear: { type: "all", page: 1 },
    });
  }

  if (filters.city) {
    chips.push({
      key: "city",
      label: `City: ${filters.city}`,
      clear: { city: "", area: "", page: 1 },
    });
  }

  if (filters.area) {
    chips.push({
      key: "area",
      label: `Area: ${filters.area}`,
      clear: { area: "", page: 1 },
    });
  }

  if (filters.minPrice) {
    chips.push({
      key: "minPrice",
      label: `Min: ${formatCompactPrice(Number(filters.minPrice))}`,
      clear: { minPrice: "", page: 1 },
    });
  }

  if (filters.maxPrice) {
    chips.push({
      key: "maxPrice",
      label: `Max: ${formatCompactPrice(Number(filters.maxPrice))}`,
      clear: { maxPrice: "", page: 1 },
    });
  }

  if (filters.bedrooms !== "any") {
    chips.push({
      key: "bedrooms",
      label: `${filters.bedrooms}+ Beds`,
      clear: { bedrooms: "any", page: 1 },
    });
  }

  if (filters.bathrooms !== "any") {
    chips.push({
      key: "bathrooms",
      label: `${filters.bathrooms}+ Baths`,
      clear: { bathrooms: "any", page: 1 },
    });
  }

  if (filters.minArea) {
    chips.push({
      key: "minArea",
      label: `Min area: ${filters.minArea}`,
      clear: { minArea: "", page: 1 },
    });
  }

  if (filters.maxArea) {
    chips.push({
      key: "maxArea",
      label: `Max area: ${filters.maxArea}`,
      clear: { maxArea: "", page: 1 },
    });
  }

  return chips;
}

export function countActiveFilters(
  filters: PropertyFilters,
  lockedStatus: PropertyStatus | "all",
): number {
  return getActiveFilterChips(filters, lockedStatus).length;
}

export function propertyTypeLabel(type: PropertyType): string {
  const labels: Record<PropertyType, string> = {
    house: "House",
    apartment: "Apartment",
    plot: "Plot",
    commercial: "Commercial",
  };
  return labels[type];
}

export function formatCompactPrice(price: number): string {
  if (price >= 10_000_000) {
    const crore = price / 10_000_000;
    return `Rs ${crore % 1 === 0 ? crore.toFixed(0) : crore.toFixed(1)} Cr`;
  }
  if (price >= 100_000) {
    const lakh = price / 100_000;
    return `Rs ${lakh % 1 === 0 ? lakh.toFixed(0) : lakh.toFixed(1)} Lakh`;
  }
  return `Rs ${price.toLocaleString("en-PK")}`;
}

export function getAreasForCity(city: string): string[] {
  if (!city) return ALL_AREAS;
  return AREAS_BY_CITY[city] ?? [];
}

export function getUniqueCities(properties: Property[]): string[] {
  return [...new Set(properties.map((p) => p.city))].sort();
}

export function getUniqueAreas(
  properties: Property[],
  city?: string,
): string[] {
  const list = city
    ? properties.filter((p) => p.city === city)
    : properties;
  return [...new Set(list.map((p) => p.areaName))].sort();
}
