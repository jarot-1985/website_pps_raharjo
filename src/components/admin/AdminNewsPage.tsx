import React, { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import type { News, RpsUnit } from "../../types";
import { createNews, deleteNews, updateNews } from "../../api";
import { MediaPreview } from "./MediaPreview";

interface AdminNewsPageProps {
  selectedRole: RpsUnit;
  displayedNews: News[];
  onRefreshData: () => Promise<void>;
  onShowFeedback: (type: "success" | "error", text: string) => void;
  handleGenericFileUpload: (e: React.ChangeEvent<HTMLInputElement>, setUrlCallback: (url: string) => void) => Promise<void>;
}

export function AdminNewsPage({ selectedRole, displayedNews, onRefreshData, onShowFeedback, handleGenericFileUpload }: AdminNewsPageProps) {
  const [newsForm, setNewsForm] = useState({ id: "", title: "", content: "", image_url: "", rps_unit: "Pamardi Siwi" as RpsUnit, is_featured: false });
  const [isEditingNews, setIsEditingNews] = useState(false);

  const saveNewsAction = async (e: React.FormEvent) => {
    e.preventDefault();
    const activeUnit = selectedRole === "PPS" ? newsForm.rps_unit : selectedRole;
    const finalPayload = { ...newsForm, rps_unit: activeUnit };

    try {
      if (isEditingNews) {
        await updateNews(newsForm.id, finalPayload);
        onShowFeedback("success", "Berita berhasil diupdate!");
      } else {
        await createNews(finalPayload);
        onShowFeedback("success", "Berita baru ditambahkan!");
      }
      setNewsForm({ id: "", title: "", content: "", image_url: "", rps_unit: "Pamardi Siwi", is_featured: false });
      setIsEditingNews(false);
      await onRefreshData();
    } catch (err) {
      onShowFeedback("error", "Gagal menyimpan berita.");
    }
  };

  return (
    <div className="space-y-6" id="admin-news-page">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Kelola Berita & Kegiatan</h4>
            <p className="text-[11px] text-slate-500">Tambahkan atau sunting konten berita untuk halaman publik.</p>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-slate-700 bg-slate-100 px-3 py-2 rounded-xl">
            Unit aktif: {selectedRole === "PPS" ? "Semua Unit" : selectedRole}
          </span>
        </div>

        <form onSubmit={saveNewsAction} className="space-y-4" id="news-page-form">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Judul Berita *</label>
              <input
                type="text"
                required
                value={newsForm.title}
                onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Foto Berita (URL / Unggah) *</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={newsForm.image_url}
                  onChange={(e) => setNewsForm({ ...newsForm, image_url: e.target.value })}
                  placeholder="Link gambar"
                  className="flex-1 text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleGenericFileUpload(e, (url) => setNewsForm(prev => ({ ...prev, image_url: url })))}
                  className="hidden"
                  id="news-image-uploader"
                />
                <label htmlFor="news-image-uploader" className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-xs font-semibold cursor-pointer">
                  Unggah
                </label>
              </div>
              <MediaPreview url={newsForm.image_url} type="image" title="Pratinjau Foto Berita" alt="Preview berita" />
            </div>
          </div>

          {selectedRole === "PPS" && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Unit Kerja RPS *</label>
              <select
                value={newsForm.rps_unit}
                onChange={(e) => setNewsForm({ ...newsForm, rps_unit: e.target.value as RpsUnit })}
                className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
              >
                <option value="Pamardi Siwi">RPS Pamardi Siwi (Anak)</option>
                <option value="Mojomulyo">RPS Mojomulyo (Lansia)</option>
                <option value="Gondang">RPS Gondang (PMKS)</option>
                <option value="PPS_Raharjo">PPS Raharjo (Disabilitas Intelektual)</option>
              </select>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Konten Berita *</label>
            <textarea
              required
              rows={4}
              value={newsForm.content}
              onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
              className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <input
                type="checkbox"
                checked={newsForm.is_featured}
                onChange={(e) => setNewsForm({ ...newsForm, is_featured: e.target.checked })}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              Tampilkan sebagai berita unggulan
            </label>
            <button type="submit" className="px-4 py-2 bg-sky-500 hover:bg-sky-300 text-white text-xs font-bold rounded-lg">
              {isEditingNews ? "Update Berita" : "Simpan Berita"}
            </button>
            {isEditingNews && (
              <button
                type="button"
                onClick={() => {
                  setNewsForm({ id: "", title: "", content: "", image_url: "", rps_unit: "Pamardi Siwi", is_featured: false });
                  setIsEditingNews(false);
                }}
                className="px-4 py-2 bg-slate-200 text-slate-700 text-xs font-bold rounded-lg"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">Daftar Berita</h4>
        {displayedNews.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">Belum ada berita.</div>
        ) : (
          <div className="space-y-3">
            {displayedNews.map((item) => (
              <div key={item.id} className="border border-slate-200 rounded-xl p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-bold text-slate-900">{item.title}</div>
                  <div className="text-[10px] text-slate-500">Unit: {item.rps_unit}</div>
                  <div className="text-[10px] text-slate-400 mt-1 line-clamp-2">{item.content}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setNewsForm(item); setIsEditingNews(true); }}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      if (confirm("Hapus berita ini?")) {
                        await deleteNews(item.id);
                        onShowFeedback("success", "Berita berhasil dihapus.");
                        await onRefreshData();
                      }
                    }}
                    className="px-3 py-1 bg-rose-100 text-rose-700 rounded-lg text-xs"
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
