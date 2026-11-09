import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Static export for cPanel / Apache — output is written to `out/`. */
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
