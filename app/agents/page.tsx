import type { Metadata } from "next";
import { AgentsDirectory } from "@/components/agents/AgentsDirectory";
import { agents } from "@/lib/data/agents";
import { getAgentListingCount } from "@/lib/data/properties";

export const metadata: Metadata = {
  title: "Our Agents",
  description:
    "Meet EstatePro demonstration agents covering Lahore, Karachi, and Islamabad markets.",
};

export default function AgentsPage() {
  const listingCounts = Object.fromEntries(
    agents.map((a) => [a.id, getAgentListingCount(a.id)]),
  );

  return (
    <div>
      <div className="border-b border-border bg-navy">
        <div className="container-ep py-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Team
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-white md:text-5xl">
            Meet Our Agents
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/70 md:text-lg">
            Demonstration advisors across DHA, Bahria Town, Gulberg, Clifton,
            and F-7 — search by name, city, or specialization.
          </p>
        </div>
      </div>

      <AgentsDirectory agents={agents} listingCounts={listingCounts} />
    </div>
  );
}
