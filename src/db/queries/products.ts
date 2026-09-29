// Server-only product reads. Components receive the `Product` shape from `@/lib/product`,
// so they don't depend on the table layout.
import { asc, desc, eq, inArray, ne, sql } from "drizzle-orm";
import { cache } from "react";
import type { Photo, Product } from "@/lib/product";
import { db } from "..";
import { categories, productImages, products } from "../schema";

const withRelations = {
  category: true,
  images: { orderBy: asc(productImages.position) },
  inventory: true,
} as const;

type ProductRow = NonNullable<Awaited<ReturnType<typeof findProduct>>>;

const findProduct = (slug: string) =>
  db.query.products.findFirst({ where: eq(products.slug, slug), with: withRelations });

function toProduct(row: ProductRow): Product {
  const images: Photo[] = row.images.map((image) => ({ src: image.url, alt: image.alt }));
  // The category's lifestyle shot closes every gallery.
  if (row.category.imageUrl) {
    images.push({ src: row.category.imageUrl, alt: row.category.imageAlt ?? row.category.name });
  }

  return {
    slug: row.slug,
    sku: row.sku,
    name: row.name,
    category: { slug: row.category.slug, name: row.category.name },
    price: row.priceCents / 100,
    // No inventory row means nothing to sell.
    stock: row.inventory?.quantity ?? 0,
    description: row.description,
    details: row.details,
    images,
  };
}

/** Cached per request, so a page and its `generateMetadata` share one query. */
export const getProduct = cache(async (slug: string) => {
  const row = await findProduct(slug);
  return row ? toProduct(row) : undefined;
});

/** Products for the given slugs, in the given order. Unknown slugs are skipped. */
export async function getProductsBySlugs(slugs: string[]) {
  if (slugs.length === 0) return [];
  const rows = await db.query.products.findMany({
    where: inArray(products.slug, slugs),
    with: withRelations,
  });
  const bySlug = new Map(rows.map((row) => [row.slug, toProduct(row)]));
  return slugs.flatMap((slug) => bySlug.get(slug) ?? []);
}

/** Same-category products first, then the rest, excluding the product itself. */
export async function getRelatedProducts(product: Product, count = 4) {
  // Look up the id separately: inside db.query, columns of other tables in raw SQL
  // are rewritten to the root table's alias, so a correlated subquery silently breaks.
  const category = await db.query.categories.findFirst({
    where: eq(categories.slug, product.category.slug),
    columns: { id: true },
  });
  const sameCategory = sql`${products.categoryId} = ${category?.id ?? null}`;
  const rows = await db.query.products.findMany({
    where: ne(products.slug, product.slug),
    orderBy: [desc(sameCategory), asc(products.sku)],
    limit: count,
    with: withRelations,
  });
  return rows.map(toProduct);
}

export async function getAllProductSlugs() {
  const rows = await db.select({ slug: products.slug }).from(products);
  return rows.map((row) => row.slug);
}
