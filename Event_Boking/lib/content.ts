import { cache } from "react";
import fallbackContent from "@/data/website-content.json";
import type { Founder, GalleryItem, Service, WebsiteContent } from "@/types/content";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeContent(base: unknown, incoming: unknown): unknown {
  if (Array.isArray(base)) return Array.isArray(incoming) ? incoming : base;
  if (isRecord(base)) {
    if (!isRecord(incoming)) return base;
    const merged: Record<string, unknown> = { ...base };
    for (const [key, value] of Object.entries(base)) {
      if (key in incoming) merged[key] = mergeContent(value, incoming[key]);
    }
    for (const [key, value] of Object.entries(incoming)) {
      if (!(key in base)) merged[key] = value;
    }
    return merged;
  }
  return typeof incoming === typeof base ? incoming : base;
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

function stringValue(value: unknown): string {
  return isString(value) ? value : "";
}

function stringValues(value: unknown): string[] {
  return Array.isArray(value) ? value.filter(isString) : [];
}

function normalizeOptionalArrays(value: Record<string, unknown>): Record<string, unknown> {
  const services = Array.isArray(value.services) ? value.services
    .filter((item: unknown): item is Record<string, unknown> => isRecord(item) && isString(item.id) && isString(item.title))
    .map((item) => ({
      ...item,
      shortDescription: stringValue(item.shortDescription),
      description: stringValue(item.description),
      image: stringValue(item.image),
      benefits: stringValues(item.benefits),
      features: stringValues(item.features),
      enabled: item.enabled !== false,
    })) : value.services;
  const benefits = Array.isArray(value.benefits) ? value.benefits
    .filter((item: unknown): item is Record<string, unknown> => isRecord(item) && isString(item.id) && isString(item.title))
    .map((item) => ({ ...item, description: stringValue(item.description) })) : value.benefits;
  const gallery = Array.isArray(value.gallery) ? value.gallery
    .filter((item: unknown): item is Record<string, unknown> => isRecord(item) && isString(item.id) && isString(item.title)
      && (item.type === "image" || item.type === "video") && isString(item.url)
      && ["cloudinary", "youtube", "vimeo", "local"].includes(String(item.platform)))
    .map((item) => ({ ...item, description: stringValue(item.description), thumbnail: stringValue(item.thumbnail), category: stringValue(item.category) })) : value.gallery;
  const faqs = Array.isArray(value.faqs) ? value.faqs
    .filter((item: unknown): item is Record<string, unknown> => isRecord(item) && isString(item.id) && isString(item.question))
    .map((item) => ({ ...item, answer: stringValue(item.answer) })) : value.faqs;
  return { ...value, services, benefits, gallery, faqs };
}

function isFounder(value: unknown): value is Founder {
  return isRecord(value) && isString(value.name) && isString(value.role) && isString(value.phone)
    && isString(value.image) && isString(value.description) && typeof value.showPhone === "boolean";
}

function isService(value: unknown): value is Service {
  return isRecord(value) && isString(value.id) && isString(value.title) && isString(value.shortDescription)
    && isString(value.description) && (value.image === undefined || isString(value.image))
    && (value.icon === undefined || isString(value.icon)) && isStringArray(value.benefits)
    && isStringArray(value.features) && typeof value.enabled === "boolean";
}

function isGalleryItem(value: unknown): value is GalleryItem {
  return isRecord(value) && isString(value.id) && (value.type === "image" || value.type === "video")
    && ["cloudinary", "youtube", "vimeo", "local"].includes(String(value.platform)) && isString(value.title) && isString(value.description)
    && isString(value.url) && isString(value.thumbnail) && isString(value.category);
}

function isWebsiteContent(value: unknown): value is WebsiteContent {
  if (!isRecord(value) || !isRecord(value.site) || !isRecord(value.seo) || !isRecord(value.hero)
    || !isRecord(value.about) || !isRecord(value.founders) || !isRecord(value.founderVideo)
    || !isRecord(value.contact) || !isRecord(value.socialLinks) || !isRecord(value.pageTitles)
    || !isRecord(value.pageDescriptions) || !isRecord(value.sectionLabels) || !isRecord(value.emptyStates)
    || !isRecord(value.footer)) return false;

  const strings = (record: Record<string, unknown>, keys: string[]) => keys.every((key) => isString(record[key]));
  const videoPlatforms = ["cloudinary", "youtube", "vimeo", "local"];
  return strings(value.site, ["name", "tagline", "logo", "partnership", "certification"])
    && strings(value.seo, ["title", "description"]) && isStringArray(value.seo.keywords)
    && strings(value.hero, ["eyebrow", "title", "subtitle", "description", "image"])
    && isRecord(value.hero.primaryCta) && strings(value.hero.primaryCta, ["label", "href"])
    && isRecord(value.hero.secondaryCta) && strings(value.hero.secondaryCta, ["label", "href"])
    && strings(value.about, ["title", "shortDescription", "description", "mission", "vision"]) && isStringArray(value.about.values)
    && Array.isArray(value.benefits) && value.benefits.every((item: unknown) => isRecord(item) && strings(item, ["id", "title", "description"]) && (item.icon === undefined || isString(item.icon)))
    && Array.isArray(value.services) && value.services.every(isService)
    && isFounder(value.founders.founder) && isFounder(value.founders.coFounder)
    && typeof value.founderVideo.enabled === "boolean" && strings(value.founderVideo, ["title", "description", "founderName", "videoUrl", "thumbnail"])
    && videoPlatforms.includes(String(value.founderVideo.platform))
    && Array.isArray(value.gallery) && value.gallery.every(isGalleryItem)
    && strings(value.contact, ["address", "phone", "email", "googleMapsUrl"])
    && strings(value.socialLinks, ["instagram", "facebook", "googleMaps"])
    && Array.isArray(value.faqs) && value.faqs.every((faq: unknown) => isRecord(faq) && strings(faq, ["id", "question", "answer"]))
    && Array.isArray(value.navigation) && value.navigation.every((item: unknown) => isRecord(item) && strings(item, ["label", "href"]))
    && strings(value.pageTitles, ["about", "services", "gallery", "contact"])
    && strings(value.pageDescriptions, ["about", "services", "gallery", "contact"])
    && strings(value.sectionLabels, ["trust", "about", "benefits", "services", "founders", "founderVideo", "gallery", "contactCtaTitle", "contactCtaDescription", "mission", "vision", "values", "faqs"])
    && strings(value.emptyStates, ["benefits", "services", "gallery", "faqs", "aboutDetails"])
    && strings(value.footer, ["description", "copyright"]);
}

export const getWebsiteContent = cache(async (): Promise<WebsiteContent> => {
  const externalUrl = process.env.NEXT_PUBLIC_CONTENT_JSON_URL?.trim();
  if (externalUrl) {
    try {
      const response = await fetch(externalUrl, { cache: "no-store" });
      if (!response.ok) throw new Error(`Content request returned ${response.status}`);
      const externalContent: unknown = await response.json();
      if (!isRecord(externalContent) || !isRecord(externalContent.site)) throw new Error("The content document is not a website content object");
      const normalizedContent = normalizeOptionalArrays(externalContent);
      const mergedContent = mergeContent(fallbackContent, normalizedContent);
      if (isWebsiteContent(mergedContent)) return mergedContent;
    } catch {
      // A failed or invalid hosted file falls back to the checked-in content.
    }
  }
  return fallbackContent as WebsiteContent;
});
