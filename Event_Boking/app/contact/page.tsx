import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { ContactInformation } from "@/components/site-sections";
import { SectionHeading } from "@/components/SectionHeading";
import { getWebsiteContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getWebsiteContent();
  return { title: content.pageTitles.contact, description: content.pageDescriptions.contact };
}

export default async function ContactPage() {
  const content = await getWebsiteContent();
  return (
    <>
      <section className="page-hero">
        <div className="container"><p className="eyebrow">{content.site.name}</p><h1>{content.pageTitles.contact}</h1><p className="body-copy">{content.pageDescriptions.contact}</p></div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading title={content.pageTitles.contact} description={content.pageDescriptions.contact} />
          <div className="contact-grid">
            <ContactInformation content={content} />
            <EnquiryForm content={content} />
          </div>
        </div>
      </section>
    </>
  );
}
