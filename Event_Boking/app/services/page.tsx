import type { Metadata } from "next";
import { ServicesSection } from "@/components/site-sections";
import { getWebsiteContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getWebsiteContent();
  return { title: content.pageTitles.services, description: content.pageDescriptions.services };
}

export default async function ServicesPage() {
  const content = await getWebsiteContent();
  return (
    <>
      <section className="page-hero">
        <div className="container"><p className="eyebrow">{content.site.name}</p><h1>{content.pageTitles.services}</h1><p className="body-copy">{content.pageDescriptions.services}</p></div>
      </section>
      <ServicesSection content={content} />
    </>
  );
}
