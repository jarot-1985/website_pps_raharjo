import React from "react";
import { ExternalLink, Image as ImageIcon, PlayCircle } from "lucide-react";

interface MediaPreviewProps {
  url?: string;
  type?: "image" | "video";
  alt?: string;
  title?: string;
  className?: string;
}

export function MediaPreview({ url, type = "image", alt = "Preview media", title, className = "" }: MediaPreviewProps) {
  if (!url) return null;

  const isVideo = type === "video" || /\.(mp4|webm|ogg)$/i.test(url) || url.includes("youtube") || url.includes("youtu.be") || url.includes("vimeo");

  return (
    <div className={`mt-2 rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-sm ${className}`}>
      {title && (
        <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">
          {isVideo ? <PlayCircle className="h-3.5 w-3.5" /> : <ImageIcon className="h-3.5 w-3.5" />}
          {title}
        </div>
      )}

      {isVideo ? (
        <div className="space-y-2">
          <video controls className="w-full max-h-64 rounded-lg bg-black object-contain" src={url} />
          <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-600 hover:text-sky-700">
            <ExternalLink className="h-3.5 w-3.5" /> Buka di tab baru
          </a>
        </div>
      ) : (
        <div className="space-y-2">
          <img src={url} alt={alt} className="max-h-64 w-full rounded-lg object-contain bg-white" referrerPolicy="no-referrer" />
          <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-600 hover:text-sky-700">
            <ExternalLink className="h-3.5 w-3.5" /> Lihat gambar asli
          </a>
        </div>
      )}
    </div>
  );
}
