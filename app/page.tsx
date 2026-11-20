import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { PropertyTypes } from "@/components/home/PropertyTypes";
import { FeaturedLocations } from "@/components/home/FeaturedLocations";
import { WhyChoose } from "@/components/home/WhyChoose";
import { RecentProperties } from "@/components/home/RecentProperties";
import { RecommendedProperties } from "@/components/home/RecommendedProperties";
import { RecentlyViewedSection } from "@/components/home/RecentlyViewedSection";
import { QuickCategories } from "@/components/home/QuickCategories";
import { RecentSearches } from "@/components/home/RecentSearches";
import { MeetAgents } from "@/components/home/MeetAgents";
import { CTA } from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "EstatePro — Find Your Place. Build Your Future.",
  description:
    "Browse demonstration homes for sale and rent across Lahore, Karachi, and Islamabad. Compare listings, save favorites, and manage demo submissions locally.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <RecentSearches />
      <QuickCategories />
      <FeaturedProperties />
      <RecommendedProperties />
      <PropertyTypes />
      <FeaturedLocations />
      <WhyChoose />
      <RecentProperties />
      <RecentlyViewedSection />
      <MeetAgents />
      <CTA />
    </>
  );
}
