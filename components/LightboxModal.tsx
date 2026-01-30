"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { Photo } from "./GalleryGrid";

type Props = {
  isOpen: boolean;
  photo: Photo | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
};

export default function LightboxModal({
  isOpen,
  photo,
  onClose,
  onPrev,
  onNext,
  canPrev,
  canNext,
}: Props) {
  const [scale, setScale] = useState(1);

  const zoomIn = useCallback(() => setScale((s) => Math.min(3, +(s + 0.25).toFixed(2))), []);
  const zoomOut = useCallback(() => setScale((s) => Math.max(1, +(s - 0.25).toFixed(2))), []);
  const resetZoom = useCallback(() => setScale(1), []);

  // Reset zoom cuando cambia la foto o se abre
  useEffect(() => {
    if (isOpen) resetZoom();
  }, [isOpen, photo?.src, resetZoom]);

  // Bloquea scroll del body mientras está abierto
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Teclas: ESC, flechas, +/- (zoom)
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && canPrev) onPrev();
      if (e.key === "ArrowRight" && canNext) onNext();
      if ((e.key === "+" || e.key === "=") && !e.metaKey && !e.ctrlKey) zoomIn();
      if (e.key === "-" && !e.metaKey && !e.ctrlKey) zoomOut();
      if (e.key === "0") resetZoom();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose, onPrev, onNext, canPrev, canNext, zoomIn, zoomOut, resetZoom]);


  const onWheelZoom = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setScale((s) => Math.min(3, Math.max(1, +(s + delta).toFixed(2))));
    },
    []
  );


  const scaleLabel = useMemo(() => `${Math.round(scale * 100)}%`, [scale]);

  if (!isOpen || !photo) return null;

  const btnBase =
    "rounded-full border border-white/20 px-4 py-2 text-white hover:bg-white/10 transition-colors";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Top bar */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 pb-3">
        <div className="text-sm text-white/70">{scaleLabel} · 0 to reset</div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className={[btnBase, !canPrev ? "opacity-40 pointer-events-none" : ""].join(" ")}
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            disabled={!canPrev}
          >
            ←
          </button>

          <button
            type="button"
            className={[btnBase, !canNext ? "opacity-40 pointer-events-none" : ""].join(" ")}
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            disabled={!canNext}
          >
            →
          </button>

          <button
            type="button"
            className={btnBase}
            onClick={(e) => {
              e.stopPropagation();
              zoomOut();
            }}
          >
            −
          </button>

          <button
            type="button"
            className={btnBase}
            onClick={(e) => {
              e.stopPropagation();
              zoomIn();
            }}
          >
            +
          </button>

          <button
            type="button"
            className={btnBase}
            onClick={(e) => {
              e.stopPropagation();
              resetZoom();
            }}
          >
            Reset
          </button>

          <button
            type="button"
            className={btnBase}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            Close
          </button>
        </div>
      </div>

      {/* Image area */}
      <div
        className="mx-auto flex h-[calc(100vh-90px)] max-w-6xl items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onWheel={onWheelZoom}
      >
        <div
          className="relative h-full w-full"
          style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
      </div>
    </div>
  );
}
