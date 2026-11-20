"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { IconChevron, IconChevronLeft, IconClose, IconExpand } from "@/components/icons";

const FALLBACK =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop";

function isLocalSrc(src: string) {
  return src.startsWith("data:") || src.startsWith("blob:");
}

function GalleryImg({
  src,
  alt,
  className,
  priority,
  onError,
  contain,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  onError?: () => void;
  contain?: boolean;
}) {
  if (isLocalSrc(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={cn(
          "absolute inset-0 h-full w-full",
          contain ? "object-contain" : "object-cover",
          className,
        )}
        onError={onError}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      className={cn(contain ? "object-contain" : "object-cover", className)}
      sizes="100vw"
      onError={onError}
    />
  );
}

export function PropertyGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const gallery = useMemo(
    () => (images.length > 0 ? images : [FALLBACK]),
    [images],
  );
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  const srcAt = useCallback(
    (index: number) => (failed[index] ? FALLBACK : gallery[index] || FALLBACK),
    [failed, gallery],
  );

  const go = useCallback(
    (dir: -1 | 1) => {
      setActive((i) => (i + dir + gallery.length) % gallery.length);
    },
    [gallery.length],
  );

  useEffect(() => {
    if (!lightbox) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, go]);

  return (
    <div>
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-xl bg-navy/5 md:aspect-[21/10]"
        tabIndex={0}
        role="region"
        aria-label={`${title} image gallery`}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(-1);
          }
          if (e.key === "ArrowRight") {
            e.preventDefault();
            go(1);
          }
        }}
      >
        <GalleryImg
          src={srcAt(active)}
          alt={`${title} — image ${active + 1}`}
          priority
          onError={() => setFailed((f) => ({ ...f, [active]: true }))}
        />

        <button
          type="button"
          aria-label="Previous image"
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-navy shadow-[var(--shadow-sm)] transition hover:bg-white"
        >
          <IconChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next image"
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-navy shadow-[var(--shadow-sm)] transition hover:bg-white"
        >
          <IconChevron className="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label="Open fullscreen gallery"
          onClick={() => setLightbox(true)}
          className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-2 rounded-md bg-navy/85 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm transition hover:bg-navy"
        >
          <IconExpand className="h-4 w-4" />
          View
        </button>

        <p className="absolute bottom-3 left-3 rounded-md bg-navy/70 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
          {active + 1} / {gallery.length}
        </p>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2 md:gap-3">
        {gallery.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            aria-pressed={active === i}
            className={cn(
              "relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-transparent transition",
              active === i && "ring-gold",
            )}
          >
            <GalleryImg
              src={failed[i] ? FALLBACK : src}
              alt=""
              onError={() => setFailed((f) => ({ ...f, [i]: true }))}
            />
          </button>
        ))}
      </div>

      {lightbox ? (
        <div
          className="fixed inset-0 z-[80] flex flex-col bg-navy/95"
          role="dialog"
          aria-modal="true"
          aria-label="Property image lightbox"
        >
          <div className="flex items-center justify-between px-4 py-3 text-white">
            <p className="text-sm">
              {title} · {active + 1} / {gallery.length}
            </p>
            <button
              type="button"
              aria-label="Close lightbox"
              onClick={() => setLightbox(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10"
            >
              <IconClose className="h-6 w-6" />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-4 pb-6">
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => go(-1)}
              className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 md:left-6"
            >
              <IconChevronLeft className="h-6 w-6" />
            </button>
            <div className="relative h-full max-h-[75vh] w-full max-w-5xl">
              <GalleryImg
                src={srcAt(active)}
                alt={`${title} — fullscreen ${active + 1}`}
                contain
                onError={() => setFailed((f) => ({ ...f, [active]: true }))}
              />
            </div>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => go(1)}
              className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 md:right-6"
            >
              <IconChevron className="h-6 w-6" />
            </button>
          </div>
          <div className="mx-auto flex max-w-3xl gap-2 overflow-x-auto px-4 pb-5">
            {gallery.map((src, i) => (
              <button
                key={`lb-${src}-${i}`}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                aria-pressed={active === i}
                className={cn(
                  "relative h-16 w-24 shrink-0 overflow-hidden rounded-md ring-2 ring-transparent",
                  active === i && "ring-gold",
                )}
              >
                <GalleryImg
                  src={failed[i] ? FALLBACK : src}
                  alt=""
                />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
