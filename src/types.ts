export type RpsUnit = 'Pamardi Siwi' | 'Mojomulyo' | 'Gondang' | 'PPS' | 'PPS_Raharjo';

export interface UnitProfileSettings {
  institution_name?: string;
  institution_address?: string;
  map_url?: string;
  institution_phone?: string;
  institution_whatsapp?: string;
  institution_email?: string;
  social_facebook?: string;
  social_instagram?: string;
  social_twitter?: string;
  social_youtube?: string;
  social_linkedin?: string;
  social_tiktok?: string;
  deskripsi?: string;
  layanan_dasar?: string;
  layanan_bimbingan?: string;
  persyaratan_penerimaan?: string;
}

export interface AppSettings {
  show_beranda: boolean;
  show_profil: boolean;
  show_publikasi: boolean;
  show_anggaran: boolean;
  show_layanan: boolean;
  show_statistik: boolean;
  show_faq: boolean;
  show_kontak: boolean;
  show_pendaftaran: boolean;
  
  sambutan_nama: string;
  sambutan_teks: string;
  sambutan_foto: string;
  sambutan_video_url?: string;
  
  dasar_hukum: string[];
  sejarah_singkat: string;
  visi: string;
  misi: string[];
  struktur_organisasi_url: string;

  // Hero Section Customizer fields
  hero_title?: string;
  hero_subtitle?: string;
  hero_use_video?: boolean;
  hero_video_url?: string;
  hero_use_image?: boolean;
  hero_image_url?: string;
  hero_use_link?: boolean;
  hero_link_url?: string;
  hero_link_text?: string;
  // Contact & public profile
  institution_name?: string;
  institution_address?: string;
  institution_phone?: string;
  institution_whatsapp?: string;
  institution_email?: string;
  social_facebook?: string;
  social_instagram?: string;
  social_twitter?: string;
  social_youtube?: string;
  social_linkedin?: string;
  social_tiktok?: string;
  map_url?: string;
  deskripsi?: string;
  layanan_dasar?: string;
  layanan_bimbingan?: string;
  persyaratan_penerimaan?: string;
  unit_profiles?: Record<string, UnitProfileSettings>;
}

// Extended public profile/contact fields
export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  linkedin?: string;
}



export interface News {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  rps_unit: RpsUnit;
  is_featured: boolean;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  image_url: string;
  rps_unit: RpsUnit;
}

export interface Gallery {
  id: string;
  caption: string;
  image_url: string; // works as thumbnail for video too
  created_at: string;
  rps_unit: RpsUnit;
  type?: 'photo' | 'video';
  video_url?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  year: string;
  image_url: string;
  rps_unit: RpsUnit;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  file_url: string;
  is_active: boolean;
}

export interface DocumentDownload {
  id: string;
  title: string;
  category: string;
  file_url: string;
  created_at: string;
}

export interface BudgetReport {
  id: string;
  year: string;
  total_budget: number;
  realized_budget: number;
  breakdown: { category: string; budget: number; realized: number }[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  is_active: boolean;
}

export interface Staff {
  id: string;
  name: string;
  position: string;
  rps_unit: RpsUnit;
  photo_url: string;
  phone?: string;
  email?: string;
}

export interface BeneficiaryRegistration {
  id: string;
  name: string;
  birth_place: string;
  birth_date: string;
  gender: 'Laki-laki' | 'Perempuan';
  address: string;
  rps_target: RpsUnit;
  guardian_name: string;
  guardian_phone: string;
  email?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  created_at: string;
  ktp_url?: string;
  kk_url?: string;
  sktm_url?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  text: string;
  rating: number;
  video_url: string;
  thumbnail_url: string;
  rps_unit: RpsUnit;
  created_at: string;
  is_active: boolean;
}
