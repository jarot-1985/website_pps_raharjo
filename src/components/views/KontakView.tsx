import { useState } from "react";
import { MapPin, Phone, Mail, Share2, Facebook, Twitter, Instagram, Link, Check } from "lucide-react";
import type { AppSettings } from "../../types";
import { createContactMessage } from "../../api";

export function KontakView({ settings }: { settings: AppSettings }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createContactMessage(formData);
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim pesan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 py-4 animate-fade-in font-serif" id="kontak-page">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-3xl font-serif text-slate-900 font-bold tracking-tight">Hubungi Kami</h2>
        <p className="text-slate-500 font-sans text-xs uppercase tracking-wider">
          Hubungi unit pelayanan kami atau kirimkan pesan kemitraan serta donasi ke humas.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Kontak Info */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-slate-900 rounded-2xl p-6 md:p-8 space-y-6 shadow-md border-0">
            <h3 className="text-lg font-serif font-black tracking-tight">Informasi Kantor Layanan</h3>
            <p className="text-orange-950/80 text-xs font-sans uppercase tracking-wider">
              Kantor Pusat Koordinasi Pelayanan Sosial Terpadu PPS Raharjo.
            </p>

            <div className="space-y-4">
              <div className="flex gap-3 items-start text-xs">
                <MapPin className="w-4 h-4 text-orange-950 shrink-0 mt-0.5" />
                <div>
                  <div className="font-sans font-bold uppercase tracking-widest text-orange-950/80 text-[10px]">Alamat Lengkap</div>
                  <p className="text-slate-950 mt-0.5 leading-relaxed font-serif font-medium">
                    Jl. Veteran No.108, Gajahmungkur, Kota Semarang, Jawa Tengah 50232
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start text-xs">
                <Phone className="w-4 h-4 text-orange-950 shrink-0 mt-0.5" />
                <div>
                  <div className="font-sans font-bold uppercase tracking-widest text-orange-950/80 text-[10px]">Kontak Telepon / WA</div>
                  <p className="text-slate-950 mt-0.5 leading-relaxed font-serif font-medium">
                    +62 24 8412345 (Humas Pusat)<br />
                    +62 812 3456 7890 (Layanan Pengaduan)
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start text-xs">
                <Mail className="w-4 h-4 text-orange-950 shrink-0 mt-0.5" />
                <div>
                  <div className="font-sans font-bold uppercase tracking-widest text-orange-950/80 text-[10px]">Surat Elektronik</div>
                  <p className="text-slate-950 mt-0.5 leading-relaxed font-serif font-medium">
                    humas@ppsraharjo.or.id<br />
                    dinsos.jateng@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start text-xs pt-2">
                <Share2 className="w-4 h-4 text-orange-950 shrink-0 mt-0.5" />
                <div>
                  <div className="font-sans font-bold uppercase tracking-widest text-orange-950/80 text-[10px]">Media Sosial Terpadu</div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <a href="#" onClick={(e) => e.preventDefault()} className="p-2 bg-orange-950/10 hover:bg-orange-950/20 rounded-md transition text-blue-600 shadow-sm"><Facebook className="w-4 h-4 fill-current" /></a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="p-2 bg-orange-950/10 hover:bg-orange-950/20 rounded-md transition text-sky-500 shadow-sm"><Twitter className="w-4 h-4 fill-current" /></a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="p-2 bg-orange-950/10 hover:bg-orange-950/20 rounded-md transition text-pink-600 shadow-sm"><Instagram className="w-4 h-4" /></a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="p-2 bg-orange-950/10 hover:bg-orange-950/20 rounded-md transition text-slate-900 shadow-sm">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.61-.6 3.16-1.66 4.31-1.07 1.15-2.61 1.83-4.22 1.95-1.61.12-3.23-.27-4.57-1.1-1.34-.84-2.34-2.15-2.82-3.66-.48-1.51-.4-3.13.24-4.57.64-1.44 1.81-2.58 3.25-3.17 1.44-.59 3.05-.6 4.49-.03v4.09c-.71-.24-1.5-.23-2.19.05-.68.27-1.25.79-1.58 1.42-.33.64-.39 1.39-.17 2.06.22.68.73 1.25 1.37 1.57.65.31 1.41.34 2.07.1.67-.24 1.21-.77 1.51-1.41.3-.64.35-1.39.14-2.07V.02z" /></svg>
                    </a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="p-2 bg-orange-950/10 hover:bg-orange-950/20 rounded-md transition text-slate-700 shadow-sm"><Link className="w-4 h-4" /></a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-orange-950/20 text-[9px] text-orange-950 font-mono flex justify-between items-center uppercase tracking-widest">
              <span>Humas PPS Raharjo</span>
              <span>Aktif 24 Jam</span>
            </div>
          </div>

          {/* Map Simulation */}
          <div className="border border-amber-100 bg-amber-50/40 p-4 rounded-2xl text-center space-y-2 shadow-xs">
            <span className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-slate-700 block">Peta Lokasi Kantor Pusat</span>
            <div className="aspect-video w-full bg-slate-50 border border-amber-100 rounded-xl flex items-center justify-center text-slate-500 text-xs font-serif italic gap-1 shadow-inner">
              <MapPin className="w-3.5 h-3.5 text-amber-500 animate-bounce" /> [ Simulasi Peta Lokasi PPS Raharjo ]
            </div>
          </div>
        </div>

        {/* Form Kirim Pesan */}
        <div className="md:col-span-7 bg-white border border-amber-100 rounded-2xl p-6 md:p-8 font-sans shadow-sm">
          <h3 className="text-lg font-serif font-bold text-slate-900 mb-4 pb-2 border-b border-amber-100">Kirim Pesan atau Masukan</h3>

          {success ? (
            <div className="text-center py-12 space-y-4 font-serif animate-scale-up" id="kontak-success-msg">
              <div className="w-16 h-16 bg-emerald-50 border-2 border-emerald-500 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-xs animate-pulse">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-serif font-bold text-slate-900">Pesan Terkirim</h4>
              <p className="text-slate-500 font-sans text-xs">
                Terima kasih atas masukan Anda. Humas kami akan membalas ke email Anda secepatnya.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:opacity-90 text-slate-900 font-sans font-bold uppercase tracking-widest text-xs rounded-xl cursor-pointer shadow-md transition"
              >
                Kirim Pesan Lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" id="kontak-form">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-700 block">Nama Lengkap Pemohon *</label>
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
                  <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-700 block">Nomor Telepon/HP *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs p-2.5 border border-amber-200 rounded-xl bg-white font-sans focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-xs"
                    placeholder="e.g. 0812345678"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-700 block">Alamat Email Pengirim *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs p-2.5 border border-amber-200 rounded-xl bg-white font-sans focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-xs"
                  placeholder="e.g. andi@gmail.com"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-700 block">Perihal / Subjek Pesan *</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full text-xs p-2.5 border border-amber-200 rounded-xl bg-white font-sans focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-xs"
                  placeholder="e.g. Konsultasi Bantuan Lansia"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-700 block">Isi Pesan Detail *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-xs p-2.5 border border-amber-200 rounded-xl bg-white font-sans focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-xs"
                  placeholder="Ketikkan pesan secara mendetail di sini..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:opacity-90 text-slate-900 font-sans font-bold uppercase tracking-widest rounded-xl text-xs transition disabled:opacity-50 cursor-pointer shadow-md"
                id="btn-submit-kontak"
              >
                {loading ? "Sedang Mengirim..." : "Kirim Pesan Masukan"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 9. PENDAFTARAN PENERIMA MANFAAT VIEW
// ==========================================
const getRpsTerms = (target: string) => {
  switch (target) {
    case "PPS_Raharjo":
      return {
        title: "PPS Raharjo (Disabilitas Intelektual)",
        colorClass: "border-violet-200 bg-violet-50/40 text-violet-950",
        iconColor: "text-violet-600",
        terms: [
          "Calon Penerima Manfaat (PM) berusia antara 12 s.d. 35 tahun.",
          "Memiliki hambatan/disabilitas intelektual ringan hingga sedang.",
          "Sehat jasmani dan bebas dari penyakit menular (dibuktikan dengan surat keterangan dokter).",
          "Mendapatkan persetujuan tertulis dari orang tua/wali penanggung jawab.",
          "Bukan merupakan penyandang disabilitas fisik berat yang memerlukan perawatan medis intensif."
        ]
      };
    case "Pamardi Siwi":
      return {
        title: "RPS Pamardi Siwi (Pelayanan Anak)",
        colorClass: "border-sky-200 bg-sky-50/40 text-sky-950",
        iconColor: "text-sky-600",
        terms: [
          "Anak berusia maksimal 18 tahun (belum menikah).",
          "Anak dalam kondisi terlantar, yatim, piatu, atau yatim piatu.",
          "Memiliki Surat Keterangan Terlantar atau rekomendasi dari Dinas Sosial Kab/Kota setempat.",
          "Sanggup mematuhi tata tertib pengasuhan dan melanjutkan jenjang pendidikan formal.",
          "Wali bersedia memberikan pendampingan selama proses transisi rehabilitasi."
        ]
      };
    case "Mojomulyo":
      return {
        title: "RPS Mojomulyo (Pelayanan Lanjut Usia)",
        colorClass: "border-emerald-200 bg-emerald-50/40 text-emerald-950",
        iconColor: "text-emerald-600",
        terms: [
          "Calon Penerima Manfaat berusia minimal 60 tahun (Lanjut Usia).",
          "Mengalami penelantaran keluarga, tidak memiliki sanak saudara, atau dalam kondisi miskin (sktm).",
          "Mampu melakukan aktivitas dasar secara mandiri (ADL Mandiri).",
          "Bebas dari gangguan jiwa berat, demensia berat, atau penyakit menular berbahaya.",
          "Wali/Kelurahan bersedia menjadi penanggung jawab apabila PM meninggal dunia."
        ]
      };
    case "Gondang":
      return {
        title: "RPS Gondang (Pelayanan PMKS)",
        colorClass: "border-rose-200 bg-rose-50/40 text-rose-950",
        iconColor: "text-rose-600",
        terms: [
          "Merupakan Penyandang Masalah Kesejahteraan Sosial (PMKS) seperti gelandangan, pengemis, atau tuna sosial.",
          "Merupakan rujukan resmi dari razia Satpol PP / Dinas Sosial Kab/Kota setempat.",
          "Bersedia mengikuti pelatihan keterampilan kerja dan pembekalan vokasional panti.",
          "Bebas dari penyalahgunaan Narkoba, Alkohol, dan Zat Adiktif lainnya.",
          "Memiliki komitmen untuk kembali bersosialisasi dan mandiri di tengah masyarakat."
        ]
      };
    default:
      return null;
  }
};
