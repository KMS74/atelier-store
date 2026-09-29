import type { Photo } from "./product";

// Photos are from Unsplash (https://unsplash.com/license). The global image loader
// adds width, quality and format; these helpers add crop parameters.

export const unsplash = (id: string, alt: string, params = ""): Photo => ({
  src: `https://images.unsplash.com/${id}${params && `?${params}`}`,
  alt,
});

// Product shots are cropped to the card's 4:5 frame on the CDN.
export const productShot = (id: string, alt: string) => unsplash(id, alt, "ar=4:5");

// A zoomed crop of the product shot, used as the gallery's detail view.
export const detailShot = (id: string, alt: string, x = 0.5, y = 0.5, zoom = 2.2) =>
  unsplash(id, alt, `ar=4:5&crop=focalpoint&fp-x=${x}&fp-y=${y}&fp-z=${zoom}`);

/**
 * A ~1 KB, 16px-wide version of an Unsplash image, shown blurred while the full
 * image downloads. Keeps the crop params so it matches the framed image.
 * Returns undefined for other hosts, which can't be resized.
 */
export function previewUrl(src: string) {
  if (!src.startsWith("https://images.unsplash.com/")) return undefined;
  const url = new URL(src);
  url.searchParams.set("w", "16");
  url.searchParams.set("q", "40");
  url.searchParams.set("fm", "jpg");
  url.searchParams.set("fit", "crop");
  // Swap the embedded ICC profile (~3 KB) for a tiny sRGB one.
  url.searchParams.set("cs", "tinysrgb");
  return url.toString();
}
