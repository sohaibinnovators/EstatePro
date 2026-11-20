import type { AreaUnit, Property, PropertyStatus, PropertyType } from "./types";
import {
  filterProperties,
  formatCompactPrice,
  propertyTypeLabel,
  sortProperties,
} from "./property-search";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(price: number, status: PropertyStatus): string {
  const formatted = new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(price);

  return status === "rent" ? `${formatted}/mo` : formatted;
}

export function formatArea(area: number, unit: AreaUnit = "sqft"): string {
  const labels: Record<AreaUnit, string> = {
    marla: "Marla",
    kanal: "Kanal",
    sqft: "Sq Ft",
  };
  const formatted =
    unit === "sqft" ? area.toLocaleString("en-PK") : String(area);
  return `${formatted} ${labels[unit]}`;
}

export function statusLabel(status: PropertyStatus): string {
  return status === "sale" ? "For Sale" : "For Rent";
}

export {
  filterProperties,
  formatCompactPrice,
  propertyTypeLabel,
  sortProperties,
};

export type { PropertyType };
export type { Property };
