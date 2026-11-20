import { AgentCard } from "@/components/agents/AgentCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { agents } from "@/lib/data/agents";
import { IconArrowRight } from "@/components/icons";

export function MeetAgents() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-ep">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Our agents"
            title="Meet the people behind every successful move"
            description="Experienced advisors ready to guide your search, negotiation, and next listing."
          />
          <Button href="/agents" variant="secondary" className="shrink-0 self-start">
            All Agents
            <IconArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agents.slice(0, 3).map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </section>
  );
}
