import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-ep">
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&h=900&fit=crop"
            alt="Elegant living room interior"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy/80" />
          <div className="relative px-8 py-16 text-center md:px-16 md:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Ready when you are
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold text-white md:text-5xl">
              List your property with EstatePro
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/75 md:text-lg">
              Reach qualified buyers and renters with refined presentation and
              dedicated agent support.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/list-property" variant="gold" size="lg">
                List Your Property
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Talk to an Advisor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
