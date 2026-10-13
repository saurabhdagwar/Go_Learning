import Link from "next/link";
import { RemoteImage } from "@/components/RemoteImage";
import type { WebsiteContent } from "@/types/content";

export function SiteFooter({ content }: { content: WebsiteContent }) {
  const socials = [
    ["Instagram", content.socialLinks.instagram],
    ["Facebook", content.socialLinks.facebook],
    ["Google Maps", content.socialLinks.googleMaps || content.contact.googleMapsUrl],
  ].filter((item) => Boolean(item[1]));

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="brand" href="/">
              <span className="brand-mark" aria-hidden={!content.site.logo} style={content.site.logo ? { position: "relative", overflow: "hidden" } : undefined}>
                {content.site.logo ? <RemoteImage src={content.site.logo} alt={content.site.name} sizes="42px" /> : content.site.name.slice(0, 1)}
              </span>
              <span className="brand-name">{content.site.name}</span>
            </Link>
            <p>{content.footer.description}</p>
            <div className="footer-links" style={{ marginTop: 16 }}>
              <span>{content.site.partnership}</span>
              {content.site.certification && <span>{content.site.certification}</span>}
            </div>
          </div>
          <div>
            <h2 className="footer-heading">Quick links</h2>
            <nav className="footer-links" aria-label="Footer navigation">
              {content.navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
            </nav>
          </div>
          <div>
            <h2 className="footer-heading">Contact</h2>
            <div className="footer-links">
              {content.contact.address && <span>{content.contact.address}</span>}
              {content.contact.phone && <a href={`tel:${content.contact.phone}`}>{content.contact.phone}</a>}
              {content.contact.email && <a href={`mailto:${content.contact.email}`}>{content.contact.email}</a>}
            </div>
            {socials.length > 0 && (
              <nav className="footer-links" aria-label="Social links" style={{ marginTop: 18 }}>
                {socials.map(([label, url]) => <a href={url} target="_blank" rel="noreferrer" key={label}>{label}</a>)}
              </nav>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {content.site.name}. {content.footer.copyright}</p>
          <p>{content.site.certification}</p>
        </div>
      </div>
    </footer>
  );
}
