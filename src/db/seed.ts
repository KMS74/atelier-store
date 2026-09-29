// Seeds the catalog tables with the sample products. Safe to re-run: rows are
// upserted by slug, and each product's images are replaced.
// Run with `npm run db:seed`.
import "./load-env";
import { eq, inArray, sql } from "drizzle-orm";
import { db } from ".";
import { categories, productImages, productInventory, products } from "./schema";
import { seedCategories, seedProducts } from "./seed/products";

// Keep a column's new value on conflict.
const excluded = (column: string) => sql.raw(`excluded.${column}`);

async function seed() {
  const categoryRows = await db
    .insert(categories)
    .values(
      seedCategories.map((category) => ({
        slug: category.slug,
        name: category.name,
        imageUrl: category.image.src,
        imageAlt: category.image.alt,
      })),
    )
    .onConflictDoUpdate({
      target: categories.slug,
      set: { name: excluded("name"), imageUrl: excluded("image_url"), imageAlt: excluded("image_alt") },
    })
    .returning({ id: categories.id, slug: categories.slug });
  const categoryIds = new Map(categoryRows.map((row) => [row.slug, row.id]));

  const productRows = await db
    .insert(products)
    .values(
      seedProducts.map((product) => {
        const categoryId = categoryIds.get(product.categorySlug);
        if (!categoryId) throw new Error(`Unknown category "${product.categorySlug}" for ${product.slug}`);
        return {
          slug: product.slug,
          sku: product.sku,
          name: product.name,
          description: product.description,
          details: product.details,
          priceCents: product.priceCents,
          categoryId,
        };
      }),
    )
    .onConflictDoUpdate({
      target: products.slug,
      set: {
        sku: excluded("sku"),
        name: excluded("name"),
        description: excluded("description"),
        details: excluded("details"),
        priceCents: excluded("price_cents"),
        categoryId: excluded("category_id"),
        updatedAt: sql`now()`,
      },
    })
    .returning({ id: products.id, slug: products.slug });
  const productIds = new Map(productRows.map((row) => [row.slug, row.id]));
  const idFor = (slug: string) => productIds.get(slug)!;

  // Images and stock in one atomic batch (neon-http has no interactive transactions).
  await db.batch([
    db.delete(productImages).where(inArray(productImages.productId, [...productIds.values()])),
    db.insert(productImages).values(
      seedProducts.flatMap((product) =>
        product.images.map((image, position) => ({
          productId: idFor(product.slug),
          url: image.src,
          alt: image.alt,
          position,
        })),
      ),
    ),
    db
      .insert(productInventory)
      .values(seedProducts.map((product) => ({ productId: idFor(product.slug), quantity: product.stock })))
      .onConflictDoUpdate({
        target: productInventory.productId,
        set: { quantity: excluded("quantity"), updatedAt: sql`now()` },
      }),
  ]);

  const [counts] = await db
    .select({
      categories: sql<number>`(select count(*) from ${categories})::int`,
      products: sql<number>`(select count(*) from ${products})::int`,
      images: sql<number>`(select count(*) from ${productImages})::int`,
      inventory: sql<number>`(select count(*) from ${productInventory})::int`,
    })
    .from(sql`(select 1) as one`);
  console.log("Seeded catalog:", counts);

  const soldOut = await db
    .select({ slug: products.slug })
    .from(products)
    .innerJoin(productInventory, eq(productInventory.productId, products.id))
    .where(eq(productInventory.quantity, 0));
  console.log("Sold out:", soldOut.map((row) => row.slug).join(", ") || "none");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
