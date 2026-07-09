import React from "react";
import type { AppSettings, RpsUnit, UnitProfileSettings } from "../../types";
import { MediaPreview } from "./MediaPreview";
import { ppsRpsTabs } from "../views/PublicPageHelpers";

type SettingFieldKey = keyof AppSettings;

type SettingFieldValue = string | boolean | string[] | Record<string, UnitProfileSettings> | UnitProfileSettings;

interface AdminSettingsProps {
  settingsForm: AppSettings;
  selectedRole: RpsUnit;
  onCheckboxToggle: (key: keyof AppSettings) => void;
  onFieldChange: (key: SettingFieldKey, value: SettingFieldValue) => void;
  onSave: (e: React.FormEvent) => void;
  onProfilePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>, fieldKey: keyof AppSettings) => void;
  addSettingsArrayItem: (field: 'dasar_hukum' | 'misi') => void;
  removeSettingsArrayItem: (field: 'dasar_hukum' | 'misi', index: number) => void;
  updateSettingsArrayItem: (field: 'dasar_hukum' | 'misi', index: number, value: string) => void;
}

export function AdminSettings({
  settingsForm,
  selectedRole,
  onCheckboxToggle,
  onFieldChange,
  onSave,
  onProfilePhotoUpload,
  addSettingsArrayItem,
  removeSettingsArrayItem,
  updateSettingsArrayItem
}: AdminSettingsProps) {
  const [selectedUnitProfile, setSelectedUnitProfile] = React.useState<RpsUnit | "PPS_Raharjo">("PPS_Raharjo");

  React.useEffect(() => {
    setSelectedUnitProfile(selectedRole === "PPS" ? "PPS_Raharjo" : selectedRole);
  }, [selectedRole]);

  const unitProfileOptions = ppsRpsTabs.map((tab) => ({ value: tab.unit, label: tab.label }));
  const currentUnitProfile = (settingsForm.unit_profiles?.[selectedUnitProfile] || {}) as UnitProfileSettings;

  const updateUnitProfileField = (field: keyof UnitProfileSettings, value: string) => {
    const existingProfiles = settingsForm.unit_profiles || {};
    const currentProfile = existingProfiles[selectedUnitProfile] || {};

    onFieldChange("unit_profiles", {
      ...existingProfiles,
      [selectedUnitProfile]: {
        ...currentProfile,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-8" id="admin-settings-page">
      <div className="bg-white border border-neutral-300 rounded-2xl p-6 space-y-4">
        <div className="border-b border-slate-100 pb-2">
          <h4 className="text-sm font-bold text-slate-900 font-sans">Pengaturan Halaman Publik</h4>
          <p className="text-[11px] text-slate-500">Atur visibilitas nav dan halaman publik secara cepat dari satu tempat.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {[
            { key: 'show_beranda', label: 'Tampilkan Beranda' },
            { key: 'show_profil', label: 'Tampilkan Profil Panti' },
            { key: 'show_publikasi', label: 'Tampilkan Publikasi (PDF)' },
            { key: 'show_anggaran', label: 'Tampilkan Penggunaan Anggaran' },
            { key: 'show_layanan', label: 'Tampilkan Layanan Online' },
            { key: 'show_statistik', label: 'Tampilkan Statistik PM' },
            { key: 'show_faq', label: 'Tampilkan Tanya Jawab (FAQ)' },
            { key: 'show_kontak', label: 'Tampilkan Kontak' },
            { key: 'show_pendaftaran', label: 'Tampilkan Form Pendaftaran' }
          ].map((item) => (
            <label key={item.key} className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
              <input
                type="checkbox"
                checked={!!(settingsForm as any)[item.key]}
                onChange={() => onCheckboxToggle(item.key as keyof AppSettings)}
                className="w-4.5 h-4.5 text-sky-600 rounded border-slate-300 focus:ring-sky-500 cursor-pointer"
              />
              <span className="text-xs font-semibold text-slate-800">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="border-b border-slate-100 pb-2 mb-4">
            <h4 className="text-sm font-bold text-slate-900 font-sans">Profil & Hero Halaman Publik</h4>
            <p className="text-[11px] text-slate-500">Edit sambutan kepala panti, visi misi, sejarah singkat, dan media hero secara terpisah.</p>
          </div>

          <form onSubmit={onSave} className="space-y-4" id="profil-settings-form">
            {selectedRole === "PPS" && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Unit yang akan diisi</label>
                <select
                  value={selectedUnitProfile}
                  onChange={(e) => setSelectedUnitProfile(e.target.value as RpsUnit | "PPS_Raharjo")}
                  className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                >
                  {unitProfileOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Nama Kepala Panti *</label>
                <input
                  type="text"
                  required
                  value={settingsForm.sambutan_nama}
                  onChange={(e) => onFieldChange('sambutan_nama', e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Nama Panti / Institusi *</label>
                <input
                  type="text"
                  required
                  value={currentUnitProfile.institution_name || ''}
                  onChange={(e) => updateUnitProfileField('institution_name', e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Foto Kepala Panti (URL / Unggah) *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={settingsForm.sambutan_foto}
                    onChange={(e) => onFieldChange('sambutan_foto', e.target.value)}
                    className="flex-1 text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onProfilePhotoUpload(e, 'sambutan_foto')}
                    className="hidden"
                    id="sambutan-uploader-adm"
                  />
                  <label htmlFor="sambutan-uploader-adm" className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-xs font-semibold cursor-pointer">
                    Unggah
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Sambutan Kepala Panti *</label>
              <textarea
                required
                rows={4}
                value={settingsForm.sambutan_teks}
                onChange={(e) => onFieldChange('sambutan_teks', e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
              ></textarea>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Alamat Panti</label>
                <input
                  type="text"
                  value={currentUnitProfile.institution_address || ''}
                  onChange={(e) => updateUnitProfileField('institution_address', e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">URL Google Maps</label>
                <input
                  type="text"
                  value={currentUnitProfile.map_url || ''}
                  onChange={(e) => updateUnitProfileField('map_url', e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                  placeholder="https://maps.google.com/..."
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Nomor Telepon</label>
                <input
                  type="text"
                  value={currentUnitProfile.institution_phone || ''}
                  onChange={(e) => updateUnitProfileField('institution_phone', e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Nomor WhatsApp</label>
                <input
                  type="text"
                  value={currentUnitProfile.institution_whatsapp || ''}
                  onChange={(e) => updateUnitProfileField('institution_whatsapp', e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Email</label>
                <input
                  type="email"
                  value={currentUnitProfile.institution_email || ''}
                  onChange={(e) => updateUnitProfileField('institution_email', e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Facebook (URL)</label>
                <input type="text" value={currentUnitProfile.social_facebook || ''} onChange={(e) => updateUnitProfileField('social_facebook', e.target.value)} className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Instagram (URL)</label>
                <input type="text" value={currentUnitProfile.social_instagram || ''} onChange={(e) => updateUnitProfileField('social_instagram', e.target.value)} className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Twitter / X (URL)</label>
                <input type="text" value={currentUnitProfile.social_twitter || ''} onChange={(e) => updateUnitProfileField('social_twitter', e.target.value)} className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white" />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">YouTube (URL)</label>
                <input type="text" value={currentUnitProfile.social_youtube || ''} onChange={(e) => updateUnitProfileField('social_youtube', e.target.value)} className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">LinkedIn (URL)</label>
                <input type="text" value={currentUnitProfile.social_linkedin || ''} onChange={(e) => updateUnitProfileField('social_linkedin', e.target.value)} className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white" />
              </div>
              <div />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Deskripsi Singkat Panti</label>
              <textarea rows={3} value={currentUnitProfile.deskripsi || ''} onChange={(e) => updateUnitProfileField('deskripsi', e.target.value)} className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Layanan Dasar</label>
                <textarea rows={3} value={currentUnitProfile.layanan_dasar || ''} onChange={(e) => updateUnitProfileField('layanan_dasar', e.target.value)} className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bimbingan Rehabilitasi Sosial</label>
                <textarea rows={3} value={currentUnitProfile.layanan_bimbingan || ''} onChange={(e) => updateUnitProfileField('layanan_bimbingan', e.target.value)} className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Persyaratan Penerimaan</label>
              <textarea rows={4} value={currentUnitProfile.persyaratan_penerimaan || ''} onChange={(e) => updateUnitProfileField('persyaratan_penerimaan', e.target.value)} className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Video Sambutan Kepala Panti</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={settingsForm.sambutan_video_url || ""}
                    onChange={(e) => onFieldChange('sambutan_video_url', e.target.value)}
                    className="flex-1 text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                    placeholder="URL video atau mp4"
                  />
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => onProfilePhotoUpload(e, 'sambutan_video_url')}
                    className="hidden"
                    id="sambutan-video-uploader"
                  />
                  <label htmlFor="sambutan-video-uploader" className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-xs font-semibold cursor-pointer shrink-0">
                    Unggah Video
                  </label>
                </div>
                <MediaPreview url={settingsForm.sambutan_video_url} type="video" title="Pratinjau Video Sambutan" alt="Video sambutan" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Visi Utama Panti *</label>
                <input
                  type="text"
                  required
                  value={settingsForm.visi}
                  onChange={(e) => onFieldChange('visi', e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Sejarah Singkat Panti *</label>
                <textarea
                  required
                  rows={3}
                  value={settingsForm.sejarah_singkat}
                  onChange={(e) => onFieldChange('sejarah_singkat', e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                ></textarea>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Struktur Organisasi URL *</label>
                <input
                  type="text"
                  required
                  value={settingsForm.struktur_organisasi_url}
                  onChange={(e) => onFieldChange('struktur_organisasi_url', e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <label className="text-xs font-bold text-slate-700">Dasar Hukum Operasional</label>
                <button
                  type="button"
                  onClick={() => addSettingsArrayItem('dasar_hukum')}
                  className="text-[10px] px-3 py-1 rounded-lg bg-slate-100 border border-slate-300 text-slate-700 hover:bg-slate-200 transition"
                >
                  Tambah Dasar Hukum
                </button>
              </div>

              <div className="space-y-2">
                {(settingsForm.dasar_hukum || []).map((item, index) => (
                  <div key={`dasar-hukum-${index}`} className="flex gap-2 items-start">
                    <textarea
                      rows={2}
                      value={item}
                      onChange={(e) => updateSettingsArrayItem('dasar_hukum', index, e.target.value)}
                      className="flex-1 text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                      placeholder={`Dasar hukum ${index + 1}`}
                    ></textarea>
                    <button
                      type="button"
                      onClick={() => removeSettingsArrayItem('dasar_hukum', index)}
                      className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
                {(settingsForm.dasar_hukum || []).length === 0 && (
                  <div className="text-[11px] text-slate-500">Belum ada dasar hukum. Tambahkan minimal satu item.</div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <label className="text-xs font-bold text-slate-700">Misi Panti</label>
                <button
                  type="button"
                  onClick={() => addSettingsArrayItem('misi')}
                  className="text-[10px] px-3 py-1 rounded-lg bg-slate-100 border border-slate-300 text-slate-700 hover:bg-slate-200 transition"
                >
                  Tambah Misi
                </button>
              </div>

              <div className="space-y-2">
                {(settingsForm.misi || []).map((item, index) => (
                  <div key={`misi-${index}`} className="flex gap-2 items-start">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateSettingsArrayItem('misi', index, e.target.value)}
                      className="flex-1 text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                      placeholder={`Misi ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeSettingsArrayItem('misi', index)}
                      className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
                {(settingsForm.misi || []).length === 0 && (
                  <div className="text-[11px] text-slate-500">Belum ada misi. Tambahkan minimal satu item.</div>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Bagan Struktur Organisasi (URL / Unggah) *</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={settingsForm.struktur_organisasi_url}
                  onChange={(e) => onFieldChange('struktur_organisasi_url', e.target.value)}
                  className="flex-1 text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onProfilePhotoUpload(e, 'struktur_organisasi_url')}
                  className="hidden"
                  id="struktur-uploader-adm"
                />
                <label htmlFor="struktur-uploader-adm" className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-xs font-semibold cursor-pointer">
                  Unggah
                </label>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 mt-6">
              <h5 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 mb-4 bg-gradient-to-r from-orange-600 to-amber-600 text-transparent bg-clip-text">3. Pengaturan Media Hero Beranda</h5>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Judul Utama Hero *</label>
                  <input
                    type="text"
                    required
                    value={settingsForm.hero_title || ""}
                    onChange={(e) => onFieldChange('hero_title', e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white font-sans"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Sub-judul Hero *</label>
                  <input
                    type="text"
                    required
                    value={settingsForm.hero_subtitle || ""}
                    onChange={(e) => onFieldChange('hero_subtitle', e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white font-sans"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-4">
                {/* Video configuration */}
                <div className="p-4 border border-sky-100 rounded-xl bg-sky-50/20 space-y-3">
                  <label className="flex items-center gap-2 font-bold text-slate-800 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!settingsForm.hero_use_video}
                      onChange={(e) => onFieldChange('hero_use_video', e.target.checked)}
                      className="rounded text-sky-600"
                    />
                    <span>Aktifkan Video</span>
                  </label>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 block">URL Video / MP4</label>
                    <input
                      type="text"
                      placeholder="e.g. https://domain.com/video.mp4"
                      value={settingsForm.hero_video_url || ""}
                      onChange={(e) => onFieldChange('hero_video_url', e.target.value)}
                      className="w-full text-[11px] p-2 border border-slate-250 rounded-lg bg-white font-sans"
                    />
                  </div>
                </div>

                {/* Image configuration */}
                <div className="p-4 border border-amber-100 rounded-xl bg-amber-50/20 space-y-3">
                  <label className="flex items-center gap-2 font-bold text-slate-800 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!settingsForm.hero_use_image}
                      onChange={(e) => onFieldChange('hero_use_image', e.target.checked)}
                      className="rounded text-amber-600"
                    />
                    <span>Aktifkan Gambar</span>
                  </label>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 block">URL Gambar / Cover</label>
                    <div className="flex gap-1">
                      <input
                        type="text"
                        placeholder="URL Gambar..."
                        value={settingsForm.hero_image_url || ""}
                        onChange={(e) => onFieldChange('hero_image_url', e.target.value)}
                        className="flex-1 text-[11px] p-2 border border-slate-250 rounded-lg bg-white font-sans"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onProfilePhotoUpload(e, 'hero_image_url')}
                        className="hidden"
                        id="hero-img-uploader-adm"
                      />
                      <label htmlFor="hero-img-uploader-adm" className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-[10px] font-semibold cursor-pointer shrink-0">
                        Unggah
                      </label>
                    </div>
                  </div>
                </div>

                {/* CTA Link configuration */}
                <div className="p-4 border border-rose-100 rounded-xl bg-rose-50/20 space-y-3">
                  <label className="flex items-center gap-2 font-bold text-slate-800 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!settingsForm.hero_use_link}
                      onChange={(e) => onFieldChange('hero_use_link', e.target.checked)}
                      className="rounded text-rose-600"
                    />
                    <span>Aktifkan Tombol Link</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 block">Teks Tombol</label>
                      <input
                        type="text"
                        placeholder="Daftar Sekarang"
                        value={settingsForm.hero_link_text || ""}
                        onChange={(e) => onFieldChange('hero_link_text', e.target.value)}
                        className="w-full text-[11px] p-2 border border-slate-250 rounded-lg bg-white font-sans"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 block">URL Link</label>
                      <input
                        type="text"
                        placeholder="#register"
                        value={settingsForm.hero_link_url || ""}
                        onChange={(e) => onFieldChange('hero_link_url', e.target.value)}
                        className="w-full text-[11px] p-2 border border-slate-250 rounded-lg bg-white font-sans"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-5 py-2.5 bg-sky-500 hover:bg-sky-300 text-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Simpan Pengaturan Halaman
              </button>
            </div>
          </form>
        </div>
    </div>
  );
}
