import type { Property } from "./types";

function scoreAgainstSeeds(candidate: Property, seeds: Property[]): number {
  let score = 0;
  for (const seed of seeds) {
    if (candidate.id === seed.id) continue;
    if (candidate.areaName === seed.areaName) score += 5;
    if (candidate.city === seed.city) score += 4;
    if (candidate.type === seed.type) score += 3;
    if (candidate.status === seed.status) score += 1;
    const priceDiff = Math.abs(candidate.price - seed.price);
    const band = Math.max(seed.price * 0.35, 1);
    if (priceDiff <= band) score += 2;
  }
  return score;
}

/** Recommend listings based on recently viewed / saved seeds. */
export function getRecommendedProperties(
  catalog: Property[],
  seedIds: string[],
  excludeIds: string[] = [],
  limit = 6,
): Property[] {
  const byId = new Map(catalog.map((p) => [p.id, p]));
  const seeds = seedIds
    .map((id) => byId.get(id))
    .filter((p): p is Property => Boolean(p));

  if (seeds.length === 0) return [];

  const exclude = new Set([...excludeIds, ...seeds.map((s) => s.id)]);

  return catalog
    .filter((p) => !exclude.has(p.id))
    .map((p) => ({ p, score: scoreAgainstSeeds(p, seeds) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p);
}

export function getSimilarByRules(
  catalog: Property[],
  property: Property,
  limit = 3,
): Property[] {
  return catalog
    .filter((p) => p.id !== property.id)
    .map((p) => {
      let score = 0;
      if (p.areaName === property.areaName) score += 5;
      if (p.city === property.city) score += 4;
      if (p.type === property.type) score += 3;
      if (p.status === property.status) score += 1;
      const priceDiff = Math.abs(p.price - property.price);
      const band = Math.max(property.price * 0.4, 1);
      if (priceDiff <= band) score += 2;
      return { p, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p);
}
