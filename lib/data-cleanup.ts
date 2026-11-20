import { getFavoriteIds, setFavoriteIds } from "./favorites";
import { getCompareIds, setCompareIds } from "./compare";
import { pruneRecentViews } from "./recently-viewed";
import { getInquiries, setInquiries } from "./inquiries";
import { properties as demoProperties } from "./data/properties";
import { getUserProperties } from "./user-properties";

/** Build the set of property IDs that still exist (demo + user). */
export function getValidPropertyIds(): Set<string> {
  const ids = new Set<string>();
  for (const p of demoProperties) ids.add(p.id);
  for (const p of getUserProperties()) ids.add(p.id);
  return ids;
}

/**
 * Remove stale property references from favorites, compare, recently viewed,
 * and inquiry records after deletes or catalog changes.
 */
export function pruneStalePropertyReferences(
  validIds = getValidPropertyIds(),
): void {
  const favs = getFavoriteIds().filter((id) => validIds.has(id));
  if (favs.length !== getFavoriteIds().length) setFavoriteIds(favs);

  const compare = getCompareIds().filter((id) => validIds.has(id));
  if (compare.length !== getCompareIds().length) setCompareIds(compare);

  pruneRecentViews(validIds);

  const inquiries = getInquiries();
  const nextInquiries = inquiries.map((inq) => {
    if (inq.propertyId && !validIds.has(inq.propertyId)) {
      return {
        ...inq,
        propertyId: undefined,
        propertySlug: undefined,
        propertyTitle: inq.propertyTitle
          ? `${inq.propertyTitle} (listing removed)`
          : "Listing removed",
      };
    }
    return inq;
  });
  if (JSON.stringify(nextInquiries) !== JSON.stringify(inquiries)) {
    setInquiries(nextInquiries);
  }
}

/** Call after a user property is deleted. */
export function cleanupAfterPropertyDelete(deletedId: string): void {
  const valid = getValidPropertyIds();
  valid.delete(deletedId);
  pruneStalePropertyReferences(valid);
}
