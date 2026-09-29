import Link from "next/link";
import { monochromeEdit } from "@/lib/catalog";
import { StoreImage } from "../store-image";

export function EditorialTriptych() {
  return (
    <section className="relative bg-ink text-paper">
      <div className="grid md:grid-cols-3">
        {monochromeEdit.images.map((image) => (
          <div key={image.src} className="relative aspect-4/5 overflow-hidden md:aspect-portrait">
            <StoreImage src={image.src} alt={image.alt} sizes="(min-width: 768px) 50vw, 130vw" className="object-cover" />
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 pb-10 text-center">
        <h2 className="text-caption font-medium">{monochromeEdit.title}</h2>
        <Link href={monochromeEdit.cta.href} className="text-caption font-medium underline underline-offset-4">
          {monochromeEdit.cta.label}
        </Link>
      </div>
    </section>
  );
}
