"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Category = "home" | "street" | "color";

export default function CategoryButtons() {
  const pathname = usePathname();

  const current: Category =
    pathname === "/street" ? "street" : pathname === "/color" ? "color" : "home";

  const baseBtn =
    "flex h-12 w-full items-center justify-center px-5 transition-colors md:w-[158px]";

  const clipPathStyle = {
    clipPath: "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
  } as const;

  const getBtnClass = (key: Category) =>
    [
      baseBtn,
      current === key
        ? "bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] inline-flex items-center justify-center px-6 py-3 font-semibold transition"
        : "border border-solid border-black/[.08] hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]",
    ].join(" ");

  return (
    <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
      <Link href="/" className={getBtnClass("home")} style={clipPathStyle}>
        Home
      </Link>

      <Link href="/street" className={getBtnClass("street")} style={clipPathStyle}>
        Street
      </Link>

      <Link href="/color" className={getBtnClass("color")} style={clipPathStyle}>
        Color
      </Link>
    </div>
  );
}
