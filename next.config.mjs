import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * There is a stray package-lock.json in the user's home directory, so Next
 * infers /Users/apple as the workspace root and file-traces the whole home
 * tree — cold start and builds go from seconds to minutes. Pin it here.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),

  /**
   * /hire is unchanged and stays the ad destination — existing creative keeps
   * working untouched. These are insurance for the plausible near-misses: a
   * link typed from memory, an old bio link, a URL shortened by hand. A cold
   * click that costs money to buy should never land on a 404.
   */
  async redirects() {
    return [
      { source: "/start", destination: "/hire", permanent: false },
      { source: "/quote", destination: "/hire", permanent: false },
      { source: "/pricing", destination: "/#price", permanent: false },
      { source: "/contact", destination: "/#start", permanent: false },
      { source: "/work", destination: "/#work", permanent: false },
      { source: "/works", destination: "/#work", permanent: false },
    ];
  },
};

export default nextConfig;
