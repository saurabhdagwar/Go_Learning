"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RemoteImage } from "@/components/RemoteImage";
import { videoEmbedUrl } from "@/lib/cloudinary";
import type { GalleryItem } from "@/types/content";

type GalleryFilter = "all" | "image" | "video";

interface GalleryExperienceProps {
  items: GalleryItem[];
  emptyMessage: string;
}

export function GalleryExperience({ items, emptyMessage }: GalleryExperienceProps) {
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const [activeId, setActiveId] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const filteredItems = useMemo(() => items.filter((item) => filter === "all" || item.type === filter), [items, filter]);
  const activeIndex = filteredItems.findIndex((item) => item.id === activeId);
  const activeItem = activeIndex >= 0 ? filteredItems[activeIndex] : null;
  const imageItems = useMemo(() => filteredItems.filter((item) => item.type === "image"), [filteredItems]);
  const activeImageIndex = imageItems.findIndex((item) => item.id === activeId);

  const closeModal = useCallback(() => setActiveId(null), []);
  const moveImage = useCallback((direction: -1 | 1) => {
    if (activeImageIndex < 0 || imageItems.length < 2) return;
    const nextIndex = activeImageIndex + direction;
    if (nextIndex < 0 || nextIndex >= imageItems.length) return;
    setActiveId(imageItems[nextIndex]?.id ?? null);
  }, [activeImageIndex, imageItems]);

  useEffect(() => {
    if (!activeItem) return;
    const priorOverflow = document.body.style.overflow;
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
      } else if (event.key === "ArrowLeft") {
        if (activeItem.type === "image") { event.preventDefault(); moveImage(-1); }
      } else if (event.key === "ArrowRight") {
        if (activeItem.type === "image") { event.preventDefault(); moveImage(1); }
      } else if (event.key === "Tab" && modalRef.current) {
        const focusable = Array.from(modalRef.current.querySelectorAll<HTMLElement>("button, video, iframe, [href], [tabindex]:not([tabindex='-1'])"))
          .filter((element) => !element.hasAttribute("disabled"));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = priorOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [activeItem, closeModal, moveImage]);

  const openItem = (item: GalleryItem) => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setActiveId(item.id);
  };

  const filters: { value: GalleryFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "image", label: "Images" },
    { value: "video", label: "Videos" },
  ];

  return (
    <>
      <div className="gallery-filters" role="group" aria-label="Filter gallery">
        {filters.map((choice) => (
          <button
            className="filter-button"
            type="button"
            aria-pressed={filter === choice.value}
            key={choice.value}
            onClick={() => { setFilter(choice.value); setActiveId(null); }}
          >{choice.label}</button>
        ))}
      </div>
      {filteredItems.length ? (
        <div className="gallery-grid">
          {filteredItems.map((item) => {
            const preview = item.thumbnail || (item.type === "image" ? item.url : "");
            return (
              <article className="gallery-card" key={item.id}>
                <button
                  className="gallery-card-button"
                  type="button"
                  onClick={() => openItem(item)}
                  aria-label={`${item.type === "video" ? "Play" : "View"}: ${item.title}`}
                >
                  {preview ? <RemoteImage src={preview} alt="" sizes="(max-width: 480px) 100vw, (max-width: 760px) 50vw, 33vw" /> : <span className="gallery-placeholder" aria-hidden="true">{item.type === "video" ? "▶" : "✦"}</span>}
                  {item.type === "video" && <span className="play-indicator" aria-hidden="true">▶</span>}
                </button>
                <div className="gallery-card-copy">
                  {item.category && <span className="gallery-category">{item.category}</span>}
                  <h3>{item.title}</h3>
                  {item.description && <p>{item.description}</p>}
                </div>
              </article>
            );
          })}
        </div>
      ) : <p className="empty-state">{items.length ? "No items match this filter." : emptyMessage}</p>}

      {activeItem && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeModal(); }}>
          <div className="media-modal" role="dialog" aria-modal="true" aria-labelledby="gallery-modal-title" ref={modalRef}>
            <button className="modal-close" type="button" aria-label="Close viewer" onClick={closeModal} ref={closeButtonRef}>×</button>
            {activeItem.type === "image" && activeImageIndex > 0 && (
              <button className="modal-arrow previous" type="button" aria-label="Previous image" onClick={() => moveImage(-1)}>‹</button>
            )}
            {activeItem.type === "image" && activeImageIndex < imageItems.length - 1 && (
              <button className="modal-arrow next" type="button" aria-label="Next image" onClick={() => moveImage(1)}>›</button>
            )}
            <div className="modal-media">
              {activeItem.type === "image" ? (
                <RemoteImage src={activeItem.url} alt={activeItem.description || activeItem.title} sizes="100vw" />
              ) : <GalleryVideo item={activeItem} />}
            </div>
            <div className="modal-description">
              <h2 id="gallery-modal-title">{activeItem.title}</h2>
              {activeItem.description && <p>{activeItem.description}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function GalleryVideo({ item }: { item: GalleryItem }) {
  const embedUrl = videoEmbedUrl(item.url, item.platform);
  if (embedUrl) {
    return <iframe src={embedUrl} title={item.title} allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen />;
  }
  if (item.platform === "cloudinary" || item.platform === "local") {
    return <video controls preload="metadata" poster={item.thumbnail || undefined} aria-label={item.title}><source src={item.url} /></video>;
  }
  return <span className="gallery-placeholder" aria-label="Video player unavailable">▶</span>;
}
