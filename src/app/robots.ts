import type { MetadataRoute } from "next";

const SITE_URL = "https://usebizflow.com";

/**
 * `force-static` keeps this a build-time route handler, which is what
 * `output: "export"` requires — it emits a real `out/robots.txt`.
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
