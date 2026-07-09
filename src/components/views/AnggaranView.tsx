import type { BudgetReport } from "../../types";
import { Banknote, Activity } from "lucide-react";

export function AnggaranView({ budgets }: { budgets: BudgetReport[] }) {
  if (budgets.length === 0) {
    return (
      <div className="text-center py-12 bg-amber-50/40 rounded-2xl border border-amber-200">
        <p className="text-amber-700 font-serif italic text-sm">Laporan anggaran belum tersedia.</p>
      </div>
    );
  }

  const latestBudget = budgets[0];
  const formattedTotal = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(latestBudget.total_budget);
  const formattedRealized = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(latestBudget.realized_budget);
  const percentRealized = Math.round((latestBudget.realized_budget / latestBudget.total_budget) * 100);

  return (
    <div className="space-y-12 py-4 animate-fade-in font-serif" id="anggaran-page">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-sans font-extrabold uppercase tracking-widest rounded-full shadow-xs">
          <Banknote className="w-3.5 h-3.5 text-amber-600" /> Transparansi Anggaran Publik
        </span>
        <h2 className="text-3xl font-serif text-slate-900 font-bold tracking-tight">Anggaran Pendapatan & Belanja Daerah (APBD) {latestBudget.year}</h2>
        <p className="text-slate-500 font-sans text-xs uppercase tracking-wider">
          Komitmen penuh PPS Raharjo terhadap keterbukaan informasi publik dan akuntabilitas keuangan secara transparan.
        </p>
      </div>

      {/* Summary Metrics */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border border-amber-100 rounded-2xl p-6 space-y-3 shadow-sm hover:border-amber-300 transition duration-200">
          <div className="text-[10px] text-slate-500 font-sans font-extrabold uppercase tracking-widest">Total Pagu Anggaran</div>
          <div className="text-2xl font-serif font-extrabold text-slate-900">{formattedTotal}</div>
          <p className="text-slate-400 font-sans text-[10px] uppercase tracking-wider">Sumber: APBD Provinsi Jawa Tengah</p>
        </div>

        <div className="bg-white border border-amber-100 rounded-2xl p-6 space-y-3 shadow-sm hover:border-amber-300 transition duration-200">
          <div className="text-[10px] text-slate-500 font-sans font-extrabold uppercase tracking-widest">Realisasi Penggunaan</div>
          <div className="text-2xl font-serif font-extrabold text-emerald-600">{formattedRealized}</div>
          <p className="text-slate-400 font-sans text-[10px] uppercase tracking-wider">Realisasi berjalan tahun ini</p>
        </div>

        <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 rounded-2xl p-6 space-y-3 shadow-md flex flex-col justify-between hover:scale-[1.01] transition duration-200">
          <div className="space-y-1">
            <div className="text-[10px] text-slate-900 font-sans font-extrabold uppercase tracking-widest">Persentase Penyerapan</div>
            <div className="text-3xl font-serif font-black">{percentRealized}%</div>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-white/30 border border-white/20 rounded-full h-3 overflow-hidden mt-2">
            <div
              className="bg-slate-900 h-full transition-all duration-1000"
              style={{ width: `${percentRealized}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Breakdown List */}
      <div className="bg-white border border-amber-100 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
        <h3 className="text-sm font-sans font-extrabold uppercase tracking-widest text-slate-900 flex items-center gap-2">
          <Activity className="w-4 h-4 text-orange-500" /> Rincian Alokasi Program Rehabilitasi Sosial
        </h3>
        <div className="space-y-6">
          {latestBudget.breakdown.map((item, index) => {
            const itemPercent = Math.round((item.realized / item.budget) * 100);
            const fmtB = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(item.budget);
            const fmtR = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(item.realized);

            return (
              <div key={index} className="space-y-2 border-b border-amber-100 pb-4 last:border-0 last:pb-0" id={`budget-breakdown-${index}`}>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-1">
                  <span className="font-serif font-bold text-slate-900 text-sm">{item.category}</span>
                  <div className="text-[10px] font-sans text-slate-500 uppercase tracking-wider flex flex-wrap gap-2">
                    <span>Pagu: <strong className="text-slate-800">{fmtB}</strong></span>
                    <span>•</span>
                    <span>Realisasi: <strong className="text-emerald-600 font-bold">{fmtR}</strong></span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-amber-50 border border-amber-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-400 to-orange-500 h-full transition-all duration-1000"
                      style={{ width: `${itemPercent}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-sans font-bold text-slate-700 w-10 text-right">{itemPercent}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. LAYANAN ONLINE VIEW
// ==========================================
