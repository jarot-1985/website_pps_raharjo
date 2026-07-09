import React from "react";
import type { AppSettings, News, Facility, Gallery, Achievement, Announcement, DocumentDownload, BudgetReport, FAQItem, Staff, Testimonial } from "../types";
import { PpsRpsView, BeritaView, GaleriView, BerandaView, ProfilView, PublikasiView, AnggaranView, LayananView, StatistikView, FAQView, KontakView, PendaftaranView } from "./views";

interface PublicPagesProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  settings: AppSettings;
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
}

export function PublicPages({
  activeTab, setActiveTab, settings, news, facilities, galleries, achievements, announcements, documents, budgets, faqs, staff, testimonials
}: PublicPagesProps) {

  switch (activeTab) {
    case "beranda":
      return <BerandaView settings={settings} news={news} facilities={facilities} galleries={galleries} testimonials={testimonials} setActiveTab={setActiveTab} />;
    case "profil":
      return <ProfilView settings={settings} staff={staff} achievements={achievements} />;
    case "ppsrps":
    case "pps_rps_pps_raharjo":
    case "pps_rps_pamardi_siwi":
    case "pps_rps_mojomulyo":
    case "pps_rps_gondang":
      return <PpsRpsView activeTab={activeTab} setActiveTab={setActiveTab} settings={settings} news={news} facilities={facilities} galleries={galleries} achievements={achievements} staff={staff} />;
    case "publikasi":
      return <PublikasiView announcements={announcements} documents={documents} />;
    case "ppid":
      return <PublikasiView announcements={announcements} documents={documents} defaultSubTab="ppid" />;
    case "berita":
      return <BeritaView news={news} settings={settings} />;
    case "galeri":
      return <GaleriView galleries={galleries} />;
    case "anggaran":
      return <AnggaranView budgets={budgets} />;
    case "layanan":
      return <LayananView />;
    case "statistik":
      return <StatistikView news={news} facilities={facilities} />;
    case "faq":
      return <FAQView faqs={faqs} />;
    case "kontak":
      return <KontakView settings={settings} />;
    case "pendaftaran":
      return <PendaftaranView />;
    default:
      if (activeTab.startsWith("pps_rps_")) {
        return <PpsRpsView activeTab={activeTab} setActiveTab={setActiveTab} settings={settings} news={news} facilities={facilities} galleries={galleries} achievements={achievements} staff={staff} />;
      }
      return <BerandaView settings={settings} news={news} facilities={facilities} galleries={galleries} testimonials={testimonials} setActiveTab={setActiveTab} />;
  }
}
