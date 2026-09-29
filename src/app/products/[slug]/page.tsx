import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductSection } from "@/components/home/product-section";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { getProduct, getRelatedProducts, products } from "@/lib/catalog";

// Only the sample products exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};

  return {
    title: `${product.name} | Atelier Store`,
    description: product.description,
    openGraph: { images: [product.images[0].src] },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  return (
    <div className="pt-header">
      <div className="mx-auto grid max-w-page md:grid-cols-12 md:gap-x-6 md:px-page md:pt-6">
        <div className="md:col-span-7">
          <ProductGallery images={product.images} name={product.name} />
        </div>
        <div className="px-page pt-8 pb-16 md:col-span-5 md:px-0 md:pt-0">
          {/* Info stays in view while the gallery scrolls past on desktop. */}
          <div className="md:sticky md:top-header md:pt-10 lg:px-10">
            <ProductInfo product={product} />
          </div>
        </div>
      </div>

      <div className="border-t border-line md:mt-16">
        <ProductSection
          eyebrow={product.category.name}
          title="You May Also Like"
          href={`/collections/${product.category.slug}`}
          products={getRelatedProducts(product)}
        />
      </div>
    </div>
  );
}
