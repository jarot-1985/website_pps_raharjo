import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, Settings, FileText, Banknote, 
  HelpCircle, Users, Award, BookOpen, Download, LogOut,
  Plus, Edit2, Trash2, Check, CheckCircle2, AlertCircle,
  Eye, ToggleLeft, ToggleRight, MessageSquare, Briefcase, ChevronRight
} from "lucide-react";
import { AdminLogin } from "./admin/AdminLogin";
import { AdminSidebar } from "./admin/AdminSidebar";
import { AdminSettings } from "./admin/AdminSettings";
import { AdminRegistrations } from "./admin/AdminRegistrations";
import { AdminOverview } from "./admin/AdminOverview";
import { AdminNewsPage } from "./admin/AdminNewsPage";
import { AdminFacilitiesPage } from "./admin/AdminFacilitiesPage";
import { AdminGalleryPage } from "./admin/AdminGalleryPage";
import { AdminAchievementsPage } from "./admin/AdminAchievementsPage";
import { AdminPublications } from "./admin/AdminPublications";
import { AdminBudgetPage } from "./admin/AdminBudgetPage";
import { AdminStaffPage } from "./admin/AdminStaffPage";
import { 
  AppSettings, News, Facility, Gallery, Achievement, 
  Announcement, DocumentDownload, BudgetReport, FAQItem, 
  Staff, BeneficiaryRegistration, ContactMessage, RpsUnit, Testimonial
} from "../types";
import { 
  saveSettings, getNews, createNews, updateNews, deleteNews,
  getFacilities, createFacility, updateFacility, deleteFacility,
  getGalleries, createGallery, updateGallery, deleteGallery,
  getAchievements, createAchievement, updateAchievement, deleteAchievement,
  getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement,
  getDocuments, createDocument, deleteDocument,
  getBudgets, updateBudget,
  getFaqs, createFaq, updateFaq, deleteFaq,
  getStaff, createStaff, deleteStaff,
  getRegistrations, updateRegistration, deleteRegistration,
  getContactMessages, deleteContactMessage,
  getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
  uploadFile, fileToBase64
} from "../api";

interface AdminDashboardProps {
  settings: AppSettings;
  onRefreshAll: () => void;
  news: News[];
  facilities: Facility[];
  galleries: Gallery[];
  achievements: Achievement[];
  announcements: Announcement[];
  documents: DocumentDownload[];
  budgets: BudgetReport[];
  faqs: FAQItem[];
  staff: Staff[];
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
}

export function AdminDashboard({
  settings,
  onRefreshAll,
  news: initialNews,
  facilities: initialFacilities,
  galleries: initialGalleries,
  achievements: initialAchievements,
  announcements: initialAnnouncements,
  documents: initialDocuments,
  budgets: initialBudgets,
  faqs: initialFaqs,
  staff: initialStaff,
  testimonials: initialTestimonials,
  setTestimonials
}: AdminDashboardProps) {
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem("adminLoggedIn") === "true";
  });
  const [selectedRole, setSelectedRole] = useState<RpsUnit>(() => {
    if (typeof window === 'undefined') return 'PPS';
    return (window.localStorage.getItem("adminRole") as RpsUnit) || 'PPS';
  });
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Persist admin session in browser storage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem("adminLoggedIn", isLoggedIn ? "true" : "false");
    if (isLoggedIn) {
      window.localStorage.setItem("adminRole", selectedRole);
    }
  }, [isLoggedIn, selectedRole]);

  // Local Component Lists for Live State Refresh
  const [news, setNews] = useState<News[]>(initialNews);
  const [facilities, setFacilities] = useState<Facility[]>(initialFacilities);
  const [galleries, setGalleries] = useState<Gallery[]>(initialGalleries);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [documents, setDocuments] = useState<DocumentDownload[]>(initialDocuments);
  const [budgets, setBudgets] = useState<BudgetReport[]>(initialBudgets);
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFaqs);
  const [staff, setStaff] = useState<Staff[]>(initialStaff);
  const [testimonials, setTestimonialsLocal] = useState<Testimonial[]>(initialTestimonials);
  const [registrations, setRegistrations] = useState<BeneficiaryRegistration[]>([]);
  const [inbox, setInbox] = useState<ContactMessage[]>([]);

  // Navigation Panel Tab State
  const [adminTab, setAdminTab] = useState<'overview' | 'settings' | 'news' | 'facilities' | 'gallery' | 'achievements' | 'publikasi' | 'anggaran' | 'staff_faq' | 'registrasi' | 'inbox' | 'testimonials'>('overview');

  // Unified Content Table Sub-Tab
  const [unifiedSubTab, setUnifiedSubTab] = useState<'news' | 'facilities' | 'gallery' | 'achievements'>('news');

  // Action feedback
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  const refreshData = async () => {
    try {
      const n = await getNews(); setNews(n);
      const f = await getFacilities(); setFacilities(f);
      const g = await getGalleries(); setGalleries(g);
      const a = await getAchievements(); setAchievements(a);
      const ann = await getAnnouncements(); setAnnouncements(ann);
      const doc = await getDocuments(); setDocuments(doc);
      const b = await getBudgets(); setBudgets(b);
      const faq = await getFaqs(); setFaqs(faq);
      const s = await getStaff(); setStaff(s);
      const r = await getRegistrations(); setRegistrations(r);
      const i = await getContactMessages(); setInbox(i);
      const t = await getTestimonials(); setTestimonialsLocal(t); setTestimonials(t);
      onRefreshAll();
    } catch (err) {
      console.error("Refresh admin error:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      refreshData();
    }
  }, [isLoggedIn]);

  // Demo Login action
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'adminraharjo') {
      setIsLoggedIn(true);
      setLoginError('');
      setPassword('');
      showFeedback("success", `Berhasil masuk sebagai Admin ${selectedRole === 'PPS' ? 'Utama PPS' : `RPS ${selectedRole}`}`);
    } else {
      setLoginError('Password salah. Gunakan password demo: "adminraharjo"');
    }
  };

  const showFeedback = (type: "success" | "error", text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage({ type: "", text: "" }), 3000);
  };

  // 1. SETTINGS SAVER (CHECKLISTS AND PROFILES)
  const [settingsForm, setSettingsForm] = useState<AppSettings>(settings);

  useEffect(() => {
    setSettingsForm(settings);
  }, [settings]);

  const handleCheckboxToggle = async (key: keyof AppSettings) => {
    const updatedValue = !settingsForm[key];
    const newSettings = { ...settingsForm, [key]: updatedValue };
    setSettingsForm(newSettings);
    try {
      await saveSettings({ [key]: updatedValue });
      onRefreshAll();
      showFeedback("success", "Navigasi halaman publik berhasil diperbarui secara real-time!");
    } catch (err) {
      showFeedback("error", "Gagal menyimpan perubahan.");
    }
  };

  const handleSaveTextSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveSettings({
        sambutan_nama: settingsForm.sambutan_nama,
        sambutan_teks: settingsForm.sambutan_teks,
        sambutan_foto: settingsForm.sambutan_foto,
        sambutan_video_url: settingsForm.sambutan_video_url,
        sejarah_singkat: settingsForm.sejarah_singkat,
        visi: settingsForm.visi,
        struktur_organisasi_url: settingsForm.struktur_organisasi_url,
        hero_title: settingsForm.hero_title,
        hero_subtitle: settingsForm.hero_subtitle,
        hero_use_video: settingsForm.hero_use_video,
        hero_video_url: settingsForm.hero_video_url,
        hero_use_image: settingsForm.hero_use_image,
        hero_image_url: settingsForm.hero_image_url,
        hero_use_link: settingsForm.hero_use_link,
        hero_link_url: settingsForm.hero_link_url,
        hero_link_text: settingsForm.hero_link_text,
        unit_profiles: settingsForm.unit_profiles
      });
      onRefreshAll();
      showFeedback("success", "Profil panti & Pengaturan Hero berhasil diperbarui!");
    } catch (err) {
      showFeedback("error", "Gagal menyimpan profil.");
    }
  };

  const handleProfilePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldKey: keyof AppSettings) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await fileToBase64(file);
      const uploadedUrl = await uploadFile(base64, file.name, file.type);
      setSettingsForm(prev => ({ ...prev, [fieldKey]: uploadedUrl }));
      showFeedback("success", "File berhasil diunggah!");
    } catch (err) {
      showFeedback("error", "Gagal mengunggah gambar.");
    }
  };

  const updateSettingsArrayItem = (field: 'dasar_hukum' | 'misi', index: number, value: string) => {
    setSettingsForm(prev => {
      const updatedArray = [...(prev[field] || [])];
      updatedArray[index] = value;
      return { ...prev, [field]: updatedArray } as AppSettings;
    });
  };

  const addSettingsArrayItem = (field: 'dasar_hukum' | 'misi') => {
    setSettingsForm(prev => ({ ...prev, [field]: [ ...(prev[field] || []), "" ] } as AppSettings));
  };

  const removeSettingsArrayItem = (field: 'dasar_hukum' | 'misi', index: number) => {
    setSettingsForm(prev => {
      const updatedArray = [...(prev[field] || [])];
      updatedArray.splice(index, 1);
      return { ...prev, [field]: updatedArray } as AppSettings;
    });
  };

  const handleSettingsFieldChange = (key: keyof AppSettings, value: any) => {
    setSettingsForm(prev => ({ ...prev, [key]: value } as AppSettings));
  };

  // ----------------------------------------------------
  // UNIFIED RPS CONTENT CRUD FOR SINGLE TABLES
  // ----------------------------------------------------
  // 1. NEWS CRUD
  const [newsForm, setNewsForm] = useState({ id: "", title: "", content: "", image_url: "", rps_unit: 'Pamardi Siwi' as RpsUnit, is_featured: false });
  const [isEditingNews, setIsEditingNews] = useState(false);

  const saveNewsAction = async (e: React.FormEvent) => {
    e.preventDefault();
    // Auto Tag active unit if user is not Head Admin (PPS)
    const activeUnit = selectedRole === 'PPS' ? newsForm.rps_unit : selectedRole;
    const finalPayload = { ...newsForm, rps_unit: activeUnit };

    try {
      if (isEditingNews) {
        await updateNews(newsForm.id, finalPayload);
        showFeedback("success", "Berita berhasil diupdate!");
      } else {
        await createNews(finalPayload);
        showFeedback("success", "Berita baru ditambahkan!");
      }
      setNewsForm({ id: "", title: "", content: "", image_url: "", rps_unit: 'Pamardi Siwi', is_featured: false });
      setIsEditingNews(false);
      refreshData();
    } catch (err) {
      showFeedback("error", "Gagal menyimpan berita.");
    }
  };

  // 2. FACILITIES CRUD
  const [facForm, setFacForm] = useState({ id: "", name: "", description: "", image_url: "", rps_unit: 'Pamardi Siwi' as RpsUnit });
  const [isEditingFac, setIsEditingFac] = useState(false);

  const saveFacAction = async (e: React.FormEvent) => {
    e.preventDefault();
    const activeUnit = selectedRole === 'PPS' ? facForm.rps_unit : selectedRole;
    const finalPayload = { ...facForm, rps_unit: activeUnit };
    try {
      if (isEditingFac) {
        await updateFacility(facForm.id, finalPayload);
        showFeedback("success", "Fasilitas berhasil diupdate!");
      } else {
        await createFacility(finalPayload);
        showFeedback("success", "Fasilitas baru ditambahkan!");
      }
      setFacForm({ id: "", name: "", description: "", image_url: "", rps_unit: 'Pamardi Siwi' });
      setIsEditingFac(false);
      refreshData();
    } catch (err) {
      showFeedback("error", "Gagal menyimpan fasilitas.");
    }
  };

  // 3. GALLERY CRUD
  const [galForm, setGalForm] = useState({ id: "", caption: "", image_url: "", rps_unit: 'Pamardi Siwi' as RpsUnit, type: 'photo' as 'photo' | 'video', video_url: "" });
  const [isEditingGal, setIsEditingGal] = useState(false);

  const saveGalAction = async (e: React.FormEvent) => {
    e.preventDefault();
    const activeUnit = selectedRole === 'PPS' ? galForm.rps_unit : selectedRole;
    const finalPayload = { ...galForm, rps_unit: activeUnit };
    try {
      if (isEditingGal) {
        await updateGallery(galForm.id, finalPayload);
        showFeedback("success", "Galeri berhasil diupdate!");
      } else {
        await createGallery(finalPayload);
        showFeedback("success", "Galeri baru ditambahkan!");
      }
      setGalForm({ id: "", caption: "", image_url: "", rps_unit: 'Pamardi Siwi', type: 'photo', video_url: "" });
      setIsEditingGal(false);
      refreshData();
    } catch (err) {
      showFeedback("error", "Gagal menyimpan galeri.");
    }
  };

  // 4. ACHIEVEMENTS CRUD
  const [achForm, setAchForm] = useState({ id: "", title: "", description: "", year: "2026", image_url: "", rps_unit: 'Pamardi Siwi' as RpsUnit });
  const [isEditingAch, setIsEditingAch] = useState(false);

  const saveAchAction = async (e: React.FormEvent) => {
    e.preventDefault();
    const activeUnit = selectedRole === 'PPS' ? achForm.rps_unit : selectedRole;
    const finalPayload = { ...achForm, rps_unit: activeUnit };
    try {
      if (isEditingAch) {
        await updateAchievement(achForm.id, finalPayload);
        showFeedback("success", "Prestasi berhasil diupdate!");
      } else {
        await createAchievement(finalPayload);
        showFeedback("success", "Prestasi baru ditambahkan!");
      }
      setAchForm({ id: "", title: "", description: "", year: "2026", image_url: "", rps_unit: 'Pamardi Siwi' });
      setIsEditingAch(false);
      refreshData();
    } catch (err) {
      showFeedback("error", "Gagal menyimpan prestasi.");
    }
  };

  // Helper file uploader in forms
  const handleGenericFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, setUrlCallback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await fileToBase64(file);
      const uploadedUrl = await uploadFile(base64, file.name, file.type);
      setUrlCallback(uploadedUrl);
      showFeedback("success", `File ${file.name} berhasil diunggah.`);
    } catch (err) {
      showFeedback("error", "Gagal mengunggah file.");
    }
  };

  // Filter lists based on role session
  const displayedNews = news.filter(item => selectedRole === 'PPS' || item.rps_unit === selectedRole);
  const displayedFacilities = facilities.filter(item => selectedRole === 'PPS' || item.rps_unit === selectedRole);
  const displayedGalleries = galleries.filter(item => selectedRole === 'PPS' || item.rps_unit === selectedRole);
  const displayedAchievements = achievements.filter(item => selectedRole === 'PPS' || item.rps_unit === selectedRole);
  const displayedTestimonials = testimonials.filter(item => selectedRole === 'PPS' || item.rps_unit === selectedRole);

  // ----------------------------------------------------
  // PUBLICATION, FAQ, STAFF, BUDGET MANAGERS
  // ----------------------------------------------------
  const [annForm, setAnnForm] = useState({ id: "", title: "", content: "", date: new Date().toISOString().split('T')[0], file_url: "", is_active: true });
  const [isEditingAnn, setIsEditingAnn] = useState(false);
  const saveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditingAnn) {
        await updateAnnouncement(annForm.id, annForm);
        showFeedback("success", "Pengumuman diupdate!");
      } else {
        await createAnnouncement(annForm);
        showFeedback("success", "Pengumuman dibuat!");
      }
      setAnnForm({ id: "", title: "", content: "", date: new Date().toISOString().split('T')[0], file_url: "", is_active: true });
      setIsEditingAnn(false);
      refreshData();
    } catch (err) {
      showFeedback("error", "Gagal menyimpan pengumuman.");
    }
  };

  const [docForm, setDocForm] = useState({ title: "", category: "Regulasi", file_url: "" });
  const saveDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createDocument(docForm);
      setDocForm({ title: "", category: "Regulasi", file_url: "" });
      showFeedback("success", "Dokumen download baru ditambahkan!");
      refreshData();
    } catch (err) {
      showFeedback("error", "Gagal menyimpan dokumen.");
    }
  };

  const [staffForm, setStaffForm] = useState({ name: "", position: "", rps_unit: 'PPS_Raharjo' as RpsUnit, photo_url: "", phone: "", email: "" });
  const saveStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const finalStaff = {
        ...staffForm,
        rps_unit: selectedRole === 'PPS' ? staffForm.rps_unit : selectedRole
      };
      await createStaff(finalStaff);
      setStaffForm({ name: "", position: "", rps_unit: 'PPS_Raharjo', photo_url: "", phone: "", email: "" });
      showFeedback("success", "Staff baru ditambahkan!");
      refreshData();
    } catch (err) {
      showFeedback("error", "Gagal menyimpan data staff.");
    }
  };

  // TESTIMONIALS CRUD
  const [testimonialForm, setTestimonialForm] = useState({ 
    id: "", 
    name: "", 
    title: "", 
    text: "", 
    rating: 5, 
    video_url: "", 
    thumbnail_url: "", 
    rps_unit: 'Pamardi Siwi' as RpsUnit,
    is_active: true 
  });
  const [isEditingTestimonial, setIsEditingTestimonial] = useState(false);
  
  const saveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    const activeUnit = selectedRole === 'PPS' ? testimonialForm.rps_unit : selectedRole;
    const finalPayload = { ...testimonialForm, rps_unit: activeUnit };
    
    try {
      if (isEditingTestimonial) {
        await updateTestimonial(testimonialForm.id, finalPayload);
        showFeedback("success", "Testimonial berhasil diupdate!");
      } else {
        await createTestimonial(finalPayload);
        showFeedback("success", "Testimonial baru ditambahkan!");
      }
      setTestimonialForm({ id: "", name: "", title: "", text: "", rating: 5, video_url: "", thumbnail_url: "", rps_unit: 'Pamardi Siwi', is_active: true });
      setIsEditingTestimonial(false);
      refreshData();
    } catch (err) {
      showFeedback("error", "Gagal menyimpan testimonial.");
    }
  };

  const [faqForm, setFaqForm] = useState({ id: "", question: "", answer: "", is_active: true });
  const [isEditingFaq, setIsEditingFaq] = useState(false);
  const saveFaqAction = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditingFaq) {
        await updateFaq(faqForm.id, faqForm);
        showFeedback("success", "FAQ berhasil diupdate!");
      } else {
        await createFaq(faqForm);
        showFeedback("success", "FAQ baru ditambahkan!");
      }
      setFaqForm({ id: "", question: "", answer: "", is_active: true });
      setIsEditingFaq(false);
      refreshData();
    } catch (err) {
      showFeedback("error", "Gagal menyimpan FAQ.");
    }
  };

  const handleUpdateRegStatus = async (id: string, status: 'Approved' | 'Rejected') => {
    try {
      await updateRegistration(id, { status });
      showFeedback("success", `Status registrasi berhasil diubah menjadi ${status}`);
      refreshData();
    } catch (err) {
      showFeedback("error", "Gagal update status.");
    }
  };

  const handleDeleteReg = async (id: string) => {
    if (!confirm("Hapus pendaftaran ini?")) return;
    try {
      await deleteRegistration(id);
      showFeedback("success", "Registrasi berhasil dihapus.");
      refreshData();
    } catch (err) {
      showFeedback("error", "Gagal menghapus.");
    }
  };

  // Simple logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedRole('PPS');
    setPassword("");
    setLoginError("");
    setAdminTab('overview');
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem("adminLoggedIn");
      window.localStorage.removeItem("adminRole");
    }
    showFeedback("success", "Anda telah keluar dari admin.");
  };

  // Login component
  if (!isLoggedIn) {
    return (
      <AdminLogin
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        password={password}
        setPassword={setPassword}
        loginError={loginError}
        onLogin={handleLogin}
      />
    );
  }

  // Admin Dashboard Main Layout
  return (
    <div className="grid md:grid-cols-12 gap-8 py-4 animate-fade-in font-serif" id="admin-main-dashboard">
      {/* Sidebar Admin Navigation */}
      <AdminSidebar
        activeTab={adminTab}
        setActiveTab={setAdminTab}
        selectedRole={selectedRole}
        onLogout={handleLogout}
        statusMessage={statusMessage}
      />

      {/* Main Admin Workspace Content Area */}
      <div className="md:col-span-9 space-y-6">
        {/* TAB 1: OVERVIEW */}
        {adminTab === 'overview' && (
          <AdminOverview
            selectedRole={selectedRole}
            displayedNews={displayedNews}
            displayedFacilities={displayedFacilities}
            displayedGalleries={displayedGalleries}
            registrations={registrations}
          />
        )}

        {/* TAB 2: CHECKLISTS & PROFILE SETTINGS */}
        {adminTab === 'settings' && (
          <AdminSettings
            settingsForm={settingsForm}
            selectedRole={selectedRole}
            onCheckboxToggle={handleCheckboxToggle}
            onFieldChange={handleSettingsFieldChange}
            onSave={handleSaveTextSettings}
            onProfilePhotoUpload={handleProfilePhotoUpload}
            addSettingsArrayItem={addSettingsArrayItem}
            removeSettingsArrayItem={removeSettingsArrayItem}
            updateSettingsArrayItem={updateSettingsArrayItem}
          />
        )}

        {/* TAB 3: BERITA PANTI */}
        {adminTab === 'news' && (
          <AdminNewsPage
            selectedRole={selectedRole}
            displayedNews={displayedNews}
            onRefreshData={refreshData}
            onShowFeedback={showFeedback}
            handleGenericFileUpload={handleGenericFileUpload}
          />
        )}

        {/* TAB 4: FASILITAS UNIT */}
        {adminTab === 'facilities' && (
          <AdminFacilitiesPage
            selectedRole={selectedRole}
            displayedFacilities={displayedFacilities}
            onRefreshData={refreshData}
            onShowFeedback={showFeedback}
            handleGenericFileUpload={handleGenericFileUpload}
          />
        )}

        {/* TAB 5: GALERI MEDIA */}
        {adminTab === 'gallery' && (
          <AdminGalleryPage
            selectedRole={selectedRole}
            displayedGalleries={displayedGalleries}
            onRefreshData={refreshData}
            onShowFeedback={showFeedback}
            handleGenericFileUpload={handleGenericFileUpload}
          />
        )}

        {/* TAB 6: PRESTASI Penerima Manfaat */}
        {adminTab === 'achievements' && (
          <AdminAchievementsPage
            selectedRole={selectedRole}
            displayedAchievements={displayedAchievements}
            onRefreshData={refreshData}
            onShowFeedback={showFeedback}
            handleGenericFileUpload={handleGenericFileUpload}
          />
        )}

        {/* TAB 4: PUBLICATION & DOCUMENTS (PDF) */}
        {adminTab === 'publikasi' && (
          <AdminPublications
            announcements={announcements}
            documents={documents}
            annForm={annForm}
            setAnnForm={setAnnForm}
            isEditingAnn={isEditingAnn}
            setIsEditingAnn={setIsEditingAnn}
            saveAnnouncement={saveAnnouncement}
            docForm={docForm}
            setDocForm={setDocForm}
            saveDocument={saveDocument}
            handleGenericFileUpload={handleGenericFileUpload}
            refreshData={refreshData}
            showFeedback={showFeedback}
          />
        )}

        {/* TAB 5: APBD BUDGET REPORTS */}
        {adminTab === 'anggaran' && (
          <AdminBudgetPage budgets={budgets} />
        )}

        {/* TAB 6: STAFFS & FAQ */}
        {adminTab === 'staff_faq' && (
          <div className="space-y-8" id="staff-faq-workspace">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Kelola Data Pegawai</h4>
              <form onSubmit={saveStaff} className="grid grid-cols-1 md:grid-cols-2 gap-4" id="staff-adm-form">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nama Pegawai *</label>
                  <input
                    type="text"
                    required
                    value={staffForm.name}
                    onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Jabatan / Posisi *</label>
                  <input
                    type="text"
                    required
                    value={staffForm.position}
                    onChange={(e) => setStaffForm({ ...staffForm, position: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Telepon / Kontak</label>
                  <input
                    type="text"
                    value={staffForm.phone}
                    onChange={(e) => setStaffForm({ ...staffForm, phone: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                    placeholder="0812xxxxxxx"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Email Kontak</label>
                  <input
                    type="email"
                    value={staffForm.email}
                    onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                    placeholder="nama@domain.co.id"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Unit RPS *</label>
                  {selectedRole === 'PPS' ? (
                    <select
                      value={staffForm.rps_unit}
                      onChange={(e) => setStaffForm({ ...staffForm, rps_unit: e.target.value as RpsUnit })}
                      className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                    >
                      <option value="PPS_Raharjo">PPS Raharjo</option>
                      <option value="Pamardi Siwi">Pamardi Siwi</option>
                      <option value="Mojomulyo">Mojomulyo</option>
                      <option value="Gondang">Gondang</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={selectedRole}
                      readOnly
                      className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-slate-100"
                    />
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Foto Pegawai (URL / Unggah)</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={staffForm.photo_url}
                      onChange={(e) => setStaffForm({ ...staffForm, photo_url: e.target.value })}
                      className="flex-1 text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                      placeholder="https://..."
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleGenericFileUpload(e, (url) => setStaffForm({ ...staffForm, photo_url: url }))}
                      className="hidden"
                      id="staff-photo-uploader"
                    />
                    <label htmlFor="staff-photo-uploader" className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-xs font-semibold cursor-pointer">
                      Unggah
                    </label>
                  </div>
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <button type="submit" className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold rounded-lg">
                    Tambah Pegawai
                  </button>
                </div>
              </form>
            </div>

            <AdminStaffPage
              staff={staff}
              showFeedback={showFeedback}
              refreshData={refreshData}
            />

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Kelola Tanya Jawab (FAQ)</h4>
              <form onSubmit={saveFaqAction} className="space-y-4" id="faq-adm-form">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Pertanyaan FAQ *</label>
                  <input
                    type="text"
                    required
                    value={faqForm.question}
                    onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Jawaban FAQ *</label>
                  <textarea
                    required
                    rows={3}
                    value={faqForm.answer}
                    onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                  ></textarea>
                </div>
                <button type="submit" className="px-4 py-2 bg-sky-500 hover:bg-sky-300 text-white text-xs font-bold rounded-lg cursor-pointer">
                  {isEditingFaq ? "Update FAQ" : "Simpan FAQ Baru"}
                </button>
              </form>

              <div className="divide-y divide-slate-150 pt-4">
                {faqs.map((f) => (
                  <div key={f.id} className="py-2.5 flex justify-between items-start gap-4 text-xs">
                    <div>
                      <div className="font-bold text-slate-800">{f.question}</div>
                      <div className="text-slate-500 mt-1 line-clamp-2">{f.answer}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setFaqForm(f); setIsEditingFaq(true); }} className="text-sky-600 hover:underline">Edit</button>
                      <button 
                        onClick={async () => {
                          if (confirm("Hapus FAQ ini?")) {
                            await deleteFaq(f.id);
                            showFeedback("success", "FAQ dihapus.");
                            refreshData();
                          }
                        }}
                        className="text-rose-600 hover:underline"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: REGISTRASI PENDAFTAR BARU */}
        {adminTab === 'registrasi' && (
          <AdminRegistrations
            registrations={registrations}
            onApprove={(id) => handleUpdateRegStatus(id, 'Approved')}
            onReject={(id) => handleUpdateRegStatus(id, 'Rejected')}
            onDelete={handleDeleteReg}
          />
        )}

        {/* TAB 8: CONTACT INBOX MESSAGES */}
        {adminTab === 'inbox' && (
          <div className="space-y-6" id="inbox-workspace">
<div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 shadow-2xl space-y-4">
  <h4 className="text-sm font-bold text-slate-900 border-b border-stone-200 pb-2">Kotak Masuk Humas & Pertanyaan Umum</h4>
              
              <div className="divide-y divide-slate-150">
                {inbox.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs">Tidak ada pesan masuk.</div>
                ) : (
                  inbox.map((msg) => (
                    <div key={msg.id} className="py-4 space-y-2 first:pt-0 last:pb-0" id={`inbox-card-${msg.id}`}>
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-1.5">
                        <div className="text-xs">
                          <strong>{msg.name}</strong> <span className="text-slate-400">&lt;{msg.email}&gt;</span>
                          <div className="text-slate-400 font-mono text-[10px] mt-0.5">Tgl: {new Date(msg.created_at).toLocaleString('id-ID')} | Tel: {msg.phone}</div>
                        </div>
                        <button 
                          onClick={async () => {
                            if (confirm("Hapus pesan ini?")) {
                              await deleteContactMessage(msg.id);
                              showFeedback("success", "Pesan berhasil dihapus.");
                              refreshData();
                            }
                          }}
                          className="text-xs text-rose-600 hover:text-rose-800 font-bold self-start md:self-auto cursor-pointer"
                        >
                          Hapus Pesan
                        </button>
                      </div>
                      <div className="text-xs font-bold text-slate-900">Perihal: {msg.subject}</div>
                      <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed bg-stone-50 p-3 rounded-lg border border-stone-100">{msg.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: TESTIMONIALS */}
        {adminTab === 'testimonials' && (
          <div className="space-y-6" id="testimonials-workspace">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Kelola Testimonial / Feedback</h4>
              <form onSubmit={saveTestimonial} className="grid grid-cols-1 md:grid-cols-2 gap-4" id="testimonial-adm-form">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nama *</label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.name}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Judul / Keterangan</label>
                  <input
                    type="text"
                    value={testimonialForm.title}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, title: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                  />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-700">Testimonial Text *</label>
                  <textarea
                    required
                    rows={3}
                    value={testimonialForm.text}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Rating *</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    required
                    value={testimonialForm.rating}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) || 5 })}
                    className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">URL Video *</label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.video_url}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, video_url: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">URL Thumbnail *</label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.thumbnail_url}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, thumbnail_url: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Unit RPS *</label>
                  {selectedRole === 'PPS' ? (
                    <select
                      value={testimonialForm.rps_unit}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, rps_unit: e.target.value as RpsUnit })}
                      className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-white"
                    >
                      <option value="PPS_Raharjo">PPS Raharjo</option>
                      <option value="Pamardi Siwi">Pamardi Siwi</option>
                      <option value="Mojomulyo">Mojomulyo</option>
                      <option value="Gondang">Gondang</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={selectedRole}
                      readOnly
                      className="w-full text-xs p-2.5 border border-slate-250 rounded-lg bg-slate-100"
                    />
                  )}
                </div>
                <div className="space-y-1 flex items-center gap-2">
                  <label className="text-xs font-bold text-slate-700">Aktif</label>
                  <input
                    type="checkbox"
                    checked={testimonialForm.is_active}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, is_active: e.target.checked })}
                    className="w-4 h-4"
                  />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <button type="submit" className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold rounded-lg">
                    {isEditingTestimonial ? "Update Testimonial" : "Tambah Testimonial"}
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Daftar Testimonial</h4>
              {displayedTestimonials.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">Tidak ada testimonial.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {displayedTestimonials.map((t) => (
                    <div key={t.id} className="border border-slate-200 rounded-xl p-4 space-y-3" id={`testimonial-card-${t.id}`}>
                      <div className="flex items-center gap-3">
                        <img src={t.thumbnail_url} alt={t.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1">
                          <div className="font-bold text-sm text-slate-900">{t.name}</div>
                          {t.title && <div className="text-xs text-slate-500">{t.title}</div>}
                          <div className="text-[10px] text-slate-400">Unit: {t.rps_unit} | {t.is_active ? "Aktif" : "Tidak Aktif"}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setTestimonialForm(t); setIsEditingTestimonial(true); }} className="text-xs text-sky-600 hover:underline font-semibold">Edit</button>
                        <button 
                          onClick={async () => {
                            if (confirm("Hapus testimonial ini?")) {
                              await deleteTestimonial(t.id);
                              showFeedback("success", "Testimonial dihapus.");
                              refreshData();
                            }
                          }}
                          className="text-xs text-rose-600 hover:underline font-semibold"
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
        )}
      </div>
    </div>
  );
}
