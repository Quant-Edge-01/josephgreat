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
   * /hire used to be a separate, deliberately stripped landing page for paid
   * traffic. It is gone: once the offer widened to include the website, the
   * page that best proves "you're reading one of the websites" is the full
   * home page, and /hire was the plainest thing on the domain. Sending bought
   * clicks to the least designed page worked against the pitch — roughly half
   * of credibility judgements are made on visual design alone.
   *
   * The address still resolves, and always must: live ad creative points at
   * it, and a click that cost money can never be allowed to 404. Temporary
   * (307) rather than permanent, so the decision stays reversible.
   */
  async redirects() {
    return [
      { source: "/hire", destination: "/", permanent: false },
      { source: "/start", destination: "/", permanent: false },
      { source: "/quote", destination: "/", permanent: false },
      { source: "/pricing", destination: "/#price", permanent: false },
      { source: "/contact", destination: "/#start", permanent: false },
      { source: "/work", destination: "/#work", permanent: false },
      { source: "/works", destination: "/#work", permanent: false },
    ];
  },
};

export default nextConfig;
