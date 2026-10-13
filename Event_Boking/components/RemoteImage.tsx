"use client";

import Image from "next/image";
import { useState } from "react";
import { optimizedCloudinaryImageUrl } from "@/lib/cloudinary";

interface RemoteImageProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
}

export function RemoteImage({ src, alt, sizes = "(max-width: 700px) 100vw, 50vw", className = "" }: RemoteImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return <span className={`remote-fallback ${className}`} role="img" aria-label={alt}>✦</span>;
  }
  return (
    <Image
      src={optimizedCloudinaryImageUrl(src)}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
