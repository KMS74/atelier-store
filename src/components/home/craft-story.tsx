import Link from "next/link";
import { craftStory } from "@/lib/catalog";
import { StoreImage } from "../store-image";

export function CraftStory() {
  return (
    <section className="grid md:grid-cols-2">
      <div className="relative aspect-4/5 overflow-hidden md:aspect-auto md:min-h-176">
        <StoreImage
          src={craftStory.image.src}
          alt={craftStory.image.alt}
          // Landscape source cropped into a portrait frame.
          sizes="(min-width: 768px) 65vw, 170vw"
          className="object-cover object-[25%_0%] md:object-center"
        />
      </div>
      <div className="flex flex-col items-start justify-center px-page py-16 md:px-20 md:py-24">
        <p className="text-label text-muted">{craftStory.eyebrow}</p>
        <h2 className="mt-4 max-w-md text-headline font-light uppercase">{craftStory.title}</h2>
        <p className="mt-6 max-w-md text-body">{craftStory.body}</p>
        <Link
          href={craftStory.cta.href}
          className="mt-10 inline-flex h-12 items-center bg-ink px-10 text-label text-paper transition-opacity hover:opacity-80"
        >
          {craftStory.cta.label}
        </Link>
      </div>
    </section>
  );
}
