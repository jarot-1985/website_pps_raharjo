import { BarChart2, Users, Activity } from "lucide-react";
import type { News, Facility } from "../../types";
import { CircularProgress } from "./CircularProgress";

export function StatistikView({ news, facilities }: { news: News[]; facilities: Facility[] }) {
  const stats = [
    { label: "PPS RAHARJO (Disabilitas)", active: 100, capacity: 100, l: 53, p: 47, percent: "100.0%", color: "violet" },
    { label: "RPS PAMARDI SIWI (Anak)", active: 100, capacity: 100, l: 0, p: 100, percent: "100.0%", color: "sky" },
    { label: "RPS MOJOMULYO (Lansia)", active: 50, capacity: 50, l: 19, p: 31, percent: "100.0%", color: "emerald" },
    { label: "RPS GONDANG (PMKS)", active: 39, capacity: 40, l: 13, p: 26, percent: "97.5%", color: "rose" }
  ];

  const sdmDistribution = [
    { label: "Pejabat Struktural", count: 4 },
    { label: "Pekerja Sosial Profesional", count: 12 },
    { label: "Perawat & Paramedis", count: 8 },
    { label: "Instruktur Keterampilan", count: 6 },
    { label: "Pramusosial & Pengasuh", count: 18 },
    { label: "Petugas Keamanan & Kebersihan", count: 10 }
  ];

  return (
    <div className="space-y-12 py-4 animate-fade-in font-serif" id="statistik-page">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-3xl font-serif text-slate-900 font-bold tracking-tight">Portal Statistik Penerima Manfaat</h2>
        <p className="text-slate-500 font-sans text-xs uppercase tracking-wider">
          Data kuantitatif pemantauan kapasitas daya tampung panti serta sebaran klasifikasi pemPenerima Manfaat.
        </p>
      </div>

      {/* Circular Progress Wheels Grid */}
      <div className="space-y-6">
        <h3 className="text-sm font-sans font-extrabold uppercase tracking-widest text-slate-900 flex items-center gap-2 border-b border-amber-100 pb-2">
          <BarChart2 className="w-4 h-4 text-amber-500" /> Sebaran Daya Tampung & Penghuni Unit (Jiwa)
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, index) => (
            <CircularProgress
              key={index}
              label={s.label}
              value={s.active}
              max={s.capacity}
              lCount={s.l}
              pCount={s.p}
              percentText={s.percent}
              color={s.color}
            />
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Human Resource Distribution Chart */}
        <div className="bg-white border border-amber-100 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
          <h3 className="text-sm font-sans font-extrabold uppercase tracking-widest text-slate-900 flex items-center gap-2 border-b border-amber-100 pb-2">
            <Users className="w-4 h-4 text-emerald-500" /> Distribusi SDM & Tenaga Ahli (Orang)
          </h3>
          <div className="space-y-4">
            {sdmDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-xs border-b border-amber-50 pb-2.5 last:border-0 last:pb-0" id={`stat-sdm-${index}`}>
                <span className="text-slate-700 font-sans font-semibold">{item.label}</span>
                <span className="px-3 py-1 bg-amber-50 border border-amber-150 font-mono font-bold rounded-full text-amber-800 text-[11px]">
                  {item.count} Orang
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Overview Stats Quick Summary Card */}
        <div className="bg-white border border-amber-100 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm flex flex-col justify-between">
          <h3 className="text-sm font-sans font-extrabold uppercase tracking-widest text-slate-900 flex items-center gap-2 border-b border-amber-100 pb-2">
            <Activity className="w-4 h-4 text-indigo-500" /> Informasi Layanan Terintegrasi
          </h3>
          <div className="space-y-4 text-xs font-sans text-slate-600 text-justify leading-relaxed">
            <p>
              Sistem Pelayanan Sosial Terpadu (PPS Raharjo) mengoordinasikan seluruh administrasi pendaftaran, asuhan gizi, bimbingan mental spiritual, pelatihan kemandirian vokasional, serta rekapitulasi data demografis Penerima Manfaat (PM).
            </p>
            <p>
              Dengan empat panti pelayanan sosial (RPS) yang terspesialisasi, kami memastikan setiap warga Penerima Manfaat mendapatkan pendampingan yang fokus dan disesuaikan dengan kebutuhan pemulihan fungsional sosial mereka.
            </p>
          </div>
          <div className="pt-4 border-t border-amber-50 flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            <span className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider">Pembaruan Data: Real-time dari Admin Server</span>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 text-center space-y-1 shadow-xs hover:border-sky-300 hover:scale-105 transition duration-200">
          <div className="text-[9px] text-sky-700 uppercase font-sans font-extrabold tracking-wider">Total PM Aktif</div>
          <div className="text-3xl font-serif font-black text-slate-900">289</div>
          <p className="text-[10px] text-sky-600 font-sans uppercase">Jiwa Terbina</p>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 text-center space-y-1 shadow-xs hover:border-emerald-300 hover:scale-105 transition duration-200">
          <div className="text-[9px] text-emerald-700 uppercase font-sans font-extrabold tracking-wider">Total SDM Pelayan</div>
          <div className="text-3xl font-serif font-black text-slate-900">58</div>
          <p className="text-[10px] text-emerald-600 font-sans uppercase">Pegawai & Tenaga</p>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-center space-y-1 shadow-xs hover:border-amber-300 hover:scale-105 transition duration-200">
          <div className="text-[9px] text-amber-700 uppercase font-sans font-extrabold tracking-wider">Fasilitas Standar</div>
          <div className="text-3xl font-serif font-black text-slate-900">{facilities.length || 12}</div>
          <p className="text-[10px] text-amber-600 font-sans uppercase">Area & Sarana</p>
        </div>

        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5 text-center space-y-1 shadow-xs hover:border-rose-300 hover:scale-105 transition duration-200">
          <div className="text-[9px] text-rose-700 uppercase font-sans font-extrabold tracking-wider">Kategori Layanan</div>
          <div className="text-3xl font-serif font-black text-slate-900">4</div>
          <p className="text-[10px] text-rose-600 font-sans uppercase">Unit Terintegrasi</p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. FAQ VIEW
// ==========================================
