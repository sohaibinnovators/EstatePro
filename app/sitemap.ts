import type { MetadataRoute } from "next";
import { properties } from "@/lib/data/properties";
import { agents } from "@/lib/data/agents";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/buy",
    "/rent",
    "/properties",
    "/agents",
    "/about",
    "/contact",
    "/compare",
    "/saved",
    "/list-property",
    "/login",
    "/signup",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const propertyRoutes = properties.map((p) => ({
    url: `${siteUrl}/properties/${p.slug}`,
    lastModified: new Date(p.listedDate),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const agentRoutes = agents.map((a) => ({
    url: `${siteUrl}/agents/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...propertyRoutes, ...agentRoutes];
}
