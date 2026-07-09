import React, { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { News, Facility, Gallery, Achievement, RpsUnit } from "../../types";
import {
  updateNews, deleteNews, createNews, uploadFile, fileToBase64,
  updateFacility, deleteFacility, createFacility,
  updateGallery, deleteGallery, createGallery,
  updateAchievement, deleteAchievement, createAchievement
} from "../../api";

type UnifiedSubTab = 'news' | 'facilities' | 'gallery' | 'achievements';

interface AdminTabRpsUnifiedProps {
  selectedRole: RpsUnit;
  displayedNews: News[];
  displayedFacilities: Facility[];
  displayedGalleries: Gallery[];
  displayedAchievements: Achievement[];
  onRefreshData: () => Promise<void>;
  onShowFeedback: (type: 'success' | 'error', text: string) => void;
}

export function AdminTabRpsUnified({
  selectedRole,
  displayedNews,
  displayedFacilities,
  displayedGalleries,
  displayedAchievements,
  onRefreshData,
  onShowFeedback
}: AdminTabRpsUnifiedProps) {
  const [unifiedSubTab, setUnifiedSubTab] = useState<UnifiedSubTab>('news');

  // News CRUD State
  const [newsForm, setNewsForm] = useState({ id: "", title: "", content: "", image_url: "", rps_unit: 'Pamardi Siwi' as RpsUnit, is_featured: false });
  const [isEditingNews, setIsEditingNews] = useState(false);

  const saveNewsAction = async (e: React.FormEvent) => {
    e.preventDefault();
    const activeUnit = selectedRole === 'PPS' ? newsForm.rps_unit : selectedRole;
    const finalPayload = { ...newsForm, rps_unit: activeUnit };

    try {
      if (isEditingNews) {
        await updateNews(newsForm.id, finalPayload);
        onShowFeedback("success", "Berita berhasil diupdate!");
      } else {
        await createNews(finalPayload);
        onShowFeedback("success", "Berita baru ditambahkan!");
      }
      setNewsForm({ id: "", title: "", content: "", image_url: "", rps_unit: 'Pamardi Siwi', is_featured: false });
      setIsEditingNews(false);
      await onRefreshData();
    } catch (err) {
      onShowFeedback("error", "Gagal menyimpan berita.");
    }
  };

  // Facilities CRUD State
  const [facForm, setFacForm] = useState({ id: "", name: "", description: "", image_url: "", rps_unit: 'Pamardi Siwi' as RpsUnit });
  const [isEditingFac, setIsEditingFac] = useState(false);

  const saveFacAction = async (e: React.FormEvent) => {
    e.preventDefault();
    const activeUnit = selectedRole === 'PPS' ? facForm.rps_unit : selectedRole;
    const finalPayload = { ...facForm, rps_unit: activeUnit };
    try {
      if (isEditingFac) {
        await updateFacility(facForm.id, finalPayload);
        onShowFeedback("success", "Fasilitas berhasil diupdate!");
      } else {
        await createFacility(finalPayload);
        onShowFeedback("success", "Fasilitas baru ditambahkan!");
      }
      setFacForm({ id: "", name: "", description: "", image_url: "", rps_unit: 'Pamardi Siwi' });
      setIsEditingFac(false);
      await onRefreshData();
    } catch (err) {
      onShowFeedback("error", "Gagal menyimpan fasilitas.");
    }
  };

  // Gallery CRUD State
  const [galForm, setGalForm] = useState({ id: "", caption: "", image_url: "", rps_unit: 'Pamardi Siwi' as RpsUnit, type: 'photo' as 'photo' | 'video', video_url: "" });
  const [isEditingGal, setIsEditingGal] = useState(false);

  const saveGalAction = async (e: React.FormEvent) => {
    e.preventDefault();
    const activeUnit = selectedRole === 'PPS' ? galForm.rps_unit : selectedRole;
    const finalPayload = { ...galForm, rps_unit: activeUnit };
    try {
      if (isEditingGal) {
        await updateGallery(galForm.id, finalPayload);
        onShowFeedback("success", "Galeri berhasil diupdate!");
      } else {
        await createGallery(finalPayload);
        onShowFeedback("success", "Galeri baru ditambahkan!");
      }
      setGalForm({ id: "", caption: "", image_url: "", rps_unit: 'Pamardi Siwi', type: 'photo', video_url: "" });
      setIsEditingGal(false);
      await onRefreshData();
    } catch (err) {
      onShowFeedback("error", "Gagal menyimpan galeri.");
    }
  };

  // Achievements CRUD State
  const [achForm, setAchForm] = useState({ id: "", title: "", description: "", year: "2026", image_url: "", rps_unit: 'Pamardi Siwi' as RpsUnit });
  const [isEditingAch, setIsEditingAch] = useState(false);

  const saveAchAction = async (e: React.FormEvent) => {
    e.preventDefault();
    const activeUnit = selectedRole === 'PPS' ? achForm.rps_unit : selectedRole;
    const finalPayload = { ...achForm, rps_unit: activeUnit };
    try {
      if (isEditingAch) {
        await updateAchievement(achForm.id, finalPayload);
        onShowFeedback("success", "Prestasi berhasil diupdate!");
      } else {
        await createAchievement(finalPayload);
        onShowFeedback("success", "Prestasi baru ditambahkan!");
      }
      setAchForm({ id: "", title: "", description: "", year: "2026", image_url: "", rps_unit: 'Pamardi Siwi' });
      setIsEditingAch(false);
      await onRefreshData();
    } catch (err) {
      onShowFeedback("error", "Gagal menyimpan prestasi.");
    }
  };

  // File uploader helper
  const handleGenericFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, setUrlCallback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await fileToBase64(file);
      const uploadedUrl = await uploadFile(base64, file.name, file.type);
      setUrlCallback(uploadedUrl);
      onShowFeedback("success", `File ${file.name} berhasil diunggah.`);
    } catch (err) {
      onShowFeedback("error", "Gagal mengunggah file.");
    }
  };

  return (
    <div className="space-y-8" id="rps-unified-workspace">
      {/* Horizontal Module Tab */}
      <div className="flex border-b border-slate-200 pb-2 gap-2">
        {[
          { key: 'news', label: '1. Berita Panti' },
          { key: 'facilities', label: '2. Fasilitas Unit' },
          { key: 'gallery', label: '3. Galeri Foto' },
          { key: 'achievements', label: '4. Prestasi Penerima Manfaat' }
        ].map((subTab) => (
          <button
            key={subTab.key}
            onClick={() => setUnifiedSubTab(subTab.key as any)}
            className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition ${
              unifiedSubTab === subTab.key 
                ? "bg-stone-50 text-slate-900" 
                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            }`}
            id={`unified-subtab-${subTab.key}`}
          >
            {subTab.label}
          </button>
        ))}
      </div>

      {/* UNIFIED INPUT FORM SECTION */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> 
          {isEditingNews || isEditingFac || isEditingGal || isEditingAch ? 'Sunting Konten Sesi' : 'Tambah Konten Baru ke Tabel Utama'}
        </h4>

        {/* NEWS FORM */}
        {unifiedSubTab === 'news' && (
          <form onSubmit={saveNewsAction} className="space-y-4" id="news-crud-form">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Judul Berita/Kegiatan *</label>
                <input
                  type="text"
                  required
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  placeholder="e.g. Kegiatan Pramuka Lansia"
                  className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Gambar Ilustrasi Berita (Unggah / URL) *</label>
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
                    id="news-photo-uploader"
                  />
                  <label htmlFor="news-photo-uploader" className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold cursor-pointer shadow-xs">
                    Unggah
                  </label>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {selectedRole === 'PPS' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Unit Kerja RPS Pemilik *</label>
                  <select
                    value={newsForm.rps_unit}
                    onChange={(e) => setNewsForm({ ...newsForm, rps_unit: e.target.value as any })}
                    className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                  >
                    <option value="PPS_Raharjo">PPS Raharjo (Disabilitas Intelektual)</option>
                    <option value="Pamardi Siwi">RPS Pamardi Siwi (Anak)</option>
                    <option value="Mojomulyo">RPS Mojomulyo (Lansia)</option>
                    <option value="Gondang">RPS Gondang (PMKS)</option>
                  </select>
                </div>
              )}

              <div className="flex items-center gap-3 h-full pt-6">
                <input
                  type="checkbox"
                  checked={newsForm.is_featured}
                  onChange={(e) => setNewsForm({ ...newsForm, is_featured: e.target.checked })}
                  className="w-4.5 h-4.5 text-sky-600 rounded cursor-pointer"
                  id="news-featured-checkbox"
                />
                <label htmlFor="news-featured-checkbox" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Tampilkan di halaman depan (Rekomendasi)
                </label>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Konten Teks Lengkap Berita *</label>
              <textarea
                required
                rows={3}
                value={newsForm.content}
                onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                placeholder="Tuliskan berita lengkap..."
              ></textarea>
            </div>

            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 bg-sky-500 hover:bg-sky-300 text-white text-xs font-bold rounded-lg transition cursor-pointer">
                {isEditingNews ? "Update Berita" : "Simpan Berita"}
              </button>
              {isEditingNews && (
                <button 
                  type="button" 
                  onClick={() => {
                    setNewsForm({ id: "", title: "", content: "", image_url: "", rps_unit: 'Pamardi Siwi', is_featured: false });
                    setIsEditingNews(false);
                  }}
                  className="px-4 py-2 bg-slate-200 text-slate-600 text-xs font-bold rounded-lg cursor-pointer"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        )}

        {/* FACILITIES FORM */}
        {unifiedSubTab === 'facilities' && (
          <form onSubmit={saveFacAction} className="space-y-4" id="fac-crud-form">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Nama Fasilitas/Sarpras *</label>
                <input
                  type="text"
                  required
                  value={facForm.name}
                  onChange={(e) => setFacForm({ ...facForm, name: e.target.value })}
                  placeholder="e.g. Ruang Poliklinik Lansia"
                  className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Foto Fasilitas (Unggah / URL) *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={facForm.image_url}
                    onChange={(e) => setFacForm({ ...facForm, image_url: e.target.value })}
                    className="flex-1 text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleGenericFileUpload(e, (url) => setFacForm(prev => ({ ...prev, image_url: url })))}
                    className="hidden"
                    id="fac-photo-uploader"
                  />
                  <label htmlFor="fac-photo-uploader" className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold cursor-pointer shadow-xs">
                    Unggah
                  </label>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Deskripsi Singkat Kegunaan *</label>
                <input
                  type="text"
                  required
                  value={facForm.description}
                  onChange={(e) => setFacForm({ ...facForm, description: e.target.value })}
                  className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                />
              </div>

              {selectedRole === 'PPS' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Unit Kerja RPS Pemilik *</label>
                  <select
                    value={facForm.rps_unit}
                    onChange={(e) => setFacForm({ ...facForm, rps_unit: e.target.value as any })}
                    className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                  >
                    <option value="Pamardi Siwi">RPS Pamardi Siwi (Anak)</option>
                    <option value="Mojomulyo">RPS Mojomulyo (Lansia)</option>
                    <option value="Gondang">RPS Gondang (PMKS)</option>
                    <option value="PPS_Raharjo">PPS Raharjo (Disabilitas Intelektual)</option>
                  </select>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 bg-sky-500 hover:bg-sky-300 text-white text-xs font-bold rounded-lg transition cursor-pointer">
                {isEditingFac ? "Update Fasilitas" : "Simpan Fasilitas"}
              </button>
              {isEditingFac && (
                <button 
                  type="button" 
                  onClick={() => {
                    setFacForm({ id: "", name: "", description: "", image_url: "", rps_unit: 'Pamardi Siwi' });
                    setIsEditingFac(false);
                  }}
                  className="px-4 py-2 bg-slate-200 text-slate-600 text-xs font-bold rounded-lg cursor-pointer"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        )}

        {/* GALLERY FORM */}
        {unifiedSubTab === 'gallery' && (
          <form onSubmit={saveGalAction} className="space-y-4" id="gal-crud-form">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Keterangan Media / Caption *</label>
                <input
                  type="text"
                  required
                  value={galForm.caption}
                  onChange={(e) => setGalForm({ ...galForm, caption: e.target.value })}
                  placeholder="e.g. Senam ceria bersama simbah"
                  className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Foto Cover / Thumbnail (Unggah / URL) *</label>
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
                    id="gallery-photo-uploader"
                  />
                  <label htmlFor="gallery-photo-uploader" className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold cursor-pointer shadow-xs">
                    Unggah
                  </label>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 items-center">
              <div className="flex items-center gap-2.5 p-3 border border-sky-100 rounded-xl bg-sky-50/20">
                <input
                  type="checkbox"
                  checked={galForm.type === 'video'}
                  onChange={(e) => setGalForm({ 
                    ...galForm, 
                    type: e.target.checked ? 'video' : 'photo',
                    video_url: e.target.checked ? galForm.video_url : "" 
                  })}
                  className="w-4.5 h-4.5 text-sky-600 rounded cursor-pointer"
                  id="gal-is-video-checkbox"
                />
                <label htmlFor="gal-is-video-checkbox" className="text-xs font-bold text-slate-800 cursor-pointer">
                  Centang jika ini adalah Video / Media Interaktif *
                </label>
              </div>

              {galForm.type === 'video' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">URL File Video / Media (.mp4 / Link) *</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required={galForm.type === 'video'}
                      value={galForm.video_url || ""}
                      onChange={(e) => setGalForm({ ...galForm, video_url: e.target.value })}
                      placeholder="e.g. https://domain.com/my-video.mp4"
                      className="flex-1 text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                    />
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleGenericFileUpload(e, (url) => setGalForm(prev => ({ ...prev, video_url: url })))}
                      className="hidden"
                      id="gallery-video-uploader"
                    />
                    <label htmlFor="gallery-video-uploader" className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold cursor-pointer shadow-xs">
                      Unggah Video
                    </label>
                  </div>
                </div>
              )}
            </div>

            {selectedRole === 'PPS' && (
              <div className="space-y-1 max-w-xs">
                <label className="text-xs font-bold text-slate-700">Unit Kerja RPS Pemilik *</label>
                <select
                  value={galForm.rps_unit}
                  onChange={(e) => setGalForm({ ...galForm, rps_unit: e.target.value as any })}
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
              <button type="submit" className="px-4 py-2 bg-sky-500 hover:bg-sky-300 text-white text-xs font-bold rounded-lg transition cursor-pointer">
                {isEditingGal ? "Update Galeri" : "Simpan Media Galeri"}
              </button>
              {isEditingGal && (
                <button 
                  type="button" 
                  onClick={() => {
                    setGalForm({ id: "", caption: "", image_url: "", rps_unit: 'Pamardi Siwi', type: 'photo', video_url: "" });
                    setIsEditingGal(false);
                  }}
                  className="px-4 py-2 bg-slate-200 text-slate-600 text-xs font-bold rounded-lg cursor-pointer"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        )}

        {/* ACHIEVEMENTS FORM */}
        {unifiedSubTab === 'achievements' && (
          <form onSubmit={saveAchAction} className="space-y-4" id="ach-crud-form">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Judul Prestasi *</label>
                <input
                  type="text"
                  required
                  value={achForm.title}
                  onChange={(e) => setAchForm({ ...achForm, title: e.target.value })}
                  placeholder="e.g. Juara Harapan 1 Kebersihan Panti"
                  className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Foto Piagam/Piala (Unggah / URL) *</label>
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
                    id="ach-photo-uploader"
                  />
                  <label htmlFor="ach-photo-uploader" className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold cursor-pointer shadow-xs">
                    Unggah
                  </label>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Tahun Penghargaan *</label>
                <input
                  type="text"
                  required
                  value={achForm.year}
                  onChange={(e) => setAchForm({ ...achForm, year: e.target.value })}
                  className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                />
              </div>

              {selectedRole === 'PPS' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Unit Kerja RPS Pemilik *</label>
                  <select
                    value={achForm.rps_unit}
                    onChange={(e) => setAchForm({ ...achForm, rps_unit: e.target.value as any })}
                    className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                  >
                    <option value="Pamardi Siwi">RPS Pamardi Siwi (Anak)</option>
                    <option value="Mojomulyo">RPS Mojomulyo (Lansia)</option>
                    <option value="Gondang">RPS Gondang (PMKS)</option>
                    <option value="PPS_Raharjo">PPS Raharjo (Disabilitas Intelektual)</option>
                  </select>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Deskripsi Detail Capaian Prestasi *</label>
              <textarea
                required
                rows={2}
                value={achForm.description}
                onChange={(e) => setAchForm({ ...achForm, description: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
              ></textarea>
            </div>

            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 bg-sky-500 hover:bg-sky-300 text-white text-xs font-bold rounded-lg transition cursor-pointer">
                {isEditingAch ? "Update Prestasi" : "Simpan Prestasi"}
              </button>
              {isEditingAch && (
                <button 
                  type="button" 
                  onClick={() => {
                    setAchForm({ id: "", title: "", description: "", year: "2026", image_url: "", rps_unit: 'Pamardi Siwi' });
                    setIsEditingAch(false);
                  }}
                  className="px-4 py-2 bg-slate-200 text-slate-600 text-xs font-bold rounded-lg cursor-pointer"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        )}
      </div>

      {/* LIVE DATA LISTS IN SINGLE TABULAR VIEW */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">
          Daftar Konten Unit {selectedRole === 'PPS' ? 'Utama (Semua Unit)' : `RPS ${selectedRole}`}
        </h4>

        {unifiedSubTab === 'news' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs divide-y divide-slate-200">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 font-bold font-mono">ID / Foto</th>
                  <th className="px-4 py-3 font-bold font-mono">Judul & Unit</th>
                  <th className="px-4 py-3 font-bold font-mono">Deskripsi Cuplikan</th>
                  <th className="px-4 py-3 font-bold font-mono text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150">
                {displayedNews.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-6 text-slate-400">Belum ada data berita.</td></tr>
                ) : (
                  displayedNews.map((n) => (
                    <tr key={n.id} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3">
                        <img src={n.image_url} alt={n.title} className="w-12 h-12 rounded object-cover border" referrerPolicy="no-referrer" />
                      </td>
                      <td className="px-4 py-3 font-semibold">
                        <div className="text-slate-900 text-sm">{n.title}</div>
                        <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 text-[10px] font-bold uppercase">
                          Unit: {n.rps_unit}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 max-w-xs truncate">{n.content}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex gap-1">
                          <button 
                            onClick={() => { setNewsForm(n); setIsEditingNews(true); }}
                            className="p-1 text-slate-600 hover:text-sky-600 cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={async () => {
                              if (confirm("Hapus berita ini?")) {
                                await deleteNews(n.id);
                                onShowFeedback("success", "Berita berhasil dihapus.");
                                await onRefreshData();
                              }
                            }}
                            className="p-1 text-slate-600 hover:text-rose-600 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {unifiedSubTab === 'facilities' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs divide-y divide-slate-200">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 font-bold font-mono">Foto</th>
                  <th className="px-4 py-3 font-bold font-mono">Nama Fasilitas</th>
                  <th className="px-4 py-3 font-bold font-mono">RPS Unit</th>
                  <th className="px-4 py-3 font-bold font-mono text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150">
                {displayedFacilities.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-6 text-slate-400">Belum ada data fasilitas.</td></tr>
                ) : (
                  displayedFacilities.map((f) => (
                    <tr key={f.id} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3">
                        <img src={f.image_url} alt={f.name} className="w-12 h-12 rounded object-cover border" referrerPolicy="no-referrer" />
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-900">{f.name}</td>
                      <td className="px-4 py-3">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">RPS {f.rps_unit}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex gap-1">
                          <button 
                            onClick={() => { setFacForm(f); setIsEditingFac(true); }}
                            className="p-1 text-slate-600 hover:text-sky-600 cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={async () => {
                              if (confirm("Hapus fasilitas ini?")) {
                                await deleteFacility(f.id);
                                onShowFeedback("success", "Fasilitas berhasil dihapus.");
                                await onRefreshData();
                              }
                            }}
                            className="p-1 text-slate-600 hover:text-rose-600 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {unifiedSubTab === 'gallery' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {displayedGalleries.map((g) => (
              <div key={g.id} className="border border-slate-200 rounded-lg p-2 relative group bg-slate-50">
                <img src={g.image_url} alt={g.caption} className="w-full h-24 object-cover rounded" referrerPolicy="no-referrer" />
                <div className="text-[10px] font-semibold text-slate-700 mt-2 truncate">{g.caption}</div>
                <div className="flex justify-between items-center mt-1 text-[9px] font-bold text-slate-400">
                  <span>{g.rps_unit}</span>
                  <div className="flex gap-1">
                    <button onClick={() => { setGalForm({ id: g.id, caption: g.caption, image_url: g.image_url, rps_unit: g.rps_unit, type: g.type || 'photo', video_url: g.video_url || '' }); setIsEditingGal(true); }} className="text-slate-500 hover:text-sky-600 cursor-pointer">Edit</button>
                    <button 
                      onClick={async () => {
                        if (confirm("Hapus foto galeri ini?")) {
                          await deleteGallery(g.id);
                          onShowFeedback("success", "Foto dihapus.");
                          await onRefreshData();
                        }
                      }}
                      className="text-slate-500 hover:text-rose-600"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {unifiedSubTab === 'achievements' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs divide-y divide-slate-200">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 font-bold font-mono">Tahun & Foto</th>
                  <th className="px-4 py-3 font-bold font-mono">Prestasi</th>
                  <th className="px-4 py-3 font-bold font-mono">Unit RPS</th>
                  <th className="px-4 py-3 font-bold font-mono text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150">
                {displayedAchievements.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-6 text-slate-400">Belum ada data prestasi.</td></tr>
                ) : (
                  displayedAchievements.map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3 flex items-center gap-2">
                        <span className="font-bold font-mono text-sky-600">[{a.year}]</span>
                        <img src={a.image_url} alt={a.title} className="w-8 h-8 rounded object-cover border" referrerPolicy="no-referrer" />
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-900">{a.title}</td>
                      <td className="px-4 py-3 text-slate-500">RPS {a.rps_unit}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex gap-1">
                          <button 
                            onClick={() => { setAchForm(a); setIsEditingAch(true); }}
                            className="p-1 text-slate-600 hover:text-sky-600 cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={async () => {
                              if (confirm("Hapus prestasi ini?")) {
                                await deleteAchievement(a.id);
                                onShowFeedback("success", "Prestasi berhasil dihapus.");
                                await onRefreshData();
                              }
                            }}
                            className="p-1 text-slate-600 hover:text-rose-600 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
