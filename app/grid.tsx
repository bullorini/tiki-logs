import Image from "next/image";

export default function Grid({ photos = [] }) {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((p, idx) => (
          <div
            key={p.id}
            className="relative h-[400px] overflow-hidden rounded-[6px] bg-black"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
