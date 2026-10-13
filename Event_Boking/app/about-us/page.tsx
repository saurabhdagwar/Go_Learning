import type { Metadata } from "next";
import { BenefitsSection, FAQSection, FounderSection, FounderVideo, TrustSection } from "@/components/site-sections";
import { SectionHeading } from "@/components/SectionHeading";
import { getWebsiteContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getWebsiteContent();
  return { title: content.pageTitles.about, description: content.pageDescriptions.about };
}

export default async function AboutPage() {
  const content = await getWebsiteContent();
  const profileSections = [
    { title: content.sectionLabels.mission, value: content.about.mission },
    { title: content.sectionLabels.vision, value: content.about.vision },
  ].filter((section) => section.value);
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{content.site.name}</p>
          <h1>{content.pageTitles.about}</h1>
          <p className="body-copy">{content.about.shortDescription}</p>
        </div>
      </section>
      <TrustSection content={content} />
      <section className="section">
        <div className="container split-section">
          <div className="about-art" aria-hidden="true"><div className="about-art-mark">{content.site.name.slice(0, 1)}</div></div>
          <div>
            <p className="eyebrow">{content.site.partnership}</p>
            <h2>{content.about.title}</h2>
            <p className="body-copy">{content.about.description}</p>
            {content.site.certification && <p className="text-link">{content.site.certification}</p>}
          </div>
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <SectionHeading eyebrow={content.site.name} title={content.sectionLabels.values} />
          {profileSections.length || content.about.values.length ? (
            <div className="card-grid">
              {profileSections.map((section) => <article className="info-panel" key={section.title}><h3>{section.title}</h3><p>{section.value}</p></article>)}
              {content.about.values.length > 0 && <article className="info-panel"><h3>{content.sectionLabels.values}</h3><ul className="values-list">{content.about.values.map((value) => <li key={value}>{value}</li>)}</ul></article>}
            </div>
          ) : <p className="empty-state">{content.emptyStates.aboutDetails}</p>}
        </div>
      </section>
      <BenefitsSection content={content} />
      <FounderSection content={content} />
      <FounderVideo content={content} />
      <FAQSection content={content} />
    </>
  );
}
