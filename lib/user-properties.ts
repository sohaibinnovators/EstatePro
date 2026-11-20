import type {
  AreaUnit,
  ListingLifecycle,
  Property,
  PropertyStatus,
  PropertyType,
  UserProperty,
} from "./types";
import { readStorageJson, writeStorageJson } from "./storage";
import { properties as demoProperties } from "./data/properties";

export const USER_PROPERTIES_KEY = "estatepro:user-properties";
export const USER_PROPERTIES_EVENT = "estatepro:user-properties-change";
export const PROPERTY_DRAFT_KEY = "estatepro:property-draft";

const MAX_IMAGES = 5;
const MAX_DATA_URL_CHARS = 450_000; // ~keep localStorage lighter

export function getUserProperties(): UserProperty[] {
  const data = readStorageJson<unknown>(USER_PROPERTIES_KEY, []);
  if (!Array.isArray(data)) return [];
  return data.filter(isUserProperty);
}

function isUserProperty(item: unknown): item is UserProperty {
  if (!item || typeof item !== "object") return false;
  const p = item as Partial<UserProperty>;
  return (
    typeof p.id === "string" &&
    p.id.startsWith("user_") &&
    p.isUserSubmitted === true &&
    typeof p.slug === "string" &&
    typeof p.title === "string"
  );
}

function emit(list: UserProperty[]) {
  writeStorageJson(USER_PROPERTIES_KEY, list);
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(USER_PROPERTIES_EVENT, { detail: list }),
    );
  }
  return list;
}

export function getUserPropertyById(id: string): UserProperty | undefined {
  return getUserProperties().find((p) => p.id === id);
}

export function getUserPropertyBySlug(slug: string): UserProperty | undefined {
  return getUserProperties().find((p) => p.slug === slug);
}

export function getActiveUserProperties(): Property[] {
  return getUserProperties().filter((p) => p.listingStatus === "active");
}

export function slugifyTitle(title: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
  return base || "property";
}

export function createUserPropertyId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export function ensureUniqueSlug(base: string, excludeId?: string): string {
  const existing = getUserProperties().filter((p) => p.id !== excludeId);
  const demoSlugs = new Set(demoProperties.map((p) => p.slug));
  let slug = base;
  let i = 2;
  while (
    existing.some((p) => p.slug === slug) ||
    demoSlugs.has(slug)
  ) {
    slug = `${base}-${i}`;
    i += 1;
  }
  return slug;
}

export type UserPropertyInput = {
  title: string;
  description: string;
  status: PropertyStatus;
  type: PropertyType;
  city: string;
  areaName: string;
  address: string;
  locationNote: string;
  price: number;
  negotiable: boolean;
  bedrooms: number;
  bathrooms: number;
  kitchens: number;
  area: number;
  plotSize: number;
  areaUnit: AreaUnit;
  furnishing: UserProperty["furnishing"];
  amenities: string[];
  features: string[];
  images: string[];
  listingStatus: ListingLifecycle;
  imagesAreTemporary?: boolean;
  featured?: boolean;
  yearBuilt?: number;
  parking?: number;
  agentId?: string;
};

export function upsertUserProperty(
  input: UserPropertyInput,
  existingId?: string,
): UserProperty {
  const list = getUserProperties();
  const now = new Date().toISOString().slice(0, 10);
  const updatedAt = new Date().toISOString();

  if (existingId) {
    const idx = list.findIndex((p) => p.id === existingId);
    if (idx === -1) throw new Error("Property not found");
    const prev = list[idx];
    const slug = ensureUniqueSlug(slugifyTitle(input.title), existingId);
    const next: UserProperty = {
      ...prev,
      ...toPropertyFields(input, slug, prev.id, prev.listedDate),
      listingStatus: input.listingStatus,
      kitchens: input.kitchens,
      furnishing: input.furnishing,
      negotiable: input.negotiable,
      plotSize: input.plotSize,
      locationNote: input.locationNote,
      isUserSubmitted: true,
      updatedAt,
      imagesAreTemporary: input.imagesAreTemporary,
    };
    const copy = [...list];
    copy[idx] = next;
    emit(copy);
    return next;
  }

  const id = createUserPropertyId();
  const slug = ensureUniqueSlug(slugifyTitle(input.title));
  const created: UserProperty = {
    ...toPropertyFields(input, slug, id, now),
    listingStatus: input.listingStatus,
    kitchens: input.kitchens,
    furnishing: input.furnishing,
    negotiable: input.negotiable,
    plotSize: input.plotSize,
    locationNote: input.locationNote,
    isUserSubmitted: true,
    updatedAt,
    imagesAreTemporary: input.imagesAreTemporary,
  };
  emit([created, ...list]);
  return created;
}

function toPropertyFields(
  input: UserPropertyInput,
  slug: string,
  id: string,
  listedDate: string,
): Property {
  return {
    id,
    slug,
    title: input.title.trim(),
    description: input.description.trim(),
    price: input.price,
    status: input.status,
    type: input.type,
    featured: Boolean(input.featured),
    bedrooms: input.bedrooms,
    bathrooms: input.bathrooms,
    area: input.area,
    areaUnit: input.areaUnit,
    yearBuilt: input.yearBuilt ?? 0,
    parking: input.parking ?? (input.amenities.includes("Parking") ? 1 : 0),
    address: input.address.trim(),
    city: input.city,
    areaName: input.areaName,
    location: `${input.areaName}, ${input.city}`,
    coordinates: { lat: 0, lng: 0 },
    images:
      input.images.length > 0
        ? input.images.slice(0, MAX_IMAGES)
        : [
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop",
          ],
    amenities: input.amenities,
    features: input.features,
    agentId: input.agentId ?? "a1",
    listedDate,
  };
}

export function updateUserListingStatus(
  id: string,
  listingStatus: ListingLifecycle,
): UserProperty | undefined {
  const list = getUserProperties();
  const idx = list.findIndex((p) => p.id === id);
  if (idx === -1) return undefined;
  const next = {
    ...list[idx],
    listingStatus,
    updatedAt: new Date().toISOString(),
  };
  const copy = [...list];
  copy[idx] = next;
  emit(copy);
  return next;
}

export function deleteUserProperty(id: string): boolean {
  const list = getUserProperties();
  const next = list.filter((p) => p.id !== id);
  if (next.length === list.length) return false;
  emit(next);
  return true;
}

export function savePropertyDraft(draft: unknown): boolean {
  return writeStorageJson(PROPERTY_DRAFT_KEY, draft).ok;
}

export function loadPropertyDraft<T>(fallback: T): T {
  return readStorageJson(PROPERTY_DRAFT_KEY, fallback);
}

export function clearPropertyDraft(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(PROPERTY_DRAFT_KEY);
  } catch {
    /* ignore */
  }
}

/** Compress image File to a JPEG data URL for demo persistence. */
export async function fileToPersistedDataUrl(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const maxW = 1200;
  const scale = Math.min(1, maxW / bitmap.width);
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  let quality = 0.72;
  let dataUrl = canvas.toDataURL("image/jpeg", quality);
  while (dataUrl.length > MAX_DATA_URL_CHARS && quality > 0.4) {
    quality -= 0.1;
    dataUrl = canvas.toDataURL("image/jpeg", quality);
  }
  if (dataUrl.length > MAX_DATA_URL_CHARS) {
    throw new Error("Image too large to store in this browser demo");
  }
  return dataUrl;
}

export const MAX_PROPERTY_IMAGES = MAX_IMAGES;
export const MAX_IMAGE_BYTES = 4 * 1024 * 1024; // 4MB per file before compression
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];
