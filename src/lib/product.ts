// Product types and display helpers. Keep this module free of database imports
// so both server and client components can use it.

export type Photo = {
  src: string;
  alt: string;
};

export type Category = {
  slug: string;
  name: string;
};

export type Product = {
  slug: string;
  sku: string;
  name: string;
  category: Category;
  /** Whole currency units (stored as cents in the database). */
  price: number;
  /** Units available. 0 means sold out. */
  stock: number;
  description: string;
  details: string[];
  /** First image is the primary product shot used on cards. */
  images: Photo[];
};

export type StockState = "in-stock" | "low-stock" | "sold-out";

export const LOW_STOCK_THRESHOLD = 3;

export function getStockState(stock: number): StockState {
  if (stock <= 0) return "sold-out";
  if (stock <= LOW_STOCK_THRESHOLD) return "low-stock";
  return "in-stock";
}

export function stockLabel(stock: number) {
  switch (getStockState(stock)) {
    case "sold-out":
      return "Sold Out";
    case "low-stock":
      return `Only ${stock} Left`;
    case "in-stock":
      return "In Stock";
  }
}

const priceFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const formatPrice = (amount: number) => priceFormat.format(amount);
