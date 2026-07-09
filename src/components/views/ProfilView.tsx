import { useState, useEffect } from "react";
import { FileText, Check, Facebook, Twitter, Instagram, Link, Award } from "lucide-react";
import type { AppSettings, Staff, Achievement } from "../../types";

export function ProfilView({ settings, staff, achievements }: { settings: AppSettings; staff: Staff[]; achievements: Achievement[] }) {
  const [activeUnit, setActiveUnit] = useState<'Semua' | 'Pamardi Siwi' | 'Mojomulyo' | 'Gondang' | 'PPS_Raharjo'>('Semua');
  const [activeProfilTab, setActiveProfilTab] = useState<'sambutan' | 'dasar_hukum' | 'sejarah' | 'visi_misi' | 'struktur' | 'sdm' | 'prestasi'>('sambutan');

  useEffect(() => {
    const handleNav = (e: any) => {
      if (e.detail) setActiveProfilTab(e.detail);
    };
    window.addEventListener('nav-profil', handleNav);
    return () => window.removeEventListener('nav-profil', handleNav);
  }, []);

  const filteredStaff = staff.filter(s => activeUnit === 'Semua' || s.rps_unit === activeUnit);
  const filteredAchievements = achievements.filter(a => activeUnit === 'Semua' || a.rps_unit === activeUnit);

  const renderSambutanVideo = (videoUrl?: string) => {
    if (!videoUrl) return null;

    const isYouTube = videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");

    if (isYouTube) {
      let embedUrl = videoUrl;

      if (videoUrl.includes("youtube.com/watch")) {
        const url = new URL(videoUrl);
        const videoId = url.searchParams.get("v");
        if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if (videoUrl.includes("youtu.be/")) {
        const match = videoUrl.match(/youtu\.be\/([A-Za-z0-9_-]+)/);
        if (match) embedUrl = `https://www.youtube.com/embed/${match[1]}`;
      }

      return (
        <iframe
          src={embedUrl}
          title="Video Sambutan"
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }

    return <video src={videoUrl} controls className="w-full h-full object-cover" />;
  };

  const renderTabButton = (tabId: typeof activeProfilTab, label: string) => (
    <button
      onClick={() => setActiveProfilTab(tabId)}
      className={`px-4 py-3 font-sans text-[10px] font-extrabold uppercase tracking-widest border-b-2 transition cursor-pointer whitespace-nowrap ${activeProfilTab === tabId
        ? "border-amber-500 text-amber-600"
        : "border-transparent text-slate-400 hover:text-amber-500"
        }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-8 py-4 animate-fade-in" id="profil-page">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-amber-100 pb-2">
        <div>
          <h2 className="text-3xl font-serif text-slate-900 font-bold tracking-tight">Profil Panti</h2>
          <p className="text-xs font-sans text-slate-500 uppercase tracking-wider mt-1">Mengenal lebih dekat Panti Pelayanan Sosial Raharjo.</p>
        </div>
      </div>

      {/* Tabs and Socials */}
      <div className="flex border-b border-amber-100 flex-wrap justify-between items-center w-full overflow-x-auto no-scrollbar">
        <div className="flex flex-nowrap">
          {renderTabButton('sambutan', 'Sambutan Kepala Panti')}
          {renderTabButton('dasar_hukum', 'Dasar Hukum')}
          {renderTabButton('sejarah', 'Sejarah Singkat')}
          {renderTabButton('visi_misi', 'Visi Misi')}
          {renderTabButton('struktur', 'Struktur Organisasi')}
          {renderTabButton('sdm', 'Sumber Daya Manusia')}
          {renderTabButton('prestasi', 'Prestasi')}
        </div>
        <div className="flex items-center gap-3 px-4 py-2 shrink-0">
          <a href="#" onClick={(e) => e.preventDefault()} className="text-blue-600 hover:scale-110 transition drop-shadow-sm" title="Facebook"><Facebook className="w-5 h-5 fill-current" /></a>
          <a href="#" onClick={(e) => e.preventDefault()} className="text-sky-500 hover:scale-110 transition drop-shadow-sm" title="Twitter"><Twitter className="w-5 h-5 fill-current" /></a>
          <a href="#" onClick={(e) => e.preventDefault()} className="text-pink-600 hover:scale-110 transition drop-shadow-sm" title="Instagram"><Instagram className="w-5 h-5" /></a>
          <a href="#" onClick={(e) => e.preventDefault()} className="text-slate-900 hover:scale-110 transition drop-shadow-sm" title="TikTok">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.61-.6 3.16-1.66 4.31-1.07 1.15-2.61 1.83-4.22 1.95-1.61.12-3.23-.27-4.57-1.1-1.34-.84-2.34-2.15-2.82-3.66-.48-1.51-.4-3.13.24-4.57.64-1.44 1.81-2.58 3.25-3.17 1.44-.59 3.05-.6 4.49-.03v4.09c-.71-.24-1.5-.23-2.19.05-.68.27-1.25.79-1.58 1.42-.33.64-.39 1.39-.17 2.06.22.68.73 1.25 1.37 1.57.65.31 1.41.34 2.07.1.67-.24 1.21-.77 1.51-1.41.3-.64.35-1.39.14-2.07V.02z" />
            </svg>
          </a>
          <a href="#" onClick={(e) => e.preventDefault()} className="text-slate-700 hover:scale-110 transition drop-shadow-sm" title="Tautan"><Link className="w-5 h-5" /></a>
        </div>
      </div>

      <div className="pt-4">
        {/* Sambutan Kepala Panti */}
        {activeProfilTab === 'sambutan' && (
          <section className="bg-gradient-to-br from-amber-50 to-orange-50/70 rounded-2xl p-6 md:p-10 border border-amber-200 flex flex-col md:flex-row gap-8 items-center md:items-start shadow-xs animate-fade-in" id="sambutan-section">
            <div className="w-48 h-48 md:w-60 md:h-60 rounded-2xl overflow-hidden shrink-0 bg-slate-50 border-2 border-amber-300 shadow-md">
              <img src={settings.sambutan_foto} alt={settings.sambutan_nama} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="space-y-4 flex-1 w-full">
              <span className="text-xs font-extrabold text-amber-600 font-sans tracking-widest uppercase block">Kepala Instansi</span>
              <h2 className="text-2xl md:text-3xl font-serif text-slate-900 font-bold tracking-tight">{settings.sambutan_nama}</h2>
              <div className="text-slate-500 font-sans text-xs pb-2 border-b border-amber-200">Kepala Panti Pelayanan Sosial Raharjo</div>
              <p className="text-slate-800 text-sm md:text-base leading-relaxed italic font-serif text-justify">
                "{settings.sambutan_teks}"
              </p>
              {settings.sambutan_video_url ? (
                <div className="rounded-2xl overflow-hidden border border-amber-200 bg-slate-950 shadow-inner aspect-video">
                  {renderSambutanVideo(settings.sambutan_video_url)}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-amber-200 bg-amber-50/70 p-5 text-sm text-slate-500">
                  Video sambutan belum tersedia.
                </div>
              )}
            </div>
          </section>
        )}

        {/* Visi & Misi */}
        {activeProfilTab === 'visi_misi' && (
          <section className="grid md:grid-cols-2 gap-8 animate-fade-in" id="visimisi-section">
            <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl p-8 md:p-10 flex flex-col justify-between border border-transparent shadow-md hover:scale-[1.01] transition duration-350">
              <div className="space-y-4">
                <span className="text-indigo-100 text-[10px] font-extrabold tracking-widest uppercase font-sans">Prinsip Arah</span>
                <h3 className="text-3xl font-serif font-bold">Visi </h3>
                <p className="text-white text-base leading-relaxed italic pt-4 border-t border-white/20 font-serif text-justify">
                  "{settings.visi}"
                </p>
              </div>
              <div className="pt-8 text-[10px] text-indigo-200 font-mono tracking-widest uppercase">PPS RAHARJO • VISI MULIA</div>
            </div>

            <div className="bg-white border border-amber-100 rounded-2xl p-8 md:p-10 space-y-6 shadow-sm">
              <div className="space-y-1">
                <span className="text-slate-500 text-xs font-bold tracking-widest uppercase font-sans">Langkah Strategis</span>
                <h3 className="text-2xl font-serif text-slate-900 font-bold">Misi Kami</h3>
              </div>
              <ul className="space-y-4">
                {settings.misi.map((m, i) => (
                  <li key={i} className="flex gap-3 items-start text-slate-700 text-sm" id={`misi-item-${i}`}>
                    <span className="p-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span className="leading-relaxed font-sans text-xs font-medium text-justify">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Sejarah */}
        {activeProfilTab === 'sejarah' && (
          <section className="animate-fade-in" id="sejarah-section">
            <div className="space-y-4 max-w-4xl">
              <h3 className="text-2xl font-serif text-slate-900 font-bold tracking-tight">Sejarah Singkat</h3>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line font-serif text-justify">
                {settings.sejarah_singkat}
              </p>
            </div>
          </section>
        )}

        {/* Dasar Hukum */}
        {activeProfilTab === 'dasar_hukum' && (
          <section className="animate-fade-in" id="dasar-hukum-section">
            <div className="space-y-4 max-w-4xl bg-gradient-to-r from-sky-50 to-indigo-50/70 p-6 md:p-8 rounded-2xl border border-sky-100 shadow-xs">
              <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-500" /> Dasar Hukum Operasional
              </h3>
              <ul className="space-y-3">
                {settings.dasar_hukum.map((d, i) => (
                  <li key={i} className="text-slate-700 text-sm leading-relaxed flex gap-2 items-start font-sans" id={`dasar-hukum-item-${i}`}>
                    <span className="text-indigo-600 font-extrabold shrink-0">•</span>
                    <span className="font-medium text-justify">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Struktur Organisasi */}
        {activeProfilTab === 'struktur' && (
          <section className="text-center space-y-6 animate-fade-in" id="struktur-section">
            <div className="max-w-2xl mx-auto space-y-2">
              <h3 className="text-2xl font-serif text-slate-900 font-bold tracking-tight">Struktur Organisasi</h3>
              <p className="text-slate-500 text-xs uppercase tracking-wider font-sans">
                Bagan hirarki kepemimpinan, koordinasi fungsional, dan penanggung jawab pelayanan teknis operasional.
              </p>
            </div>
            <div className="max-w-3xl mx-auto border border-amber-100 rounded-2xl overflow-hidden bg-white p-4 shadow-sm">
              <img
                src={settings.struktur_organisasi_url}
                alt="Struktur Organisasi PPS Raharjo"
                className="w-full max-h-96 object-contain rounded-xl border border-amber-100"
                referrerPolicy="no-referrer"
              />
            </div>
          </section>
        )}

        {/* Sumber Daya Manusia (SDM) */}
        {activeProfilTab === 'sdm' && (
          <section className="space-y-8 animate-fade-in" id="sdm-section">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-amber-100 pb-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Sumber Daya Manusia</h3>
                <p className="text-sm text-slate-500 font-sans">Daftar personil staff pelayanan panti.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {(['Semua', 'PPS_Raharjo', 'Pamardi Siwi', 'Mojomulyo', 'Gondang'] as const).map((unit) => {
                  const activeClasses: Record<string, string> = {
                    'Semua': 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 border-transparent shadow-sm',
                    'PPS_Raharjo': 'bg-violet-500 text-white border-transparent shadow-sm',
                    'Pamardi Siwi': 'bg-sky-500 text-white border-transparent shadow-sm',
                    'Mojomulyo': 'bg-emerald-500 text-white border-transparent shadow-sm',
                    'Gondang': 'bg-rose-500 text-white border-transparent shadow-sm'
                  };
                  const hoverClasses: Record<string, string> = {
                    'Semua': 'hover:text-amber-600 hover:border-amber-400',
                    'PPS_Raharjo': 'hover:text-violet-600 hover:border-violet-400',
                    'Pamardi Siwi': 'hover:text-sky-600 hover:border-sky-400',
                    'Mojomulyo': 'hover:text-emerald-600 hover:border-emerald-400',
                    'Gondang': 'hover:text-rose-600 hover:border-rose-400'
                  };
                  return (
                    <button
                      key={unit}
                      onClick={() => setActiveUnit(unit)}
                      className={`px-4 py-2 text-xs font-sans font-bold uppercase tracking-widest transition cursor-pointer border rounded-xl shadow-xs ${activeUnit === unit
                        ? activeClasses[unit]
                        : `bg-white text-slate-500 border-amber-200 ${hoverClasses[unit]}`
                        }`}
                      id={`sdm-tab-${unit.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {unit === 'Semua' ? 'Semua Unit' : unit === 'PPS_Raharjo' ? 'PPS Raharjo' : `RPS ${unit}`}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {filteredStaff.map((s) => (
                  <div key={s.id} className="bg-white border border-amber-100 rounded-2xl p-4 text-center space-y-3 shadow-sm hover:shadow-md hover:border-amber-300 transition duration-200" id={`staff-item-${s.id}`}>
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto bg-slate-50 border-2 border-amber-300 shadow-sm">
                      <img src={s.photo_url} alt={s.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <h5 className="font-serif font-bold text-slate-900 text-sm">{s.name}</h5>
                      <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest font-sans mt-0.5">{s.position}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-100">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[9px] font-bold tracking-widest uppercase">
                        {s.rps_unit === 'PPS_Raharjo' ? 'PPS Raharjo' : s.rps_unit === 'PPS' ? 'PPS Raharjo' : `RPS ${s.rps_unit}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {filteredStaff.length === 0 && (
                <div className="text-center p-8 bg-amber-50/50 rounded-2xl border border-amber-200">
                  <p className="text-amber-700 italic font-serif text-sm">Belum ada data staff untuk unit ini.</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Prestasi */}
        {activeProfilTab === 'prestasi' && (
          <section className="space-y-8 animate-fade-in" id="prestasi-section">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-amber-100 pb-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Prestasi Panti</h3>
                <p className="text-sm text-slate-500 font-sans">Pencapaian dan penghargaan.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {(['Semua', 'PPS_Raharjo', 'Pamardi Siwi', 'Mojomulyo', 'Gondang'] as const).map((unit) => {
                  const activeClasses: Record<string, string> = {
                    'Semua': 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 border-transparent shadow-sm',
                    'PPS_Raharjo': 'bg-violet-500 text-white border-transparent shadow-sm',
                    'Pamardi Siwi': 'bg-sky-500 text-white border-transparent shadow-sm',
                    'Mojomulyo': 'bg-emerald-500 text-white border-transparent shadow-sm',
                    'Gondang': 'bg-rose-500 text-white border-transparent shadow-sm'
                  };
                  const hoverClasses: Record<string, string> = {
                    'Semua': 'hover:text-amber-600 hover:border-amber-400',
                    'PPS_Raharjo': 'hover:text-violet-600 hover:border-violet-400',
                    'Pamardi Siwi': 'hover:text-sky-600 hover:border-sky-400',
                    'Mojomulyo': 'hover:text-emerald-600 hover:border-emerald-400',
                    'Gondang': 'hover:text-rose-600 hover:border-rose-400'
                  };
                  return (
                    <button
                      key={unit}
                      onClick={() => setActiveUnit(unit)}
                      className={`px-4 py-2 text-xs font-sans font-bold uppercase tracking-widest transition cursor-pointer border rounded-xl shadow-xs ${activeUnit === unit
                        ? activeClasses[unit]
                        : `bg-white text-slate-500 border-amber-200 ${hoverClasses[unit]}`
                        }`}
                      id={`prestasi-tab-${unit.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {unit === 'Semua' ? 'Semua Unit' : unit === 'PPS_Raharjo' ? 'PPS Raharjo' : `RPS ${unit}`}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {filteredAchievements.map((a) => (
                  <div key={a.id} className="flex gap-4 p-4 rounded-2xl border border-amber-100 bg-white hover:border-amber-300 transition duration-200 group" id={`achievement-item-${a.id}`}>
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center shrink-0 border border-orange-200 group-hover:bg-orange-500 group-hover:border-orange-500 transition-colors">
                      <Award className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] text-amber-600 font-extrabold uppercase tracking-widest flex gap-2">
                        {a.year} <span className="text-amber-300">•</span> {a.rps_unit === 'PPS_Raharjo' ? 'PPS Raharjo' : a.rps_unit === 'PPS' ? 'PPS Raharjo' : `RPS ${a.rps_unit}`}
                      </div>
                      <h5 className="font-serif font-bold text-slate-900 text-sm leading-snug">{a.title}</h5>
                      <p className="text-xs text-slate-500 font-sans leading-relaxed text-justify">{a.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              {filteredAchievements.length === 0 && (
                <div className="text-center p-8 bg-amber-50/50 rounded-2xl border border-amber-200">
                  <p className="text-amber-700 italic font-serif text-sm">Belum ada data prestasi untuk unit ini.</p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// 3. PUBLIKASI VIEW
// ==========================================
