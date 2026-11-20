"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Badge } from "@/components/ui/Badge";
import { AMENITY_OPTIONS, FEATURE_OPTIONS } from "@/lib/amenity-options";
import { ALL_AREAS, CITIES, getAreasForCity } from "@/lib/property-search";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  MAX_PROPERTY_IMAGES,
  clearPropertyDraft,
  fileToPersistedDataUrl,
  loadPropertyDraft,
  savePropertyDraft,
  upsertUserProperty,
} from "@/lib/user-properties";
import { pushNotification } from "@/lib/notifications";
import type {
  AreaUnit,
  FurnishingStatus,
  ListingLifecycle,
  PropertyStatus,
  PropertyType,
  UserProperty,
} from "@/lib/types";
import {
  formatArea,
  formatPrice,
  propertyTypeLabel,
  statusLabel,
} from "@/lib/utils";
import { cn } from "@/lib/utils";

type FormState = {
  title: string;
  description: string;
  status: PropertyStatus;
  type: PropertyType;
  city: string;
  areaName: string;
  address: string;
  locationNote: string;
  price: string;
  negotiable: boolean;
  bedrooms: string;
  bathrooms: string;
  kitchens: string;
  area: string;
  plotSize: string;
  areaUnit: AreaUnit;
  furnishing: FurnishingStatus;
  amenities: string[];
  features: string[];
  listingStatus: ListingLifecycle;
};

const STEPS = [
  "Basic",
  "Location",
  "Pricing",
  "Details",
  "Features",
  "Images",
  "Preview",
] as const;

const emptyForm = (): FormState => ({
  title: "",
  description: "",
  status: "sale",
  type: "house",
  city: "Lahore",
  areaName: "DHA Lahore",
  address: "",
  locationNote: "",
  price: "",
  negotiable: false,
  bedrooms: "3",
  bathrooms: "3",
  kitchens: "1",
  area: "10",
  plotSize: "",
  areaUnit: "marla",
  furnishing: "unfurnished",
  amenities: [],
  features: [],
  listingStatus: "pending",
});

export function PropertySubmissionForm({
  existing,
  redirectTo = "/dashboard/properties",
}: {
  existing?: UserProperty;
  redirectTo?: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [images, setImages] = useState<string[]>([]);
  const [imageNote, setImageNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const objectUrls = useRef<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const id = window.setTimeout(() => {
      if (existing) {
        setForm({
          title: existing.title,
          description: existing.description,
          status: existing.status,
          type: existing.type,
          city: existing.city,
          areaName: existing.areaName,
          address: existing.address,
          locationNote: existing.locationNote || "",
          price: String(existing.price),
          negotiable: existing.negotiable,
          bedrooms: String(existing.bedrooms),
          bathrooms: String(existing.bathrooms),
          kitchens: String(existing.kitchens),
          area: String(existing.area),
          plotSize: existing.plotSize ? String(existing.plotSize) : "",
          areaUnit: existing.areaUnit,
          furnishing: existing.furnishing,
          amenities: existing.amenities,
          features: existing.features,
          listingStatus: existing.listingStatus,
        });
        setImages(existing.images);
        return;
      }

      const draft = loadPropertyDraft<{
        form?: FormState;
        images?: string[];
      } | null>(null);
      if (draft?.form) setForm({ ...emptyForm(), ...draft.form });
      if (draft?.images?.length) {
        // Drop ephemeral blob: URLs — they cannot survive a reload.
        setImages(draft.images.filter((src) => !src.startsWith("blob:")));
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, [existing]);

  useEffect(() => {
    if (existing) return;
    const t = setTimeout(() => {
      savePropertyDraft({
        form,
        images: images.filter((src) => !src.startsWith("blob:")),
      });
    }, 500);
    return () => clearTimeout(t);
  }, [form, images, existing]);

  useEffect(() => {
    return () => {
      objectUrls.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const areaOptions = useMemo(() => {
    const list = getAreasForCity(form.city);
    return list.length ? list : ALL_AREAS;
  }, [form.city]);

  function patch(partial: Partial<FormState>) {
    setForm((prev) => ({ ...prev, ...partial }));
  }

  function toggleList(key: "amenities" | "features", value: string) {
    setForm((prev) => {
      const set = new Set(prev[key]);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      return { ...prev, [key]: [...set] };
    });
  }

  function validateStep(index: number): Record<string, string> {
    const next: Record<string, string> = {};
    if (index === 0) {
      if (!form.title.trim()) next.title = "Title is required.";
      if (!form.description.trim() || form.description.trim().length < 20) {
        next.description = "Description must be at least 20 characters.";
      }
    }
    if (index === 1) {
      if (!form.city) next.city = "City is required.";
      if (!form.areaName) next.areaName = "Area is required.";
      if (!form.address.trim()) next.address = "Address is required.";
    }
    if (index === 2) {
      const price = Number(form.price);
      if (!form.price || Number.isNaN(price) || price <= 0) {
        next.price = "Enter a valid positive price in PKR.";
      }
    }
    if (index === 3) {
      const area = Number(form.area);
      if (!form.area || Number.isNaN(area) || area <= 0) {
        next.area = "Enter a positive covered area / size.";
      }
      const beds = Number(form.bedrooms);
      const baths = Number(form.bathrooms);
      if (Number.isNaN(beds) || beds < 0) next.bedrooms = "Invalid bedrooms.";
      if (Number.isNaN(baths) || baths < 0) next.bathrooms = "Invalid bathrooms.";
    }
    return next;
  }

  function goNext() {
    const next = validateStep(step);
    setErrors(next);
    if (Object.keys(next).length) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  async function onPickFiles(files: FileList | null) {
    if (!files?.length) return;
    setImageNote("");
    const remaining = MAX_PROPERTY_IMAGES - images.length;
    if (remaining <= 0) {
      setImageNote(`Maximum ${MAX_PROPERTY_IMAGES} images.`);
      return;
    }

    const selected = Array.from(files).slice(0, remaining);
    const previews: string[] = [];

    for (const file of selected) {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setImageNote("Only JPG, PNG, or WebP images are allowed.");
        continue;
      }
      if (file.size > MAX_IMAGE_BYTES) {
        setImageNote("Each image must be under 4MB before compression.");
        continue;
      }
      const url = URL.createObjectURL(file);
      objectUrls.current.push(url);
      previews.push(url);
    }

    if (previews.length) setImages((prev) => [...prev, ...previews]);
  }

  function removeImage(index: number) {
    setImages((prev) => {
      const url = prev[index];
      if (url?.startsWith("blob:")) {
        URL.revokeObjectURL(url);
        objectUrls.current = objectUrls.current.filter((u) => u !== url);
      }
      return prev.filter((_, i) => i !== index);
    });
  }

  async function persistImages(sources: string[]): Promise<{
    images: string[];
    imagesAreTemporary: boolean;
  }> {
    const out: string[] = [];
    let temporary = false;

    for (const src of sources) {
      if (src.startsWith("data:") || src.startsWith("http")) {
        out.push(src);
        continue;
      }
      if (src.startsWith("blob:")) {
        try {
          const res = await fetch(src);
          const blob = await res.blob();
          const file = new File([blob], "photo.jpg", {
            type: blob.type || "image/jpeg",
          });
          out.push(await fileToPersistedDataUrl(file));
        } catch {
          temporary = true;
        }
      }
    }

    if (out.length === 0) {
      temporary = true;
      out.push(
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop",
      );
    }

    return { images: out, imagesAreTemporary: temporary };
  }

  async function submit(listingStatus: ListingLifecycle) {
    const allErrors = {
      ...validateStep(0),
      ...validateStep(1),
      ...validateStep(2),
      ...validateStep(3),
    };
    setErrors(allErrors);
    if (Object.keys(allErrors).length) {
      setStep(0);
      return;
    }
    if (submitting) return;
    setSubmitting(true);
    setSuccess("");

    try {
      const persisted = await persistImages(images);
      const saved = upsertUserProperty(
        {
          title: form.title,
          description: form.description,
          status: form.status,
          type: form.type,
          city: form.city,
          areaName: form.areaName,
          address: form.address,
          locationNote: form.locationNote,
          price: Number(form.price),
          negotiable: form.negotiable,
          bedrooms: Number(form.bedrooms) || 0,
          bathrooms: Number(form.bathrooms) || 0,
          kitchens: Number(form.kitchens) || 0,
          area: Number(form.area),
          plotSize: Number(form.plotSize) || 0,
          areaUnit: form.areaUnit,
          furnishing: form.furnishing,
          amenities: form.amenities,
          features: form.features,
          images: persisted.images,
          listingStatus,
          imagesAreTemporary: persisted.imagesAreTemporary,
        },
        existing?.id,
      );

      clearPropertyDraft();
      const isUpdate = Boolean(existing?.id);
      pushNotification({
        type: isUpdate
          ? listingStatus !== existing?.listingStatus
            ? "property_status"
            : "property_updated"
          : "property_submitted",
        title: isUpdate
          ? listingStatus !== existing?.listingStatus
            ? "Listing status updated"
            : "Property updated"
          : "Property submitted",
        message: isUpdate
          ? `"${saved.title}" was updated locally (${listingStatus}).`
          : `"${saved.title}" was saved locally as ${listingStatus}.`,
        href:
          listingStatus === "active"
            ? `/properties/${saved.slug}`
            : `/dashboard/properties/${saved.id}/edit`,
      });
      setSuccess(
        listingStatus === "draft"
          ? "Draft saved locally in this browser."
          : "Property saved locally. Active listings appear in public search for this browser only.",
      );
      router.push(
        listingStatus === "active"
          ? `/properties/${saved.slug}`
          : redirectTo,
      );
    } catch (err) {
      setSuccess("");
      setErrors({
        form:
          err instanceof Error
            ? err.message
            : "Could not save this listing in browser storage.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  const previewPrice = Number(form.price) || 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {STEPS.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setStep(i)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide",
              i === step
                ? "bg-navy text-white"
                : "border border-border bg-white text-muted",
            )}
          >
            {i + 1}. {label}
          </button>
        ))}
      </div>

      <p className="rounded-md border border-border bg-bg px-3 py-2 text-xs text-muted">
        Demo submission only — listings are stored in this browser and are not
        published to a real server.
      </p>

      {errors.form ? (
        <p className="text-sm text-red-600">{errors.form}</p>
      ) : null}
      {success ? <p className="text-sm text-navy-muted">{success}</p> : null}

      {step === 0 ? (
        <Section title="Basic information">
          <Input
            label="Property title"
            value={form.title}
            onChange={(e) => patch({ title: e.target.value })}
            error={errors.title}
            required
          />
          <Textarea
            label="Description"
            value={form.description}
            onChange={(e) => patch({ description: e.target.value })}
            error={errors.description}
            required
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              label="Listing type"
              value={form.status}
              onChange={(e) =>
                patch({ status: e.target.value as PropertyStatus })
              }
              options={[
                { value: "sale", label: "For Sale" },
                { value: "rent", label: "For Rent" },
              ]}
            />
            <Select
              label="Property type"
              value={form.type}
              onChange={(e) =>
                patch({ type: e.target.value as PropertyType })
              }
              options={[
                { value: "house", label: "House" },
                { value: "apartment", label: "Apartment" },
                { value: "plot", label: "Plot" },
                { value: "commercial", label: "Commercial" },
              ]}
            />
          </div>
        </Section>
      ) : null}

      {step === 1 ? (
        <Section title="Location">
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              label="City"
              value={form.city}
              onChange={(e) => {
                const city = e.target.value;
                const areas = getAreasForCity(city);
                patch({
                  city,
                  areaName: areas[0] || "",
                });
              }}
              options={CITIES.map((c) => ({ value: c, label: c }))}
              error={errors.city}
            />
            <Select
              label="Area / Society"
              value={form.areaName}
              onChange={(e) => patch({ areaName: e.target.value })}
              options={areaOptions.map((a) => ({ value: a, label: a }))}
              error={errors.areaName}
            />
          </div>
          <Input
            label="Full address"
            value={form.address}
            onChange={(e) => patch({ address: e.target.value })}
            error={errors.address}
            required
          />
          <Textarea
            label="Location description (optional)"
            value={form.locationNote}
            onChange={(e) => patch({ locationNote: e.target.value })}
          />
        </Section>
      ) : null}

      {step === 2 ? (
        <Section title="Pricing">
          <Input
            label="Price (PKR)"
            type="number"
            min={0}
            value={form.price}
            onChange={(e) => patch({ price: e.target.value })}
            error={errors.price}
            required
          />
          <p className="text-sm text-muted">Currency: PKR (fixed for this demo)</p>
          <label className="inline-flex items-center gap-2 text-sm text-navy">
            <input
              type="checkbox"
              checked={form.negotiable}
              onChange={(e) => patch({ negotiable: e.target.checked })}
            />
            Price is negotiable
          </label>
        </Section>
      ) : null}

      {step === 3 ? (
        <Section title="Property details">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Bedrooms"
              type="number"
              min={0}
              value={form.bedrooms}
              onChange={(e) => patch({ bedrooms: e.target.value })}
              error={errors.bedrooms}
            />
            <Input
              label="Bathrooms"
              type="number"
              min={0}
              value={form.bathrooms}
              onChange={(e) => patch({ bathrooms: e.target.value })}
              error={errors.bathrooms}
            />
            <Input
              label="Kitchens"
              type="number"
              min={0}
              value={form.kitchens}
              onChange={(e) => patch({ kitchens: e.target.value })}
            />
            <Select
              label="Area unit"
              value={form.areaUnit}
              onChange={(e) =>
                patch({ areaUnit: e.target.value as AreaUnit })
              }
              options={[
                { value: "marla", label: "Marla" },
                { value: "kanal", label: "Kanal" },
                { value: "sqft", label: "Sq Ft" },
              ]}
            />
            <Input
              label="Covered area / size"
              type="number"
              min={0}
              value={form.area}
              onChange={(e) => patch({ area: e.target.value })}
              error={errors.area}
              required
            />
            <Input
              label="Plot size (optional)"
              type="number"
              min={0}
              value={form.plotSize}
              onChange={(e) => patch({ plotSize: e.target.value })}
            />
            <Select
              label="Furnishing"
              value={form.furnishing}
              onChange={(e) =>
                patch({ furnishing: e.target.value as FurnishingStatus })
              }
              options={[
                { value: "unfurnished", label: "Unfurnished" },
                { value: "semi-furnished", label: "Semi-furnished" },
                { value: "furnished", label: "Furnished" },
              ]}
            />
            <Select
              label="Listing status"
              value={form.listingStatus}
              onChange={(e) =>
                patch({
                  listingStatus: e.target.value as ListingLifecycle,
                })
              }
              options={[
                { value: "draft", label: "Draft" },
                { value: "pending", label: "Pending" },
                { value: "active", label: "Active" },
              ]}
            />
          </div>
        </Section>
      ) : null}

      {step === 4 ? (
        <Section title="Features & amenities">
          <ChipGroup
            label="Amenities"
            options={[...AMENITY_OPTIONS]}
            selected={form.amenities}
            onToggle={(v) => toggleList("amenities", v)}
          />
          <ChipGroup
            label="Features"
            options={[...FEATURE_OPTIONS]}
            selected={form.features}
            onToggle={(v) => toggleList("features", v)}
          />
        </Section>
      ) : null}

      {step === 5 ? (
        <Section title="Property images">
          <p className="text-sm text-muted">
            Up to {MAX_PROPERTY_IMAGES} images (JPG/PNG/WebP, max 4MB each).
            Previews use temporary browser URLs; on save we compress to local
            data URLs when possible. Object URLs do not survive refresh until
            you submit.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_IMAGE_TYPES.join(",")}
            multiple
            className="hidden"
            onChange={(e) => {
              void onPickFiles(e.target.files);
              e.target.value = "";
            }}
          />
          <Button
            type="button"
            variant="secondary"
            onClick={() => fileInputRef.current?.click()}
          >
            Select images
          </Button>
          {imageNote ? (
            <p className="text-sm text-red-600">{imageNote}</p>
          ) : null}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {images.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute right-2 top-2 rounded bg-navy/80 px-2 py-1 text-xs text-white"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {step === 6 ? (
        <Section title="Preview listing">
          <article className="overflow-hidden rounded-xl border border-border bg-white shadow-[var(--shadow-sm)]">
            <div className="relative aspect-[16/10] bg-bg">
              {images[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={images[0]}
                  alt={form.title || "Preview"}
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>
            <div className="p-5">
              <div className="flex flex-wrap gap-2">
                <Badge variant="navy">{statusLabel(form.status)}</Badge>
                <Badge>{propertyTypeLabel(form.type)}</Badge>
                {form.negotiable ? <Badge variant="light">Negotiable</Badge> : null}
              </div>
              <p className="mt-3 text-xl font-semibold text-navy">
                {previewPrice
                  ? formatPrice(previewPrice, form.status)
                  : "Price TBD"}
              </p>
              <h3 className="mt-1 font-display text-2xl font-semibold text-navy">
                {form.title || "Untitled property"}
              </h3>
              <p className="mt-2 text-sm text-muted">
                {form.address
                  ? `${form.address}, ${form.areaName}, ${form.city}`
                  : `${form.areaName}, ${form.city}`}
              </p>
              <p className="mt-3 text-sm text-muted">
                {form.bedrooms || 0} beds · {form.bathrooms || 0} baths ·{" "}
                {form.area
                  ? formatArea(Number(form.area), form.areaUnit)
                  : "Size TBD"}{" "}
                · {form.furnishing}
              </p>
              <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-muted">
                {form.description || "No description yet."}
              </p>
            </div>
          </article>
        </Section>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <Button
          type="button"
          variant="secondary"
          disabled={step === 0 || submitting}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
        >
          Back
        </Button>
        <div className="flex flex-wrap gap-2">
          {step < STEPS.length - 1 ? (
            <Button type="button" variant="gold" onClick={goNext}>
              Continue
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="secondary"
                disabled={submitting}
                onClick={() => void submit("draft")}
              >
                Save draft
              </Button>
              <Button
                type="button"
                variant="secondary"
                disabled={submitting}
                onClick={() => void submit("pending")}
              >
                Submit as pending
              </Button>
              <Button
                type="button"
                variant="gold"
                disabled={submitting}
                onClick={() => void submit("active")}
              >
                {submitting ? "Saving…" : "Submit property"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-xl border border-border bg-white p-5 shadow-[var(--shadow-sm)] md:p-6">
      <h2 className="font-display text-2xl font-semibold text-navy">{title}</h2>
      {children}
    </section>
  );
}

function ChipGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-navy">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const on = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition",
                on
                  ? "border-navy bg-navy text-white"
                  : "border-border bg-white text-muted hover:border-gold",
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
