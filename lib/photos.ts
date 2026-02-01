// lib/photos.ts
export type Photo = { id: string; src: string; alt: string };

import homeRaw from "@/data/photos-home.json";
import streetRaw from "@/data/photos-street.json";
import colorRaw from "@/data/photos-color.json";

export const datasets = {
  home: homeRaw as Photo[],
  street: streetRaw as Photo[],
  color: colorRaw as Photo[],
} as const;

export const categories = ["home", "street", "color"] as const;
export type Category = (typeof categories)[number];

export function isCategory(value: string): value is Category {
  return (categories as readonly string[]).includes(value);
}
