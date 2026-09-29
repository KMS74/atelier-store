// Seed data for the catalog tables: the storefront's original sample products.
import type { Photo } from "@/lib/product";
import { detailShot, productShot } from "@/lib/unsplash";

export type SeedCategory = {
  slug: string;
  name: string;
  image: Photo;
};

export type SeedProduct = {
  slug: string;
  sku: string;
  name: string;
  categorySlug: string;
  priceCents: number;
  stock: number;
  description: string;
  details: string[];
  /** The product's own images in gallery order. The category image is appended at read time. */
  images: Photo[];
};

// Each category's image is the lifestyle shot shown last in its products' galleries.
const handbagsImage = productShot(
  "photo-1537440437066-c585a62baf1f",
  "Black leather top handle bag carried against a grey wall",
);

const categories = {
  handbags: { slug: "handbags", name: "Handbags", image: handbagsImage },
  shoes: {
    slug: "shoes",
    name: "Shoes",
    image: productShot("photo-1499013819532-e4ff41b00669", "Blush patent brogues on a marble surface beside eucalyptus"),
  },
  travel: { slug: "travel", name: "Travel", image: handbagsImage },
} satisfies Record<string, SeedCategory>;

export const seedCategories: SeedCategory[] = Object.values(categories);

type ProductInput = Omit<SeedProduct, "categorySlug" | "priceCents" | "images"> & {
  category: SeedCategory;
  /** Whole dollars. */
  price: number;
  photo: { id: string; alt: string; detail?: [x: number, y: number, zoom?: number] };
};

const product = ({ category, price, photo, ...input }: ProductInput): SeedProduct => ({
  ...input,
  categorySlug: category.slug,
  priceCents: price * 100,
  images: [
    productShot(photo.id, photo.alt),
    detailShot(photo.id, `${input.name}, detail`, ...(photo.detail ?? [])),
  ],
});

export const seedProducts: SeedProduct[] = [
  product({
    slug: "grey-leather-satchel",
    sku: "AT-HB-0142",
    name: "Grained Leather Satchel",
    category: categories.handbags,
    price: 2450,
    stock: 8,
    description:
      "A compact satchel in pebble-grained calfskin, fastened with twin buckle straps and finished with a detachable shoulder strap for wearing by hand or across the body.",
    details: [
      "Grained calfskin leather",
      "Gold-toned hardware",
      "Twin buckle closure",
      "Detachable, adjustable shoulder strap",
      "22 x 16 x 8 cm",
      "Made in Italy",
    ],
    photo: {
      id: "photo-1605733513597-a8f8341084e6",
      alt: "Grey leather satchel with gold buckles",
      detail: [0.5, 0.55],
    },
  }),
  product({
    slug: "yellow-top-handle-bag",
    sku: "AT-HB-0157",
    name: "Croc-Effect Top Handle Bag",
    category: categories.handbags,
    price: 2890,
    stock: 2,
    description:
      "A structured top handle bag in croc-embossed leather, with a sculpted handle, expandable gusset sides and a polished turn-lock closure.",
    details: [
      "Croc-embossed calfskin leather",
      "Silver-toned turn-lock closure",
      "Leather-lined interior with slip pocket",
      "Expandable gusset sides",
      "26 x 20 x 11 cm",
      "Made in Italy",
    ],
    photo: {
      id: "photo-1640901555383-7335ec5a6476",
      alt: "Yellow croc-effect leather top handle bag",
      detail: [0.45, 0.55],
    },
  }),
  product({
    slug: "leather-brogue",
    sku: "AT-SH-0311",
    name: "Leather Brogue",
    category: categories.shoes,
    price: 1150,
    stock: 12,
    description:
      "A classic wingtip brogue, cut from full-grain leather with hand-punched perforations and Goodyear-welted so it can be resoled for years of wear.",
    details: [
      "Full-grain calfskin leather",
      "Hand-punched broguing",
      "Goodyear-welted leather sole",
      "Leather lining",
      "Made in Italy",
    ],
    photo: {
      id: "photo-1641893843833-a006778dc00b",
      alt: "Pair of burgundy leather brogues",
      detail: [0.55, 0.55],
    },
  }),
  product({
    slug: "pointed-pump",
    sku: "AT-SH-0328",
    name: "Pointed Pump 95",
    category: categories.shoes,
    price: 980,
    stock: 0,
    description:
      "A pointed-toe pump on a slender 95mm heel, cut from smooth black nappa leather with a lacquered sole.",
    details: [
      "Nappa leather upper",
      "95mm heel",
      "Lacquered leather sole",
      "Cushioned leather insole",
      "Made in Italy",
    ],
    photo: {
      id: "photo-1596702874230-b5706dfb5bc7",
      alt: "Black leather pointed-toe pumps on a yellow cushion",
      detail: [0.62, 0.8],
    },
  }),
  product({
    slug: "vintage-leather-messenger",
    sku: "AT-HB-0188",
    name: "Heritage Messenger",
    category: categories.handbags,
    price: 2150,
    stock: 5,
    description:
      "A messenger bag in vegetable-tanned leather that darkens and softens with use, with a push-lock flap and a wide, adjustable strap.",
    details: [
      "Vegetable-tanned leather",
      "Brass push-lock closure",
      "Adjustable canvas and leather strap",
      "Interior zip pocket",
      "34 x 26 x 10 cm",
      "Made in Italy",
    ],
    photo: {
      id: "photo-1711548244653-72219aa9ac27",
      alt: "Brown leather messenger bag with a flap closure",
      detail: [0.5, 0.5],
    },
  }),
  product({
    slug: "woven-tote",
    sku: "AT-HB-0203",
    name: "Woven Raffia Tote",
    category: categories.handbags,
    price: 1390,
    stock: 3,
    description:
      "An open tote hand-woven from natural raffia, with rolled leather handles long enough to carry on the shoulder.",
    details: [
      "Hand-woven raffia",
      "Rolled leather handles",
      "Cotton-lined interior with zip pouch",
      "40 x 30 x 15 cm",
      "Handmade in Madagascar",
    ],
    photo: {
      id: "photo-1524679813234-66a389fe1a42",
      alt: "Two woven tote bags with leather handles",
      detail: [0.5, 0.6],
    },
  }),
  product({
    slug: "ring-handle-bucket-bag",
    sku: "AT-HB-0219",
    name: "Ring Handle Bucket Bag",
    category: categories.handbags,
    price: 1790,
    stock: 6,
    description:
      "A softly slouched bucket bag in oxblood leather, carried from a turned-wood ring handle.",
    details: [
      "Smooth calfskin leather",
      "Turned-wood ring handle",
      "Magnetic closure",
      "Suede-lined interior",
      "24 x 25 x 12 cm",
      "Made in Italy",
    ],
    photo: {
      id: "photo-1579429713897-b98f6afbc295",
      alt: "Oxblood leather bag with a wooden ring handle beside sunglasses",
      detail: [0.55, 0.5],
    },
  }),
  product({
    slug: "soft-weekender",
    sku: "AT-TR-0402",
    name: "Soft Leather Weekender",
    category: categories.travel,
    price: 3200,
    stock: 4,
    description:
      "A generous, unstructured weekender in supple white leather, sized for two nights away and fitting most cabin overhead bins.",
    details: [
      "Supple lambskin leather",
      "Two-way zip closure",
      "Detachable shoulder strap",
      "Interior zip and slip pockets",
      "50 x 28 x 24 cm",
      "Made in Italy",
    ],
    photo: {
      id: "photo-1615206928955-ce0ffbb7ca5a",
      alt: "White leather weekender bag on a wooden bench",
      detail: [0.5, 0.45],
    },
  }),
];
