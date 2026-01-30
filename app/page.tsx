"use client";

import { useMemo, useState } from "react";
import GalleryGrid from "@/components/GalleryGrid";
import homePhotos from "@/data/photos-home.json";
import outdoorPhotos from "@/data/photos-outdoor.json";
import colorPhotos from "@/data/photos-color.json";

export default function Home() {
  const [category, setCategory] = useState("home"); // ✅ default

  const datasets = useMemo(
    () => ({
      home: homePhotos,
      outdoor: outdoorPhotos,
      color: colorPhotos,
    }),
    []
  );

  const photos = datasets[category] ?? [];

  const baseBtn =
    "flex h-12 w-full items-center justify-center rounded-full px-5 transition-colors md:w-[158px]";

  const getBtnClass = (key) =>
    [
      baseBtn,
      category === key
        ? "bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc]"
        : "border border-solid border-black/[.08] hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]",
    ].join(" ");

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between bg-white px-16 py-32 dark:bg-black sm:items-start">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          Tiki Logs
        </h1>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <button
            type="button"
            onClick={() => setCategory("home")}
            className={getBtnClass("home")}
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => setCategory("outdoor")}
            className={getBtnClass("outdoor")}
          >
            Street
          </button>

          <button
            type="button"
            onClick={() => setCategory("color")}
            className={getBtnClass("color")}
          >
            Color
          </button>
        </div>

        <div className="block w-full flex-1 py-10">
          <GalleryGrid photos={photos} />
        </div>

      </main>
    </div>
  );
}
