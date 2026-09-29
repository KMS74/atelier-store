import Link from "next/link";
import { collections } from "@/lib/catalog";
import { StoreImage } from "../store-image";

export function CollectionGrid() {
  return (
    <section className="mx-auto max-w-page px-page py-16 md:py-24">
      <h2 className="mb-8 text-title uppercase md:mb-12">Shop by Category</h2>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-6">
        {collections.map((collection) => (
          <li key={collection.slug}>
            <Link href={`/collections/${collection.slug}`} className="group block">
              <div className="relative aspect-3/4 overflow-hidden bg-surface">
                <StoreImage
                  src={collection.image.src}
                  alt={collection.image.alt}
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover group-hover:scale-105"
                />
              </div>
              <h3 className="mt-3 text-nav font-medium group-hover:underline">{collection.name}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
