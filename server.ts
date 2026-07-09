import express from "express";
import path from "path";
import fs from "fs";
import net from "net";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

// Initialize express app
const app = express();

const parseCliOption = (flag: string): string | undefined => {
  const index = process.argv.findIndex(arg => arg === flag);
  if (index !== -1 && index + 1 < process.argv.length) {
    return process.argv[index + 1];
  }
  const matching = process.argv.find(arg => arg.startsWith(`${flag}=`));
  return matching ? matching.split("=")[1] : undefined;
};

const CLI_PORT = parseCliOption("--port") || parseCliOption("-p");
const CLI_HMR_PORT = parseCliOption("--hmr-port");
const PORT = Number(process.env.PORT || CLI_PORT || 3000);
const HMR_PORT = Number(process.env.HMR_PORT || CLI_HMR_PORT || 24678);

// Increase payload limit for base64 file uploads (KTP, KK, SKTM, photos, PDFs)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Path to local fallback JSON database
const DATA_FILE_PATH = path.join(process.cwd(), "data.json");

// Define interface for database structure
interface DbSchema {
  settings: any;
  news: any[];
  facilities: any[];
  galleries: any[];
  achievements: any[];
  announcements: any[];
  documents: any[];
  budgets: any[];
  faqs: any[];
  staff: any[];
  registrations: any[];
  contactMessages: any[];
  attendance: any[];
  testimonials: any[];
}

// Check if Supabase keys exist
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";
const SUPABASE_SCHEMA = process.env.SUPABASE_SCHEMA || "public";
const isSupabaseEnabled = SUPABASE_URL !== "" && SUPABASE_ANON_KEY !== "";

let supabase: any = null;
const supabaseTableMap: Record<string, string> = {
  staff: "data_pegawai",
  budgets: "sipd_main_document",
  attendance: "absensi_pm"
};

if (isSupabaseEnabled) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("Supabase client initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize Supabase client:", error);
  }
} else {
  console.log("Supabase not configured. Using local JSON database (data.json) as a fallback.");
}

async function fetchSupabaseTable(table: string) {
  if (!supabase) throw new Error("Supabase client is not initialized");
  const { data, error } = await supabase.from(table).select("*");
  if (error) {
    throw error;
  }
  return data || [];
}

// Initial/Mock data seed
const initialSeedData: DbSchema = {
  settings: {
    show_beranda: true,
    show_profil: true,
    show_publikasi: true,
    show_anggaran: true,
    show_layanan: true,
    show_statistik: true,
    show_faq: true,
    show_kontak: true,
    show_pendaftaran: true,
    sambutan_nama: "Drs. Raharjo Widodo, M.Si",
    sambutan_teks: "Selamat datang di website resmi Panti Pelayanan Sosial (PPS) Raharjo. Kami berkomitmen untuk memberikan pelayanan rehabilitasi sosial terbaik bagi anak terlantar, lanjut usia terlantar, serta Penyandang Masalah Kesejahteraan Sosial (PMKS) melalui 3 unit kerja kami: RPS Pamardi Siwi, RPS Mojomulyo, dan RPS Gondang. Melalui integrasi teknologi ini, kami berharap keterbukaan informasi, pelayanan pengaduan, dan pendaftaran dapat diakses secara transparan, responsif, dan akuntabel demi mewujudkan kesejahteraan sosial yang merata.",
    sambutan_foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
    dasar_hukum: [
      "Undang-Undang Nomor 11 Tahun 2009 tentang Kesejahteraan Sosial.",
      "Peraturan Pemerintah Nomor 39 Tahun 2012 tentang Penyelenggaraan Kesejahteraan Sosial.",
      "Peraturan Daerah Provinsi tentang Organisasi dan Tata Kerja Dinas Sosial."
    ],
    sejarah_singkat: "Panti Pelayanan Sosial (PPS) Raharjo didirikan pada tahun 1982 sebagai wujud kepedulian nyata Pemerintah dalam menangani masalah kesejahteraan sosial. Seiring waktu, untuk meningkatkan efektivitas pelayanan, panti ini dimekarkan dengan mengintegrasikan tiga Rumah Pelayanan Sosial (RPS) khusus, yaitu RPS Pamardi Siwi untuk anak-anak, RPS Mojomulyo untuk lansia, dan RPS Gondang untuk PMKS. Sinergi ini menjadikannya pusat rehabilitasi sosial terpadu yang melayani ratusan penerima manfaat setiap tahunnya.",
    visi: "Terwujudnya pelayanan kesejahteraan sosial yang profesional, inklusif, dan berkeadilan demi memulihkan fungsi sosial penerima manfaat menuju kemandirian.",
    misi: [
      "Menyelenggarakan pelayanan dan rehabilitasi sosial dasar yang prima dan manusiawi.",
      "Meningkatkan kualitas sumber daya manusia pengelola pelayanan sosial yang bersertifikasi.",
      "Membangun jaringan kemitraan dengan masyarakat, akademisi, dan dunia usaha.",
      "Mendorong pemulihan keberfungsian sosial dan kemandirian ekonomi penerima manfaat melalui pelatihan keterampilan."
    ],
    struktur_organisasi_url: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&q=80&w=800",
    sambutan_video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
    
    // Hero configuration
    hero_title: "Pelayanan Sosial yang Manusiawi & Bermartabat.",
    hero_subtitle: "PPS Raharjo mengelola unit pelayanan rehabilitasi sosial khusus untuk memastikan setiap lapisan masyarakat mendapatkan hak hidup, perlindungan, bimbingan karakter, serta jaminan kesejahteraan yang layak secara transparan dan berkesinambungan.",
    hero_use_video: false,
    hero_video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
    hero_use_image: true,
    hero_image_url: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800",
    hero_use_link: true,
    hero_link_url: "https://dinsos.jatengprov.go.id",
    hero_link_text: "Kunjungi Website Dinsos Jateng",
    social_facebook: "https://facebook.com/ppsraharjo",
    social_instagram: "https://instagram.com/ppsraharjo",
    social_twitter: "https://twitter.com/ppsraharjo",
    social_youtube: "https://youtube.com/c/ppsraharjo",
    social_linkedin: "https://linkedin.com/company/ppsraharjo",
    social_tiktok: "https://tiktok.com/@ppsraharjo",
    unit_profiles: {
      PPS_Raharjo: {
        institution_name: "PPS Raharjo",
        institution_address: "Jl. Veteran No.108, Gajahmungkur, Kota Semarang, Jawa Tengah",
        map_url: "https://maps.google.com/?q=PPS+Raharjo+Semarang",
        institution_phone: "(024) 8412345",
        institution_whatsapp: "+62 812-3456-7890",
        institution_email: "hubungan@ppsraharjo.go.id",
        social_facebook: "https://facebook.com",
        social_instagram: "https://instagram.com",
        social_twitter: "https://twitter.com",
        social_youtube: "https://youtube.com",
        social_linkedin: "https://linkedin.com",
        deskripsi: "PPS Raharjo menyediakan pelayanan intensif untuk penyandang disabilitas intelektual dengan fokus pada latihan kemandirian, terapi komprehensif, dan reintegrasi sosial.",
        layanan_dasar: "- Pemenuhan kebutuhan dasar\n- Konseling dan pendampingan psikososial\n- Pendidikan dan terapi rehabilitasi",
        layanan_bimbingan: "- Bimbingan keterampilan hidup\n- Pendampingan keluarga\n- Reintegrasi sosial dan pemulihan fungsi",
        persyaratan_penerimaan: "- Surat rujukan Dinas Sosial\n- Fotokopi identitas\n- Rekam medis\n- Wawancara awal"
      },
      "Pamardi Siwi": {
        institution_name: "RPS Pamardi Siwi",
        institution_address: "Kompleks Panti Sosial, Jalan Melati No. 12, Semarang",
        map_url: "https://maps.google.com/?q=RPS+Pamardi+Siwi",
        institution_phone: "(024) 8312346",
        institution_whatsapp: "+62 812-3456-7891",
        institution_email: "pamardisiwi@ppsraharjo.go.id",
        deskripsi: "RPS Pamardi Siwi mengembangkan potensi anak melalui pengasuhan, pendidikan, terapi psikososial, dan pembinaan karakter dalam lingkungan yang aman dan penuh kasih.",
        layanan_dasar: "- Pengasuhan dan pendidikan\n- Kegiatan terapi dan edukasi\n- Pemenuhan nutrisi dan kesehatan",
        layanan_bimbingan: "- Bimbingan karakter\n- Pendampingan psikologis\n- Persiapan keterampilan sosial",
        persyaratan_penerimaan: "- Surat pengantar Dinas Sosial\n- Fotokopi KK / identitas wali\n- Keterangan status sosial anak"
      },
      Mojomulyo: {
        institution_name: "RPS Mojomulyo",
        institution_address: "Jl. Taman Sari No. 7, Semarang",
        map_url: "https://maps.google.com/?q=RPS+Mojomulyo",
        institution_phone: "(024) 8416789",
        institution_whatsapp: "+62 812-3456-7892",
        institution_email: "mojomulyo@ppsraharjo.go.id",
        deskripsi: "RPS Mojomulyo memberi perhatian khusus terhadap kemandirian lansia, kesehatan, terapi okupasi, dan kegiatan sosial yang memperkuat kualitas hidup lanjut usia.",
        layanan_dasar: "- Perawatan kesehatan rutin\n- Kebutuhan dasar dan makan\n- Kegiatan rekreasi dan olahraga",
        layanan_bimbingan: "- Terapi okupasi\n- Konseling keluarga\n- Pendampingan sosial",
        persyaratan_penerimaan: "- Rekomendasi Dinas Sosial\n- Kartu identitas lansia\n- Riwayat medis terbaru"
      },
      Gondang: {
        institution_name: "RPS Gondang",
        institution_address: "Jl. Pendidikan No. 22, Semarang",
        map_url: "https://maps.google.com/?q=RPS+Gondang",
        institution_phone: "(024) 8419900",
        institution_whatsapp: "+62 812-3456-7893",
        institution_email: "gondang@ppsraharjo.go.id",
        deskripsi: "RPS Gondang melatih PMKS dalam keterampilan kerja, pembinaan sosial, dan pemberdayaan untuk memperkuat fungsi sosial dan ekonomi keluarga.",
        layanan_dasar: "- Pelatihan keterampilan kerja\n- Pendampingan sosial\n- Konseling dan pembinaan",
        layanan_bimbingan: "- Bimbingan vokasional\n- Pemulihan fungsi sosial\n- Pendampingan transisi menuju mandiri",
        persyaratan_penerimaan: "- Surat rekomendasi instansi atau LSM\n- Dokumen identitas diri\n- Surat keterangan keadaan sosial"
      }
    }
  },
  news: [
    {
      id: "news-1",
      title: "Kegiatan Pelatihan Melukis untuk Anak di RPS Pamardi Siwi",
      content: "Anak-anak asuh di RPS Pamardi Siwi mengikuti kegiatan pemPenerima Manfaat minat dan bakat melukis bersama relawan seni pada hari Sabtu lalu. Kegiatan ini bertujuan mengasah kreativitas, motorik halus, dan sebagai salah satu bentuk terapi trauma healing.",
      image_url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=600",
      created_at: "2026-07-01T08:00:00.000Z",
      rps_unit: "Pamardi Siwi",
      is_featured: true
    },
    {
      id: "news-2",
      title: "Pemeriksaan Kesehatan Berkala Lansia di RPS Mojomulyo",
      content: "Bekerjasama dengan Puskesmas setempat, RPS Mojomulyo menyelenggarakan cek kesehatan rutin meliputi tensi darah, kadar gula darah, asam urat, serta senam kebugaran lansia guna menjaga kondisi fisik para simbah agar tetap prima dan ceria.",
      image_url: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600",
      created_at: "2026-07-03T10:30:00.000Z",
      rps_unit: "Mojomulyo",
      is_featured: true
    },
    {
      id: "news-3",
      title: "Bimbingan Keterampilan Las dan Pertukangan untuk PMKS di RPS Gondang",
      content: "Guna mempersiapkan kemandirian ekonomi pasca-rehabilitasi, para penerima manfaat di RPS Gondang antusias mengikuti pembekalan praktis keterampilan teknik pengelasan besi ringan dan pembuatan furniture kayu sederhana.",
      image_url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600",
      created_at: "2026-07-04T14:15:00.000Z",
      rps_unit: "Gondang",
      is_featured: true
    }
  ],
  facilities: [
    {
      id: "fac-1",
      name: "Ruang Kelas & Belajar Kreatif",
      description: "Fasilitas penunjang pendidikan formal dan informal anak, dilengkapi dengan buku bacaan, komputer edukasi, serta alat peraga kreatif.",
      image_url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400",
      rps_unit: "Pamardi Siwi"
    },
    {
      id: "fac-2",
      name: "Taman Lansia Sehat & Area Refleksi",
      description: "Area hijau terbuka dengan jalur batu pijat refleksi kaki, kolam ikan, dan gazebo santai yang sejuk untuk interaksi sosial simbah.",
      image_url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=400",
      rps_unit: "Mojomulyo"
    },
    {
      id: "fac-3",
      name: "Bengkel Latihan Kerja Mandiri",
      description: "Fasilitas workshop pertukangan, menjahit, pertanian hidroponik, dan otomotif dasar sebagai bekal kemandirian PMKS.",
      image_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=400",
      rps_unit: "Gondang"
    }
  ],
  galleries: [
    {
      id: "gal-1",
      caption: "Senyum keceriaan anak-anak saat rekreasi edukatif",
      image_url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=500",
      created_at: "2026-06-15T09:00:00.000Z",
      rps_unit: "Pamardi Siwi",
      type: "photo"
    },
    {
      id: "gal-2",
      caption: "Senam pagi gembira bersama para lansia tangguh",
      image_url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=500",
      created_at: "2026-06-20T07:30:00.000Z",
      rps_unit: "Mojomulyo",
      type: "photo"
    },
    {
      id: "gal-3",
      caption: "Sesi konseling kelompok dan motivasi spritual",
      image_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=500",
      created_at: "2026-06-25T13:00:00.000Z",
      rps_unit: "Gondang",
      type: "photo"
    },
    {
      id: "gal-video-1",
      caption: "Video Profil PemPenerima Manfaat Keterampilan & Kreasi",
      image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=500",
      created_at: "2026-07-01T08:00:00.000Z",
      rps_unit: "Gondang",
      type: "video",
      video_url: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
      id: "gal-video-2",
      caption: "Video Kunjungan Sosial & Rekreasi Lansia",
      image_url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=500",
      created_at: "2026-07-02T09:00:00.000Z",
      rps_unit: "Mojomulyo",
      type: "video",
      video_url: "https://www.w3schools.com/html/mov_bbb.mp4"
    }
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Juara 1 Lomba Menggambar Tingkat Provinsi",
      description: "Ananda Satria (Penerima Manfaat RPS Pamardi Siwi) berhasil menyabet peringkat pertama lomba seni lukis anak peduli lingkungan.",
      year: "2025",
      image_url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400",
      rps_unit: "Pamardi Siwi"
    },
    {
      id: "ach-2",
      title: "Panti Lansia Ramah Lingkungan Terbaik",
      description: "RPS Mojomulyo menerima piagam penghargaan atas kebersihan, kerindangan, dan efisiensi pengolahan limbah organik.",
      year: "2026",
      image_url: "https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?auto=format&fit=crop&q=80&w=400",
      rps_unit: "Mojomulyo"
    },
    {
      id: "ach-3",
      title: "Sertifikasi Keterampilan Standar Nasional",
      description: "80% alumni PMKS Penerima Manfaat RPS Gondang berhasil lulus uji kompetensi pertukangan kayu dari Balai Pelatihan Kerja.",
      year: "2025",
      image_url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400",
      rps_unit: "Gondang"
    }
  ],
  announcements: [
    {
      id: "ann-1",
      title: "Penerimaan Calon Penerima Manfaat Baru RPS Pamardi Siwi TA 2026/2027",
      content: "Dibuka pendaftaran rehabilitasi sosial anak telantar dan yatim piatu usia 7-15 tahun. Proses seleksi berkas akan dimulai sepanjang bulan Juli 2026 melalui formulir pendaftaran online pada website ini.",
      date: "2026-07-01",
      file_url: "#",
      is_active: true
    },
    {
      id: "ann-2",
      title: "Jadwal Kunjungan Sosial Terpadu PPS Raharjo",
      content: "Demi kenyamanan dan ketertiban pemPenerima Manfaat, berikut adalah protokol kunjungan pihak keluarga/lembaga donatur selama masa adaptasi normal baru.",
      date: "2026-06-28",
      file_url: "#",
      is_active: true
    }
  ],
  documents: [
    {
      id: "doc-1",
      title: "Formulir Surat Keterangan Tidak Mampu (SKTM).pdf",
      category: "Persyaratan",
      file_url: "#",
      created_at: "2026-06-10T08:00:00.000Z"
    },
    {
      id: "doc-2",
      title: "SOP Pelayanan Rehabilitasi Sosial Anak & Lansia.pdf",
      category: "Regulasi",
      file_url: "#",
      created_at: "2026-06-20T11:00:00.000Z"
    },
    {
      id: "doc-3",
      title: "Laporan Kinerja Instansi Pemerintah (LKjIP) 2025.pdf",
      category: "Laporan",
      file_url: "#",
      created_at: "2026-01-15T09:00:00.000Z"
    }
  ],
  budgets: [
    {
      id: "b-1",
      year: "2026",
      total_budget: 1500000000,
      realized_budget: 820000000,
      breakdown: [
        { category: "Rehabilitasi & Pemenuhan Kebutuhan Dasar", budget: 600000000, realized: 380000000 },
        { category: "Pelatihan Keterampilan & Kemandirian", budget: 400000000, realized: 210000000 },
        { category: "Operasional, Sarana & Prasarana", budget: 300000000, realized: 150000000 },
        { category: "Penyuluhan, Mediasi & Advokasi Sosial", budget: 200000000, realized: 80000000 }
      ]
    }
  ],
  faqs: [
    {
      id: "faq-1",
      question: "Apakah seluruh biaya pelayanan dan pemPenerima Manfaat di PPS Raharjo dipungut biaya?",
      answer: "Tidak ada pungutan biaya sama sekali. Seluruh program pelayanan, tempat tinggal, makan, pemeriksaan kesehatan, sekolah, hingga pelatihan kerja dibiayai penuh oleh Anggaran Pemerintah Provinsi dan dukungan sosial non-terikat.",
      is_active: true
    },
    {
      id: "faq-2",
      question: "Bagaimana alur pendaftaran penerima manfaat?",
      answer: "Pendaftaran dapat diajukan secara online melalui menu Pendaftaran di website ini, atau langsung datang ke kantor dengan membawa dokumen kelengkapan seperti KK, KTP, Surat Pengantar Dinas Sosial Kab/Kota setempat, serta Surat Keterangan Tidak Mampu (SKTM).",
      is_active: true
    },
    {
      id: "faq-3",
      question: "Dapatkah instansi sekolah atau universitas mengadakan magang atau penelitian?",
      answer: "Sangat bisa. Anda dapat mengirimkan permohonan kunjungan/magang/penelitian secara resmi melalui formulir Layanan Online yang tersedia pada website ini, atau mengirimkan surat resmi ke email kami.",
      is_active: true
    }
  ],
  staff: [
    { id: "staff-1", name: "Drs. Raharjo Widodo, M.Si", position: "Kepala PPS Raharjo", rps_unit: "PPS", photo_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200", phone: "081234567890", email: "raharjo@ppspanti.go.id" },
    { id: "staff-2", name: "Sri Mulyani, S.ST, M.P.S.Sp", position: "Kepala RPS Pamardi Siwi", rps_unit: "Pamardi Siwi", photo_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200", phone: "081298765432", email: "sri.mulyani@ppspanti.go.id" },
    { id: "staff-3", name: "Bambang Setiawan, S.Sos", position: "Kepala RPS Mojomulyo", rps_unit: "Mojomulyo", photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200", phone: "081267890123", email: "bambang.setiawan@ppspanti.go.id" },
    { id: "staff-4", name: "Haryadi, S.H", position: "Kepala RPS Gondang", rps_unit: "Gondang", photo_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200", phone: "081234098765", email: "haryadi@ppspanti.go.id" }
  ],
  registrations: [
    {
      id: "reg-1",
      name: "Budi Santoso",
      birth_place: "Semarang",
      birth_date: "2015-08-12",
      gender: "Laki-laki",
      address: "Jl. Pemuda No. 45, Semarang",
      rps_target: "Pamardi Siwi",
      guardian_name: "Yatno (Paman)",
      guardian_phone: "08123456789",
      status: "Pending",
      created_at: "2026-07-04T05:22:00.000Z",
      ktp_url: "",
      kk_url: "",
      sktm_url: ""
    }
  ],
  contactMessages: [
    {
      id: "msg-1",
      name: "Andi Wijaya",
      email: "andiwijaya@gmail.com",
      phone: "08987654321",
      subject: "Penawaran Donasi Sembako",
      message: "Halo, saya perwakilan dari komunitas Sahabat Sosial ingin menanyakan jadwal penyerahan donasi bahan makanan pokok untuk para simbah di RPS Mojomulyo. Mohon info lebih lanjut.",
      created_at: "2026-07-05T01:10:00.000Z"
    }
  ],
  attendance: [],
  testimonials: [
    {
      id: "test-1",
      name: "Budi Santoso",
      title: "Ayah dari Anak Asuh",
      text: "Pengasuhan di RPS Pamardi Siwi sangat baik, anak saya menjadi lebih percaya diri dan mandiri.",
      rating: 5,
      video_url: "https://assets.mixkit.co/videos/preview/mixkit-man-talking-to-camera-3612-large.mp4",
      thumbnail_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
      rps_unit: "Pamardi Siwi",
      created_at: "2026-01-15T00:00:00.000Z",
      is_active: true
    },
    {
      id: "test-2",
      name: "Siti Aminah",
      title: "Lansia yang Diberikan Pelayanan",
      text: "RPS Mojomulyo memberikan pelayanan kesehatan dan sosial yang sangat memuaskan.",
      rating: 4,
      video_url: "https://assets.mixkit.co/videos/preview/mixkit-elderly-woman-talking-to-camera-3611-large.mp4",
      thumbnail_url: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=600",
      rps_unit: "Mojomulyo",
      created_at: "2026-02-20T00:00:00.000Z",
      is_active: true
    },
    {
      id: "test-3",
      name: "Mike Demian",
      title: "Penerima Manfaat",
      text: "Terima kasih RPS Gondang yang telah memberikan pelatihan keterampilan yang bermanfaat.",
      rating: 5,
      video_url: "https://assets.mixkit.co/videos/preview/mixkit-man-talking-to-camera-3612-large.mp4",
      thumbnail_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600",
      rps_unit: "Gondang",
      created_at: "2026-03-10T00:00:00.000Z",
      is_active: true
    }
  ]
};

// Database state managers
function readDb(): DbSchema {
  if (!fs.existsSync(DATA_FILE_PATH)) {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(initialSeedData, null, 2), "utf-8");
    return initialSeedData;
  }
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE_PATH, "utf-8"));
    let modified = false;
    if (!data.testimonials) {
      data.testimonials = initialSeedData.testimonials;
      modified = true;
    }
    if (modified) {
      writeDb(data);
    }
    return data;
  } catch (err) {
    console.error("Error reading JSON database, returning seed data:", err);
    return initialSeedData;
  }
}

function writeDb(data: DbSchema) {
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing JSON database:", err);
  }
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// 1. SETTINGS
app.get("/api/settings", async (req, res) => {
  const db = readDb();
  let modified = false;
  if (!db.settings.sambutan_video_url) {
    db.settings.sambutan_video_url = "https://www.w3schools.com/html/mov_bbb.mp4";
    modified = true;
  }
  if (modified) {
    writeDb(db);
  }
  res.json(db.settings);
});

app.post("/api/settings", async (req, res) => {
  const db = readDb();
  db.settings = { ...db.settings, ...req.body };
  writeDb(db);
  res.json({ success: true, settings: db.settings });
});

// Helper for generic CRUD operations
function setupCrudRoutes(endpoint: string, keyInDb: keyof DbSchema) {
  // Read all
  app.get(`/api/${endpoint}`, async (req, res) => {
    if (isSupabaseEnabled && supabaseTableMap[endpoint]) {
      try {
        const tableName = supabaseTableMap[endpoint];
        const data = await fetchSupabaseTable(tableName);
        return res.json(data);
      } catch (error) {
        console.error(`Supabase fetch failed for ${endpoint}:`, error);
      }
    }
    const db = readDb();
    res.json(db[keyInDb]);
  });

  // Create
  app.post(`/api/${endpoint}`, async (req, res) => {
    const db = readDb();
    const newItem = {
      id: `${endpoint}-${Date.now()}`,
      created_at: new Date().toISOString(),
      ...req.body
    };

    if (endpoint === 'registrations') {
      newItem.status = 'Approved';
    }

    (db[keyInDb] as any[]).unshift(newItem);
    writeDb(db);
    res.json({ success: true, data: newItem });
  });

  // Update
  app.put(`/api/${endpoint}/:id`, async (req, res) => {
    const db = readDb();
    const { id } = req.params;
    const list = db[keyInDb] as any[];
    const index = list.findIndex(item => item.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...req.body };
      writeDb(db);
      res.json({ success: true, data: list[index] });
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  });

  // Delete
  app.delete(`/api/${endpoint}/:id`, async (req, res) => {
    const db = readDb();
    const { id } = req.params;
    const list = db[keyInDb] as any[];
    const filteredList = list.filter(item => item.id !== id);
    (db as any)[keyInDb] = filteredList;
    writeDb(db);
    res.json({ success: true });
  });
}

// Set up CRUD routes for each module
setupCrudRoutes("news", "news");
setupCrudRoutes("facilities", "facilities");
setupCrudRoutes("galleries", "galleries");
setupCrudRoutes("achievements", "achievements");
setupCrudRoutes("announcements", "announcements");
setupCrudRoutes("documents", "documents");
setupCrudRoutes("budgets", "budgets");
setupCrudRoutes("faqs", "faqs");
setupCrudRoutes("staff", "staff");
setupCrudRoutes("registrations", "registrations");
setupCrudRoutes("contact", "contactMessages");
setupCrudRoutes("attendance", "attendance");
setupCrudRoutes("testimonials", "testimonials");

// ----------------------------------------------------
// PHOTO & FILE BASE64 SIMULATION/MOCK/CLOUDINARY ROUTE
// ----------------------------------------------------
app.post("/api/upload", async (req, res) => {
  const { file, name, type } = req.body;
  
  if (!file) {
    return res.status(400).json({ error: "No file content provided" });
  }

  // If Cloudinary keys are configured, you can upload here.
  // Otherwise, we gracefully store / return base64 URL directly as it functions perfectly in the UI.
  console.log(`Received file upload: ${name} (${type}). Size: ~${Math.round(file.length / 1024)} KB.`);
  
  // Return the base64 URL directly, which works instantly and beautifully in standard img tags and anchors!
  res.json({
    success: true,
    url: file, // In fallback mode, the base64 data URL IS the functional URL
    name: name
  });
});

// ----------------------------------------------------
// VITE DEV SERVER & PRODUCTION STATIC SERVING
// ----------------------------------------------------
async function startServer() {
  const isHmrPortFree = await new Promise<boolean>((resolve) => {
    const socket = net.createConnection({ port: HMR_PORT }, () => {
      socket.destroy();
      resolve(false);
    });
    socket.on("error", () => resolve(true));
  });

  const hmrConfig = process.env.DISABLE_HMR === 'true' ? false : isHmrPortFree ? { port: HMR_PORT } : false;

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: hmrConfig,
      },
      appType: "spa",
    });
    app.use(vite.middlewares);

    // SPA fallback for development routes like /admin
    app.use('*', async (req, res, next) => {
      try {
        const url = req.originalUrl;
        const template = fs.readFileSync(path.resolve('index.html'), 'utf-8');
        const html = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (err) {
        vite.ssrFixStacktrace(err as Error);
        next(err);
      }
    });

    console.log("Vite dev middleware mounted.");
    if (!hmrConfig) {
      console.log(`HMR port ${HMR_PORT} is unavailable or disabled; running without Hot Module Reload.`);
    }
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
