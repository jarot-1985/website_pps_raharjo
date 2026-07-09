import React from "react";
import { AlertCircle } from "lucide-react";
import type { RpsUnit, News, Facility, Gallery, BeneficiaryRegistration } from "../../types";

interface AdminOverviewProps {
  selectedRole: RpsUnit;
  displayedNews: News[];
  displayedFacilities: Facility[];
  displayedGalleries: Gallery[];
  registrations: BeneficiaryRegistration[];
}

export function AdminOverview({ selectedRole, displayedNews, displayedFacilities, displayedGalleries, registrations }: AdminOverviewProps) {
  const pendingRegistrations = registrations.filter((r) => r.status === 'Pending').length;

  return (
    <div className="space-y-6" id="overview-workspace">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-6 text-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.7)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-200">
              Dashboard Admin
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-white">Halo, Admin {selectedRole === 'PPS' ? 'Utama' : `RPS ${selectedRole}`}</h3>
            <p className="max-w-2xl text-sm text-slate-300">Akses panel kontrol penuh untuk pemantauan pelayanan dan pembaruan data real-time dengan tampilan yang lebih rapi dan elegan.</p>
          </div>
          <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-right">
            <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-200">Status Server</div>
            <div className="mt-1 text-sm font-semibold text-amber-100">Aktif & Tersinkron</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: 'Berita Aktif', value: displayedNews.length, accent: 'from-sky-400 to-sky-300' },
          { label: 'Sarpras Unit', value: displayedFacilities.length, accent: 'from-emerald-500 to-teal-500' },
          { label: 'Pendaftar Pending', value: pendingRegistrations, accent: 'from-amber-500 to-orange-500' },
          { label: 'Foto Galeri', value: displayedGalleries.length, accent: 'from-violet-500 to-fuchsia-500' }
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className={`mb-3 h-1.5 w-16 rounded-full bg-gradient-to-r ${item.accent}`} />
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">{item.label}</div>
            <div className="mt-2 text-3xl font-semibold text-slate-900">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-amber-200 bg-amber-50/80 p-4 text-sm text-slate-700 shadow-sm">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div className="space-y-1">
            <strong className="block font-semibold text-slate-900">Instruksi Integrasi Penyimpanan Permanen</strong>
            <p className="leading-relaxed">
              Secara default, aplikasi menyimpan perubahan data dalam file database lokal <code className="rounded bg-white px-1 py-0.5 font-mono text-xs">data.json</code>. Anda dapat mengintegrasikannya dengan real database <strong>Supabase</strong> dan real cloud <strong>Cloudinary</strong> hanya dengan memasukkan variabel lingkungan yang diperlukan pada secrets panel atau file <code className="rounded bg-white px-1 py-0.5 font-mono text-xs">.env</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
