import type { ImageProps } from "next/image";
import { previewUrl } from "@/lib/unsplash";
import { FallbackImage } from "./fallback-image";

type StoreImageProps = Omit<ImageProps, "src" | "onError" | "placeholder" | "fill"> & {
  src: string;
  alt: string;
};

// The storefront's image component. Fills its parent, which must be `relative` and
// `overflow-hidden`. A tiny blurred preview sits underneath; the full image paints
// straight over it the moment it arrives.
export function StoreImage({ src, className = "", loading, preload, ...props }: StoreImageProps) {
  const preview = previewUrl(src);

  return (
    <>
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element -- 1 KB preview, already sized by the CDN
        <img
          src={preview}
          alt=""
          aria-hidden="true"
          // Load it with the same priority as the image it stands in for.
          loading={preload ? "eager" : (loading ?? "lazy")}
          decoding="async"
          className="absolute inset-0 size-full scale-110 object-cover blur-xl"
        />
      )}
      <FallbackImage
        src={src}
        loading={loading}
        preload={preload}
        // Only the hover zoom animates; the image itself appears immediately.
        className={`transition-[scale] duration-700 ease-out ${className}`}
        {...props}
      />
    </>
  );
}
