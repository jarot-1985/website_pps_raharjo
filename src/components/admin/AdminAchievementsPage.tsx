import React, { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import type { Achievement, RpsUnit } from "../../types";
import { createAchievement, deleteAchievement, updateAchievement } from "../../api";
import { MediaPreview } from "./MediaPreview";

interface AdminAchievementsPageProps {
  selectedRole: RpsUnit;
  displayedAchievements: Achievement[];
  onRefreshData: () => Promise<void>;
  onShowFeedback: (type: "success" | "error", text: string) => void;
  handleGenericFileUpload: (e: React.ChangeEvent<HTMLInputElement>, setUrlCallback: (url: string) => void) => Promise<void>;
}

export function AdminAchievementsPage({ selectedRole, displayedAchievements, onRefreshData, onShowFeedback, handleGenericFileUpload }: AdminAchievementsPageProps) {
  const [achForm, setAchForm] = useState({ id: "", title: "", description: "", year: "2026", image_url: "", rps_unit: "Pamardi Siwi" as RpsUnit });
  const [isEditingAch, setIsEditingAch] = useState(false);

  const saveAchAction = async (e: React.FormEvent) => {
    e.preventDefault();
    const activeUnit = selectedRole === "PPS" ? achForm.rps_unit : selectedRole;
    const finalPayload = { ...achForm, rps_unit: activeUnit };

    try {
      if (isEditingAch) {
        await updateAchievement(achForm.id, finalPayload);
        onShowFeedback("success", "Prestasi berhasil diupdate!");
      } else {
        await createAchievement(finalPayload);
        onShowFeedback("success", "Prestasi baru ditambahkan!");
      }
      setAchForm({ id: "", title: "", description: "", year: "2026", image_url: "", rps_unit: "Pamardi Siwi" });
      setIsEditingAch(false);
      await onRefreshData();
    } catch (err) {
      onShowFeedback("error", "Gagal menyimpan prestasi.");
    }
  };

  return (
    <div className="space-y-6" id="admin-achievements-page">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Kelola Prestasi Penerima Manfaat</h4>
            <p className="text-[11px] text-slate-500">Tambahkan atau sunting prestasi yang ditampilkan di halaman publik.</p>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-slate-700 bg-slate-100 px-3 py-2 rounded-xl">
            Unit aktif: {selectedRole === "PPS" ? "Semua Unit" : selectedRole}
          </span>
        </div>

        <form onSubmit={saveAchAction} className="space-y-4" id="achievements-page-form">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Judul Prestasi *</label>
              <input
                type="text"
                required
                value={achForm.title}
                onChange={(e) => setAchForm({ ...achForm, title: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Foto Piagam/Penghargaan (URL / Unggah) *</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={achForm.image_url}
                  onChange={(e) => setAchForm({ ...achForm, image_url: e.target.value })}
                  className="flex-1 text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleGenericFileUpload(e, (url) => setAchForm(prev => ({ ...prev, image_url: url })))}
                  className="hidden"
                  id="achievements-image-uploader"
                />
                <label htmlFor="achievements-image-uploader" className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-xs font-semibold cursor-pointer">
                  Unggah
                </label>
              </div>
              <MediaPreview url={achForm.image_url} type="image" title="Pratinjau Foto Prestasi" alt="Preview prestasi" />
            </div>
          </div>

          {selectedRole === "PPS" && (
            <div className="space-y-1 max-w-md">
              <label className="text-xs font-bold text-slate-700">Unit Kerja RPS *</label>
              <select
                value={achForm.rps_unit}
                onChange={(e) => setAchForm({ ...achForm, rps_unit: e.target.value as RpsUnit })}
                className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
              >
                <option value="Pamardi Siwi">RPS Pamardi Siwi (Anak)</option>
                <option value="Mojomulyo">RPS Mojomulyo (Lansia)</option>
                <option value="Gondang">RPS Gondang (PMKS)</option>
                <option value="PPS_Raharjo">PPS Raharjo (Disabilitas Intelektual)</option>
              </select>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Tahun Prestasi *</label>
              <input
                type="text"
                required
                value={achForm.year}
                onChange={(e) => setAchForm({ ...achForm, year: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Deskripsi *</label>
              <textarea
                required
                rows={3}
                value={achForm.description}
                onChange={(e) => setAchForm({ ...achForm, description: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-sky-500 hover:bg-sky-300 text-white text-xs font-bold rounded-lg">
              {isEditingAch ? "Update Prestasi" : "Simpan Prestasi"}
            </button>
            {isEditingAch && (
              <button
                type="button"
                onClick={() => {
                  setAchForm({ id: "", title: "", description: "", year: "2026", image_url: "", rps_unit: "Pamardi Siwi" });
                  setIsEditingAch(false);
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
        <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">Daftar Prestasi</h4>
        {displayedAchievements.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">Belum ada prestasi.</div>
        ) : (
          <div className="space-y-3">
            {displayedAchievements.map((item) => (
              <div key={item.id} className="border border-slate-200 rounded-xl p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-bold text-slate-900">{item.title}</div>
                  <div className="text-[10px] text-slate-500">Unit: {item.rps_unit} • Tahun: {item.year}</div>
                  <div className="text-[10px] text-slate-400 line-clamp-2">{item.description}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setAchForm(item); setIsEditingAch(true); }}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      if (confirm("Hapus prestasi ini?")) {
                        await deleteAchievement(item.id);
                        onShowFeedback("success", "Prestasi berhasil dihapus.");
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
