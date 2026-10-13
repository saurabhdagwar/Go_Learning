import type { MetadataRoute } from "next";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!siteUrl) return [];
  const origin = siteUrl.replace(/\/$/, "");
  return ["/", "/about-us", "/services", "/gallery", "/contact"].map((path) => ({
    url: `${origin}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
    lastModified: new Date(),
  }));
}
