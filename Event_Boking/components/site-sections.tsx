import Link from "next/link";
import { RemoteImage } from "@/components/RemoteImage";
import { SectionHeading } from "@/components/SectionHeading";
import { optimizedCloudinaryImageUrl, videoEmbedUrl } from "@/lib/cloudinary";
import type { Founder, GalleryItem, Service, WebsiteContent } from "@/types/content";

function Sparkle({ className = "" }: { className?: string }) {
  return <span className={className} aria-hidden="true">✦</span>;
}

export function Hero({ content }: { content: WebsiteContent }) {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{content.hero.eyebrow}</p>
          <h1>{content.hero.title}</h1>
          <p className="hero-subtitle">{content.hero.subtitle}</p>
          <p className="body-copy">{content.hero.description}</p>
          <div className="button-row">
            <Link className="button" href={content.hero.primaryCta.href}>{content.hero.primaryCta.label}<span aria-hidden="true">↗</span></Link>
            <Link className="button secondary" href={content.hero.secondaryCta.href}>{content.hero.secondaryCta.label}</Link>
          </div>
        </div>
        <div className="hero-art" aria-label={content.site.name} role="img">
          {content.hero.image ? (
            <RemoteImage src={content.hero.image} alt={content.site.name} sizes="(max-width: 760px) 100vw, 48vw" className="hero-config-image" />
          ) : (
            <>
              <div className="art-orbit" />
              <div className="art-center">
                <svg viewBox="0 0 120 120" fill="none" aria-hidden="true">
                  <path d="M60 17c-20 0-34 14-34 32 0 12 6 21 16 26v14c0 5 4 9 9 9h18c5 0 9-4 9-9V75c10-5 16-14 16-26 0-18-14-32-34-32Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M48 59c-6-3-9-8-9-15m33 15c6-3 9-8 9-15M48 71h24M49 82h22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  <path d="M60 17V7m36 27 9-5M24 34l-9-5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
              <div className="art-dot one"><Sparkle /></div>
              <div className="art-dot two" aria-hidden="true">●</div>
              <div className="art-note">{content.site.tagline}</div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export function TrustSection({ content }: { content: WebsiteContent }) {
  const trustItems = [content.site.name, content.site.partnership, content.site.certification].filter(Boolean);
  return (
    <section className="trust-strip" aria-label={content.sectionLabels.trust}>
      <div className="container trust-inner">
        <p className="trust-label">{content.sectionLabels.trust}</p>
        {trustItems.map((item, index) => (
          <div className="trust-item" key={item}>
            <span className="trust-icon" aria-hidden="true">{index === 2 ? "✓" : index === 1 ? "⌘" : "✦"}</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AboutPreview({ content }: { content: WebsiteContent }) {
  return (
    <section className="section">
      <div className="container split-section">
        <div className="about-art" aria-hidden="true"><div className="about-art-mark">{content.site.name.slice(0, 1)}</div></div>
        <div>
          <p className="eyebrow">{content.sectionLabels.about}</p>
          <h2>{content.about.title}</h2>
          <p className="body-copy">{content.about.shortDescription}</p>
          <div className="button-row">
            <Link className="text-link" href="/about-us">Read More <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BenefitsSection({ content }: { content: WebsiteContent }) {
  return (
    <section className="section soft">
      <div className="container">
        <SectionHeading eyebrow={content.site.name} title={content.sectionLabels.benefits} />
        {content.benefits.length ? (
          <div className="card-grid">
            {content.benefits.map((benefit) => (
              <article className="card" key={benefit.id}>
                <div className="card-icon" aria-hidden="true">{benefit.icon || "✦"}</div>
                <h3>{benefit.title}</h3><p>{benefit.description}</p>
              </article>
            ))}
          </div>
        ) : <p className="empty-state">{content.emptyStates.benefits}</p>}
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="card service-card">
      {service.image ? (
        <div className="service-image"><RemoteImage src={service.image} alt={service.title} sizes="(max-width: 760px) 100vw, 33vw" /></div>
      ) : <div className="card-icon" aria-hidden="true">{service.icon || "✧"}</div>}
      <h3>{service.title}</h3>
      {(service.shortDescription || service.description) && <p>{service.shortDescription || service.description}</p>}
      {service.description && service.shortDescription && service.description !== service.shortDescription && (
        <details className="service-more"><summary>More about this</summary><p>{service.description}</p></details>
      )}
      {service.benefits.length > 0 && <div className="service-list"><p className="service-list-label">Benefits</p><ul>{service.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul></div>}
      {service.features.length > 0 && <div className="service-list"><p className="service-list-label">Features</p><ul>{service.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>}
      <Link className="text-link" href="/contact">Enquire about this <span aria-hidden="true">→</span></Link>
    </article>
  );
}

export function ServicesSection({ content, preview = false }: { content: WebsiteContent; preview?: boolean }) {
  const services = content.services.filter((service) => service.enabled);
  const shownServices = preview ? services.slice(0, 3) : services;
  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow={content.site.name} title={content.sectionLabels.services} />
        {shownServices.length ? (
          <div className="card-grid">{shownServices.map((service) => <ServiceCard service={service} key={service.id} />)}</div>
        ) : <p className="empty-state">{content.emptyStates.services}</p>}
        {preview && (
          <div className="button-row"><Link className="text-link" href="/services">View All Services <span aria-hidden="true">→</span></Link></div>
        )}
      </div>
    </section>
  );
}

function FounderCard({ founder }: { founder: Founder }) {
  const initials = founder.name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("");
  return (
    <article className="founder-card">
      <div className="founder-photo">
        {founder.image ? <RemoteImage src={founder.image} alt={founder.name} sizes="116px" /> : <span className="founder-initials" aria-hidden="true">{initials}</span>}
      </div>
      <div>
        <p className="founder-role">{founder.role}</p>
        <h3>{founder.name}</h3>
        {founder.description && <p>{founder.description}</p>}
        {founder.showPhone && founder.phone && <a className="text-link" href={`tel:${founder.phone}`}>Call {founder.role}<span aria-hidden="true"> ↗</span></a>}
      </div>
    </article>
  );
}

export function FounderSection({ content }: { content: WebsiteContent }) {
  const founders = [content.founders.founder, content.founders.coFounder].filter((person) => person.name);
  return (
    <section className="section soft">
      <div className="container">
        <SectionHeading eyebrow={content.site.name} title={content.sectionLabels.founders} />
        <div className="founder-grid">{founders.map((person) => <FounderCard founder={person} key={person.name} />)}</div>
      </div>
    </section>
  );
}

function VideoDisplay({ url, platform, poster, title }: { url: string; platform: string; poster: string; title: string }) {
  const embedUrl = videoEmbedUrl(url, platform);
  if (embedUrl) return <iframe src={embedUrl} title={title} loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen />;
  if (platform === "cloudinary" || platform === "local") {
    return <video controls preload="metadata" poster={poster ? optimizedCloudinaryImageUrl(poster) : undefined} aria-label={title}><source src={url} /></video>;
  }
  return <div className="video-placeholder"><span aria-hidden="true">▶</span></div>;
}

export function FounderVideo({ content }: { content: WebsiteContent }) {
  const video = content.founderVideo;
  if (!video.enabled || !video.videoUrl) return null;
  return (
    <section className="section warm">
      <div className="container founder-video">
        <div className="video-frame"><VideoDisplay url={video.videoUrl} platform={video.platform} poster={video.thumbnail} title={video.title} /></div>
        <div>
          <p className="eyebrow">{video.founderName}</p><h2>{video.title}</h2>
          {video.description && <p className="body-copy">{video.description}</p>}
        </div>
      </div>
    </section>
  );
}

function GalleryPreviewItem({ item }: { item: GalleryItem }) {
  const imageUrl = item.thumbnail || (item.type === "image" ? item.url : "");
  return (
    <Link className="gallery-tile" href="/gallery" aria-label={`${item.title}, view gallery`}>
      {imageUrl ? <RemoteImage src={imageUrl} alt={item.title} sizes="(max-width: 760px) 50vw, 33vw" /> : <span className="gallery-placeholder" aria-hidden="true">{item.type === "video" ? "▶" : "✦"}</span>}
      <span className="gallery-caption">{item.title}</span>
    </Link>
  );
}

export function GalleryPreview({ content }: { content: WebsiteContent }) {
  const items = content.gallery.slice(0, 3);
  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow={content.site.name} title={content.sectionLabels.gallery} />
        {items.length ? (
          <div className="gallery-preview">{items.map((item) => <GalleryPreviewItem item={item} key={item.id} />)}</div>
        ) : <p className="empty-state">{content.emptyStates.gallery}</p>}
        <div className="button-row"><Link className="text-link" href="/gallery">View Full Gallery <span aria-hidden="true">→</span></Link></div>
      </div>
    </section>
  );
}

export function ContactCTA({ content }: { content: WebsiteContent }) {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-panel">
          <div><h2>{content.sectionLabels.contactCtaTitle}</h2><p>{content.sectionLabels.contactCtaDescription}</p></div>
          <div className="button-row" style={{ marginTop: 0 }}>
            <Link className="button" href="/contact">Contact Us</Link>
            <Link className="button" href="/contact#enquiry-form">Enquire Now</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FAQSection({ content }: { content: WebsiteContent }) {
  if (content.faqs.length === 0) return null;
  return (
    <section className="section soft">
      <div className="container">
        <SectionHeading title={content.sectionLabels.faqs} />
        <div className="faq-list">
          {content.faqs.map((faq) => <details className="faq-item" key={faq.id}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>)}
        </div>
      </div>
    </section>
  );
}

export function ContactInformation({ content }: { content: WebsiteContent }) {
  const contacts = [content.founders.founder, content.founders.coFounder].filter((person) => person.showPhone && person.phone);
  const mapsUrl = content.socialLinks.googleMaps || content.contact.googleMapsUrl;
  return (
    <div className="contact-stack">
      {content.contact.address && (
        <div className="info-panel contact-row"><span className="contact-row-icon" aria-hidden="true">⌖</span><div><h3>Visit us</h3><p>{content.contact.address}</p></div></div>
      )}
      {contacts.map((person) => (
        <div className="info-panel contact-row" key={person.name}><span className="contact-row-icon" aria-hidden="true">☎</span><div><h3>{person.role}</h3><p><a href={`tel:${person.phone}`}>{person.phone}</a></p></div></div>
      ))}
      {content.contact.email && <div className="info-panel contact-row"><span className="contact-row-icon" aria-hidden="true">✉</span><div><h3>Email</h3><p><a href={`mailto:${content.contact.email}`}>{content.contact.email}</a></p></div></div>}
      {mapsUrl && <a className="button secondary" href={mapsUrl} target="_blank" rel="noreferrer">Open in Google Maps <span aria-hidden="true">↗</span></a>}
      <div className="social-links" aria-label="Social media">
        {content.socialLinks.instagram && <a className="social-pill" href={content.socialLinks.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>}
        {content.socialLinks.facebook && <a className="social-pill" href={content.socialLinks.facebook} target="_blank" rel="noreferrer">Facebook ↗</a>}
        {mapsUrl && <a className="social-pill" href={mapsUrl} target="_blank" rel="noreferrer">Google Maps ↗</a>}
      </div>
    </div>
  );
}
