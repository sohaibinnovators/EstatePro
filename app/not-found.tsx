import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="container-ep flex flex-col items-center py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        404
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-navy">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/" variant="gold">
          Back Home
        </Button>
        <Button href="/properties" variant="secondary">
          Browse Properties
        </Button>
      </div>
    </div>
  );
}
