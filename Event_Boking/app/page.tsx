import { AboutPreview, BenefitsSection, ContactCTA, FAQSection, FounderSection, FounderVideo, GalleryPreview, Hero, ServicesSection, TrustSection } from "@/components/site-sections";
import { getWebsiteContent } from "@/lib/content";

export default async function HomePage() {
  const content = await getWebsiteContent();
  return (
    <>
      <Hero content={content} />
      <TrustSection content={content} />
      <AboutPreview content={content} />
      <BenefitsSection content={content} />
      <ServicesSection content={content} preview />
      <FounderSection content={content} />
      <FounderVideo content={content} />
      <GalleryPreview content={content} />
      <FAQSection content={content} />
      <ContactCTA content={content} />
    </>
  );
}
