import React, { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import type { Facility, RpsUnit } from "../../types";
import { createFacility, deleteFacility, updateFacility } from "../../api";
import { MediaPreview } from "./MediaPreview";

interface AdminFacilitiesPageProps {
  selectedRole: RpsUnit;
  displayedFacilities: Facility[];
  onRefreshData: () => Promise<void>;
  onShowFeedback: (type: "success" | "error", text: string) => void;
  handleGenericFileUpload: (e: React.ChangeEvent<HTMLInputElement>, setUrlCallback: (url: string) => void) => Promise<void>;
}

export function AdminFacilitiesPage({ selectedRole, displayedFacilities, onRefreshData, onShowFeedback, handleGenericFileUpload }: AdminFacilitiesPageProps) {
  const [facForm, setFacForm] = useState({ id: "", name: "", description: "", image_url: "", rps_unit: "Pamardi Siwi" as RpsUnit });
  const [isEditingFac, setIsEditingFac] = useState(false);

  const saveFacAction = async (e: React.FormEvent) => {
    e.preventDefault();
    const activeUnit = selectedRole === "PPS" ? facForm.rps_unit : selectedRole;
    const finalPayload = { ...facForm, rps_unit: activeUnit };

    try {
      if (isEditingFac) {
        await updateFacility(facForm.id, finalPayload);
        onShowFeedback("success", "Fasilitas berhasil diupdate!");
      } else {
        await createFacility(finalPayload);
        onShowFeedback("success", "Fasilitas baru ditambahkan!");
      }
      setFacForm({ id: "", name: "", description: "", image_url: "", rps_unit: "Pamardi Siwi" });
      setIsEditingFac(false);
      await onRefreshData();
    } catch (err) {
      onShowFeedback("error", "Gagal menyimpan fasilitas.");
    }
  };

  return (
    <div className="space-y-6" id="admin-facilities-page">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Kelola Fasilitas & Sarpras</h4>
            <p className="text-[11px] text-slate-500">Tambahkan atau sunting data fasilitas unit panti.</p>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-slate-700 bg-slate-100 px-3 py-2 rounded-xl">
            Unit aktif: {selectedRole === "PPS" ? "Semua Unit" : selectedRole}
          </span>
        </div>

        <form onSubmit={saveFacAction} className="space-y-4" id="facilities-page-form">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Nama Fasilitas *</label>
              <input
                type="text"
                required
                value={facForm.name}
                onChange={(e) => setFacForm({ ...facForm, name: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Foto Fasilitas (URL / Unggah) *</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={facForm.image_url}
                  onChange={(e) => setFacForm({ ...facForm, image_url: e.target.value })}
                  placeholder="Link gambar"
                  className="flex-1 text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleGenericFileUpload(e, (url) => setFacForm(prev => ({ ...prev, image_url: url })))}
                  className="hidden"
                  id="facilities-image-uploader"
                />
                <label htmlFor="facilities-image-uploader" className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-xs font-semibold cursor-pointer">
                  Unggah
                </label>
              </div>
              <MediaPreview url={facForm.image_url} type="image" title="Pratinjau Foto Fasilitas" alt="Preview fasilitas" />
            </div>
          </div>

          {selectedRole === "PPS" && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Unit Kerja RPS *</label>
              <select
                value={facForm.rps_unit}
                onChange={(e) => setFacForm({ ...facForm, rps_unit: e.target.value as RpsUnit })}
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
            <label className="text-xs font-bold text-slate-700">Deskripsi Singkat *</label>
            <textarea
              required
              rows={3}
              value={facForm.description}
              onChange={(e) => setFacForm({ ...facForm, description: e.target.value })}
              className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
            />
          </div>

          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-sky-500 hover:bg-sky-300 text-white text-xs font-bold rounded-lg">
              {isEditingFac ? "Update Fasilitas" : "Simpan Fasilitas"}
            </button>
            {isEditingFac && (
              <button
                type="button"
                onClick={() => {
                  setFacForm({ id: "", name: "", description: "", image_url: "", rps_unit: "Pamardi Siwi" });
                  setIsEditingFac(false);
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
        <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">Daftar Fasilitas</h4>
        {displayedFacilities.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">Belum ada fasilitas.</div>
        ) : (
          <div className="space-y-3">
            {displayedFacilities.map((item) => (
              <div key={item.id} className="border border-slate-200 rounded-xl p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <img src={item.image_url} alt={item.name} className="w-14 h-14 rounded object-cover border" referrerPolicy="no-referrer" />
                  <div>
                    <div className="font-bold text-slate-900">{item.name}</div>
                    <div className="text-[10px] text-slate-500">Unit: {item.rps_unit}</div>
                    <div className="text-[10px] text-slate-400 line-clamp-2">{item.description}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setFacForm(item); setIsEditingFac(true); }}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      if (confirm("Hapus fasilitas ini?")) {
                        await deleteFacility(item.id);
                        onShowFeedback("success", "Fasilitas berhasil dihapus.");
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
