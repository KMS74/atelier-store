import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Unsplash resizes on its own CDN, so images skip the Next.js optimizer.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    qualities: [75],
  },
};

export default nextConfig;
