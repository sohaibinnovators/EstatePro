"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const FALLBACK =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop";

function isLocalSrc(src: string) {
  return src.startsWith("data:") || src.startsWith("blob:");
}

export function PropertyImage({
  src,
  alt,
  className,
  sizes,
  priority,
  fill = true,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}) {
  const [current, setCurrent] = useState(src || FALLBACK);
  const local = isLocalSrc(current);

  if (local) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={current}
        alt={alt}
        className={cn(
          fill ? "absolute inset-0 h-full w-full object-cover" : "object-cover",
          className,
        )}
        onError={() => {
          if (current !== FALLBACK) setCurrent(FALLBACK);
        }}
      />
    );
  }

  return (
    <Image
      src={current}
      alt={alt}
      fill={fill}
      priority={priority}
      className={cn("object-cover", className)}
      sizes={sizes}
      onError={() => {
        if (current !== FALLBACK) setCurrent(FALLBACK);
      }}
    />
  );
}
