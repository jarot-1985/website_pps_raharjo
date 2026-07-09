import { useState, useEffect, useRef } from "react";
import { Facebook, Instagram, Twitter, Youtube, Linkedin, MessageCircle } from "lucide-react";
import type { AppSettings, News, Facility, Gallery, Achievement, Staff } from "../../types";
import { ppsRpsTabs, unitDetails } from "./PublicPageHelpers";

function CountUp({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    hasAnimated.current = false;
    setCount(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <div ref={ref}>{count}</div>;
}

export function PpsRpsView({
  activeTab,
  setActiveTab,
  settings,
  news,
  facilities,
  galleries,
  achievements,
  staff
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  settings: AppSettings;
  news: News[];
  facilities: Facility[];
  galleries: Gallery[];
  achievements: Achievement[];
  staff: Staff[];
}) {
  const activeUnitSection = ppsRpsTabs.find((tab) => tab.tabId === activeTab);
  const selectedUnit = activeUnitSection?.unit;

  const unitInfo = selectedUnit ? {
    ...unitDetails[selectedUnit],
    name: selectedUnit === 'PPS_Raharjo' ? 'PPS Raharjo' : `RPS ${selectedUnit}`
  } : null;

  const unitProfile = selectedUnit ? settings.unit_profiles?.[selectedUnit] : null;
  const profileName = unitProfile?.institution_name || unitInfo?.name || '';
  const profileAddress = unitProfile?.institution_address || unitInfo?.address || '';
  const profilePhone = unitProfile?.institution_phone || unitInfo?.phone || '';
  const profileWhatsapp = unitProfile?.institution_whatsapp || '';
  const profileEmail = unitProfile?.institution_email || unitInfo?.email || '';
  const profileMapUrl = unitProfile?.map_url || '';
  const profileDescription = unitProfile?.deskripsi || unitInfo?.desc || '';
  const profileServices = unitProfile?.layanan_dasar || unitInfo?.about || '';
  const profileGuidance = unitProfile?.layanan_bimbingan || '';
  const profileRequirements = unitProfile?.persyaratan_penerimaan || (unitInfo?.requirements?.join('\n') ?? '');
  const TikTokIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.18a8.16 8.16 0 004.76 1.52V7.25a4.82 4.82 0 01-1-.56z" /></svg>
  );
  const socialLinks = [
    { label: 'WhatsApp', icon: MessageCircle, color: 'text-green-600', url: profileWhatsapp ? `https://wa.me/${profileWhatsapp.replace(/[^0-9]/g, '')}` : '' },
    { label: 'Facebook', icon: Facebook, color: 'text-blue-600', url: unitProfile?.social_facebook || settings.social_facebook },
    { label: 'Instagram', icon: Instagram, color: 'text-pink-500', url: unitProfile?.social_instagram || settings.social_instagram },
    { label: 'TikTok', icon: TikTokIcon, color: 'text-slate-900', url: (settings as any).social_tiktok || '' },
    { label: 'Twitter', icon: Twitter, color: 'text-sky-500', url: unitProfile?.social_twitter || settings.social_twitter },
    { label: 'YouTube', icon: Youtube, color: 'text-red-600', url: unitProfile?.social_youtube || settings.social_youtube },
    { label: 'LinkedIn', icon: Linkedin, color: 'text-blue-700', url: unitProfile?.social_linkedin || settings.social_linkedin }
  ].filter((entry) => !!entry.url);
  const unitRequirements = profileRequirements ? profileRequirements.split(/\n|\r\n|[.;]/).map((item) => item.trim()).filter(Boolean) : (unitInfo?.requirements || []);

  const unitNews = selectedUnit ? news.filter((item) => item.rps_unit === selectedUnit) : [];
  const unitFacilities = selectedUnit ? facilities.filter((item) => item.rps_unit === selectedUnit) : [];
  const unitGalleries = selectedUnit ? galleries.filter((item) => item.rps_unit === selectedUnit) : [];
  const unitStaff = selectedUnit ? staff.filter((item) => item.rps_unit === selectedUnit) : [];
  const unitAchievements = selectedUnit ? achievements.filter((item) => item.rps_unit === selectedUnit) : [];

  const unitStats = selectedUnit ? {
    kuota_layanan: 150,
    pm_saat_ini: 120 + unitNews.length * 5,
    laki_laki: Math.round((120 + unitNews.length * 5) * 0.55),
    perempuan: Math.round((120 + unitNews.length * 5) * 0.45)
  } : null;

  return (
    <div className="space-y-10 py-4 animate-fade-in" id="pps-rps-page">
      <div className="space-y-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-3xl font-serif text-slate-900 font-bold tracking-tight">PPS & RPS Unit Kerja</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">Temukan informasi lengkap PPS/RPS tentang layanan, fasilitas, persyaratan pendaftaran, kontak, berita, dan galeri.</p>
        </div>
        {unitInfo ? (
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-slate-500">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">{unitInfo.tag}</span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">{selectedUnit === 'PPS_Raharjo' ? 'PPS Raharjo' : `RPS ${selectedUnit}`}</span>
          </div>
        ) : null}
      </div>

      {unitInfo ? (
        <>
          <section className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
            <div className="relative overflow-hidden h-[520px] md:h-[560px] lg:h-[600px]">
              <img
                src={unitInfo.heroImage}
                alt={unitInfo.name}
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10" />
              <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-12 text-white">
                <div>
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${unitInfo.tagBg}`}>{unitInfo.tag}</span>
                  <h3 className="mt-4 text-4xl font-serif font-black tracking-tight">{profileName || unitInfo.name}</h3>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-100">{profileDescription || unitInfo.desc}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-3xl bg-white/10 p-4 border border-white/10 backdrop-blur-sm">
                    <div className="text-[10px] uppercase tracking-widest text-slate-200">Alamat</div>
                    <div className="mt-3 text-sm font-semibold">{profileAddress || unitInfo.address}</div>
                    {profileMapUrl ? (
                      <a href={profileMapUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-xs font-semibold text-amber-100 underline">Buka Google Maps</a>
                    ) : null}
                  </div>
                  <div className="rounded-3xl bg-white/10 p-4 border border-white/10 backdrop-blur-sm">
                    <div className="text-[10px] uppercase tracking-widest text-slate-200">Kontak</div>
                    <div className="mt-3 text-sm font-semibold">{profilePhone || unitInfo.phone}</div>
                    {profileWhatsapp ? <div className="text-xs text-slate-200 mt-2">WhatsApp: {profileWhatsapp}</div> : null}
                    <div className="text-xs text-slate-200 mt-2">{profileEmail || unitInfo.email}</div>
                  </div>
                  <div className="rounded-3xl bg-white/10 p-4 border border-white/10 backdrop-blur-sm">
                    <div className="text-[10px] uppercase tracking-widest text-slate-200">Jam Operasional</div>
                    <div className="mt-3 text-sm font-semibold">{unitInfo.hours}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Statistik + Daftar Online */}
          <section className="grid gap-4 xl:grid-cols-[2fr_1fr] items-stretch">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h4 className="text-base font-bold text-slate-900">Statistik Penerima Manfaat</h4>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-3xl bg-amber-50 p-4">
                  <div className="text-xs uppercase tracking-widest text-amber-700">Kuota Layanan</div>
                  <div className="mt-3 text-3xl font-black text-slate-900"><CountUp target={unitStats.kuota_layanan} /></div>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <div className="text-xs uppercase tracking-widest text-slate-500">PM Saat Ini</div>
                  <div className="mt-3 text-3xl font-black text-slate-900"><CountUp target={unitStats.pm_saat_ini} /></div>
                </div>
                <div className="rounded-3xl bg-sky-50 p-4">
                  <div className="text-xs uppercase tracking-widest text-sky-600">Laki-laki</div>
                  <div className="mt-3 text-3xl font-black text-slate-900"><CountUp target={unitStats.laki_laki} /></div>
                </div>
                <div className="rounded-3xl bg-pink-50 p-4">
                  <div className="text-xs uppercase tracking-widest text-pink-600">Perempuan</div>
                  <div className="mt-3 text-3xl font-black text-slate-900"><CountUp target={unitStats.perempuan} /></div>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 shadow-sm flex flex-col items-center justify-center text-center gap-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Daftar Online</h4>
                <p className="text-xs text-slate-500 mt-1">Penerima Manfaat</p>
              </div>
              <button onClick={() => setActiveTab('pendaftaran')} className="px-6 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-emerald-700 transition shadow-md hover:shadow-lg">
                Daftar Sekarang
              </button>
            </div>
          </section>

          <section className="grid gap-4 xl:grid-cols-3">
            <div className="rounded-3xl border border-violet-200 bg-violet-50 p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900">Layanan Dasar</h4>
                  <p className="mt-2 text-xs uppercase tracking-[0.25em] text-violet-600">Kebutuhan pokok unit</p>
                </div>
                <span className="rounded-full bg-violet-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-700">Unit</span>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-slate-600 whitespace-pre-line">{profileServices || 'Belum ada data layanan dasar untuk unit ini.'}</p>
            </div>

            <div className="rounded-3xl border border-sky-200 bg-sky-50 p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900">Rehabilitasi Sosial</h4>
                  <p className="mt-2 text-xs uppercase tracking-[0.25em] text-sky-600">Bimbingan & dukungan</p>
                </div>
                <span className="rounded-full bg-sky-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-700">Sosial</span>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-slate-600 whitespace-pre-line">{profileGuidance || 'Belum ada data bimbingan rehabilitasi sosial untuk unit ini.'}</p>
            </div>

            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900">Persyaratan</h4>
                  <p className="mt-2 text-xs uppercase tracking-[0.25em] text-emerald-600">Pendaftaran</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">Info</span>
              </div>
              <ul className="mt-5 space-y-3 text-sm text-slate-600">
                {unitRequirements.length === 0 ? (
                  <li className="text-sm text-slate-600">Belum ada data persyaratan penerimaan untuk unit ini.</li>
                ) : unitRequirements.map((req) => (
                  <li key={req} className="flex gap-3 items-start">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-900" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h4 className="text-base font-bold text-slate-900">Kontak & Media Sosial</h4>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  {profileAddress ? <div><span className="font-semibold text-slate-900">Alamat:</span> {profileAddress}</div> : null}
                  {profilePhone ? <div><span className="font-semibold text-slate-900">Telepon:</span> {profilePhone}</div> : null}
                  {profileWhatsapp ? (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">WhatsApp:</span>
                      <a href={`https://wa.me/${profileWhatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-green-600 hover:underline">{profileWhatsapp}</a>
                    </div>
                  ) : null}
                  {profileEmail ? <div><span className="font-semibold text-slate-900">Email:</span> {profileEmail}</div> : null}
                  <div className="space-y-2 pt-2">
                    {socialLinks.map((link) => {
                      const accountName = link.url ? (() => { try { return new URL(link.url).pathname.replace(/^\/+|\/+$/g, '').split('/').pop() || ''; } catch { return ''; } })() : '';
                      return (
                        <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className={`flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold hover:bg-slate-50 hover:shadow-sm transition ${link.color}`}>
                          <link.icon className="w-4 h-4 shrink-0" />
                          <span className="text-slate-700">{link.label}: {accountName ? `@${accountName}` : link.url}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>


            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h4 className="text-base font-bold text-slate-900">Fasilitas Unit</h4>
                {unitFacilities.length === 0 ? (
                  <p className="mt-4 text-sm text-slate-600">Belum ada data fasilitas untuk unit ini.</p>
                ) : (
                  <div className="mt-4 space-y-4">
                    {unitFacilities.slice(0, 4).map((facility) => (
                      <div key={facility.id} className="rounded-3xl border border-slate-200 bg-amber-50 p-4 flex gap-4 items-start">
                        {facility.image_url && (
                          <img src={facility.image_url} alt={facility.name} className="w-16 h-16 rounded-2xl object-cover shrink-0" referrerPolicy="no-referrer" />
                        )}
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-slate-900">{facility.name}</div>
                          <p className="mt-1 text-sm text-slate-600 line-clamp-2">{facility.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h4 className="text-base font-bold text-slate-900">SDM & Petugas</h4>
                {unitStaff.length === 0 ? (
                  <p className="mt-4 text-sm text-slate-600">Belum ada data SDM untuk unit ini.</p>
                ) : (
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {unitStaff.map((person) => (
                      <div key={person.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 flex items-center gap-4">
                        <img src={person.photo_url} alt={person.name} className="h-14 w-14 rounded-3xl object-cover" referrerPolicy="no-referrer" />
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{person.name}</div>
                          <div className="text-xs uppercase tracking-widest text-slate-500">{person.position}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-base font-bold text-slate-900">Berita & Kegiatan</h4>
                <span className="text-[10px] uppercase tracking-widest text-amber-500">{unitNews.length} item</span>
              </div>
              {unitNews.length === 0 ? (
                <p className="mt-4 text-sm text-slate-600">Belum ada berita terfilter untuk unit ini.</p>
              ) : (
                <>
                  <ul className="mt-5 space-y-4">
                    {unitNews.slice(0, 3).map((item) => (
                      <li key={item.id} className="rounded-3xl border border-slate-200 bg-amber-50 p-4 flex gap-4 items-start">
                        {item.image_url && (
                          <img src={item.image_url} alt={item.title} className="w-20 h-20 rounded-2xl object-cover shrink-0" referrerPolicy="no-referrer" />
                        )}
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-slate-900">{item.title}</div>
                          <p className="mt-1 text-xs text-slate-600 line-clamp-3">{item.content}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {unitNews.length > 3 && (
                    <button onClick={() => setActiveTab('berita')} className="mt-4 w-full text-center text-xs font-bold text-sky-600 hover:text-sky-800 uppercase tracking-widest transition">
                      Lihat Selengkapnya →
                    </button>
                  )}
                </>
              )}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-base font-bold text-slate-900">Galeri Unit</h4>
                <span className="text-[10px] uppercase tracking-widest text-amber-500">{unitGalleries.length} item</span>
              </div>
              {unitGalleries.length === 0 ? (
                <p className="mt-4 text-sm text-slate-600">Belum ada galeri untuk unit ini.</p>
              ) : (
                <>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {unitGalleries.slice(0, 3).map((gallery) => (
                      <div key={gallery.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
                        <img src={gallery.image_url} alt={gallery.caption} className="h-40 w-full object-cover" referrerPolicy="no-referrer" />
                        <div className="p-4 text-sm text-slate-700">{gallery.caption}</div>
                      </div>
                    ))}
                  </div>
                  {unitGalleries.length > 3 && (
                    <button onClick={() => setActiveTab('galeri')} className="mt-4 w-full text-center text-xs font-bold text-sky-600 hover:text-sky-800 uppercase tracking-widest transition">
                      Lihat Selengkapnya →
                    </button>
                  )}
                </>
              )}
            </div>
          </section>
        </>
      ) : (
        <div className="rounded-3xl border border-dashed border-amber-200 bg-amber-50 p-8 text-slate-600">
          Pilih unit kerja PPS atau RPS untuk menampilkan ringkasan dan konten khusus.
        </div>
      )}
    </div>
  );
}

// ==========================================
// NEW: BERITA VIEW
// ==========================================
