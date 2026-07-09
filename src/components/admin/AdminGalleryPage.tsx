import React, { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import type { Gallery, RpsUnit } from "../../types";
import { createGallery, deleteGallery, updateGallery } from "../../api";
import { MediaPreview } from "./MediaPreview";

interface AdminGalleryPageProps {
  selectedRole: RpsUnit;
  displayedGalleries: Gallery[];
  onRefreshData: () => Promise<void>;
  onShowFeedback: (type: "success" | "error", text: string) => void;
  handleGenericFileUpload: (e: React.ChangeEvent<HTMLInputElement>, setUrlCallback: (url: string) => void) => Promise<void>;
}

export function AdminGalleryPage({ selectedRole, displayedGalleries, onRefreshData, onShowFeedback, handleGenericFileUpload }: AdminGalleryPageProps) {
  const [galForm, setGalForm] = useState({ id: "", caption: "", image_url: "", rps_unit: "Pamardi Siwi" as RpsUnit, type: "photo" as "photo" | "video", video_url: "" });
  const [isEditingGal, setIsEditingGal] = useState(false);

  const saveGalAction = async (e: React.FormEvent) => {
    e.preventDefault();
    const activeUnit = selectedRole === "PPS" ? galForm.rps_unit : selectedRole;
    const finalPayload = { ...galForm, rps_unit: activeUnit };

    try {
      if (isEditingGal) {
        await updateGallery(galForm.id, finalPayload);
        onShowFeedback("success", "Galeri berhasil diupdate!");
      } else {
        await createGallery(finalPayload);
        onShowFeedback("success", "Galeri baru ditambahkan!");
      }
      setGalForm({ id: "", caption: "", image_url: "", rps_unit: "Pamardi Siwi", type: "photo", video_url: "" });
      setIsEditingGal(false);
      await onRefreshData();
    } catch (err) {
      onShowFeedback("error", "Gagal menyimpan galeri.");
    }
  };

  return (
    <div className="space-y-6" id="admin-gallery-page">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Kelola Galeri Foto & Video</h4>
            <p className="text-[11px] text-slate-500">Unggah atau sunting media galeri untuk halaman publik.</p>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-slate-700 bg-slate-100 px-3 py-2 rounded-xl">
            Unit aktif: {selectedRole === "PPS" ? "Semua Unit" : selectedRole}
          </span>
        </div>

        <form onSubmit={saveGalAction} className="space-y-4" id="gallery-page-form">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Judul / Keterangan Media *</label>
              <input
                type="text"
                required
                value={galForm.caption}
                onChange={(e) => setGalForm({ ...galForm, caption: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Cover / Thumbnail (URL / Unggah) *</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={galForm.image_url}
                  onChange={(e) => setGalForm({ ...galForm, image_url: e.target.value })}
                  className="flex-1 text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleGenericFileUpload(e, (url) => setGalForm(prev => ({ ...prev, image_url: url })))}
                  className="hidden"
                  id="gallery-image-uploader"
                />
                <label htmlFor="gallery-image-uploader" className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-xs font-semibold cursor-pointer">
                  Unggah
                </label>
              </div>
              <MediaPreview url={galForm.image_url} type="image" title="Pratinjau Cover Galeri" alt="Preview galeri" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 items-end">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Jenis Media</label>
              <select
                value={galForm.type}
                onChange={(e) => setGalForm({ ...galForm, type: e.target.value as "photo" | "video" })}
                className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
              >
                <option value="photo">Foto</option>
                <option value="video">Video</option>
              </select>
            </div>

            {galForm.type === "video" && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">URL Video / Media *</label>
                <input
                  type="text"
                  required
                  value={galForm.video_url}
                  onChange={(e) => setGalForm({ ...galForm, video_url: e.target.value })}
                  className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                />
                <MediaPreview url={galForm.video_url} type="video" title="Pratinjau Video Galeri" alt="Preview video galeri" />
              </div>
            )}
          </div>

          {selectedRole === "PPS" && (
            <div className="space-y-1 max-w-md">
              <label className="text-xs font-bold text-slate-700">Unit Kerja RPS *</label>
              <select
                value={galForm.rps_unit}
                onChange={(e) => setGalForm({ ...galForm, rps_unit: e.target.value as RpsUnit })}
                className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
              >
                <option value="Pamardi Siwi">RPS Pamardi Siwi (Anak)</option>
                <option value="Mojomulyo">RPS Mojomulyo (Lansia)</option>
                <option value="Gondang">RPS Gondang (PMKS)</option>
                <option value="PPS_Raharjo">PPS Raharjo (Disabilitas Intelektual)</option>
              </select>
            </div>
          )}

          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-sky-500 hover:bg-sky-300 text-white text-xs font-bold rounded-lg">
              {isEditingGal ? "Update Galeri" : "Simpan Galeri"}
            </button>
            {isEditingGal && (
              <button
                type="button"
                onClick={() => {
                  setGalForm({ id: "", caption: "", image_url: "", rps_unit: "Pamardi Siwi", type: "photo", video_url: "" });
                  setIsEditingGal(false);
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
        <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">Galeri Media</h4>
        {displayedGalleries.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">Belum ada galeri.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedGalleries.map((item) => (
              <div key={item.id} className="border border-slate-200 rounded-xl p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <img src={item.image_url} alt={item.caption} className="w-16 h-16 rounded object-cover border" referrerPolicy="no-referrer" />
                  <div>
                    <div className="font-bold text-slate-900">{item.caption}</div>
                    <div className="text-[10px] text-slate-500">Unit: {item.rps_unit}</div>
                  </div>
                </div>
                {item.type === "video" && item.video_url && (
                  <div className="text-[10px] px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600">Video URL: {item.video_url}</div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => { setGalForm({
                      ...item,
                      type: item.type ?? "photo",
                      video_url: item.video_url ?? ""
                    }); setIsEditingGal(true); }}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      if (confirm("Hapus media ini?")) {
                        await deleteGallery(item.id);
                        onShowFeedback("success", "Media galeri berhasil dihapus.");
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
