import Link from "next/link";
import { formatPrice, getStockState, type Product } from "@/lib/catalog";
import { ChevronIcon } from "../icons";
import { AddToBag } from "./add-to-bag";
import { StockStatus } from "./stock-status";

function InfoSection({ title, open, children }: { title: string; open?: boolean; children: React.ReactNode }) {
  return (
    <details open={open} className="group border-b border-line">
      <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-label [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronIcon className="size-4 rotate-90 transition-transform group-open:-rotate-90" />
      </summary>
      <div className="pb-6 text-caption">{children}</div>
    </details>
  );
}

export function ProductInfo({ product }: { product: Product }) {
  const soldOut = getStockState(product.stock) === "sold-out";

  return (
    <div className="flex flex-col">
      <nav aria-label="Breadcrumb" className="text-caption text-muted">
        <ol className="flex gap-2">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`/collections/${product.category.slug}`} className="hover:underline">
              {product.category.name}
            </Link>
          </li>
        </ol>
      </nav>

      <p className="mt-8 text-label text-muted">{product.category.name}</p>
      <h1 className="mt-2 text-title uppercase">{product.name}</h1>
      <p className="mt-4 text-body font-medium">{formatPrice(product.price)}</p>
      <p className="mt-1 text-caption text-muted">Style {product.sku}</p>

      <div className="mt-8">
        <StockStatus stock={product.stock} />
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <AddToBag soldOut={soldOut} />
        <Link
          href="/appointments"
          className="flex h-12 items-center justify-center border border-ink text-label transition-colors hover:bg-ink hover:text-paper"
        >
          {soldOut ? "Ask About Availability" : "Book an Appointment"}
        </Link>
      </div>

      <p className="mt-10 text-body">{product.description}</p>

      <div className="mt-8 border-t border-line">
        <InfoSection title="Product Details" open>
          <ul className="flex list-disc flex-col gap-2 pl-4">
            {product.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </InfoSection>
        <InfoSection title="Shipping & Returns">
          <p>Complimentary express delivery on every order. Returns and exchanges are accepted within 30 days of delivery.</p>
        </InfoSection>
        <InfoSection title="Care">
          <p>Store in the dust bag provided, away from direct sunlight and moisture. Wipe gently with a soft, dry cloth.</p>
        </InfoSection>
      </div>
    </div>
  );
}
