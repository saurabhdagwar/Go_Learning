import type { Metadata } from "next";
import { GalleryExperience } from "@/components/GalleryExperience";
import { SectionHeading } from "@/components/SectionHeading";
import { getWebsiteContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getWebsiteContent();
  return { title: content.pageTitles.gallery, description: content.pageDescriptions.gallery };
}

export default async function GalleryPage() {
  const content = await getWebsiteContent();
  return (
    <>
      <section className="page-hero">
        <div className="container"><p className="eyebrow">{content.site.name}</p><h1>{content.pageTitles.gallery}</h1><p className="body-copy">{content.pageDescriptions.gallery}</p></div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading title={content.sectionLabels.gallery} />
          <GalleryExperience items={content.gallery} emptyMessage={content.emptyStates.gallery} />
        </div>
      </section>
    </>
  );
}
