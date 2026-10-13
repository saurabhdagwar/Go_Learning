export interface Site {
  name: string;
  tagline: string;
  logo: string;
  partnership: string;
  certification: string;
}

export interface SEO {
  title: string;
  description: string;
  keywords: string[];
}

export interface CallToAction {
  label: string;
  href: string;
}

export interface Hero {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCta: CallToAction;
  secondaryCta: CallToAction;
  image: string;
}

export interface About {
  title: string;
  shortDescription: string;
  description: string;
  mission: string;
  vision: string;
  values: string[];
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  image?: string;
  icon?: string;
  benefits: string[];
  features: string[];
  enabled: boolean;
}

export interface Founder {
  name: string;
  role: string;
  phone: string;
  image: string;
  description: string;
  showPhone: boolean;
}

export interface Founders {
  founder: Founder;
  coFounder: Founder;
}

export type VideoPlatform = "cloudinary" | "youtube" | "vimeo" | "local";

export interface FounderVideo {
  enabled: boolean;
  title: string;
  description: string;
  founderName: string;
  platform: VideoPlatform;
  videoUrl: string;
  thumbnail: string;
}

export interface GalleryItem {
  id: string;
  type: "image" | "video";
  platform: VideoPlatform | "cloudinary";
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  category: string;
}

export interface Contact {
  address: string;
  phone: string;
  email: string;
  googleMapsUrl: string;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  googleMaps: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface PageTitles {
  about: string;
  services: string;
  gallery: string;
  contact: string;
}

export interface SectionLabels {
  trust: string;
  about: string;
  benefits: string;
  services: string;
  founders: string;
  founderVideo: string;
  gallery: string;
  contactCtaTitle: string;
  contactCtaDescription: string;
  mission: string;
  vision: string;
  values: string;
  faqs: string;
}

export interface EmptyStates {
  benefits: string;
  services: string;
  gallery: string;
  faqs: string;
  aboutDetails: string;
}

export interface WebsiteContent {
  site: Site;
  seo: SEO;
  hero: Hero;
  about: About;
  benefits: Benefit[];
  services: Service[];
  founders: Founders;
  founderVideo: FounderVideo;
  gallery: GalleryItem[];
  contact: Contact;
  socialLinks: SocialLinks;
  faqs: FAQ[];
  navigation: NavigationItem[];
  pageTitles: PageTitles;
  pageDescriptions: {
    about: string;
    services: string;
    gallery: string;
    contact: string;
  };
  sectionLabels: SectionLabels;
  emptyStates: EmptyStates;
  footer: {
    description: string;
    copyright: string;
  };
}
