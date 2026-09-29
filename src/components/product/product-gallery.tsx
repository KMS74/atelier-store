import Image from "next/image";
import type { Photo } from "@/lib/catalog";

// Swipeable strip on mobile, stacked full-width images from md up.
export function ProductGallery({ images, name }: { images: Photo[]; name: string }) {
  return (
    <div
      role="region"
      aria-label={`${name} images`}
      tabIndex={0}
      className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] md:flex-col md:gap-1 md:overflow-visible"
    >
      {images.map((image, index) => (
        <figure key={image.src} className="relative aspect-4/5 w-full shrink-0 snap-start bg-surface">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            // The first image is the largest thing above the fold.
            preload={index === 0}
            sizes="(min-width: 768px) 58vw, 100vw"
            className="object-cover"
          />
          <figcaption className="absolute right-3 bottom-3 bg-paper/80 px-2 py-1 text-caption md:hidden">
            {index + 1} / {images.length}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
