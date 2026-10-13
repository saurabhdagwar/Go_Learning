import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { getWebsiteContent } from "@/lib/content";
import "./globals.css";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getWebsiteContent();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return {
    title: { default: content.seo.title || content.site.name, template: `%s | ${content.site.name}` },
    description: content.seo.description,
    keywords: content.seo.keywords,
    ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
    openGraph: {
      title: content.seo.title || content.site.name,
      description: content.seo.description,
      type: "website",
      ...(siteUrl ? { url: siteUrl } : {}),
    },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const content = await getWebsiteContent();
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header content={content} />
        <main id="main">{children}</main>
        <SiteFooter content={content} />
      </body>
    </html>
  );
}
