import { useState } from "react";
import { Facebook, Twitter, Share2, ChevronLeft, ChevronRight, Instagram, Link } from "lucide-react";
import type { News, AppSettings } from "../../types";
import { unitDetails } from "./PublicPageHelpers";
import { YoutubeIcon } from "../icons/YoutubeIcon";

export function BeritaView({ news, settings }: { news: News[]; settings?: AppSettings }) {
  const sortedNews = [...news].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(sortedNews[0]?.id || null);
  const featured = sortedNews.find((item) => item.id === selectedNewsId) || sortedNews[0];
  const otherNews = sortedNews.filter((item) => item.id !== featured?.id);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(otherNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedNews = otherNews.slice(startIndex, endIndex);

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const unitLabel = (unit: string) =>
    unit === "PPS_Raharjo" ? "PPS Raharjo" : unit;

  const featuredPreview = featured
    ? featured.content.length > 260
      ? `${featured.content.slice(0, 260)}...`
      : featured.content
    : "";

  const unitMeta = featured ? (unitDetails as any)[featured.rps_unit] : null;

  const socialLinks = [
    { icon: Facebook, url: settings?.social_facebook, className: 'text-sky-600' },
    { icon: Twitter, url: settings?.social_twitter, className: 'text-sky-500' },
    { icon: undefined, url: settings?.social_instagram, className: 'text-pink-600', isInstagram: true },
    { icon: undefined, url: settings?.social_youtube, className: 'text-red-600', isSvg: true },
    { icon: undefined, url: (settings as any)?.social_tiktok, className: 'text-black', isTikTok: true },
    { icon: undefined, url: settings?.social_linkedin, className: 'text-slate-900', isLink: true }
  ].filter((s) => !!s.url);

  return (
    <div className="space-y-10 py-6" id="berita-page">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="bg-stone-50 px-6 py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.45em] text-slate-500 mb-2">Papan Berita</p>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Berita Terbaru</h1>
            </div>
            <button className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-900 shadow-sm border border-slate-200 hover:border-amber-300 transition">
              Update
            </button>
          </div>

          {featured ? (
            <div className="grid gap-6 lg:grid-cols-[2fr_1fr] p-6">
              <article className="space-y-6">
                <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-slate-100">
                  <img
                    src={featured.image_url}
                    alt={featured.title}
                    className="w-full h-full min-h-[320px] object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] ${unitMeta?.tagBg || 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                        RPS {unitLabel(featured.rps_unit)}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.35em] text-slate-500">{formatDate(featured.created_at)}</span>
                    </div>
                    <span className="rounded-full bg-amber-50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-amber-700 border border-amber-200">
                      Umum
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">{featured.title}</h2>
                    <p className="text-sm leading-relaxed text-slate-600">{featuredPreview}</p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Bagikan</span>
                    <div className="flex gap-2">
                      {socialLinks.length === 0 ? (
                        <span className="text-[9px] text-slate-400">Tidak ada tautan sosial</span>
                      ) : (
                        socialLinks.map((s, idx) => {
                          if (s.isSvg) {
                            return (
                              <a key={idx} href={s.url} target="_blank" rel="noreferrer" className="text-red-600 hover:scale-110 transition drop-shadow-sm">
                                <YoutubeIcon className="w-3.5 h-3.5" />
                              </a>
                            );
                          }
                          if (s.isTikTok) {
                            return (
                              <a key={idx} href={s.url} target="_blank" rel="noreferrer" className="text-slate-900 hover:scale-110 transition drop-shadow-sm" title="TikTok">
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.61-.6 3.16-1.66 4.31-1.07 1.15-2.61 1.83-4.22 1.95-1.61.12-3.23-.27-4.57-1.1-1.34-.84-2.34-2.15-2.82-3.66-.48-1.51-.4-3.13.24-4.57.64-1.44 1.81-2.58 3.25-3.17 1.44-.59 3.05-.6 4.49-.03v4.09c-.71-.24-1.5-.23-2.19.05-.68.27-1.25.79-1.58 1.42-.33.64-.39 1.39-.17 2.06.22.68.73 1.25 1.37 1.57.65.31 1.41.34 2.07.1.67-.24 1.21-.77 1.51-1.41.3-.64.35-1.39.14-2.07V.02z" />
                                </svg>
                              </a>
                            );
                          }
                          if (s.isInstagram) {
                            return (
                              <a key={idx} href={s.url} target="_blank" rel="noreferrer" className={`${s.className} hover:scale-110 transition drop-shadow-sm`} title="Instagram">
                                <Instagram className="w-3.5 h-3.5" />
                              </a>
                            );
                          }
                          if (s.isLink) {
                            return (
                              <a key={idx} href={s.url} target="_blank" rel="noreferrer" className={`${s.className} hover:scale-110 transition drop-shadow-sm`} title="Tautan">
                                <Link className="w-3.5 h-3.5" />
                              </a>
                            );
                          }
                          const Icon = s.icon as any;
                          return (
                            <a key={idx} href={s.url} target="_blank" rel="noreferrer" className={`${s.className} hover:scale-110 transition drop-shadow-sm`}>
                              <Icon className="w-3.5 h-3.5 fill-current" />
                            </a>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </article>

              <aside className="space-y-6">
                <div className="rounded-[32px] border border-slate-100 bg-stone-50 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">Lihat Berita Lainnya</h3>
                      <p className="mt-2 text-sm text-slate-500">Berita terbaru dan kegiatan lainnya.</p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-slate-500 border border-slate-200">
                      {otherNews.length} item
                    </span>
                  </div>

                  <div className="mt-5 space-y-3">
                    {paginatedNews.length === 0 ? (
                      <div className="rounded-3xl bg-white p-4 text-sm text-slate-500">Tidak ada berita lain saat ini.</div>
                    ) : (
                      paginatedNews.map((item) => {
                        const meta = (unitDetails as any)[item.rps_unit];
                        return (
                          <button
                            key={item.id}
                            onClick={() => setSelectedNewsId(item.id)}
                            className="w-full text-left rounded-3xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm"
                          >
                            <div className="space-y-3">
                              <div className="flex items-center justify-between gap-3">
                                <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] ${meta?.tagBg || 'bg-slate-100 text-slate-600'}`}>
                                  RPS {unitLabel(item.rps_unit)}
                                </span>
                                <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400">{formatDate(item.created_at)}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-slate-900 line-clamp-2 leading-relaxed">{item.title}</h4>
                                <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                  {item.content.length > 100 ? `${item.content.slice(0, 100)}...` : item.content}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>

                <div className="rounded-[32px] border border-slate-100 bg-white p-5">
                  <div className="flex items-center justify-between gap-3">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-700 hover:bg-slate-100 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Sebelumnya</span>
                    </button>
                    <span className="text-[11px] text-slate-500 font-semibold">
                      Halaman {currentPage} dari {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-700 hover:bg-slate-100 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>Selanjutnya</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          ) : (
            <div className="p-6 text-center text-slate-500">Belum ada berita tersedia.</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// NEW: GALERI VIEW
// ==========================================
