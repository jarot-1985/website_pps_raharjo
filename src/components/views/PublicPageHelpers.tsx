import type { AppSettings, Gallery } from "../../types";

export const ppsRpsTabs = [
  {
    tabId: 'pps_rps_pps_raharjo',
    unit: 'PPS_Raharjo' as const,
    label: 'PPS Raharjo',
    description: 'Unit kerja utama layanan disabilitas intelektual dan rehabilitasi sosial untuk kesejahteraan masyarakat.'
  },
  {
    tabId: 'pps_rps_pamardi_siwi',
    unit: 'Pamardi Siwi' as const,
    label: 'RPS Pamardi Siwi',
    description: 'Unit layanan anak: pengasuhan, pendidikan, dan terapi kreatif dalam suasana keluarga.'
  },
  {
    tabId: 'pps_rps_mojomulyo',
    unit: 'Mojomulyo' as const,
    label: 'RPS Mojomulyo',
    description: 'Unit layanan lansia: kesehatan, rehabilitasi, dan kegiatan sosial yang mendukung kemandirian.'
  },
  {
    tabId: 'pps_rps_gondang',
    unit: 'Gondang' as const,
    label: 'RPS Gondang',
    description: 'Unit layanan PMKS: pelatihan vokasional, pendampingan sosial, dan pemulihan fungsi kehidupan.'
  }
];

export const unitDetails = {
  "PPS_Raharjo": {
    heroImage: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1200",
    desc: "Pelayanan rehabilitasi sosial bagi penyandang disabilitas intelektual melalui terapi kemandirian, motorik, sensorik, serta kemandirian fungsional.",
    tag: "Disabilitas Intelektual",
    about: "PPS Raharjo menyediakan pelayanan intensif untuk penyandang disabilitas intelektual dengan fokus pada latihan kemandirian, terapi komprehensif, dan reintegrasi sosial.",
    requirements: [
      "Surat rujukan Dinas Sosial setempat",
      "Fotokopi KTP/Kartu Identitas Warga",
      "Rekaman medis atau surat keterangan disabilitas",
      "Wawancara awal dan asesmen kebutuhan sosial"
    ],
    address: "Jl. Veteran No.108, Gajahmungkur, Kota Semarang, Jawa Tengah",
    phone: "(024) 8412345",
    email: "hubungan@ppsraharjo.go.id",
    hours: "Senin-Jumat, 08.00-16.00",
    heroImageAlt: "Gedung PPS Raharjo",
    bgClass: "from-violet-50 to-white border-violet-200 text-violet-950 shadow-violet-100/50 hover:border-violet-400",
    tagBg: "bg-violet-500 text-white",
    lineClass: "bg-violet-400",
    btnClass: "text-violet-600 hover:text-violet-800"
  },
  "Pamardi Siwi": {
    heroImage: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=1200",
    desc: "Fokus melayani kesejahteraan, pengasuhan, bimbingan mental spiritual, dan pemenuhan pendidikan anak telantar maupun yatim piatu agar mandiri.",
    tag: "Pelayanan Anak",
    about: "RPS Pamardi Siwi mengembangkan potensi anak melalui pengasuhan, pendidikan, terapi psikososial, dan pemPenerima Manfaat karakter dalam lingkungan yang aman dan penuh kasih.",
    requirements: [
      "Surat pengantar Dinas Sosial atau panti asuhan",
      "Fotokopi Kartu Keluarga / identitas wali",
      "Keterangan status sosial anak",
      "Rekomendasi pendampingan edukasi"
    ],
    address: "Kompleks Panti Sosial, Jalan Melati No. 12, Semarang",
    phone: "(024) 8312346",
    email: "pamardisiwi@ppsraharjo.go.id",
    hours: "Senin-Sabtu, 07.30-15.30",
    heroImageAlt: "Anak-anak RPS Pamardi Siwi bermain",
    bgClass: "from-sky-50 to-white border-sky-200 text-sky-950 shadow-sky-100/50 hover:border-sky-400",
    tagBg: "bg-sky-500 text-white",
    lineClass: "bg-sky-400",
    btnClass: "text-sky-600 hover:text-sky-800"
  },
  "Mojomulyo": {
    heroImage: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=1200",
    desc: "Menyelenggarakan pelayanan dan perawatan lanjut usia telantar, pemenuhan kebutuhan dasar, jaminan kesehatan berkala, serta rekreasi lansia.",
    tag: "Pelayanan Lanjut Usia",
    about: "RPS Mojomulyo memberi perhatian khusus terhadap kemandirian lansia, kesehatan, terapi okupasi, dan kegiatan sosial yang memperkuat kualitas hidup lanjut usia.",
    requirements: [
      "Rekomendasi Dinas Sosial atau puskesmas setempat",
      "Kartu identitas dan KTP lansia",
      "Riwayat medis terbaru",
      "Surat pernyataan wali atau keluarga"
    ],
    address: "Jl. Taman Sari No. 7, Semarang",
    phone: "(024) 8416789",
    email: "mojomulyo@ppsraharjo.go.id",
    hours: "Senin-Jumat, 08.00-16.00",
    heroImageAlt: "Aktivitas lansia di RPS Mojomulyo",
    bgClass: "from-emerald-50 to-white border-emerald-200 text-emerald-950 shadow-emerald-100/50 hover:border-emerald-400",
    tagBg: "bg-emerald-500 text-white",
    lineClass: "bg-emerald-400",
    btnClass: "text-emerald-600 hover:text-emerald-800"
  },
  "Gondang": {
    heroImage: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200",
    desc: "Memberikan pelayanan rehabilitasi sosial terpadu bagi PMKS (Penyandang Masalah Kesejahteraan Sosial), bimbingan kerja, dan resosialisasi.",
    tag: "Pelayanan PMKS",
    about: "RPS Gondang melatih PMKS dalam keterampilan kerja, pemPenerima Manfaat sosial, dan pemberdayaan untuk memperkuat fungsi sosial dan ekonomi keluarga.",
    requirements: [
      "Surat rekomendasi instansi atau LSM terkait",
      "Dokumen identitas diri",
      "Surat keterangan keadaan sosial",
      "Wawancara sosial awal"
    ],
    address: "Jl. Pendidikan No. 22, Semarang",
    phone: "(024) 8419900",
    email: "gondang@ppsraharjo.go.id",
    hours: "Senin-Sabtu, 08.00-15.00",
    heroImageAlt: "Pelatihan vokasional di RPS Gondang",
    bgClass: "from-rose-50 to-white border-rose-200 text-rose-950 shadow-rose-100/50 hover:border-rose-400",
    tagBg: "bg-rose-500 text-white",
    lineClass: "bg-rose-400",
    btnClass: "text-rose-600 hover:text-rose-800"
  }
};

export const getRpsTerms = (target: string) => {
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
