// Sample storefront content until products and collections come from the database.
// Photos are from Unsplash (https://unsplash.com/license).

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

export type Collection = {
  slug: string;
  name: string;
  image: Photo;
};

const unsplash = (id: string, alt: string, params = ""): Photo => ({
  src: `https://images.unsplash.com/${id}${params && `?${params}`}`,
  alt,
});

// Product shots are cropped to the card's 4:5 frame on the CDN.
const productShot = (id: string, alt: string) => unsplash(id, alt, "ar=4:5");

// A zoomed crop of the product shot, used as the gallery's detail view.
const detailShot = (id: string, alt: string, x = 0.5, y = 0.5, zoom = 2.2) =>
  unsplash(id, alt, `ar=4:5&crop=focalpoint&fp-x=${x}&fp-y=${y}&fp-z=${zoom}`);

const categories = {
  handbags: { slug: "handbags", name: "Handbags" },
  shoes: { slug: "shoes", name: "Shoes" },
  travel: { slug: "travel", name: "Travel" },
} satisfies Record<string, Category>;

// Shared lifestyle shot per category, shown last in each product gallery.
const lifestyle: Record<string, Photo> = {
  handbags: productShot("photo-1537440437066-c585a62baf1f", "Black leather top handle bag carried against a grey wall"),
  shoes: productShot("photo-1499013819532-e4ff41b00669", "Blush patent brogues on a marble surface beside eucalyptus"),
  travel: productShot("photo-1537440437066-c585a62baf1f", "Black leather top handle bag carried against a grey wall"),
};

type ProductInput = Omit<Product, "images"> & {
  photo: { id: string; alt: string; detail?: [x: number, y: number, zoom?: number] };
};

const product = ({ photo, ...input }: ProductInput): Product => ({
  ...input,
  images: [
    productShot(photo.id, photo.alt),
    detailShot(photo.id, `${input.name}, detail`, ...(photo.detail ?? [])),
    lifestyle[input.category.slug],
  ],
});

export const hero = {
  eyebrow: "Autumn-Winter 2026",
  title: "The Colour of Conviction",
  cta: { label: "Discover the Collection", href: "/collections/autumn-winter" },
  image: unsplash(
    "photo-1662532577856-e8ee8b138a8b",
    "Model in a red tailored suit seated against a clear blue sky",
  ),
};

export const monochromeEdit = {
  title: "The Monochrome Edit",
  cta: { label: "Shop Now", href: "/collections/monochrome" },
  images: [
    unsplash("photo-1613915617430-8ab0fd7c6baf", "Model in an oversized grey coat, photographed in black and white"),
    unsplash("photo-1645561305502-63a9ba09ab09", "Model in sunglasses and a wool coat, photographed in black and white"),
    unsplash("photo-1659522761084-79196b64abe4", "Model in a white tailored jacket, photographed in black and white"),
  ],
};

export const products: Product[] = [
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

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

const bySlug = (...slugs: string[]) => slugs.map((slug) => getProduct(slug)!);

export const newArrivals = bySlug("grey-leather-satchel", "yellow-top-handle-bag", "leather-brogue", "pointed-pump");

export const leatherGoods = bySlug("vintage-leather-messenger", "woven-tote", "ring-handle-bucket-bag", "soft-weekender");

/** Same-category products first, then the rest, excluding the product itself. */
export function getRelatedProducts(product: Product, count = 4) {
  const others = products.filter((p) => p.slug !== product.slug);
  const sameCategory = others.filter((p) => p.category.slug === product.category.slug);
  const rest = others.filter((p) => p.category.slug !== product.category.slug);
  return [...sameCategory, ...rest].slice(0, count);
}

export const collections: Collection[] = [
  {
    slug: "women",
    name: "Women",
    image: unsplash("photo-1580478491436-fd6a937acc9e", "Model in a red blazer seated on a staircase"),
  },
  {
    slug: "men",
    name: "Men",
    image: unsplash("photo-1772450235995-ecd6b9c17aab", "Man in a green shirt standing in a garden"),
  },
  {
    slug: "handbags",
    name: "Handbags",
    image: unsplash("photo-1713425885188-f1daa057691f", "Assortment of leather handbags on a white background"),
  },
  {
    slug: "jewelry",
    name: "Jewelry",
    image: unsplash("photo-1606760227091-3dd870d97f1d", "Gold and silver necklaces, earrings and rings"),
  },
];

export const craftStory = {
  eyebrow: "The Atelier",
  title: "Made by Hand, Made to Last",
  body: "Every piece begins at the cutting table. Our artisans shape, stitch and finish each design in small batches, so it wears in rather than out.",
  cta: { label: "Our Craft", href: "/atelier" },
  image: unsplash(
    "photo-1603189343302-e603f7add05a",
    "Silhouette of a model in a wide-sleeved black jacket against a white background",
  ),
};

export const storeFeature = {
  title: "Visit the Boutique",
  cta: { label: "Book an Appointment", href: "/appointments" },
  image: unsplash("photo-1753029226995-74b05a344bb1", "Minimalist boutique interior with garments on display"),
};

export const services = [
  { title: "Complimentary Shipping", body: "Free express delivery on every order." },
  { title: "Returns & Exchanges", body: "Return or exchange within 30 days." },
  { title: "Personal Styling", body: "Book a private appointment in store or online." },
];

export const menu = {
  primary: [
    { label: "New In", href: "/collections/new-in" },
    { label: "Women", href: "/collections/women" },
    { label: "Men", href: "/collections/men" },
    { label: "Handbags", href: "/collections/handbags" },
    { label: "Shoes", href: "/collections/shoes" },
    { label: "Jewelry", href: "/collections/jewelry" },
    { label: "Gifts", href: "/collections/gifts" },
  ],
  secondary: [
    { label: "Search", href: "/search" },
    { label: "Client Services", href: "/services" },
    { label: "The Atelier", href: "/atelier" },
    { label: "Store Locator", href: "/stores" },
  ],
  account: [
    { label: "Sign In", href: "/sign-in" },
    { label: "My Orders", href: "/account/orders" },
  ],
};

export const footerLinks = [
  {
    title: "May We Help You?",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping", href: "/help/shipping" },
      { label: "Returns", href: "/help/returns" },
      { label: "FAQs", href: "/help" },
    ],
  },
  {
    title: "The Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Careers", href: "/careers" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Book an Appointment", href: "/appointments" },
      { label: "Personal Styling", href: "/services/styling" },
      { label: "Gift Wrapping", href: "/services/gifting" },
    ],
  },
];

const priceFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const formatPrice = (amount: number) => priceFormat.format(amount);
