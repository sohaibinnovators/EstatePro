import Image from "next/image";
import { HeroSearch } from "./HeroSearch";

export function Hero() {
  return (
    <section className="relative isolate min-h-[calc(100vh-4.5rem)] overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2000&h=1200&fit=crop"
        alt="Modern luxury home exterior at dusk"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-navy/20" />

      <div className="container-ep relative flex min-h-[calc(100vh-4.5rem)] flex-col justify-center py-16 md:py-20">
        <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.28em] text-gold">
          EstatePro
        </p>
        <h1 className="animate-fade-up delay-100 mt-4 max-w-3xl font-display text-5xl font-semibold leading-[1.05] text-white md:text-6xl lg:text-7xl">
          Find Your Place.
          <br />
          Build Your Future.
        </h1>
        <p className="animate-fade-up delay-200 mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
          Discover exceptional homes for sale and rent across Lahore, Karachi,
          and Islamabad — curated listings, trusted agents, and clear search.
        </p>
        <div className="mt-8 md:mt-10">
          <HeroSearch />
        </div>
      </div>
    </section>
  );
}
