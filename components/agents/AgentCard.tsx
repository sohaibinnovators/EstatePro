import Image from "next/image";
import type { Agent } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { IconMail, IconMapPin, IconPhone } from "@/components/icons";
import { getAgentListingCount } from "@/lib/data/properties";

export function AgentCard({
  agent,
  listingCount,
}: {
  agent: Agent;
  listingCount?: number;
}) {
  const count =
    typeof listingCount === "number"
      ? listingCount
      : getAgentListingCount(agent.id);

  return (
    <article className="overflow-hidden rounded-xl border border-border bg-white shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow)]">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={agent.image}
          alt={agent.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-5">
        <h3 className="font-display text-2xl font-semibold text-navy">
          {agent.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-gold">{agent.position}</p>
        <p className="mt-3 text-sm text-muted">
          {agent.experience} experience · {count} listing
          {count === 1 ? "" : "s"}
        </p>
        <p className="mt-2 text-sm text-muted">
          {agent.specialties.slice(0, 2).join(" · ")}
        </p>
        <p className="mt-3 flex items-start gap-2 text-sm text-muted">
          <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-navy" />
          {agent.serviceAreas.slice(0, 3).join(", ")}
        </p>
        <div className="mt-4 space-y-2 text-sm text-muted">
          <p className="flex items-center gap-2">
            <IconPhone className="h-4 w-4 shrink-0 text-navy" />
            {agent.phone}
          </p>
          <p className="flex items-center gap-2 truncate">
            <IconMail className="h-4 w-4 shrink-0 text-navy" />
            {agent.email}
          </p>
        </div>
        <Button
          href={`/agents/${agent.slug}`}
          variant="secondary"
          className="mt-5 w-full"
        >
          View Profile
        </Button>
      </div>
    </article>
  );
}
