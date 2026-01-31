import { notFound } from "next/navigation";
import GalleryGrid from "@/components/GalleryGrid";
import CategoryButtons from "@/components/CategoryButtons";
import { datasets, isCategory } from "@/lib/photos";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function Page({ params }: Props) {
  const { category } = await params;

  if (!isCategory(category)) return notFound();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <header className="flex w-full max-w-3xl flex-col items-center justify-between bg-white px-16 pt-32 dark:bg-black sm:items-start gap-4">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          Tiki Logs
        </h1>

        <CategoryButtons />
      </header>

      <main className="flex w-full align-center justify-center px-4 py-16 sm:px-8 md:py-24 lg:px-16 lg:py-32">
        <GalleryGrid key={category} photos={datasets[category]} />
      </main>
    </div>
  );
}
