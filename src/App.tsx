import React, { useState, useEffect, lazy, Suspense } from "react";
import { 
  Home, Info, FileText, Banknote, HelpCircle, 
  Phone, UserPlus, Shield, TrendingUp, Building, Menu, X, ArrowRight, Activity, Heart, ChevronDown, BookOpen, Camera
} from "lucide-react";
import { 
  AppSettings, News, Facility, Gallery, Achievement, 
  Announcement, DocumentDownload, BudgetReport, FAQItem, 
  Staff, Testimonial 
} from "./types";
import { 
  fetchSettings, getNews, getFacilities, getGalleries, 
  getAchievements, getAnnouncements, getDocuments, getBudgets, 
  getFaqs, getStaff, getTestimonials 
} from "./api";
import ppsLogo from "../assets/images/pps_raharjo.png";

const AdminDashboard = lazy(() => import("./components/AdminDashboard").then((mod) => ({ default: mod.AdminDashboard })));
const PublicPages = lazy(() => import("./components/PublicPages").then((mod) => ({ default: mod.PublicPages })));

export default function App() {
  // State variables for application data
  const normalizePath = (path: string) => path.replace(/\/+$|^\s+|\s+$/g, "") || "/";
  const getPublicTabFromPath = (path: string) => {
    switch (path) {
      case "/":
        return "beranda";
      case "/profil":
        return "profil";
      case "/ppsrps":
        return "ppsrps";
      case "/berita":
        return "berita";
      case "/galeri":
        return "galeri";
      case "/anggaran":
        return "anggaran";
      case "/layanan":
        return "layanan";
      case "/statistik":
        return "statistik";
      case "/faq":
        return "faq";
      case "/kontak":
        return "kontak";
      case "/pendaftaran":
        return "pendaftaran";
      case "/ppid":
        return "ppid";
      default:
        if (path.startsWith("/ppsrps/")) {
          if (path.includes("pps-raharjo")) return "pps_rps_pps_raharjo";
          if (path.includes("pamardi-siwi")) return "pps_rps_pamardi_siwi";
          if (path.includes("mojomulyo")) return "pps_rps_mojomulyo";
          if (path.includes("gondang")) return "pps_rps_gondang";
          return "ppsrps";
        }
        return "beranda";
    }
  };

  const getPathForTab = (tabId: string) => {
    switch (tabId) {
      case "beranda":
        return "/";
      case "profil":
        return "/profil";
      case "ppsrps":
        return "/ppsrps";
      case "pps_rps_pps_raharjo":
        return "/ppsrps/pps-raharjo";
      case "pps_rps_pamardi_siwi":
        return "/ppsrps/pamardi-siwi";
      case "pps_rps_mojomulyo":
        return "/ppsrps/mojomulyo";
      case "pps_rps_gondang":
        return "/ppsrps/gondang";
      case "berita":
        return "/berita";
      case "galeri":
        return "/galeri";
      case "anggaran":
        return "/anggaran";
      case "layanan":
        return "/layanan";
      case "statistik":
        return "/statistik";
      case "faq":
        return "/faq";
      case "kontak":
        return "/kontak";
      case "pendaftaran":
        return "/pendaftaran";
      case "ppid":
        return "/ppid";
      default:
        return "/";
    }
  };

  const initialPath = normalizePath(window.location.pathname);
  const [adminRoute, setAdminRoute] = useState(initialPath === "/admin");
  const [activeTab, setActiveTab] = useState(() => initialPath === "/admin" ? "beranda" : getPublicTabFromPath(initialPath));
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const goToPublicTab = (tabId: string) => {
    setAdminRoute(false);
    setActiveTab(tabId);
  };

  // Database Resources State
  const [settings, setSettings] = useState<AppSettings>({
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
    sambutan_teks: "Selamat datang di website resmi Panti Pelayanan Sosial (PPS) Raharjo.",
    sambutan_foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
    dasar_hukum: [],
    sejarah_singkat: "",
    visi: "",
    misi: [],
    struktur_organisasi_url: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&q=80&w=800",
    unit_profiles: {
      PPS_Raharjo: {
        institution_name: "PPS Raharjo",
        institution_address: "Jl. Veteran No.108, Gajahmungkur, Kota Semarang",
        institution_phone: "(024) 8412345",
        institution_whatsapp: "0812-3456-7890",
        institution_email: "hubungan@ppsraharjo.go.id",
        social_facebook: "https://facebook.com",
        social_instagram: "https://instagram.com",
        social_twitter: "https://twitter.com",
        social_youtube: "https://youtube.com",
        social_linkedin: "https://linkedin.com",
        deskripsi: "PPS Raharjo menyediakan pelayanan rehabilitasi sosial bagi penyandang disabilitas intelektual melalui terapi, bimbingan, dan pemulihan fungsi sosial.",
        layanan_dasar: "Pelayanan rehab sosial, terapi kemandirian, pendampingan keluarga, dan pembinaan kemampuan hidup sehari-hari.",
        layanan_bimbingan: "Bimbingan rehabilitasi sosial, konseling keluarga, dan pendampingan reintegrasi sosial.",
        persyaratan_penerimaan: "Surat rujukan Dinas Sosial, fotokopi identitas, surat keterangan medis, dan wawancara awal."
      },
      "Pamardi Siwi": {
        institution_name: "RPS Pamardi Siwi",
        institution_address: "Kompleks Panti Sosial, Jalan Melati No. 12, Semarang",
        institution_phone: "(024) 8312346",
        institution_whatsapp: "0812-3456-7891",
        institution_email: "pamardisiwi@ppsraharjo.go.id",
        deskripsi: "RPS Pamardi Siwi fokus pada pelayanan anak dan pengasuhan dalam suasana aman, edukatif, dan penuh kasih.",
        layanan_dasar: "Pengasuhan, pendidikan, terapi psikososial, dan pembinaan karakter.",
        layanan_bimbingan: "Bimbingan sosial, konseling anak, dan pendampingan keluarga.",
        persyaratan_penerimaan: "Surat pengantar dari Dinas Sosial, dokumen identitas wali, dan keterangan status sosial anak."
      },
      Mojomulyo: {
        institution_name: "RPS Mojomulyo",
        institution_address: "Jl. Taman Sari No. 7, Semarang",
        institution_phone: "(024) 8416789",
        institution_whatsapp: "0812-3456-7892",
        institution_email: "mojomulyo@ppsraharjo.go.id",
        deskripsi: "RPS Mojomulyo memberikan pelayanan pendampingan, kesehatan, dan rekreasi bagi lanjut usia terlantar.",
        layanan_dasar: "Perawatan dasar, pemeriksaan kesehatan rutin, dan dukungan nutrisi.",
        layanan_bimbingan: "Terapi okupasi, kegiatan sosial, dan dukungan psikologis lansia.",
        persyaratan_penerimaan: "Rekomendasi Dinas Sosial, identitas diri, riwayat medis terbaru, dan surat pernyataan wali."
      },
      Gondang: {
        institution_name: "RPS Gondang",
        institution_address: "Jl. Pendidikan No. 22, Semarang",
        institution_phone: "(024) 8419900",
        institution_whatsapp: "0812-3456-7893",
        institution_email: "gondang@ppsraharjo.go.id",
        deskripsi: "RPS Gondang melayani PMKS melalui pembinaan keterampilan, resosialisasi, dan pendampingan sosial.",
        layanan_dasar: "Pelatihan keterampilan, konseling sosial, dan dukungan kebutuhan pokok.",
        layanan_bimbingan: "Bimbingan kerja, rehabilitasi sosial, dan pendampingan pemulihan fungsi sosial.",
        persyaratan_penerimaan: "Surat rekomendasi instansi terkait, dokumen identitas, surat keterangan keadaan sosial, dan wawancara awal."
      }
    }
  });

  const [news, setNews] = useState<News[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [documents, setDocuments] = useState<DocumentDownload[]>([]);
  const [budgets, setBudgets] = useState<BudgetReport[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: "1",
      name: "Budi Santoso",
      title: "Ayah dari Anak Asuh",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      rating: 5,
      video_url: "https://assets.mixkit.co/videos/preview/mixkit-man-talking-to-camera-3612-large.mp4",
      thumbnail_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
      rps_unit: "Pamardi Siwi",
      created_at: "2026-01-15",
      is_active: true
    },
    {
      id: "2",
      name: "Siti Aminah",
      title: "Lansia yang Diberikan Pelayanan",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      rating: 4,
      video_url: "https://assets.mixkit.co/videos/preview/mixkit-elderly-woman-talking-to-camera-3611-large.mp4",
      thumbnail_url: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=600",
      rps_unit: "Mojomulyo",
      created_at: "2026-02-20",
      is_active: true
    },
    {
      id: "3",
      name: "Mike Demien",
      title: "Penerima Manfaat",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      rating: 3,
      video_url: "https://assets.mixkit.co/videos/preview/mixkit-man-talking-to-camera-3612-large.mp4",
      thumbnail_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600",
      rps_unit: "Gondang",
      created_at: "2026-03-10",
      is_active: true
    }
  ]);

  // Loader function
  const loadAllData = async (showGlobalLoading = true) => {
    try {
      if (showGlobalLoading) {
        setLoading(true);
      }
      const [s, n, f, g, a, ann, d, b, faq, st, t] = await Promise.all([
        fetchSettings(), getNews(), getFacilities(), getGalleries(), 
        getAchievements(), getAnnouncements(), getDocuments(), getBudgets(), 
        getFaqs(), getStaff(), getTestimonials()
      ]);
      setSettings(s);
      setNews(n);
      setFacilities(f);
      setGalleries(g);
      setAchievements(a);
      setAnnouncements(ann);
      setDocuments(d);
      setBudgets(b);
      setFaqs(faq);
      setStaff(st);
      setTestimonials(t);
    } catch (err) {
      console.error("Critical: Failed to load data from Express backend:", err);
    } finally {
      if (showGlobalLoading) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const path = normalizePath(window.location.pathname);
      const isAdmin = path === "/admin";
      setAdminRoute(isAdmin);
      if (!isAdmin) {
        setActiveTab(getPublicTabFromPath(path));
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (adminRoute) return;
    const path = getPathForTab(activeTab);
    if (window.location.pathname !== path) {
      window.history.replaceState({}, "", path);
    }
  }, [activeTab, adminRoute]);

  useEffect(() => {
    if (!adminRoute) return;
    if (window.location.pathname !== "/admin") {
      window.history.replaceState({}, "", "/admin");
    }
  }, [adminRoute]);

  // Define navigation tabs configuration with human translation
  const navTabs = [
    { id: "beranda", label: "Beranda", icon: Home, visibleKey: "show_beranda" as keyof AppSettings },
    { id: "profil", label: "Profil", icon: Info, visibleKey: "show_profil" as keyof AppSettings },
    { id: "ppsrps", label: "PPS / RPS", icon: Building, visibleKey: "show_profil" as keyof AppSettings },
    { id: "berita", label: "Berita", icon: BookOpen, visibleKey: "show_publikasi" as keyof AppSettings },
    { id: "galeri", label: "Galeri", icon: Camera, visibleKey: "show_publikasi" as keyof AppSettings },
    { id: "anggaran", label: "Anggaran", icon: Banknote, visibleKey: "show_anggaran" as keyof AppSettings },
    { id: "layanan", label: "Layanan Online", icon: Activity, visibleKey: "show_layanan" as keyof AppSettings },
    { id: "statistik", label: "Statistik", icon: TrendingUp, visibleKey: "show_statistik" as keyof AppSettings },
    { id: "publikasi", label: "Publikasi", icon: FileText, visibleKey: "show_publikasi" as keyof AppSettings },
    { id: "faq", label: "FAQ", icon: HelpCircle, visibleKey: "show_faq" as keyof AppSettings },
    { id: "kontak", label: "Kontak", icon: Phone, visibleKey: "show_kontak" as keyof AppSettings },
    { id: "pendaftaran", label: "Pendaftaran Online", icon: UserPlus, visibleKey: "show_pendaftaran" as keyof AppSettings }
  ];

  // Helper check if tab is active
  const isTabVisible = (visibleKey: keyof AppSettings) => {
    return !!settings[visibleKey];
  };

  const isAdminRoute = adminRoute;

  // Switcher rendering loading or active tab
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-4 font-sans">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-sky-500 border-t-transparent animate-spin"></div>
        </div>
        <div className="text-center space-y-1">
          <h3 className="font-bold text-slate-800 text-sm">Menghubungkan Portal...</h3>
          <p className="text-xs text-slate-400">Panti Pelayanan Sosial Raharjo</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50/20 text-slate-800 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-900" id="root-container">
      {/* Main Responsive Header */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-amber-100 z-40 transition duration-200 shadow-xs" id="main-header">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex-none" id="brand-logo"></div>

          {/* Desktop Navigation Link Toggles */}
          <nav className="hidden lg:flex items-center gap-1.5 ml-auto" id="desktop-nav">
            {navTabs.map((tab) => {
              if (!isTabVisible(tab.visibleKey)) return null;
              const Icon = tab.icon;

              if (tab.id === 'profil') {
                return (
                  <div key={tab.id} className="relative group">
                    <button
                      onClick={() => goToPublicTab(tab.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                        activeTab === tab.id
                          ? "bg-amber-400 text-slate-900 shadow-md shadow-amber-400/20"
                          : "text-slate-600 hover:bg-amber-50 hover:text-amber-900"
                      }`}
                      id={`nav-link-${tab.id}`}
                    >
                      <Icon className="w-3.5 h-3.5" /> {tab.label}
                      <ChevronDown className="w-3 h-3 ml-0.5 transition-transform duration-300" />
                    </button>
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-amber-100 rounded-xl shadow-lg shadow-amber-900/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 flex flex-col py-2">
                      <button onClick={() => { goToPublicTab(tab.id); setTimeout(() => window.dispatchEvent(new CustomEvent('nav-profil', { detail: 'sambutan' })), 50); }} className="text-left px-4 py-2 text-xs text-slate-600 hover:bg-amber-50 hover:text-amber-700 font-bold transition">Sambutan Kepala Panti</button>
                      <button onClick={() => { goToPublicTab(tab.id); setTimeout(() => window.dispatchEvent(new CustomEvent('nav-profil', { detail: 'dasar_hukum' })), 50); }} className="text-left px-4 py-2 text-xs text-slate-600 hover:bg-amber-50 hover:text-amber-700 font-bold transition">Dasar Hukum</button>
                      <button onClick={() => { goToPublicTab(tab.id); setTimeout(() => window.dispatchEvent(new CustomEvent('nav-profil', { detail: 'sejarah' })), 50); }} className="text-left px-4 py-2 text-xs text-slate-600 hover:bg-amber-50 hover:text-amber-700 font-bold transition">Sejarah Singkat</button>
                      <button onClick={() => { goToPublicTab(tab.id); setTimeout(() => window.dispatchEvent(new CustomEvent('nav-profil', { detail: 'visi_misi' })), 50); }} className="text-left px-4 py-2 text-xs text-slate-600 hover:bg-amber-50 hover:text-amber-700 font-bold transition">Visi Misi</button>
                      <button onClick={() => { goToPublicTab(tab.id); setTimeout(() => window.dispatchEvent(new CustomEvent('nav-profil', { detail: 'struktur' })), 50); }} className="text-left px-4 py-2 text-xs text-slate-600 hover:bg-amber-50 hover:text-amber-700 font-bold transition">Struktur Organisasi</button>
                      <button onClick={() => { goToPublicTab(tab.id); setTimeout(() => window.dispatchEvent(new CustomEvent('nav-profil', { detail: 'sdm' })), 50); }} className="text-left px-4 py-2 text-xs text-slate-600 hover:bg-amber-50 hover:text-amber-700 font-bold transition">Sumber Daya Manusia</button>
                      <button onClick={() => { goToPublicTab(tab.id); setTimeout(() => window.dispatchEvent(new CustomEvent('nav-profil', { detail: 'prestasi' })), 50); }} className="text-left px-4 py-2 text-xs text-slate-600 hover:bg-amber-50 hover:text-amber-700 font-bold transition">Prestasi</button>
                    </div>
                  </div>
                );
              }
              if (tab.id === 'ppsrps') {
                const isActive = activeTab === tab.id || activeTab.startsWith("pps_rps_");
                return (
                  <div key={tab.id} className="relative group">
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                        isActive
                          ? "bg-amber-400 text-slate-900 shadow-md shadow-amber-400/20"
                          : "text-slate-600 hover:bg-amber-50 hover:text-amber-900"
                      }`}
                      id={`nav-link-${tab.id}`}
                    >
                      <Icon className="w-3.5 h-3.5" /> {tab.label}
                      <ChevronDown className="w-3 h-3 ml-0.5 transition-transform duration-300" />
                    </button>
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-amber-100 rounded-xl shadow-lg shadow-amber-900/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 flex flex-col py-2">
                      <button onClick={() => goToPublicTab("pps_rps_pps_raharjo")} className="text-left px-4 py-2.5 text-xs text-slate-600 hover:bg-amber-50 hover:text-amber-700 font-bold transition">PPS Raharjo</button>
                      <button onClick={() => goToPublicTab("pps_rps_pamardi_siwi")} className="text-left px-4 py-2.5 text-xs text-slate-600 hover:bg-amber-50 hover:text-amber-700 font-bold transition">RPS Pamardi Siwi</button>
                      <button onClick={() => goToPublicTab("pps_rps_mojomulyo")} className="text-left px-4 py-2.5 text-xs text-slate-600 hover:bg-amber-50 hover:text-amber-700 font-bold transition">RPS Mojomulyo</button>
                      <button onClick={() => goToPublicTab("pps_rps_gondang")} className="text-left px-4 py-2.5 text-xs text-slate-600 hover:bg-amber-50 hover:text-amber-700 font-bold transition">RPS Gondang</button>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-amber-400 text-slate-900 shadow-md shadow-amber-400/20"
                      : "text-slate-600 hover:bg-amber-50 hover:text-amber-900"
                  }`}
                  id={`nav-link-${tab.id}`}
                >
                  <Icon className="w-3.5 h-3.5" /> {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile hamburger menu */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-amber-200 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 cursor-pointer"
              id="mobile-menu-hamburger"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Drawers */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-amber-100 bg-white p-4 space-y-2 shadow-inner" id="mobile-drawer">
            {navTabs.map((tab) => {
              if (!isTabVisible(tab.visibleKey)) return null;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    goToPublicTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2.5 transition cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-amber-400 text-slate-900 shadow-sm"
                      : "text-slate-600 hover:bg-amber-50"
                  }`}
                  id={`mobile-nav-link-${tab.id}`}
                >
                  <Icon className="w-4 h-4" /> {tab.label}
                </button>
              );
            })}
            <div className="pt-4 border-t border-slate-100">
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">Unit PPS / RPS</div>
              <button onClick={() => { goToPublicTab("pps_rps_pps_raharjo"); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-amber-50 transition">PPS Raharjo</button>
              <button onClick={() => { goToPublicTab("pps_rps_pamardi_siwi"); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-amber-50 transition">RPS Pamardi Siwi</button>
              <button onClick={() => { goToPublicTab("pps_rps_mojomulyo"); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-amber-50 transition">RPS Mojomulyo</button>
              <button onClick={() => { goToPublicTab("pps_rps_gondang"); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-amber-50 transition">RPS Gondang</button>
            </div>
          </div>
        )}
      </header>

      {/* Main Core View Canvas Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8" id="main-content-canvas">
        <Suspense fallback={<div className="min-h-[240px] bg-white rounded-3xl border border-amber-100 shadow-sm p-8 text-center font-sans text-slate-700">Memuat halaman...</div>}>
          {isAdminRoute ? (
            <AdminDashboard 
              settings={settings} 
              onRefreshAll={() => loadAllData(false)} 
              news={news}
              facilities={facilities}
              galleries={galleries}
              achievements={achievements}
              announcements={announcements}
              documents={documents}
              budgets={budgets}
              faqs={faqs}
              staff={staff}
              testimonials={testimonials}
              setTestimonials={setTestimonials}
            />
          ) : (
            <PublicPages 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              settings={settings} 
              news={news}
              facilities={facilities}
              galleries={galleries}
              achievements={achievements}
              announcements={announcements}
              documents={documents}
              budgets={budgets}
              faqs={faqs}
              staff={staff}
              testimonials={testimonials}
            />
          )}
        </Suspense>
      </main>

      {/* Modern Bright & Welcoming Footer */}
      <footer className="bg-gradient-to-br from-sky-900 via-slate-900 to-sky-950 text-white mt-16 border-t-4 border-amber-400" id="main-footer">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-sans font-bold">
                R
              </div>
              <span className="font-sans font-black text-sm uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">PPS RAHARJO</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Panti Pelayanan Sosial Pemerintah Provinsi Jawa Tengah terpadu yang memfokuskan pelayanan pengasuhan anak asuh, lansia mandiri, serta bimbingan kesejahteraan PMKS.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-amber-400 font-sans">Pelayanan Rehabilitasi Sosial</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => goToPublicTab("pps_rps_pps_raharjo")}
                  className="flex items-center gap-2 hover:text-amber-300 transition"
                  id="footer-link-pps_rps_pps_raharjo"
                >
                  <span className="text-violet-400 font-bold">•</span> PPS Raharjo (Disabilitas Intelektual)
                </button>
              </li>
              <li>
                <button
                  onClick={() => goToPublicTab("pps_rps_pamardi_siwi")}
                  className="flex items-center gap-2 hover:text-amber-300 transition"
                  id="footer-link-pps_rps_pamardi_siwi"
                >
                  <span className="text-sky-400 font-bold">•</span> RPS Pamardi Siwi (Melayani Anak)
                </button>
              </li>
              <li>
                <button
                  onClick={() => goToPublicTab("pps_rps_mojomulyo")}
                  className="flex items-center gap-2 hover:text-amber-300 transition"
                  id="footer-link-pps_rps_mojomulyo"
                >
                  <span className="text-emerald-400 font-bold">•</span> RPS Mojomulyo (Melayani Lanjut Usia)
                </button>
              </li>
              <li>
                <button
                  onClick={() => goToPublicTab("pps_rps_gondang")}
                  className="flex items-center gap-2 hover:text-amber-300 transition"
                  id="footer-link-pps_rps_gondang"
                >
                  <span className="text-rose-400 font-bold">•</span> RPS Gondang (Melayani PMKS)
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-amber-400 font-sans">Navigasi Halaman</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-slate-300">
              {navTabs.map((tab) => (
                <button 
                  key={tab.id} 
                  onClick={() => goToPublicTab(tab.id)} 
                  className="text-left hover:text-amber-300 transition cursor-pointer"
                  id={`footer-link-${tab.id}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-amber-400 font-sans">Hubungi Humas</h4>
            <p className="text-xs text-slate-300 leading-normal">
              Humas Kantor Pusat PPS Raharjo<br />
              Jl. Veteran No.108, Gajahmungkur, Kota Semarang, Jawa Tengah
            </p>
            <div className="pt-2 text-[10px] text-amber-300 font-semibold font-mono">
              Telp: (024) 8412345
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/60 py-6 text-center text-xs text-slate-400 max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Panti Pelayanan Sosial (PPS) Raharjo. Dinas Sosial Provinsi Jawa Tengah. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-amber-300 transition">Kebijakan Privasi</a>
            <a href="#" className="hover:text-amber-300 transition">SOP Layanan</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
