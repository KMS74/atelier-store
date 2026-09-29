import Image from "next/image";
import Link from "next/link";
import { formatPrice, getStockState, stockLabel, type Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  const [image] = product.images;
  const stockState = getStockState(product.stock);

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-4/5 overflow-hidden bg-surface">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            stockState === "sold-out" ? "opacity-60" : ""
          }`}
        />
        {stockState !== "in-stock" && (
          <span className="absolute top-3 left-3 bg-paper px-2 py-1 text-label">
            {stockLabel(product.stock)}
          </span>
        )}
      </div>
      <div className="mt-3 flex flex-col gap-1">
        <p className="text-caption text-muted">{product.category.name}</p>
        <h3 className="text-body group-hover:underline">{product.name}</h3>
        <p className="text-caption font-medium">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
