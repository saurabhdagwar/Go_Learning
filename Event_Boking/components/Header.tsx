"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { RemoteImage } from "@/components/RemoteImage";
import type { WebsiteContent } from "@/types/content";

export function Header({ content }: { content: WebsiteContent }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = content.navigation;
  const isCurrent = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label={content.site.name} onClick={() => setMenuOpen(false)}>
          {content.site.logo ? (
            <span className="brand-mark" style={{ position: "relative", overflow: "hidden" }}>
              <RemoteImage src={content.site.logo} alt={content.site.name} sizes="42px" />
            </span>
          ) : <span className="brand-mark" aria-hidden="true">{content.site.name.slice(0, 1)}</span>}
          <span className="brand-name">{content.site.name}</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((item, index) => (
            <Link
              className={`nav-link ${index === links.length - 1 ? "contact-link" : ""}`}
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              key={`${item.href}-${item.label}`}
            >{item.label}</Link>
          ))}
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span /><span />
        </button>
      </div>
      {menuOpen && (
        <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
          {links.map((item, index) => (
            <Link
              className={`nav-link ${index === links.length - 1 ? "contact-link" : ""}`}
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              key={`${item.href}-${item.label}`}
              onClick={() => setMenuOpen(false)}
            >{item.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
