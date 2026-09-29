import Link from "next/link";
import { hero } from "@/lib/catalog";
import { StoreImage } from "../store-image";

export function Hero() {
  return (
    <section className="relative h-svh min-h-128 overflow-hidden bg-ink text-paper">
      <StoreImage
        src={hero.image.src}
        alt={hero.image.alt}
        preload
        // Cropped to fill the viewport height, so portrait screens need a wider source.
        sizes="(orientation: portrait) 150vh, 100vw"
        className="object-cover object-[50%_30%]"
      />
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-page pb-12 text-center md:pb-16">
        <p className="text-label">{hero.eyebrow}</p>
        <h1 className="text-headline uppercase">{hero.title}</h1>
        <Link
          href={hero.cta.href}
          className="mt-2 text-caption font-medium underline underline-offset-4"
        >
          {hero.cta.label}
        </Link>
      </div>
    </section>
  );
}
