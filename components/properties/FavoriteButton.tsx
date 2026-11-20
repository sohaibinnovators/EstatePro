"use client";

import { IconHeart } from "@/components/icons";
import { useFavorites } from "@/components/favorites/FavoritesProvider";
import { useCatalog } from "@/components/catalog/CatalogProvider";
import { pushNotification } from "@/lib/notifications";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  propertyId,
  className,
  size = "md",
}: {
  propertyId: string;
  className?: string;
  size?: "sm" | "md";
}) {
  const { isFavorite, toggle, ready } = useFavorites();
  const { catalog } = useCatalog();
  const fav = ready && isFavorite(propertyId);

  return (
    <button
      type="button"
      aria-label={fav ? "Remove from saved properties" : "Save property"}
      aria-pressed={fav}
      disabled={!ready}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const wasFav = isFavorite(propertyId);
        toggle(propertyId);
        const property = catalog.find((p) => p.id === propertyId);
        const title = property?.title || "Property";
        if (wasFav) {
          pushNotification({
            type: "favorite_removed",
            title: "Removed from saved",
            message: `${title} was removed from your saved list.`,
            href: "/saved",
          });
        } else {
          pushNotification({
            type: "favorite_added",
            title: "Saved to favorites",
            message: `${title} was added to your saved list.`,
            href: property ? `/properties/${property.slug}` : "/saved",
          });
        }
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-white/95 text-navy shadow-[var(--shadow-sm)] transition-colors hover:text-gold disabled:opacity-60",
        fav && "text-gold",
        size === "sm" ? "h-8 w-8" : "h-10 w-10",
        className,
      )}
    >
      <IconHeart
        className={size === "sm" ? "h-4 w-4" : "h-5 w-5"}
        filled={fav}
      />
    </button>
  );
}
