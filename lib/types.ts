export type PropertyStatus = "sale" | "rent";

export type PropertyType = "house" | "apartment" | "plot" | "commercial";

export type AreaUnit = "marla" | "kanal" | "sqft";

export type SortOption =
  | "newest"
  | "oldest"
  | "price-asc"
  | "price-desc";

export type ViewMode = "grid" | "list";

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  status: PropertyStatus;
  type: PropertyType;
  featured: boolean;
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: AreaUnit;
  yearBuilt: number;
  parking: number;
  address: string;
  city: string;
  areaName: string;
  location: string;
  coordinates: { lat: number; lng: number };
  images: string[];
  amenities: string[];
  features: string[];
  agentId: string;
  listedDate: string;
}

export interface Agent {
  id: string;
  slug: string;
  name: string;
  position: string;
  image: string;
  email: string;
  phone: string;
  experience: string;
  bio: string;
  specialties: string[];
  languages: string[];
  /** Primary cities / markets this agent covers (demo data). */
  serviceAreas: string[];
}

export type InquiryStatus = "new" | "reviewed" | "closed";

export type ListingLifecycle = "active" | "draft" | "pending";

export type FurnishingStatus =
  | "unfurnished"
  | "semi-furnished"
  | "furnished";

export interface InquiryRecord {
  id: string;
  type: "property" | "agent";
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  agentId?: string;
  agentName?: string;
  propertyId?: string;
  propertySlug?: string;
  propertyTitle?: string;
  propertyRef?: string;
  status: InquiryStatus;
  demo: true;
}

/** User-submitted listing stored in localStorage (never overwrites demo catalog). */
export interface UserProperty extends Property {
  listingStatus: ListingLifecycle;
  kitchens: number;
  furnishing: FurnishingStatus;
  negotiable: boolean;
  plotSize: number;
  locationNote: string;
  isUserSubmitted: true;
  updatedAt: string;
  /** True when images were temporary object URLs and could not be persisted. */
  imagesAreTemporary?: boolean;
}

export interface UserProfile {
  displayName: string;
  email: string;
  phone: string;
  avatarDataUrl: string;
  updatedAt: string;
}

export interface PropertyFilters {
  query: string;
  status: PropertyStatus | "all";
  type: PropertyType | "all";
  city: string;
  area: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
  minArea: string;
  maxArea: string;
  sort: SortOption;
  page: number;
}

export interface ActiveFilterChip {
  key: keyof PropertyFilters | "location";
  label: string;
  clear: Partial<PropertyFilters>;
}
