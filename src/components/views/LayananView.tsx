import { useState } from "react";
import { Check, ShieldAlert } from "lucide-react";

export function LayananView() {
  const [layananType, setLayananType] = useState<'pengaduan' | 'konsultasi' | 'kunjungan'>('pengaduan');
  const [formData, setFormData] = useState({
    name: "",
    identity: "",
    phone: "",
    title: "",
    content: "",
    date_request: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setFormData({ name: "", identity: "", phone: "", title: "", content: "", date_request: "" });
    }, 1200);
  };

  return (
    <div className="space-y-8 py-4 animate-fade-in font-serif" id="layanan-page">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-3xl font-serif text-slate-900 font-bold tracking-tight">Sistem Pelayanan Online Terpadu</h2>
        <p className="text-slate-500 font-sans text-xs uppercase tracking-wider">
          Akses pengaduan publik, konsultasi rehabilitasi, serta permohonan kunjungan dinas/magang secara mandiri.
        </p>
      </div>

      <div className="flex justify-center gap-2 border-b border-amber-100 pb-2">
        {(['pengaduan', 'konsultasi', 'kunjungan'] as const).map((type) => (
          <button
            key={type}
            onClick={() => { setLayananType(type); setSuccess(false); }}
            className={`px-4 py-3 text-xs font-sans font-extrabold uppercase tracking-widest border-b-2 transition cursor-pointer capitalize ${layananType === type
              ? "border-amber-500 text-amber-600 font-bold"
              : "border-transparent text-slate-400 hover:text-amber-500"
              }`}
            id={`layanan-tab-${type}`}
          >
            {type === 'pengaduan' ? 'Pengaduan Pelayanan' : type === 'konsultasi' ? 'Konsultasi Sosial' : 'Permohonan Kunjungan'}
          </button>
        ))}
      </div>

      <div className="max-w-xl mx-auto bg-white border border-amber-100 rounded-2xl p-6 md:p-8 shadow-md">
        {success ? (
          <div className="text-center py-8 space-y-4" id="layanan-success-container">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <Check className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-serif font-bold text-slate-900">Permohonan Berhasil Dikirim</h3>
              <p className="text-slate-500 font-sans text-xs leading-relaxed">
                Humas panti akan segera meninjau permohonan Anda dan menghubungi Anda kembali melalui WhatsApp dalam waktu maksimal 2x24 jam kerja.
              </p>
            </div>
            <button
              onClick={() => setSuccess(false)}
              className="px-5 py-2.5 text-xs font-sans font-bold uppercase tracking-widest bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 rounded-xl transition cursor-pointer hover:opacity-90 shadow-sm"
            >
              Kirim Formulir Lain
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" id="layanan-online-form">
            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200 text-amber-900 text-xs space-y-1 flex items-start gap-2 font-sans">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Pemberitahuan Kerahasiaan:</strong> Seluruh data identitas, pesan, dan berkas pengaduan Anda dijamin kerahasiaannya sesuai regulasi perlindungan data pribadi.
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-700">Nama Lengkap Pemohon *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs p-2.5 border border-amber-200 rounded-xl bg-white font-sans focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-xs"
                  placeholder="e.g. Andi Wijaya"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-700">Nomor Identitas (NIK/SIM) *</label>
                <input
                  type="text"
                  required
                  value={formData.identity}
                  onChange={(e) => setFormData({ ...formData, identity: e.target.value })}
                  className="w-full text-xs p-2.5 border border-amber-200 rounded-xl bg-white font-sans focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-xs"
                  placeholder="e.g. 3374XXXXXXXXXXXX"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-700">Nomor Telepon/WhatsApp Aktif *</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full text-xs p-2.5 border border-amber-200 rounded-xl bg-white font-sans focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-xs"
                placeholder="e.g. 08123456789"
              />
            </div>

            {layananType === 'kunjungan' && (
              <div className="space-y-1">
                <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-700">Rencana Tanggal Kunjungan *</label>
                <input
                  type="date"
                  required
                  value={formData.date_request}
                  onChange={(e) => setFormData({ ...formData, date_request: e.target.value })}
                  className="w-full text-xs p-2.5 border border-amber-200 rounded-xl bg-white font-sans focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-xs"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-700">
                {layananType === 'pengaduan' ? 'Subjek Aduan' : layananType === 'konsultasi' ? 'Topik Masalah Kesejahteraan' : 'Tujuan Instansi/Kunjungan'} *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full text-xs p-2.5 border border-amber-200 rounded-xl bg-white font-sans focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-xs"
                placeholder={
                  layananType === 'pengaduan' ? "e.g. Layanan pendampingan kurang ramah" :
                    layananType === 'konsultasi' ? "e.g. Lansia telantar di wilayah kami" :
                      "e.g. Penelitian Tugas Akhir Mahasiswa Universitas Diponegoro"
                }
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-700">Isi Pesan Detail / Deskripsi Permohonan *</label>
              <textarea
                required
                rows={4}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full text-xs p-2.5 border border-amber-200 rounded-xl bg-white font-sans focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-xs"
                placeholder="Berikan deskripsi kronologis secara mendetail..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:opacity-90 text-slate-900 font-sans font-bold uppercase tracking-widest rounded-xl text-xs transition disabled:opacity-50 cursor-pointer shadow-md"
              id="btn-submit-layanan"
            >
              {isSubmitting ? "Mengirim Laporan..." : "Kirim Formulir Online"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 6. STATISTIK VIEW
// ==========================================
