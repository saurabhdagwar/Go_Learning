export function optimizedCloudinaryImageUrl(url: string): string {
  if (!url.startsWith("https://res.cloudinary.com/") || !url.includes("/image/upload/")) return url;
  const marker = "/image/upload/";
  const position = url.indexOf(marker) + marker.length;
  const remainder = url.slice(position);
  const firstSegment = remainder.split("/")[0] ?? "";
  if (/(?:^|,)(?:f_auto|q_auto|w_\d+|c_[^,/]+)(?:,|$)/.test(firstSegment)) return url;
  const transform = "f_auto,q_auto,c_limit,w_1600";
  return `${url.slice(0, position)}${transform}/${remainder}`;
}

export function videoEmbedUrl(url: string, platform: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
    if (platform === "youtube") {
      const id = parsed.hostname === "youtu.be"
        ? parsed.pathname.slice(1)
        : parsed.searchParams.get("v") ?? parsed.pathname.match(/\/embed\/([^/]+)/)?.[1];
      return id ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` : null;
    }
    if (platform === "vimeo") {
      const id = parsed.pathname.split("/").filter(Boolean).at(-1);
      return id && /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}` : null;
    }
    return null;
  } catch {
    return null;
  }
}
