"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import LightboxModal from "./LightboxModal";

export type Photo = {
  id: string;
  src: string;
  alt: string;
};

type GalleryGridProps = {
  photos: Photo[];
};

export default function GalleryGrid({ photos }: GalleryGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const isOpen = activeIndex !== null;
  const activePhoto = useMemo(
    () => (isOpen ? photos[activeIndex] : null),
    [isOpen, activeIndex, photos]
  );

  const open = useCallback((idx: number) => setActiveIndex(idx), []);
  const close = useCallback(() => setActiveIndex(null), []);

  const canPrev = isOpen && activeIndex > 0;
  const canNext = isOpen && activeIndex < photos.length - 1;

  const prev = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : Math.max(0, i - 1)));
  }, []);

  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : Math.min(photos.length - 1, i + 1)));
  }, [photos.length]);

  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              onClick={() => open(idx)}
              className="relative h-[400px] overflow-hidden rounded-[6px] bg-black"
              aria-label={`Abrir ${p.alt}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={idx === 0}
              />
            </button>
          ))}
        </div>
      </div>

      <LightboxModal
        isOpen={isOpen}
        photo={activePhoto}
        onClose={close}
        onPrev={prev}
        onNext={next}
        canPrev={canPrev}
        canNext={canNext}
      />
    </>
  );
}
