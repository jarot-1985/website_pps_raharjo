import React from "react";
import type { BeneficiaryRegistration } from "../../types";

interface AdminRegistrationsProps {
  registrations: BeneficiaryRegistration[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}

export function AdminRegistrations({ registrations, onApprove, onReject, onDelete }: AdminRegistrationsProps) {
  return (
    <div className="space-y-6" id="admin-registrations-page">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Daftar Pendaftaran Baru</h4>
            <p className="text-[11px] text-slate-500">Semua pendaftaran baru kini diproses otomatis sebagai disetujui.</p>
          </div>
          <div className="text-xs uppercase font-semibold tracking-widest text-emerald-700 bg-emerald-100 px-3 py-2 rounded-xl">
            Auto-Approve Aktif
          </div>
        </div>

        {registrations.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">Belum ada pengajuan pendaftaran baru yang masuk.</div>
        ) : (
          <div className="space-y-4">
            {registrations.map((r) => (
              <div key={r.id} className="border border-slate-200 rounded-xl p-4 space-y-3 bg-slate-50/80" id={`reg-card-${r.id}`}>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-150 pb-2">
                  <div className="text-xs font-mono font-bold text-sky-700">ID: {r.id}</div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      r.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                      r.status === 'Rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {r.status}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <div><strong>Nama PM:</strong> {r.name} ({r.gender})</div>
                    <div><strong>TTL:</strong> {r.birth_place}, {r.birth_date}</div>
                    <div><strong>Alamat PM:</strong> {r.address}</div>
                    <div><strong>Unit RPS Tujuan:</strong> <span className="text-sky-600">{r.rps_target}</span></div>
                  </div>
                  <div className="space-y-1">
                    <div><strong>Nama Wali/Pengaju:</strong> {r.guardian_name}</div>
                    <div><strong>Telepon Wali:</strong> <a href={`https://wa.me/${r.guardian_phone}`} target="_blank" rel="noreferrer" className="text-sky-600 hover:underline">{r.guardian_phone}</a></div>
                    {r.email && <div><strong>Email Wali:</strong> <span className="text-sky-600">{r.email}</span></div>}
                    {r.created_at && <div><strong>Tgl Pengajuan:</strong> {new Date(r.created_at).toLocaleDateString('id-ID')}</div>}</div>
                </div>

                {(r.ktp_url || r.kk_url || r.sktm_url) && (
                  <div className="pt-2 border-t border-slate-150 flex flex-wrap gap-2 text-[10px] font-semibold text-sky-700">
                    {r.ktp_url && <a href={r.ktp_url} target="_blank" rel="noreferrer" className="px-2 py-1 rounded bg-sky-50 hover:bg-sky-100">KTP</a>}
                    {r.kk_url && <a href={r.kk_url} target="_blank" rel="noreferrer" className="px-2 py-1 rounded bg-sky-50 hover:bg-sky-100">KK</a>}
                    {r.sktm_url && <a href={r.sktm_url} target="_blank" rel="noreferrer" className="px-2 py-1 rounded bg-sky-50 hover:bg-sky-100">SKTM</a>}
                  </div>
                )}

                <div className="pt-2 border-t border-slate-150 flex flex-wrap gap-2 text-xs font-semibold">
                  <button
                    onClick={() => onApprove(r.id)}
                    className="px-3 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => onReject(r.id)}
                    className="px-3 py-1 bg-rose-600 text-white rounded-lg hover:bg-rose-500 transition"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => onDelete(r.id)}
                    className="px-3 py-1 border border-slate-300 rounded-lg hover:bg-slate-100 transition"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
