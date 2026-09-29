import { getStockState, stockLabel } from "@/lib/product";

// No accent colors in the palette, so the state reads from its text plus a filled, outlined or grey marker.
const markerStyles = {
  "in-stock": "bg-ink",
  "low-stock": "border border-ink",
  "sold-out": "bg-muted",
} as const;

export function StockStatus({ stock }: { stock: number }) {
  const state = getStockState(stock);

  return (
    <p className={`flex items-center gap-2 text-label ${state === "sold-out" ? "text-muted" : ""}`}>
      <span aria-hidden="true" className={`size-2 rounded-full ${markerStyles[state]}`} />
      {stockLabel(stock)}
    </p>
  );
}
