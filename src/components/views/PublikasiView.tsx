import { useState, useEffect } from "react";
import { Search, Facebook, Twitter, Instagram, Link, ArrowRight, Download, FileText, Calendar, Check, FileCheck, ShieldAlert } from "lucide-react";
import type { Announcement, DocumentDownload } from "../../types";

export function PublikasiView({ announcements, documents, defaultSubTab }: { announcements: Announcement[]; documents: DocumentDownload[]; defaultSubTab?: 'pengumuman' | 'download' | 'ppid' }) {
  const [activeSubTab, setActiveSubTab] = useState<'pengumuman' | 'download' | 'ppid'>(defaultSubTab || 'pengumuman');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePpidSection, setActivePpidSection] = useState<string>('profil');

  useEffect(() => {
    const handleNav = (e: any) => {
      if (e.detail) setActiveSubTab(e.detail);
    };
    window.addEventListener('nav-publikasi', handleNav);
    return () => window.removeEventListener('nav-publikasi', handleNav);
  }, []);

  const filteredAnnouncements = announcements.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDocuments = documents.filter(d =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 py-4 animate-fade-in font-serif" id="publikasi-page">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-amber-100 pb-6">
        <div>
          <h2 className="text-3xl font-serif text-slate-900 font-bold tracking-tight">Pusat Publikasi & Informasi</h2>
          <p className="text-xs font-sans text-slate-500 uppercase tracking-wider mt-1">Temukan pengumuman resmi dan unduh dokumen/SOP milik panti.</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-amber-500">
            <Search className="w-4 h-4" />
          </span>
          <input
            id="publikasi-search"
            type="text"
            placeholder="Cari dokumen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs font-sans border border-amber-200 rounded-xl focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 bg-white shadow-xs"
          />
        </div>
      </div>

      {/* Tabs and Socials */}
      <div className="flex border-b border-amber-100 flex-wrap justify-between items-center w-full">
        <div className="flex flex-wrap">
          <button
            onClick={() => { setActiveSubTab('pengumuman'); setSearchQuery(''); }}
            className={`px-6 py-3 font-sans text-xs font-extrabold uppercase tracking-widest border-b-2 transition cursor-pointer ${activeSubTab === 'pengumuman'
              ? "border-amber-500 text-amber-600"
              : "border-transparent text-slate-400 hover:text-amber-500"
              }`}
            id="publikasi-tab-pengumuman"
          >
            Pengumuman Resmi
          </button>
          <button
            onClick={() => { setActiveSubTab('download'); setSearchQuery(''); }}
            className={`px-6 py-3 font-sans text-xs font-extrabold uppercase tracking-widest border-b-2 transition cursor-pointer ${activeSubTab === 'download'
              ? "border-amber-500 text-amber-600"
              : "border-transparent text-slate-400 hover:text-amber-500"
              }`}
            id="publikasi-tab-download"
          >
            Unduhan Dokumen / PDF
          </button>
          <button
            onClick={() => { setActiveSubTab('ppid'); setSearchQuery(''); }}
            className={`px-6 py-3 font-sans text-xs font-extrabold uppercase tracking-widest border-b-2 transition cursor-pointer ${activeSubTab === 'ppid'
              ? "border-amber-500 text-amber-600 font-bold"
              : "border-transparent text-slate-400 hover:text-amber-500"
              }`}
            id="publikasi-tab-ppid"
          >
            Layanan PPID & Informasi Publik
          </button>
        </div>
        <div className="flex items-center gap-3 px-4 py-2">
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

      {/* View Content */}
      {activeSubTab === 'pengumuman' ? (
        <div className="space-y-6">
          {filteredAnnouncements.length === 0 ? (
            <div className="text-center py-12 bg-amber-50/40 rounded-2xl border border-amber-200">
              <p className="text-amber-700 font-serif italic text-sm">Tidak ada pengumuman yang sesuai kata kunci.</p>
            </div>
          ) : (
            filteredAnnouncements.map((a) => (
              <div key={a.id} className="bg-white border border-amber-100 rounded-2xl p-6 space-y-4 hover:shadow-xs transition" id={`announcement-item-${a.id}`}>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-100 pb-3">
                  <span className="px-3 py-1 bg-sky-50 border border-sky-100 text-sky-700 text-[10px] font-extrabold font-mono tracking-wider uppercase flex items-center gap-1.5 rounded-full">
                    <Calendar className="w-3 h-3" /> Tanggal: {a.date}
                  </span>
                  <span className="text-[9px] font-extrabold text-emerald-600 font-mono tracking-widest uppercase border border-emerald-200 px-2.5 py-0.5 bg-emerald-50 rounded-full">
                    Aktif
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-serif text-slate-900 font-bold">{a.title}</h3>
                  <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line font-sans">{a.content}</p>
                </div>
                {a.file_url && a.file_url !== "#" && (
                  <div className="pt-2">
                    <a
                      href={a.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-white bg-black hover:bg-neutral-850 px-4 py-2.5 rounded-none cursor-pointer transition duration-150"
                    >
                      <Download className="w-3.5 h-3.5" /> Unduh Lampiran
                    </a>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      ) : activeSubTab === 'download' ? (
        <div className="bg-white border border-amber-100 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse" id="documents-table">
            <thead>
              <tr className="bg-amber-50/50 border-b border-amber-100">
                <th className="px-6 py-4 text-xs font-sans font-bold text-slate-700 uppercase tracking-widest">Nama Dokumen</th>
                <th className="px-6 py-4 text-xs font-sans font-bold text-slate-700 uppercase tracking-widest">Kategori</th>
                <th className="px-6 py-4 text-xs font-sans font-bold text-slate-700 uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100">
              {filteredDocuments.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-slate-500 text-sm font-serif italic">
                    Tidak ada dokumen yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredDocuments.map((d) => (
                  <tr key={d.id} className="hover:bg-amber-50/30 transition" id={`document-row-${d.id}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 rounded-xl bg-orange-50 text-orange-600 border border-orange-100 shadow-xs">
                          <FileText className="w-4 h-4" />
                        </span>
                        <div>
                          <div className="font-serif text-slate-900 font-bold text-sm">{d.title}</div>
                          <div className="text-[9px] text-slate-400 font-mono mt-0.5 uppercase tracking-wider">
                            Diupload: {new Date(d.created_at).toLocaleDateString('id-ID')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-sans font-extrabold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
                        {d.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => {
                          if (d.file_url && d.file_url !== "#") {
                            window.open(d.file_url, '_blank');
                          } else {
                            alert("Link dokumen simulasi. Dalam mode real, dokumen PDF yang Anda upload akan terbuka di tab baru.");
                          }
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90 px-3.5 py-1.5 rounded-lg transition shadow-xs cursor-pointer"
                        id={`btn-dl-${d.id}`}
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid md:grid-cols-12 gap-8 pt-2 animate-fade-in font-sans">
          {/* Left / Top Sidebars (Matching user's exact screenshot layout) */}
          <div className="md:col-span-4 space-y-6">

            {/* Box 1: PPID */}
            <div className="bg-white rounded-none border border-slate-200 overflow-hidden shadow-md">
              {/* Blue Header exactly like image */}
              <div className="bg-[#329cd5] text-white font-sans font-extrabold text-center py-4 px-3 text-sm uppercase tracking-wider border-b-2 border-[#1c81bc] shadow-xs">
                PPID
              </div>
              <div className="flex flex-col">
                <button
                  onClick={() => setActivePpidSection('profil')}
                  className={`w-full text-left font-sans text-xs md:text-sm py-3.5 px-5 transition duration-150 border-b border-slate-100 flex justify-between items-center cursor-pointer ${activePpidSection === 'profil'
                    ? "bg-sky-50 font-extrabold text-sky-700 border-l-4 border-sky-500 pl-4"
                    : "bg-white text-slate-700 hover:bg-slate-50 hover:text-sky-600"
                    }`}
                  id="ppid-item-profil"
                >
                  <span>Profil PPID</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${activePpidSection === 'profil' ? 'text-sky-600 translate-x-1' : 'text-slate-300'} transition-transform`} />
                </button>
                <button
                  onClick={() => setActivePpidSection('struktur')}
                  className={`w-full text-left font-sans text-xs md:text-sm py-3.5 px-5 transition duration-150 border-b border-slate-100 flex justify-between items-center cursor-pointer ${activePpidSection === 'struktur'
                    ? "bg-sky-50 font-extrabold text-sky-700 border-l-4 border-sky-500 pl-4"
                    : "bg-white text-slate-700 hover:bg-slate-50 hover:text-sky-600"
                    }`}
                  id="ppid-item-struktur"
                >
                  <span>Struktur PPID</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${activePpidSection === 'struktur' ? 'text-sky-600 translate-x-1' : 'text-slate-300'} transition-transform`} />
                </button>
                <button
                  onClick={() => setActivePpidSection('sk')}
                  className={`w-full text-left font-sans text-xs md:text-sm py-3.5 px-5 transition duration-150 flex justify-between items-center cursor-pointer ${activePpidSection === 'sk'
                    ? "bg-sky-50 font-extrabold text-sky-700 border-l-4 border-sky-500 pl-4"
                    : "bg-white text-slate-700 hover:bg-slate-50 hover:text-sky-600"
                    }`}
                  id="ppid-item-sk"
                >
                  <span>SK Tim PPD</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${activePpidSection === 'sk' ? 'text-sky-600 translate-x-1' : 'text-slate-300'} transition-transform`} />
                </button>
              </div>
            </div>

            {/* Box 2: DAFTAR INFORMASI PUBLIK */}
            <div className="bg-white rounded-none border border-slate-200 overflow-hidden shadow-md">
              {/* Blue Header exactly like image */}
              <div className="bg-[#329cd5] text-white font-sans font-extrabold text-center py-4 px-3 text-xs md:text-sm uppercase tracking-wider border-b-2 border-[#1c81bc] shadow-xs">
                Daftar Informasi Publik
              </div>
              <div className="flex flex-col">
                <button
                  onClick={() => setActivePpidSection('setiap_saat')}
                  className={`w-full text-left font-sans text-xs md:text-sm py-3.5 px-5 transition duration-150 border-b border-slate-100 flex justify-between items-center cursor-pointer ${activePpidSection === 'setiap_saat'
                    ? "bg-sky-50 font-extrabold text-sky-700 border-l-4 border-sky-500 pl-4"
                    : "bg-white text-slate-700 hover:bg-slate-50 hover:text-sky-600"
                    }`}
                  id="ppid-item-setiap-saat"
                >
                  <span>Informasi Setiap Saat</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${activePpidSection === 'setiap_saat' ? 'text-sky-600 translate-x-1' : 'text-slate-300'} transition-transform`} />
                </button>
                <button
                  onClick={() => setActivePpidSection('berkala')}
                  className={`w-full text-left font-sans text-xs md:text-sm py-3.5 px-5 transition duration-150 border-b border-slate-100 flex justify-between items-center cursor-pointer ${activePpidSection === 'berkala'
                    ? "bg-sky-50 font-extrabold text-sky-700 border-l-4 border-sky-500 pl-4"
                    : "bg-white text-slate-700 hover:bg-slate-50 hover:text-sky-600"
                    }`}
                  id="ppid-item-berkala"
                >
                  <span>Informasi Berkala</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${activePpidSection === 'berkala' ? 'text-sky-600 translate-x-1' : 'text-slate-300'} transition-transform`} />
                </button>
                <button
                  onClick={() => setActivePpidSection('serta_merta')}
                  className={`w-full text-left font-sans text-xs md:text-sm py-3.5 px-5 transition duration-150 border-b border-slate-100 flex justify-between items-center cursor-pointer ${activePpidSection === 'serta_merta'
                    ? "bg-sky-50 font-extrabold text-sky-700 border-l-4 border-sky-500 pl-4"
                    : "bg-white text-slate-700 hover:bg-slate-50 hover:text-sky-600"
                    }`}
                  id="ppid-item-serta-merta"
                >
                  <span>Informasi Serta Merta</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${activePpidSection === 'serta_merta' ? 'text-sky-600 translate-x-1' : 'text-slate-300'} transition-transform`} />
                </button>
                <button
                  onClick={() => setActivePpidSection('dikecualikan')}
                  className={`w-full text-left font-sans text-xs md:text-sm py-3.5 px-5 transition duration-150 flex justify-between items-center cursor-pointer ${activePpidSection === 'dikecualikan'
                    ? "bg-sky-50 font-extrabold text-sky-700 border-l-4 border-sky-500 pl-4"
                    : "bg-white text-slate-700 hover:bg-slate-50 hover:text-sky-600"
                    }`}
                  id="ppid-item-dikecualikan"
                >
                  <span>Daftar Informasi Dikecualikan</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${activePpidSection === 'dikecualikan' ? 'text-sky-600 translate-x-1' : 'text-slate-300'} transition-transform`} />
                </button>
              </div>
            </div>

          </div>

          {/* Right Content Area: Beautiful dynamic presentation panels */}
          <div className="md:col-span-8 bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-sm space-y-6">
            {activePpidSection === 'profil' && (
              <div className="space-y-6 animate-fade-in" id="panel-ppid-profil">
                <div className="border-b border-slate-100 pb-4">
                  <span className="inline-block bg-sky-50 text-sky-700 text-[10px] font-sans font-black uppercase tracking-widest px-2.5 py-1 rounded-md border border-sky-100">
                    Keterbukaan Informasi Publik
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif text-slate-900 font-bold mt-2">
                    Profil Pejabat Pengelola Informasi & Dokumentasi (PPID)
                  </h3>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed text-justify">
                  Sesuai dengan amanat <strong>Undang-Undang Nomor 14 Tahun 2008</strong> tentang Keterbukaan Informasi Publik (KIP),
                  Panti Pelayanan Sosial (PPS) Raharjo mendirikan PPID Pembantu untuk memastikan pelayanan informasi yang transparan, cepat, andal, dan akuntabel kepada seluruh pemangku kepentingan dan masyarakat umum.
                </p>

                <div className="grid md:grid-cols-2 gap-6 pt-2">
                  <div className="bg-gradient-to-br from-sky-50 to-indigo-50 p-5 rounded-xl border border-sky-100 space-y-2">
                    <h4 className="font-serif font-extrabold text-sky-950 text-sm flex items-center gap-2">
                      <span className="p-1 rounded-lg bg-sky-500 text-white"><Check className="w-3.5 h-3.5" /></span> Visi PPID Raharjo
                    </h4>
                    <p className="text-xs text-sky-900 leading-relaxed italic text-justify">
                      "Terwujudnya pelayanan informasi publik yang prima, transparan, dan akuntabel berbasis teknologi digital guna mewujudkan kesejahteraan sosial yang merata."
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-xl border border-emerald-100 space-y-2">
                    <h4 className="font-serif font-extrabold text-emerald-950 text-sm flex items-center gap-2">
                      <span className="p-1 rounded-lg bg-emerald-500 text-white"><Check className="w-3.5 h-3.5" /></span> Maklumat Pelayanan
                    </h4>
                    <p className="text-xs text-emerald-900 leading-relaxed italic text-justify">
                      "Kami sanggup menyelenggarakan pelayanan informasi publik dengan cepat, tepat waktu, biaya ringan, ramah, dan bebas pungli demi kepuasan Anda."
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-sans font-black uppercase tracking-widest text-slate-900">Misi </h4>
                  <ul className="space-y-2.5">
                    {[
                      "Membangun infrastruktur penyimpanan dan pengolahan dokumen informasi yang aman dan modern.",
                      "Meningkatkan kompetensi sdm pelayan PPID dalam hal keramahan, ketepatan data, dan kecepatan layanan.",
                      "Menyediakan akses informasi publik yang inklusif, ramah difabel, serta mudah diakses lewat portal digital.",
                      "Melakukan pengujian konsekuensi informasi berkala secara profesional guna melindungi data privasi penerima manfaat."
                    ].map((misi, i) => (
                      <li key={i} className="text-slate-700 text-xs leading-relaxed flex gap-2.5 items-start">
                        <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                        <span className="font-medium text-justify">{misi}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activePpidSection === 'struktur' && (
              <div className="space-y-6 animate-fade-in" id="panel-ppid-struktur">
                <div className="border-b border-slate-100 pb-4">
                  <span className="inline-block bg-sky-50 text-sky-700 text-[10px] font-sans font-black uppercase tracking-widest px-2.5 py-1 rounded-md border border-sky-100">
                    Organigram Kerja
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif text-slate-900 font-bold mt-2">
                    Struktur PPID Pembantu PPS Raharjo
                  </h3>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed text-justify">
                  Sinergi dan koordinasi struktural yang mantap di lingkungan PPS Raharjo memastikan rantai koordinasi pelayanan informasi berjalan lancar tanpa hambatan birokrasi yang rumit.
                </p>

                {/* Interactive Organigram Tree */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <div className="flex flex-col items-center">
                    <div className="bg-indigo-600 text-white rounded-xl p-3 text-center shadow-sm w-56 border border-indigo-700">
                      <div className="text-[9px] font-sans font-bold uppercase tracking-wider text-indigo-200">Atasan PPID Pembantu</div>
                      <div className="font-serif font-black text-xs md:text-sm mt-0.5">Drs. Raharjo Widodo, M.Si</div>
                      <div className="text-[10px] text-indigo-100 mt-1">Kepala PPS Raharjo</div>
                    </div>
                    <div className="w-0.5 h-6 bg-slate-300"></div>
                    <div className="bg-sky-600 text-white rounded-xl p-3 text-center shadow-sm w-56 border border-sky-700">
                      <div className="text-[9px] font-sans font-bold uppercase tracking-wider text-sky-200">Ketua PPID Pembantu</div>
                      <div className="font-serif font-black text-xs md:text-sm mt-0.5">Triyono, S.Sos</div>
                      <div className="text-[10px] text-sky-100 mt-1">Kepala Sub Bagian Tata Usaha</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 pt-2">
                    <div className="bg-white border border-slate-200 rounded-xl p-3 text-center shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="text-[9px] font-sans font-black uppercase tracking-wider text-slate-400">Sekretariat PPID</div>
                        <div className="font-serif font-extrabold text-slate-900 text-xs mt-1">Larasati, A.Md</div>
                        <div className="text-[10px] text-slate-500">Pranata Humas</div>
                      </div>
                      <div className="text-[9px] bg-slate-100 text-slate-600 rounded-md py-0.5 mt-2 font-semibold">Urusan Administrasi & Berkas</div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-3 text-center shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="text-[9px] font-sans font-black uppercase tracking-wider text-slate-400">Bidang Pelayanan Informasi</div>
                        <div className="font-serif font-extrabold text-slate-900 text-xs mt-1">Anita, S.Kom</div>
                        <div className="text-[10px] text-slate-500">Front Office & IT</div>
                      </div>
                      <div className="text-[9px] bg-slate-100 text-slate-600 rounded-md py-0.5 mt-2 font-semibold">Layanan Pengaduan & Tamu</div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-3 text-center shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="text-[9px] font-sans font-black uppercase tracking-wider text-slate-400">Bidang Data & Klasifikasi</div>
                        <div className="font-serif font-extrabold text-slate-900 text-xs mt-1">Joko Susilo, S.H</div>
                        <div className="text-[10px] text-slate-500">Arsiparis Ahli</div>
                      </div>
                      <div className="text-[9px] bg-slate-100 text-slate-600 rounded-md py-0.5 mt-2 font-semibold">Penyaringan & Keberatan</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePpidSection === 'sk' && (
              <div className="space-y-6 animate-fade-in" id="panel-ppid-sk">
                <div className="border-b border-slate-100 pb-4">
                  <span className="inline-block bg-sky-50 text-sky-700 text-[10px] font-sans font-black uppercase tracking-widest px-2.5 py-1 rounded-md border border-sky-100">
                    Keputusan Resmi
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif text-slate-900 font-bold mt-2">
                    Surat Keputusan (SK) Pembentukan Tim PPID Pembantu
                  </h3>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed text-justify">
                  SK Tim merupakan payung hukum utama yang mengikat seluruh jajaran pengurus PPID Pembantu PPS Raharjo untuk konsisten dan tertib dalam menyelenggarakan transparansi informasi pelayanan kesejahteraan sosial.
                </p>

                {/* Legal Badge Card */}
                <div className="bg-slate-50 border border-slate-250 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center shadow-xs">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600 flex items-center justify-center shrink-0 shadow-inner">
                    <FileCheck className="w-10 h-10" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">Surat Keputusan Dinas Sosial Prov Jateng</div>
                    <h4 className="font-serif font-black text-slate-900 text-sm leading-snug">
                      SK Tim Pelaksana PPID Pembantu PPS Raharjo No. 188.4/012/III/2026
                    </h4>
                    <p className="text-slate-500 text-xs font-sans text-justify leading-relaxed">
                      Menimbang pentingnya kejelasan struktural, tugas, dan tata cara pelayanan informasi demi menunjang Indeks Reformasi Birokrasi panti yang prima dan bebas pungli.
                    </p>
                    <div className="text-[10px] text-slate-400 font-semibold pt-1">Ditetapkan pada: <strong>2 Januari 2026</strong></div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => alert("Simulasi unduh SK Tim PPID Pembantu PPS Raharjo. Berkas PDF asli setebal 14 halaman akan terunduh pada panti aslinya.")}
                    className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-white bg-slate-950 hover:bg-slate-850 px-5 py-3 rounded-xl shadow-md transition duration-150 cursor-pointer"
                    id="btn-download-sk"
                  >
                    <Download className="w-4 h-4" /> Unduh Dokumen SK Lengkap (PDF)
                  </button>
                </div>
              </div>
            )}

            {activePpidSection === 'setiap_saat' && (
              <div className="space-y-6 animate-fade-in" id="panel-ppid-setiap-saat">
                <div className="border-b border-slate-100 pb-4">
                  <span className="inline-block bg-sky-50 text-sky-700 text-[10px] font-sans font-black uppercase tracking-widest px-2.5 py-1 rounded-md border border-sky-100">
                    Transparansi Terus-Menerus
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif text-slate-900 font-bold mt-2">
                    Daftar Informasi Publik Setiap Saat
                  </h3>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed text-justify">
                  Daftar Informasi Publik yang wajib disediakan secara aktif, terdokumentasi rapi, dan siap diserahkan kepada pemohon informasi kapan saja tanpa perlu melalui proses rapat uji konsekuensi.
                </p>

                {/* Table of documents */}
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-4 py-3 font-sans font-bold text-slate-700 uppercase tracking-wider w-1/12 text-center">No</th>
                        <th className="px-4 py-3 font-sans font-bold text-slate-700 uppercase tracking-wider w-8/12">Nama Dokumen Informasi</th>
                        <th className="px-4 py-3 font-sans font-bold text-slate-700 uppercase tracking-wider w-3/12 text-center">Berkas</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { no: 1, title: "Profil Institusi PPS Raharjo Lengkap (SOP, Sejarah, Tugas & Fungsi)", size: "1.2 MB" },
                        { no: 2, title: "SOP Pelayanan Rehabilitasi Sosial (Penerimaan, PemPenerima Manfaat & Pemulangan)", size: "850 KB" },
                        { no: 3, title: "Daftar Sarana dan Prasarana Pendukung Pelayanan PPS Raharjo", size: "2.1 MB" },
                        { no: 4, title: "Laporan Harta Kekayaan Penyelenggara Negara (LHKPN) Pimpinan Panti", size: "1.4 MB" },
                        { no: 5, title: "Rencana Strategis (Renstra) & Program Kerja Tahunan Institusi", size: "3.4 MB" }
                      ].map((doc) => (
                        <tr key={doc.no} className="hover:bg-slate-50/50 transition">
                          <td className="px-4 py-3.5 font-bold text-slate-400 text-center">{doc.no}</td>
                          <td className="px-4 py-3.5">
                            <div className="font-serif font-bold text-slate-900 text-[13px]">{doc.title}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5 font-sans">Klasifikasi: Informasi Setiap Saat • Ukuran: {doc.size}</div>
                          </td>
                          <td className="px-4 py-3.5 text-center">
                            <button
                              onClick={() => alert(`Simulasi mengunduh berkas "${doc.title}". File berukuran ${doc.size} sukses terunduh!`)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 text-sky-700 border border-sky-200 rounded-lg text-[10px] font-sans font-bold uppercase tracking-wider hover:bg-sky-100 transition cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" /> PDF
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activePpidSection === 'berkala' && (
              <div className="space-y-6 animate-fade-in" id="panel-ppid-berkala">
                <div className="border-b border-slate-100 pb-4">
                  <span className="inline-block bg-sky-50 text-sky-700 text-[10px] font-sans font-black uppercase tracking-widest px-2.5 py-1 rounded-md border border-sky-100">
                    Publikasi Rutin Tahunan
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif text-slate-900 font-bold mt-2">
                    Daftar Informasi Publik Berkala
                  </h3>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed text-justify">
                  Informasi yang diperbarui dan diterbitkan untuk umum secara berkala sekurang-kurangnya 1 tahun sekali atau per semester guna melaporkan akuntabilitas kinerja dan keuangan panti.
                </p>

                {/* Table of documents */}
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-4 py-3 font-sans font-bold text-slate-700 uppercase tracking-wider w-1/12 text-center">No</th>
                        <th className="px-4 py-3 font-sans font-bold text-slate-700 uppercase tracking-wider w-8/12">Nama Dokumen Berkala</th>
                        <th className="px-4 py-3 font-sans font-bold text-slate-700 uppercase tracking-wider w-3/12 text-center">Berkas</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { no: 1, title: "Laporan Kinerja Instansi Pemerintah (LKjIP) PPS Raharjo Tahun Anggaran 2025", size: "4.5 MB" },
                        { no: 2, title: "Laporan Realisasi APBD (LRA) Penyerapan Anggaran Triwulan IV", size: "1.8 MB" },
                        { no: 3, title: "Hasil Survey Kepuasan Masyarakat (SKM) Terhadap Pelayanan Panti", size: "1.1 MB" },
                        { no: 4, title: "Buku Statistik Pelayanan Rehabilitasi Sosial Lansia & Anak Tahunan", size: "950 KB" }
                      ].map((doc) => (
                        <tr key={doc.no} className="hover:bg-slate-50/50 transition">
                          <td className="px-4 py-3.5 font-bold text-slate-400 text-center">{doc.no}</td>
                          <td className="px-4 py-3.5">
                            <div className="font-serif font-bold text-slate-900 text-[13px]">{doc.title}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5 font-sans">Klasifikasi: Informasi Berkala • Ukuran: {doc.size}</div>
                          </td>
                          <td className="px-4 py-3.5 text-center">
                            <button
                              onClick={() => alert(`Simulasi mengunduh berkas "${doc.title}". File berukuran ${doc.size} sukses terunduh!`)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 text-sky-700 border border-sky-200 rounded-lg text-[10px] font-sans font-bold uppercase tracking-wider hover:bg-sky-100 transition cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" /> PDF
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activePpidSection === 'serta_merta' && (
              <div className="space-y-6 animate-fade-in" id="panel-ppid-serta-merta">
                <div className="border-b border-slate-100 pb-4">
                  <span className="inline-block bg-sky-50 text-sky-700 text-[10px] font-sans font-black uppercase tracking-widest px-2.5 py-1 rounded-md border border-sky-100">
                    Kedaruratan & Kesiagaan
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif text-slate-900 font-bold mt-2">
                    Daftar Informasi Serta Merta
                  </h3>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed text-justify">
                  Informasi yang harus diumumkan dengan serta-merta tanpa penundaan karena menyangkut keselamatan jiwa raga penerima manfaat, masyarakat di sekitar lingkungan panti, dan ketertiban sosial darurat.
                </p>

                {/* Table of documents */}
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-4 py-3 font-sans font-bold text-slate-700 uppercase tracking-wider w-1/12 text-center">No</th>
                        <th className="px-4 py-3 font-sans font-bold text-slate-700 uppercase tracking-wider w-8/12">Informasi Darurat / Prosedur Kesiagaan</th>
                        <th className="px-4 py-3 font-sans font-bold text-slate-700 uppercase tracking-wider w-3/12 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { no: 1, title: "Prosedur Evakuasi Kebakaran, Gempa Bumi, & Penyelamatan Difabel", size: "1.1 MB" },
                        { no: 2, title: "Protokol Kesiapsiagaan Krisis Kesehatan (Wabah Penyakit Menular di Panti)", size: "1.5 MB" },
                        { no: 3, title: "SOP Penanganan Pertama Kecelakaan Kerja & Kegawatan Medis Lansia", size: "750 KB" }
                      ].map((doc) => (
                        <tr key={doc.no} className="hover:bg-slate-50/50 transition">
                          <td className="px-4 py-3.5 font-bold text-slate-400 text-center">{doc.no}</td>
                          <td className="px-4 py-3.5">
                            <div className="font-serif font-bold text-slate-950 text-[13px]">{doc.title}</div>
                            <div className="text-[10px] text-rose-600 font-bold mt-0.5 uppercase tracking-wide font-sans">Pemberitahuan Darurat Serta-Merta • {doc.size}</div>
                          </td>
                          <td className="px-4 py-3.5 text-center">
                            <button
                              onClick={() => alert(`Mengunduh dokumen panduan darurat "${doc.title}" untuk referensi evakuasi Anda.`)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-[10px] font-sans font-bold uppercase tracking-wider transition cursor-pointer shadow-xs"
                            >
                              <Download className="w-3.5 h-3.5" /> Unduh PDF
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activePpidSection === 'dikecualikan' && (
              <div className="space-y-6 animate-fade-in" id="panel-ppid-dikecualikan">
                <div className="border-b border-slate-100 pb-4">
                  <span className="inline-block bg-rose-50 text-rose-700 text-[10px] font-sans font-black uppercase tracking-widest px-2.5 py-1 rounded-md border border-rose-100">
                    Informasi Terbatas & Rahasia Negara
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif text-slate-900 font-bold mt-2">
                    Daftar Informasi yang Dikecualikan
                  </h3>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed text-justify">
                  Sesuai dengan <strong>Pasal 17 Undang-Undang Nomor 14 Tahun 2008</strong> tentang Keterbukaan Informasi Publik, beberapa klasifikasi data di panti dikecualikan (rahasia) guna melindungi privasi asasi individu, hak hukum internal, dan keamanan siber panti.
                </p>

                <div className="bg-amber-50/50 p-4 border border-amber-200 rounded-xl space-y-1 text-xs text-amber-900 font-sans flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Uji Konsekuensi Hukum:</strong> PPID Pembantu secara ketat melakukan pengujian dampak/konsekuensi secara berkala sebelum memutuskan menutup akses data ini demi hak privasi penerima manfaat.
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-sans font-black uppercase tracking-widest text-slate-900">Kategori Data yang Dilindungi & Dirahasiakan</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white border border-slate-150 p-4 rounded-xl space-y-2">
                      <h5 className="font-serif font-extrabold text-slate-900 text-xs flex items-center gap-1.5 text-rose-600">
                        • Identitas Pribadi Penerima Manfaat
                      </h5>
                      <p className="text-[11px] text-slate-500 leading-relaxed text-justify">
                        Nama lengkap asli, asal keluarga, alamat rumah, serta sidik jari dan dokumen kependudukan anak/lansia telantar dilindungi secara ketat sesuai <strong>UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi</strong>.
                      </p>
                    </div>

                    <div className="bg-white border border-slate-150 p-4 rounded-xl space-y-2">
                      <h5 className="font-serif font-extrabold text-slate-900 text-xs flex items-center gap-1.5 text-rose-600">
                        • Rekam Medis & Riwayat Psikologi
                      </h5>
                      <p className="text-[11px] text-slate-500 leading-relaxed text-justify">
                        Berkas rekam medis penyakit, rekam terapi kejiwaan, hasil diagnosis psikolog panti, serta riwayat obat penerima manfaat bersifat rahasia sesuai <strong>UU Kesehatan</strong>.
                      </p>
                    </div>

                    <div className="bg-white border border-slate-150 p-4 rounded-xl space-y-2">
                      <h5 className="font-serif font-extrabold text-slate-900 text-xs flex items-center gap-1.5 text-rose-600">
                        • Pemeriksaan Sengketa & Audit Internal
                      </h5>
                      <p className="text-[11px] text-slate-500 leading-relaxed text-justify">
                        Dokumen laporan audit internal fungsional, berkas pemeriksaan dugaan pelanggaran etik sdm yang sedang berproses, serta strategi hukum perkara panti di pengadilan.
                      </p>
                    </div>

                    <div className="bg-white border border-slate-150 p-4 rounded-xl space-y-2">
                      <h5 className="font-serif font-extrabold text-slate-900 text-xs flex items-center gap-1.5 text-rose-600">
                        • Keamanan Sistem Server & IT
                      </h5>
                      <p className="text-[11px] text-slate-500 leading-relaxed text-justify">
                        Sandi enkripsi database, rincian arsitektur jaringan internet panti, log server, dan diagram pertahanan IT guna mencegah sabotase dan pencurian data pribadi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 4. PENGGUNAAN ANGGARAN VIEW
// ==========================================
