"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type FallbackImageProps = Omit<ImageProps, "onError" | "fill"> & { alt: string };

// next/image that shows a quiet panel instead of a broken-image icon if loading fails.
// It paints as soon as it arrives: nothing waits for hydration or animates it in.
export function FallbackImage({ alt, ...props }: FallbackImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span role="img" aria-label={alt} className="absolute inset-0 flex items-center justify-center bg-surface">
        <span className="text-caption text-muted">Image unavailable</span>
      </span>
    );
  }

  return <Image {...props} fill alt={alt} onError={() => setFailed(true)} />;
}
