import { CollectionGrid } from "@/components/home/collection-grid";
import { CraftStory } from "@/components/home/craft-story";
import { EditorialTriptych } from "@/components/home/editorial-triptych";
import { Hero } from "@/components/home/hero";
import { ProductSection } from "@/components/home/product-section";
import { StoreFeature } from "@/components/home/store-feature";
import { getProductsBySlugs } from "@/db/queries/products";
import { leatherGoodsSlugs, newArrivalSlugs } from "@/lib/catalog";

// Refresh product data (stock, prices) at most once a minute.
export const revalidate = 60;

export default async function Home() {
  const [newArrivals, leatherGoods] = await Promise.all([
    getProductsBySlugs(newArrivalSlugs),
    getProductsBySlugs(leatherGoodsSlugs),
  ]);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-3xl px-page py-20 text-center md:py-28">
        <p className="text-label text-muted">The Collection</p>
        <p className="mt-6 text-title font-light uppercase">
          Sharp tailoring, saturated colour and leather worked by hand. A season built on
          pieces that hold their shape and their meaning.
        </p>
      </section>

      <EditorialTriptych />

      <ProductSection eyebrow="Just Arrived" title="New In" href="/collections/new-in" products={newArrivals} />

      <CraftStory />

      <CollectionGrid />

      <ProductSection
        eyebrow="Crafted in Leather"
        title="Leather Goods"
        href="/collections/handbags"
        products={leatherGoods}
      />

      <StoreFeature />
    </>
  );
}
