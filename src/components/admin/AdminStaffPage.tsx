import React from "react";
import type { Staff } from "../../types";

interface AdminStaffPageProps {
  staff: Staff[];
  showFeedback: (type: "success" | "error", text: string) => void;
  refreshData: () => Promise<void>;
}

export function AdminStaffPage({ staff, showFeedback, refreshData }: AdminStaffPageProps) {
  return (
    <div className="space-y-6" id="staff-workspace">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Data Pegawai / SDM</h4>
            <p className="text-[11px] text-slate-500">Daftar pegawai ditampilkan dari sumber data yang tersedia. Form input tidak digunakan untuk halaman ini.</p>
          </div>
          <div className="text-xs uppercase font-semibold tracking-widest text-slate-600 bg-slate-100 px-3 py-2 rounded-xl">
            Read Only
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 pt-2">
          {staff.map((s) => (
            <div key={s.id} className="border border-slate-200 p-3 rounded-xl flex items-center justify-between text-xs bg-slate-50/50">
              <div className="flex items-center gap-2">
                <img src={s.photo_url} alt={s.name} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                <div>
                  <div className="font-bold text-slate-900">{s.name}</div>
                  <div className="text-slate-500 font-mono text-[10px]">{s.position} • {s.rps_unit}</div>
                  {(s.phone || s.email) && (
                    <div className="text-slate-400 text-[10px] mt-1">
                      {s.phone ? `Tel: ${s.phone}` : ""}{s.phone && s.email ? " • " : ""}{s.email ? s.email : ""}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={async () => {
                  if (confirm("Hapus pegawai ini?")) {
                    await fetch(`/api/staff/${s.id}`, { method: "DELETE" });
                    showFeedback("success", "Pegawai berhasil dihapus.");
                    refreshData();
                  }
                }}
                className="text-rose-600 hover:text-rose-800 font-semibold"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
