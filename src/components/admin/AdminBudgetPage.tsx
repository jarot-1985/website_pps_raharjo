import React from "react";
import type { BudgetReport } from "../../types";

interface AdminBudgetPageProps {
  budgets: BudgetReport[];
}

export function AdminBudgetPage({ budgets }: AdminBudgetPageProps) {
  return (
    <div className="space-y-6" id="budget-workspace">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Data Anggaran / SIPD</h4>
            <p className="text-[11px] text-slate-500">Informasi anggaran ditampilkan dari sumber data yang tersedia. Form input tidak digunakan untuk halaman ini.</p>
          </div>
          <div className="text-xs uppercase font-semibold tracking-widest text-slate-600 bg-slate-100 px-3 py-2 rounded-xl">
            Read Only
          </div>
        </div>

        {budgets.map((b) => (
          <div key={b.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-5">
            <div className="border-b border-slate-200 pb-3">
              <h5 className="text-sm font-bold text-slate-900">Anggaran {b.year}</h5>
              <p className="text-[11px] text-slate-500">Total pagu dan realisasi tersaji untuk review cepat.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <div className="text-[10px] uppercase tracking-wider text-slate-500">Total Pagu</div>
                <div className="text-lg font-black text-slate-900">Rp {b.total_budget.toLocaleString('id-ID')}</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <div className="text-[10px] uppercase tracking-wider text-slate-500">Realisasi</div>
                <div className="text-lg font-black text-slate-900">Rp {b.realized_budget.toLocaleString('id-ID')}</div>
              </div>
            </div>
            <div className="space-y-3">
              {b.breakdown.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs">
                  <span className="font-semibold text-slate-700">{item.category}</span>
                  <span className="text-slate-500">Rp {item.budget.toLocaleString('id-ID')} • real: Rp {item.realized.toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
