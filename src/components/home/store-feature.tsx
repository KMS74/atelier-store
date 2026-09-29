import Link from "next/link";
import { services, storeFeature } from "@/lib/catalog";
import { StoreImage } from "../store-image";

export function StoreFeature() {
  return (
    <section>
      <div className="relative h-[70svh] min-h-112 overflow-hidden bg-ink text-paper">
        <StoreImage
          src={storeFeature.image.src}
          alt={storeFeature.image.alt}
          sizes="(orientation: portrait) 110vh, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 px-page pb-12 text-center">
          <h2 className="text-title uppercase">{storeFeature.title}</h2>
          <Link
            href={storeFeature.cta.href}
            className="inline-flex h-12 items-center border border-paper px-10 text-label transition-colors hover:bg-paper hover:text-ink"
          >
            {storeFeature.cta.label}
          </Link>
        </div>
      </div>

      <ul className="mx-auto grid max-w-page gap-8 px-page py-16 md:grid-cols-3 md:gap-6 md:py-20">
        {services.map((service) => (
          <li key={service.title} className="border-t border-line pt-6">
            <h3 className="text-label">{service.title}</h3>
            <p className="mt-3 text-caption text-muted">{service.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
