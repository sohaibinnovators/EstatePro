import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { IconMail, IconMapPin, IconPhone } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact EstatePro for buying, renting, or listing support. Our team is ready to help.",
};

export default function ContactPage() {
  return (
    <div>
      <div className="border-b border-border bg-navy">
        <div className="container-ep py-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Contact
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-white md:text-5xl">
            Let&apos;s talk about your next move
          </h1>
          <p className="mt-3 max-w-2xl text-white/70">
            Reach the EstatePro team for buying, renting, or listing support.
            This form is UI-only in Phase 1.
          </p>
        </div>
      </div>

      <div className="container-ep grid gap-10 py-12 md:py-16 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-white p-6 shadow-[var(--shadow-sm)]">
            <h2 className="font-display text-2xl font-semibold text-navy">
              Office
            </h2>
            <ul className="mt-5 space-y-4 text-sm text-muted">
              <li className="flex gap-3">
                <IconMapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span>
                  1200 Market Street, Suite 400
                  <br />
                  San Francisco, CA 94102
                </span>
              </li>
              <li className="flex items-center gap-3">
                <IconPhone className="h-5 w-5 shrink-0 text-gold" />
                +1 (415) 555-0100
              </li>
              <li className="flex items-center gap-3">
                <IconMail className="h-5 w-5 shrink-0 text-gold" />
                hello@estatepro.com
              </li>
            </ul>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="relative flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-navy-soft to-navy">
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "36px 36px",
                }}
              />
              <p className="relative text-sm text-white/80">Map placeholder</p>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
