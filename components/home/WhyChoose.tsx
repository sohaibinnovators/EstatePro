import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconCheck } from "@/components/icons";

const reasons = [
  {
    title: "Curated Inventory",
    body: "Every listing is reviewed for clarity, photography quality, and accurate property details.",
  },
  {
    title: "Trusted Local Agents",
    body: "Work with specialists who know the neighborhoods, pricing dynamics, and negotiation nuances.",
  },
  {
    title: "Clear Search Experience",
    body: "Filter by status, type, location, and budget — then compare homes with confidence.",
  },
  {
    title: "End-to-End Guidance",
    body: "From first inquiry to listing your own property, EstatePro keeps the process polished and practical.",
  },
];

export function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-navy py-16 text-white md:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(198,156,93,0.35), transparent 40%), radial-gradient(circle at 80% 70%, rgba(198,156,93,0.2), transparent 35%)",
        }}
      />
      <div className="container-ep relative">
        <SectionHeading
          light
          eyebrow="Why EstatePro"
          title="A premium path to your next address"
          description="We combine market expertise with a refined digital experience so finding — or listing — a property feels intentional."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((item, i) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gold text-navy">
                <IconCheck className="h-5 w-5" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                0{i + 1}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
