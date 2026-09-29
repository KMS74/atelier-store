import Link from "next/link";
import type { Product } from "@/lib/product";
import { ProductCard } from "../product-card";

type ProductSectionProps = {
  eyebrow: string;
  title: string;
  href: string;
  products: Product[];
};

export function ProductSection({ eyebrow, title, href, products }: ProductSectionProps) {
  return (
    <section className="mx-auto max-w-page px-page py-16 md:py-24">
      <div className="mb-8 flex items-end justify-between gap-6 md:mb-12">
        <div>
          <p className="text-label text-muted">{eyebrow}</p>
          <h2 className="mt-2 text-title uppercase">{title}</h2>
        </div>
        <Link href={href} className="shrink-0 text-caption font-medium underline underline-offset-4">
          View All
        </Link>
      </div>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-6">
        {products.map((product) => (
          <li key={product.slug}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
