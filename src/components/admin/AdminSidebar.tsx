import React from "react";
import {
  LayoutDashboard, Settings, FileText, Banknote,
  HelpCircle, Users, Award, BookOpen, Download, Briefcase, MessageSquare, LogOut, ChevronRight
} from "lucide-react";

type AdminTabType = 'overview' | 'settings' | 'news' | 'facilities' | 'gallery' | 'achievements' | 'publikasi' | 'anggaran' | 'staff_faq' | 'registrasi' | 'inbox' | 'testimonials';

interface AdminSidebarProps {
  activeTab: AdminTabType;
  setActiveTab: (tab: AdminTabType) => void;
  selectedRole: string;
  onLogout: () => void;
  statusMessage: { type: string; text: string };
}

export function AdminSidebar({
  activeTab,
  setActiveTab,
  selectedRole,
  onLogout,
  statusMessage
}: AdminSidebarProps) {
  return (
    <aside className="md:col-span-3 bg-stone-50 text-slate-900 rounded-2xl border border-stone-200 p-6 h-fit sticky top-20 flex flex-col space-y-6 shadow-2xl" id="admin-sidebar">
      {/* Status Toast */}
      {statusMessage.text && (
        <div className={`text-xs font-bold uppercase tracking-widest px-4 py-3 rounded-xl text-center ${
          statusMessage.type === "success"
            ? "bg-emerald-100 text-emerald-800"
            : "bg-rose-100 text-rose-800"
        }`} id="admin-status-toast">
          {statusMessage.text}
        </div>
      )}

      {/* Nav Links */}
      <nav className="space-y-2" id="admin-sidebar-nav">
        <button
          onClick={() => setActiveTab('overview')}
          className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition ${
              activeTab === 'overview' ? "bg-sky-500 hover:bg-sky-400 text-white border-l-2 border-sky-300" : "text-slate-600 hover:bg-stone-100"
          }`}
          id="admin-nav-overview"
        >
          <LayoutDashboard className="w-4 h-4" /> Ringkasan
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition ${
            activeTab === 'settings' ? "bg-sky-500 hover:bg-sky-400 text-white border-l-2 border-sky-300" : "text-slate-600 hover:bg-stone-100"
          }`}
          id="admin-nav-settings"
        >
          <Settings className="w-4 h-4" /> Pengaturan Profil
        </button>

        <button
          onClick={() => setActiveTab('news')}
          className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition ${
              activeTab === 'news' ? "bg-sky-500 hover:bg-sky-400 text-white border-l-2 border-sky-300" : "text-slate-600 hover:bg-stone-100"
          }`}
          id="admin-nav-news"
        >
          <Award className="w-4 h-4" /> Berita Panti
        </button>

        <button
          onClick={() => setActiveTab('facilities')}
          className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition ${
              activeTab === 'facilities' ? "bg-sky-500 hover:bg-sky-400 text-white border-l-2 border-sky-300" : "text-slate-600 hover:bg-stone-100"
          }`}
          id="admin-nav-facilities"
        >
          <Briefcase className="w-4 h-4" /> Fasilitas Unit
        </button>

        <button
          onClick={() => setActiveTab('gallery')}
          className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition ${
              activeTab === 'gallery' ? "bg-sky-500 hover:bg-sky-400 text-white border-l-2 border-sky-300" : "text-slate-600 hover:bg-stone-100"
          }`}
          id="admin-nav-gallery"
        >
          <Download className="w-4 h-4" /> Galeri Media
        </button>

        <button
          onClick={() => setActiveTab('achievements')}
          className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition ${
              activeTab === 'achievements' ? "bg-sky-500 hover:bg-sky-400 text-white border-l-2 border-sky-300" : "text-slate-600 hover:bg-stone-100"
          }`}
          id="admin-nav-achievements"
        >
          <BookOpen className="w-4 h-4" /> Prestasi Penerima Manfaat
        </button>

        <div className="border-t border-stone-200 pt-2 mt-2">
          <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 px-4 py-2">LAYANAN</div>
          
          <button
            onClick={() => setActiveTab('publikasi')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition ${
              activeTab === 'publikasi' ? "bg-sky-500 hover:bg-sky-400 text-white border-l-2 border-sky-300" : "text-slate-600 hover:bg-stone-100"
            }`} id="admin-nav-publikasi"
          >
            <FileText className="w-4 h-4" /> Publikasi
          </button>

          <button
            onClick={() => setActiveTab('anggaran')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition ${
              activeTab === 'anggaran' ? "bg-sky-500 hover:bg-sky-400 text-white border-l-2 border-sky-300" : "text-slate-600 hover:bg-stone-100"
            }`} id="admin-nav-anggaran"
          >
            <Banknote className="w-4 h-4" /> Anggaran
          </button>
        </div>

        <div className="border-t border-stone-200 pt-2 mt-2">
          <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 px-4 py-2">INTERAKSI</div>
          <button
            onClick={() => setActiveTab('staff_faq')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition ${
              activeTab === 'staff_faq' ? "bg-sky-500 hover:bg-sky-400 text-white border-l-2 border-sky-300" : "text-slate-600 hover:bg-stone-100"
            }`} id="admin-nav-faq"
          >
            <HelpCircle className="w-4 h-4" /> Staff & FAQ
          </button>
          
          <button
            onClick={() => setActiveTab('registrasi')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition ${
              activeTab === 'registrasi' ? "bg-sky-500 hover:bg-sky-400 text-white border-l-2 border-sky-300" : "text-slate-600 hover:bg-stone-100"
            }`} id="admin-nav-registrasi"
          >
            <Users className="w-4 h-4" /> Registrasi & Aplikasi
          </button>

          <button
            onClick={() => setActiveTab('inbox')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition ${
              activeTab === 'inbox' ? "bg-sky-500 hover:bg-sky-400 text-white border-l-2 border-sky-300" : "text-slate-600 hover:bg-stone-100"
            }`} id="admin-nav-inbox"
          >
            <MessageSquare className="w-4 h-4" /> Kotak Pesan
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition ${
              activeTab === 'testimonials' ? "bg-sky-500 hover:bg-sky-400 text-white border-l-2 border-sky-300" : "text-slate-600 hover:bg-stone-100"
            }`} id="admin-nav-testimonials"
          >
            <BookOpen className="w-4 h-4" /> Testimonial / Feedback
          </button>
        </div>

        <button
          onClick={onLogout}
          className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-rose-300 hover:bg-rose-900/30 transition border-t border-stone-200 mt-4 pt-4" id="admin-nav-logout"
        >
          <LogOut className="w-4 h-4" /> Keluar
        </button>
      </nav>

      <div className="text-[10px] text-neutral-400 font-mono text-center pt-4 border-t border-neutral-200">
        Logged in as: <strong className="text-neutral-600">{selectedRole === 'PPS' ? 'Admin Utama' : `RPS ${selectedRole}`}</strong>
      </div>
    </aside>
  );
}
