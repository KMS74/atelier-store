// Editorial storefront content: hero, curated product lists, collections, menu and footer.
// Products, categories and stock live in the database (see src/db/queries/products.ts).
import type { Photo } from "./product";
import { unsplash } from "./unsplash";

export type Collection = {
  slug: string;
  name: string;
  image: Photo;
};

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

// Hand-picked homepage product rows, in display order.
export const newArrivalSlugs = ["grey-leather-satchel", "yellow-top-handle-bag", "leather-brogue", "pointed-pump"];

export const leatherGoodsSlugs = ["vintage-leather-messenger", "woven-tote", "ring-handle-bucket-bag", "soft-weekender"];

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
