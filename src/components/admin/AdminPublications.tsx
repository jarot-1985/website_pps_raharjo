import React from "react";
import type { Announcement, DocumentDownload } from "../../types";

interface AdminPublicationsProps {
  announcements: Announcement[];
  documents: DocumentDownload[];
  annForm: Announcement & { id: string; title: string; content: string; date: string; file_url: string; is_active: boolean };
  setAnnForm: React.Dispatch<React.SetStateAction<any>>;
  isEditingAnn: boolean;
  setIsEditingAnn: React.Dispatch<React.SetStateAction<boolean>>;
  saveAnnouncement: (e: React.FormEvent) => void;
  docForm: { title: string; category: string; file_url: string };
  setDocForm: React.Dispatch<React.SetStateAction<any>>;
  saveDocument: (e: React.FormEvent) => void;
  handleGenericFileUpload: (e: React.ChangeEvent<HTMLInputElement>, setUrlCallback: (url: string) => void) => Promise<void>;
  refreshData: () => Promise<void>;
  showFeedback: (type: "success" | "error", text: string) => void;
}

export function AdminPublications({
  announcements,
  documents,
  annForm,
  setAnnForm,
  isEditingAnn,
  setIsEditingAnn,
  saveAnnouncement,
  docForm,
  setDocForm,
  saveDocument,
  handleGenericFileUpload,
  refreshData,
  showFeedback
}: AdminPublicationsProps) {
  return (
    <div className="space-y-8" id="publikasi-workspace">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Kelola Pengumuman Resmi</h4>
        <form onSubmit={saveAnnouncement} className="space-y-4" id="announcement-adm-form">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Judul Pengumuman *</label>
              <input
                type="text"
                required
                value={annForm.title}
                onChange={(e) => setAnnForm({ ...annForm, title: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Dokumen Pendukung / Lampiran PDF (URL / Unggah)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={annForm.file_url}
                  onChange={(e) => setAnnForm({ ...annForm, file_url: e.target.value })}
                  placeholder="Link file PDF"
                  className="flex-1 text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                />
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={(e) => handleGenericFileUpload(e, (url) => setAnnForm((prev: any) => ({ ...prev, file_url: url })))}
                  className="hidden"
                  id="ann-pdf-uploader"
                />
                <label htmlFor="ann-pdf-uploader" className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-xs font-semibold cursor-pointer">
                  Unggah
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Isi Pengumuman Lengkap *</label>
            <textarea
              required
              rows={3}
              value={annForm.content}
              onChange={(e) => setAnnForm({ ...annForm, content: e.target.value })}
              className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
            ></textarea>
          </div>

          <button type="submit" className="px-4 py-2 bg-sky-500 hover:bg-sky-300 text-white text-xs font-bold rounded-lg cursor-pointer">
            {isEditingAnn ? "Update Pengumuman" : "Simpan Pengumuman"}
          </button>
        </form>

        <div className="divide-y divide-slate-200 pt-4">
          {announcements.map((a) => (
            <div key={a.id} className="py-3 flex justify-between items-start gap-4">
              <div>
                <h5 className="font-bold text-slate-900 text-sm">{a.title}</h5>
                <span className="text-[10px] text-slate-400 font-mono">Dibuat: {a.date}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setAnnForm(a); setIsEditingAnn(true); }} className="text-xs font-semibold text-sky-600 hover:underline">Sunting</button>
                <button
                  onClick={async () => {
                    if (confirm("Hapus pengumuman ini?")) {
                      await fetch(`/api/announcements/${a.id}`, { method: "DELETE" });
                      showFeedback("success", "Pengumuman dihapus.");
                      refreshData();
                    }
                  }}
                  className="text-xs font-semibold text-rose-600 hover:underline"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Kelola File Download / SOP / PDF Formulir</h4>
        <form onSubmit={saveDocument} className="grid md:grid-cols-3 gap-4 items-end" id="document-adm-form">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Nama File Dokumen *</label>
            <input
              type="text"
              required
              value={docForm.title}
              onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
              placeholder="e.g. SOP Pelayanan Anak.pdf"
              className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Kategori File *</label>
            <select
              value={docForm.category}
              onChange={(e) => setDocForm({ ...docForm, category: e.target.value })}
              className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
            >
              <option value="Persyaratan">Persyaratan</option>
              <option value="Regulasi">Regulasi</option>
              <option value="Laporan">Laporan Kinerja</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Dokumen PDF (URL / Unggah) *</label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={docForm.file_url}
                onChange={(e) => setDocForm({ ...docForm, file_url: e.target.value })}
                placeholder="Link file PDF"
                className="flex-1 text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
              />
              <input
                type="file"
                accept="application/pdf,image/*"
                onChange={(e) => handleGenericFileUpload(e, (url) => setDocForm((prev: any) => ({ ...prev, file_url: url })))}
                className="hidden"
                id="doc-pdf-uploader"
              />
              <label htmlFor="doc-pdf-uploader" className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-xs font-semibold cursor-pointer">
                Unggah
              </label>
            </div>
          </div>
          <button type="submit" className="md:col-span-3 py-2 bg-stone-50 hover:bg-stone-100 text-slate-900 text-xs font-bold rounded-lg cursor-pointer">
            Simpan File Download
          </button>
        </form>

        <div className="divide-y divide-slate-200 pt-4">
          {documents.map((d) => (
            <div key={d.id} className="py-2.5 flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-rose-50 text-rose-600 font-bold font-mono text-[9px]">PDF</span>
                <span className="font-semibold text-slate-800">{d.title}</span>
                <span className="text-[10px] text-slate-400">({d.category})</span>
              </div>
              <button
                onClick={async () => {
                  if (confirm("Hapus file download ini?")) {
                    await fetch(`/api/documents/${d.id}`, { method: "DELETE" });
                    showFeedback("success", "File berhasil dihapus.");
                    refreshData();
                  }
                }}
                className="text-xs font-semibold text-rose-600 hover:underline cursor-pointer"
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
