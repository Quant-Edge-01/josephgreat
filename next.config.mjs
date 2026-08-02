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
};

export default nextConfig;
