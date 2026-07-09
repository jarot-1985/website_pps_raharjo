import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Share2, Facebook, Twitter, Instagram, Link, BookOpen, Calendar, Users, Award, Home, Megaphone, GraduationCap, HeartHandshake, UserRound } from "lucide-react";
import type { AppSettings, News, Facility, Gallery, Testimonial } from "../../types";
import { unitDetails } from "./PublicPageHelpers";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import logoAll from "../../../assets/images/logoall.png";
import backHero from "../../../assets/images/back-hero.jpg";
import bingkaiVideo from "../../../assets/images/Bingkai_vidio.jpg";

export function BerandaView({
  settings, news, facilities, galleries, testimonials, setActiveTab
}: {
  settings: AppSettings; news: News[]; facilities: Facility[]; galleries: Gallery[]; testimonials: Testimonial[]; setActiveTab: (tab: string) => void
}) {
  const [activeUnit, setActiveUnit] = useState<'Semua' | 'Pamardi Siwi' | 'Mojomulyo' | 'Gondang' | 'PPS_Raharjo'>('Semua');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  // Local state for galleries supporting simulated photo/video roll captures
  const [localGalleries, setLocalGalleries] = useState<Gallery[]>(galleries);

  // Camera Roll Simulator States
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraMode, setCameraMode] = useState<'photo' | 'video'>('photo');
  const [selectedCameraUnit, setSelectedCameraUnit] = useState<'PPS_Raharjo' | 'Pamardi Siwi' | 'Mojomulyo' | 'Gondang'>('PPS_Raharjo');
  const [cameraPresetIndex, setCameraPresetIndex] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureProgress, setCaptureProgress] = useState(0);
  const [flashEffect, setFlashEffect] = useState(false);
  const [recentCapture, setRecentCapture] = useState<Gallery | null>(null);

  useEffect(() => {
    setLocalGalleries(galleries);
  }, [galleries]);

  const cameraPresets = [
    {
      title: "Kemandirian Kerajinan & Kreativitas",
      caption: "Sesi bimbingan kemandirian vokasional kerajinan tangan dan seni lukis kreatif bagi Penerima Manfaat PPS Raharjo.",
      image_url: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=600",
      video_url: "https://assets.mixkit.co/videos/preview/mixkit-hand-holding-a-glass-of-hot-water-43360-large.mp4",
      rps_unit: "PPS_Raharjo" as const
    },
    {
      title: "Bimbingan Motorik & Fungsional",
      caption: "Sesi terapi motorik halus, sensorik, dan bimbingan kepribadian bagi anak berkebutuhan khusus agar mandiri.",
      image_url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=600",
      video_url: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-an-artist-sculpting-clay-on-pottery-wheel-41908-large.mp4",
      rps_unit: "PPS_Raharjo" as const
    },
    {
      title: "Pemeriksaan Kesehatan Rutin",
      caption: "Pemeriksaan kesehatan fisik, senam santai, dan bimbingan rohani berkala lansia asuh di RPS Mojomulyo.",
      image_url: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600",
      video_url: "https://assets.mixkit.co/videos/preview/mixkit-elderly-couple-doing-healthy-exercises-in-their-backyard-43276-large.mp4",
      rps_unit: "Mojomulyo" as const
    },
    {
      title: "Pengasuhan & Bimbingan Belajar Anak",
      caption: "Keceriaan bimbingan belajar, pengasuhan, bermain edukatif, dan doa bersama anak asuh di RPS Pamardi Siwi.",
      image_url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=600",
      video_url: "https://assets.mixkit.co/videos/preview/mixkit-children-running-happily-in-a-sunny-park-42861-large.mp4",
      rps_unit: "Pamardi Siwi" as const
    },
    {
      title: "Vokasional Las & Woodworking",
      caption: "Pelatihan keterampilan kerja teknik las dan pertukangan kayu bagi rehabilitan PMKS di RPS Gondang.",
      image_url: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600",
      video_url: "https://assets.mixkit.co/videos/preview/mixkit-welder-working-on-a-steel-construction-in-workshop-43093-large.mp4",
      rps_unit: "Gondang" as const
    }
  ];

  // Filter presets based on the selected unit
  const activePresets = cameraPresets.filter(p => p.rps_unit === selectedCameraUnit);
  const currentPreset = activePresets[cameraPresetIndex] || activePresets[0] || cameraPresets[0];

  const handleCapture = () => {
    if (isCapturing) return;

    if (cameraMode === 'photo') {
      setIsCapturing(true);
      setFlashEffect(true);
      setTimeout(() => {
        setFlashEffect(false);
      }, 150);

      setTimeout(() => {
        const newItem: Gallery = {
          id: `local-cap-${Date.now()}`,
          caption: `[Roll Kamera Unit] ${currentPreset.caption}`,
          image_url: currentPreset.image_url,
          created_at: new Date().toISOString(),
          rps_unit: selectedCameraUnit,
          type: 'photo'
        };
        setLocalGalleries(prev => [newItem, ...prev]);
        setRecentCapture(newItem);
        setIsCapturing(false);
      }, 500);
    } else {
      // Video mode
      setIsCapturing(true);
      setCaptureProgress(0);
      const interval = setInterval(() => {
        setCaptureProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      setTimeout(() => {
        setFlashEffect(true);
        setTimeout(() => setFlashEffect(false), 150);

        const newItem: Gallery = {
          id: `local-cap-vid-${Date.now()}`,
          caption: `[Roll Kamera Unit] ${currentPreset.title}: ${currentPreset.caption}`,
          image_url: currentPreset.image_url,
          video_url: currentPreset.video_url,
          created_at: new Date().toISOString(),
          rps_unit: selectedCameraUnit,
          type: 'video'
        };
        setLocalGalleries(prev => [newItem, ...prev]);
        setRecentCapture(newItem);
        setIsCapturing(false);
        setCaptureProgress(0);
      }, 2200);
    }
  };

  const filteredNews = news
    .filter(n => activeUnit === 'Semua' || n.rps_unit === activeUnit)
    .slice(0, 3);

  const filteredFacilities = facilities
    .filter(f => activeUnit === 'Semua' || f.rps_unit === activeUnit)
    .slice(0, 3);

  const filteredGalleries = localGalleries
    .filter(g => activeUnit === 'Semua' || g.rps_unit === activeUnit);

  const photoGalleries = filteredGalleries.filter(g => g.type !== 'video').slice(0, 12);
  const videoGalleries = filteredGalleries.filter(g => g.type === 'video').slice(0, 12);

  const unitOrder = ["PPS_Raharjo", "Pamardi Siwi", "Mojomulyo", "Gondang"];
  const sortedGalleriesForRoll = [...galleries]
    .filter(g => g.image_url)
    .sort((a, b) => {
      const idxA = unitOrder.indexOf(a.rps_unit);
      const idxB = unitOrder.indexOf(b.rps_unit);
      const valA = idxA === -1 ? 99 : idxA;
      const valB = idxB === -1 ? 99 : idxB;
      return valA - valB;
    });

  // Safe checks for customizable Hero settings
  const heroTitle = settings.hero_title || "Pelayanan Sosial yang Manusiawi & Bermartabat.";

  const socialLinks = [
    { icon: Facebook, title: 'Facebook', url: settings?.social_facebook, className: 'text-blue-600' },
    { icon: Twitter, title: 'Twitter', url: settings?.social_twitter, className: 'text-sky-500' },
    { title: 'Instagram', url: settings?.social_instagram, className: 'text-pink-600', isInstagram: true },
    { title: 'YouTube', url: settings?.social_youtube, className: 'text-red-600', isSvg: true },
    { title: 'TikTok', url: (settings as any)?.social_tiktok, className: 'text-slate-900', isTikTok: true },
    { title: 'Tautan', url: settings?.social_linkedin, className: 'text-slate-700', isLink: true }
  ].filter((s) => !!s.url);
  const heroSubtitle = settings.hero_subtitle || "PPS Raharjo mengelola unit pelayanan rehabilitasi sosial khusus untuk memastikan setiap lapisan masyarakat mendapatkan hak hidup, perlindungan, bimbingan karakter, serta jaminan kesejahteraan yang layak secara transparan dan berkesinambungan.";
  const showVideo = settings.hero_use_video ?? false;
  const showImage = settings.hero_use_image ?? true;
  const showLink = settings.hero_use_link ?? true;
  const heroVideoUrl = settings.hero_video_url || "https://www.w3schools.com/html/mov_bbb.mp4";
  const heroImageUrl = settings.hero_image_url || "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800";
  const heroLinkUrl = settings.hero_link_url || "https://dinsos.jatengprov.go.id";
  const heroLinkText = settings.hero_link_text || "Kunjungi Website Dinsos Jateng";
  const heroHeadlineText = "Selamat Datang di PPS Raharjo";

  return (
    <motion.div
      id="beranda-page"
      className="space-y-16 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Combined Hero & Ticker Container to ensure tight snapping (Mepet / Nempel) */}
      <motion.div
        id="hero-and-ticker-integrated-wrapper"
        className="relative space-y-0 overflow-visible"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
      >
        <div className="relative mx-auto">
          {/* Glassmorphic/Transparent Widescreen Hero Section */}
          <motion.div
            className="relative bg-stone-50/90 border border-stone-100 backdrop-blur-md text-slate-900 rounded-t-3xl overflow-hidden shadow-xl pt-3 px-6 pb-0 md:pt-4 md:px-10 md:pb-0 lg:pt-6 lg:px-14 lg:pb-0 min-h-[320px] flex flex-col justify-between transition-all duration-500"
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          {/* Background video if video-type hero and active - glass/transparent overlay */}
          {showVideo && (
            <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
              <video
                  src={heroVideoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover filter animate-hero-zoom opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-transparent" />
            </div>
          )}

          {/* Alternatively background image if image-type hero and active (and not playing video) */}
          {!showVideo && showImage && (
            <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
              <img
                src={heroImageUrl}
                alt="Background Hero"
                className="absolute inset-0 w-full h-full object-cover filter animate-hero-zoom transition duration-1000 opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/18 to-transparent" />
            </div>
          )}

          <motion.div className="grid lg:grid-cols-12 gap-4 items-center relative z-10 w-full" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}>
            {/* Hero Narrative Content (Centered/Symmetric when full-width) */}
            <div className="lg:col-span-12 space-y-3 w-full lg:w-1/2">
              <div className="flex flex-col items-start gap-1">
                <img src={logoAll} alt="Logo All" className="h-28 md:h-32 w-auto object-contain" referrerPolicy="no-referrer" />
              </div>

              <motion.h1
                initial={{ opacity: 0, y: -24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="text-2xl md:text-3xl lg:text-4xl font-serif leading-[1.05] tracking-tight"
              >
                <span className="block bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 text-transparent bg-clip-text font-black uppercase tracking-tight">
                  PANTI PELAYANAN SOSIAL
                </span>
                <span className="block text-white font-black uppercase tracking-tight pt-1">
                  RAHARJO SRAGEN
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="font-sans text-xs md:text-sm leading-snug text-slate-300 w-full text-justify"
              >
                {heroSubtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.55, ease: "easeOut" }}
                whileHover={{ scale: 1.01 }}
                className="flex flex-row flex-wrap gap-3 pt-1 items-center"
              >
                <button
                  id="hero-btn-pendaftaran"
                  onClick={() => setActiveTab("pendaftaran")}
                  className="px-6 py-3 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 text-xs font-sans font-black uppercase tracking-widest transition cursor-pointer rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 min-w-0 animate-golden-glow"
                >
                  Pendaftaran
                </button>

                {showLink && (
                  <a
                    href={heroLinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border-2 border-amber-300/60 hover:border-amber-400 text-amber-300 hover:bg-amber-400/10 text-xs font-sans font-extrabold uppercase tracking-widest transition cursor-pointer rounded-xl active:scale-95 flex items-center gap-2 min-w-0 animate-golden-glow"
                  >
                    {heroLinkText} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Sequential Photo Roll at bottom of Hero - Tight against bottom */}
          <div className="mt-6 w-full z-10 pb-0">
            <div className="mb-2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                <h4 className="text-[10px] font-sans font-black uppercase tracking-widest text-amber-300">
                  Dokumentasi :
                </h4>
              </div>
              <span className="text-[9px] text-slate-400 font-sans font-semibold">Geser &rarr;</span>
            </div>

            <div className="relative flex overflow-hidden w-full pb-3 pt-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <div className="flex animate-marquee pause-on-hover whitespace-nowrap min-w-max items-center gap-4">
                {(
                  sortedGalleriesForRoll.length > 0
                    ? [...sortedGalleriesForRoll, ...sortedGalleriesForRoll]
                    : [
                        { image_url: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600", caption: "Terapi Kemandirian & Keterampilan Disabilitas", rps_unit: "PPS_Raharjo" },
                        { image_url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600", caption: "Pengasuhan & Bimbingan Mental Kreatif Anak", rps_unit: "Pamardi Siwi" },
                        { image_url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=600", caption: "Bimbingan Spiritual & Terapi Kesehatan Lansia", rps_unit: "Mojomulyo" },
                        { image_url: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=600", caption: "Pelatihan Keterampilan Kerja Nyata PMKS", rps_unit: "Gondang" },
                        { image_url: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600", caption: "Terapi Kemandirian & Keterampilan Disabilitas", rps_unit: "PPS_Raharjo" },
                        { image_url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600", caption: "Pengasuhan & Bimbingan Mental Kreatif Anak", rps_unit: "Pamardi Siwi" },
                        { image_url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=600", caption: "Bimbingan Spiritual & Terapi Kesehatan Lansia", rps_unit: "Mojomulyo" },
                        { image_url: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=600", caption: "Pelatihan Keterampilan Kerja Nyata PMKS", rps_unit: "Gondang" }
                      ]
                ).map((g, idx) => {
                  const unitLabels: Record<string, string> = {
                    "PPS_Raharjo": "PPS Raharjo (Disabilitas Intelektual)",
                    "Pamardi Siwi": "RPS Pamardi Siwi (Anak)",
                    "Mojomulyo": "RPS Mojomulyo (Lansia)",
                    "Gondang": "RPS Gondang (PMKS)"
                  };
                  const badgeColors: Record<string, string> = {
                    "PPS_Raharjo": "bg-violet-600/90 text-white",
                    "Pamardi Siwi": "bg-sky-600/90 text-white",
                    "Mojomulyo": "bg-emerald-600/90 text-white",
                    "Gondang": "bg-rose-600/90 text-white"
                  };
                  return (
                    <div
                      key={`${g.image_url}-${idx}`}
                      className="shrink-0 w-56 aspect-[4/3] bg-zinc-950 overflow-hidden relative group shadow-2xl cursor-pointer transition-all duration-300 hover:scale-[1.03] border-y-[12px] border-zinc-950 rounded-xl"
                      onClick={() => setSelectedPhoto(g.image_url)}
                    >
                      {/* Sprocket Holes Top */}
                      <div className="absolute -top-[10px] left-0 right-0 flex justify-around px-1 z-20 pointer-events-none">
                        {[...Array(7)].map((_, i) => (
                          <span key={i} className="w-2.5 h-1.5 bg-neutral-800 rounded-sm shadow-inner border border-white/5" />
                        ))}
                      </div>

                      {/* Sprocket Holes Bottom */}
                      <div className="absolute -bottom-[10px] left-0 right-0 flex justify-around px-1 z-20 pointer-events-none">
                        {[...Array(7)].map((_, i) => (
                          <span key={i} className="w-2.5 h-1.5 bg-neutral-800 rounded-sm shadow-inner border border-white/5" />
                        ))}
                      </div>

                      {/* Film Frame Content */}
                      <div className="relative w-full h-full overflow-hidden border-x border-zinc-900 bg-neutral-900">
                        <img
                          src={g.image_url}
                          alt={g.caption}
                          className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent group-hover:from-black/18 transition duration-300" />
                        <div className="absolute top-2 left-2">
                          <span className={`text-[8px] font-sans font-black uppercase tracking-widest px-2 py-0.5 rounded-md shadow-md whitespace-normal ${badgeColors[g.rps_unit] || 'bg-slate-500'}`}>
                            {unitLabels[g.rps_unit] || g.rps_unit}
                          </span>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 text-left">
                          <p className="text-white text-[10px] font-bold font-sans line-clamp-2 leading-tight text-justify whitespace-normal">
                            {g.caption}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </motion.div>
        {(() => {
          const visiTeks = settings.visi || "Menjadi pusat layanan rehabilitasi sosial yang bermartabat, inklusif, dan berdaya guna untuk masyarakat rentan.";
          const misiTeks = (settings.misi && settings.misi.length > 0)
            ? settings.misi.join(" • ")
            : "Menyelenggarakan pelayanan dan rehabilitasi sosial dasar yang prima • Meningkatkan kualitas SDM pengelola • Membangun jaringan kemitraan";
          const runningTickerContent = `VISI: ${visiTeks} ••• MISI: ${misiTeks}`;
          return (
            <div className="bg-black border border-slate-900 rounded-b-3xl overflow-hidden flex items-center h-12 shadow-sm relative z-10" id="visi-misi-ticker">
              <div className="bg-gradient-to-r from-[#2D6A4F] to-[#40916C] text-white text-sm font-sans font-black uppercase tracking-widest px-6 min-w-[150px] h-full flex items-center shrink-0 shadow-lg relative z-20">
                <span className="animate-pulse mr-2 font-bold text-lg leading-none font-sans">📢</span> VISI & MISI
              </div>
              <div className="flex-1 overflow-hidden relative h-full flex items-center">
                <div className="font-sans text-sm text-white font-bold animate-marquee-ticker whitespace-nowrap" style={{ animation: 'marquee 80s linear infinite' }}>
                  <div className="inline-block pr-16">{runningTickerContent}</div>
                  <div className="inline-block">{runningTickerContent}</div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </motion.div>

      {/* Separated Sambutan Section (Styled like the uploaded image) */}
      <section className="py-10 px-8 bg-white rounded-3xl border border-slate-100 shadow-xs relative overflow-hidden" id="sambutan-separated-section">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Video Player with visual corner frames */}
          <div className="lg:col-span-5 relative flex justify-center items-center py-4">
            {/* Visual corner frames */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#2D6A4F]/60 rounded-tl-lg pointer-events-none z-0" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#2D6A4F]/60 rounded-tr-lg pointer-events-none z-0" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#2D6A4F]/60 rounded-bl-lg pointer-events-none z-0" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#2D6A4F]/60 rounded-br-lg pointer-events-none z-0" />

            <div className="w-full aspect-[4/3] p-2 rounded-3xl shadow-2xl border border-slate-200/40 relative z-10 flex flex-col items-center justify-center text-white bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bingkaiVideo})` }}>
              <div className="w-full h-full rounded-2xl overflow-hidden bg-neutral-900 relative">
                {settings.sambutan_video_url ? (
                  settings.sambutan_video_url.includes("youtube.com") || settings.sambutan_video_url.includes("youtu.be") ? (
                    <iframe
                      src={settings.sambutan_video_url.replace("watch?v=", "embed/").split("&")[0]}
                      title="Video Sambutan"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={settings.sambutan_video_url}
                      controls
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <div className="p-8 text-center space-y-3 h-full flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-amber-400 border border-slate-700">
                      <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-200">Video tidak tersedia</p>
                      <p className="text-[10px] text-slate-400">Silakan konfigurasikan URL video sambutan di Dashboard Admin.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Sambutan text, Quote, and Avatar */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-md bg-[#2D6A4F] text-white text-[10px] font-bold font-sans tracking-wider uppercase mb-2">
                SAMBUTAN KEPALA PANTI
              </span>
              <h3 className="text-3xl font-serif font-black text-[#1E3A8A] tracking-tight leading-tight">
                Selamat Datang di PPS Raharjo
              </h3>
            </div>

            <div className="relative">
              {/* Giant quote symbol */}
              <span className="absolute -top-7 -left-5 text-7xl font-serif text-[#2D6A4F]/20 select-none">“</span>
              <div className="border-l-4 border-[#2D6A4F]/30 pl-6 py-1">
                <p className="italic text-slate-600 font-sans leading-relaxed text-sm text-justify">
                  "{settings.sambutan_teks || "Selamat datang di website resmi Panti Pelayanan Sosial (PPS) Raharjo."}"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 pt-4">
              <div className="relative shrink-0">
                <img
                  src={settings.sambutan_foto || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300"}
                  alt={settings.sambutan_nama}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white shadow-xl ring-4 ring-slate-100/85 shrink-0 transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="space-y-1">
                <h5 className="font-sans text-sm md:text-base font-black text-[#1E3A8A] leading-snug">
                  {settings.sambutan_nama || "Drs. Raharjo Widodo, M.Si"}
                </h5>
                <p className="text-xs text-slate-500 font-sans font-semibold">
                  Kepala PPS Raharjo
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4 Unit Cards Grid (Adaptive layout) */}
      <motion.section className="space-y-6" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: "easeOut", delay: 0.2 }}>
        <div className="text-center space-y-2">
          <span className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            PPS dan Rumah Pelayanan Sosial
          </span>
          <h2 className="text-3xl font-serif font-black tracking-tight bg-gradient-to-r from-sky-950 via-slate-800 to-sky-900 text-transparent bg-clip-text">
            Unit Pelayanan Rehabilitasi Sosial
          </h2>
          <p className="text-xs font-sans text-slate-500 max-w-xl mx-auto uppercase tracking-wider">
            Menyelenggarakan Pemenuhan Kebutuhan Dasar dan Bimbingan Rehabilitasi Sosial di dalam panti berdasarkan jenis layanan sesuai Pergub. Jawa Tengah No. .... Tahun ....
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(
            ["PPS_Raharjo", "Pamardi Siwi", "Mojomulyo", "Gondang"] as const
          ).map((unit, index) => {
            const detail = unitDetails[unit];
            const unitDisplayName = unit === 'PPS_Raharjo' ? 'PPS Raharjo' : `RPS ${unit}`;
            return (
              <motion.div
                key={unit}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
                whileHover={{ y: -5 }}
                className={`p-6 border flex flex-col justify-between rounded-2xl bg-gradient-to-b hover:shadow-lg transition duration-300 ${detail.bgClass}`}
                id={`unit-card-${unit.replace(/\s+/g, '-').toLowerCase()}`}
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <span className={`text-[10px] font-sans font-extrabold px-2.5 py-0.5 rounded-full ${detail.tagBg}`}>
                      {unit === 'PPS_Raharjo' ? 'PANTI PELAYANAN SOSIAL' : 'RUMAH PELAYANAN SOSIAL'}
                    </span>
                    <div className={`w-8 h-[2px] mt-2.5 ${detail.lineClass}`}></div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-serif font-bold leading-tight">{unitDisplayName}</h3>
                    <p className="font-sans text-[10px] uppercase tracking-wider font-extrabold opacity-80">
                      {detail.tag}
                    </p>
                  </div>
                  <p className="font-sans text-xs leading-relaxed opacity-90 text-justify">
                    {detail.desc}
                  </p>
                  <div className="space-y-2 pt-2">
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-700">Fasilitas </p>
                    <p className="text-[11px] leading-snug text-slate-700">
                      Makan minum, pakaian, asrama, pelayanan kesehatan, bimbingan mental, sosial, spiritual, keterampilan, kesenian, terapi.
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      Persyaratan: Lihat (
                      <button
                        type="button"
                        onClick={() => setActiveTab('pendaftaran')}
                        className="underline decoration-amber-400 decoration-2 hover:text-amber-600"
                      >
                        PENDAFTARAN
                      </button>
                      ).
                    </p>
                  </div>
                </div>
                <div className="pt-6 border-t border-neutral-200/50 mt-6 flex justify-end items-center">
                  <button
                    onClick={() => {
                      setActiveUnit(unit);
                      const el = document.getElementById("filter-section");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`text-xs font-extrabold uppercase tracking-widest flex items-center gap-1 cursor-pointer hover:underline ${detail.btnClass}`}
                  >
                    Lihat selengkapnya
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Interactive Tabs for News & Facilities */}
      <motion.section className="space-y-8 pt-4 scroll-mt-24" id="filter-section" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: "easeOut", delay: 0.25 }}>
        <div className="flex flex-col gap-4 border-b border-amber-100 pb-4">
          <div>
            <h2 className="text-3xl font-serif text-slate-900 font-bold tracking-tight bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 text-transparent bg-clip-text">
              Barita dan Informasi 
            </h2>
            <p className="text-xs font-sans text-slate-500 uppercase tracking-wider mt-2">Pilih unit kerja untuk Filter Berita dan Informasi.</p>
          </div>
          <div className="flex flex-nowrap gap-4 overflow-x-auto pb-2 pl-5">
            {([
              { key: 'Semua', label: 'Semua Unit', icon: Home },
              { key: 'PPS_Raharjo', label: 'PPS Raharjo', icon: Megaphone },
              { key: 'Pamardi Siwi', label: 'RPS Pamardi Siwi', icon: GraduationCap },
              { key: 'Mojomulyo', label: 'RPS Mojomulyo', icon: UserRound },
              { key: 'Gondang', label: 'RPS Gondang', icon: Users }
            ] as const).map((unit) => {
              const activeClasses: Record<string, string> = {
                'Semua': 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-amber-400 shadow-md',
                'Pamardi Siwi': 'bg-gradient-to-r from-sky-100 to-blue-100 text-sky-800 border-sky-400 shadow-md',
                'Mojomulyo': 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-emerald-400 shadow-md',
                'Gondang': 'bg-gradient-to-r from-rose-100 to-pink-100 text-rose-800 border-rose-400 shadow-md',
                'PPS_Raharjo': 'bg-gradient-to-r from-violet-100 to-purple-100 text-violet-800 border-violet-400 shadow-md'
              };
              const hoverClasses: Record<string, string> = {
                'Semua': 'hover:border-amber-500',
                'Pamardi Siwi': 'hover:border-sky-500',
                'Mojomulyo': 'hover:border-emerald-500',
                'Gondang': 'hover:border-rose-500',
                'PPS_Raharjo': 'hover:border-violet-500'
              };
              const Icon = unit.icon;
              return (
                <button
                  key={unit.key}
                  onClick={() => setActiveUnit(unit.key)}
                  className={`flex items-center gap-3 px-6 py-4 text-xs font-sans font-bold uppercase tracking-widest transition cursor-pointer border-2 ${activeUnit === unit.key
                    ? activeClasses[unit.key]
                    : `bg-white text-slate-600 border-slate-200 ${hoverClasses[unit.key]}`
                  } animate-golden-glow`}
                  style={{ borderRadius: '0.375rem', transform: 'skewX(-10deg)' }}
                  id={`filter-tab-${unit.key.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <span style={{ transform: 'skewX(10deg)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                    <Icon className="w-6 h-6" />
                    {unit.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* News Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2 bg-gradient-to-r from-slate-900 to-orange-600 text-transparent bg-clip-text">
              <BookOpen className="w-4 h-4 text-orange-500 shrink-0" /> Berita & Kegiatan Terbaru ({activeUnit === 'Semua' ? 'Semua' : activeUnit === 'PPS_Raharjo' ? 'PPS Raharjo' : `RPS ${activeUnit}`})
            </h3>
          </div>

          {filteredNews.length === 0 ? (
            <div className="text-center p-8 bg-amber-50/40 rounded-2xl border border-amber-200">
              <p className="text-amber-700 font-serif italic text-sm">Belum ada berita yang diterbitkan untuk unit ini.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {filteredNews.map((n, index) => (
                <motion.article
                  key={n.id}
                  className="bg-white rounded-2xl border border-amber-100 overflow-hidden hover:border-amber-300 hover:shadow-md transition duration-200"
                  id={`news-item-${n.id}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
                  whileHover={{ y: -4 }}
                >
                  <div className="aspect-video relative overflow-hidden bg-slate-50 border-b border-amber-100">
                    <img src={n.image_url} alt={n.title} className="w-full h-full object-cover transition duration-500" referrerPolicy="no-referrer" />
                    <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-white text-[9px] font-extrabold uppercase tracking-widest ${(unitDetails as any)[n.rps_unit]?.tagBg || 'bg-orange-500'}`}>
                      {n.rps_unit === 'PPS_Raharjo' ? 'PPS Raharjo' : `RPS ${n.rps_unit}`}
                    </span>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-1.5 text-[10px] text-orange-600 font-extrabold uppercase tracking-wider">
                      <Calendar className="w-3 h-3" /> {new Date(n.created_at).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                    </div>
                    <h4 className="font-serif text-slate-900 text-lg font-bold leading-snug line-clamp-2 hover:text-orange-600 transition cursor-pointer">
                      {n.title}
                    </h4>
                    <p className="text-slate-600 text-xs font-sans line-clamp-3 leading-relaxed text-justify">
                      {n.content}
                    </p>
                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Bagikan</span>
                      <div className="flex gap-2">
                        {socialLinks.length === 0 ? (
                          <span className="text-[9px] text-slate-400">Tidak ada tautan sosial</span>
                        ) : (
                          socialLinks.map((s, idx) => {
                            if (s.isSvg) {
                              return (
                                <a key={idx} href={s.url} target="_blank" rel="noreferrer" className={`${s.className} hover:scale-110 transition drop-shadow-sm`} title={s.title}>
                                  <YoutubeIcon className="w-5 h-5" />
                                </a>
                              );
                            }
                            if (s.isTikTok) {
                              return (
                                <a key={idx} href={s.url} target="_blank" rel="noreferrer" className={`${s.className} hover:scale-110 transition drop-shadow-sm`} title={s.title}>
                                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.61-.6 3.16-1.66 4.31-1.07 1.15-2.61 1.83-4.22 1.95-1.61.12-3.23-.27-4.57-1.1-1.34-.84-2.34-2.15-2.82-3.66-.48-1.51-.4-3.13.24-4.57.64-1.44 1.81-2.58 3.25-3.17 1.44-.59 3.05-.6 4.49-.03v4.09c-.71-.24-1.5-.23-2.19.05-.68.27-1.25.79-1.58 1.42-.33.64-.39 1.39-.17 2.06.22.68.73 1.25 1.37 1.57.65.31 1.41.34 2.07.1.67-.24 1.21-.77 1.51-1.41.3-.64.35-1.39.14-2.07V.02z" />
                                  </svg>
                                </a>
                              );
                            }
                            if (s.isInstagram) {
                              return (
                                <a key={idx} href={s.url} target="_blank" rel="noreferrer" className={`${s.className} hover:scale-110 transition drop-shadow-sm`} title={s.title}>
                                  <Instagram className="w-5 h-5" />
                                </a>
                              );
                            }
                            if (s.isLink) {
                              return (
                                <a key={idx} href={s.url} target="_blank" rel="noreferrer" className={`${s.className} hover:scale-110 transition drop-shadow-sm`} title={s.title}>
                                  <Link className="w-5 h-5" />
                                </a>
                              );
                            }
                            const Icon = s.icon as any;
                            return (
                              <a key={idx} href={s.url} target="_blank" rel="noreferrer" className={`${s.className} hover:scale-110 transition drop-shadow-sm`} title={s.title}>
                                <Icon className="w-5 h-5 fill-current" />
                              </a>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>

        {/* Facilities Section */}
        <div className="relative space-y-6 pt-4">
          <div 
            className="absolute bottom-0 left-0 right-0 h-3/4 bg-cover bg-center bg-no-repeat opacity-10"
            style={{ backgroundImage: `url(${backHero})` }}
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2 bg-gradient-to-r from-slate-900 to-emerald-600 text-transparent bg-clip-text">
                <Users className="w-4 h-4 text-emerald-500 shrink-0" /> Fasilitas Pendukung Penunjang
              </h3>
              <button
                onClick={() => setActiveTab('fasilitas')}
                className="text-xs font-extrabold uppercase tracking-widest flex items-center gap-1 text-sky-600 hover:text-sky-800 hover:underline"
              >
                Lihat Selengkapnya <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {filteredFacilities.length === 0 ? (
              <div className="text-center p-8 bg-amber-50/40 rounded-2xl border border-amber-200">
                <p className="text-amber-700 font-serif italic text-sm">Belum ada fasilitas yang diinputkan untuk unit ini.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredFacilities.map((f, index) => (
                    <motion.div
                      key={f.id}
                      className="bg-white rounded-2xl border border-amber-100 p-4 hover:border-amber-300 hover:shadow-md transition duration-200 flex flex-col gap-4"
                      id={`fac-item-${f.id}`}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
                      whileHover={{ y: -4 }}
                    >
                      <img src={f.image_url} alt={f.name} className="w-full h-40 rounded-xl object-cover bg-slate-50 shrink-0 border border-amber-100" referrerPolicy="no-referrer" />
                      <div className="space-y-1">
                        <span className="text-[9px] font-extrabold text-emerald-600 font-mono tracking-widest uppercase block">
                          {f.rps_unit === 'PPS_Raharjo' ? 'PPS Raharjo' : `RPS ${f.rps_unit}`}
                        </span>
                        <h5 className="font-serif text-slate-900 text-sm font-bold">{f.name}</h5>
                        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 text-justify">{f.description}</p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Testimonial Section */}
        <motion.section className="space-y-8 pt-12 pb-8 overflow-hidden rounded-3xl bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: `url(${backHero})` }} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: "easeOut", delay: 0.3 }}>
          {/* Light overlay for readability */}
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] rounded-3xl" />
          <div className="text-center space-y-2 relative z-10">
            <h2 className="text-4xl font-serif font-black tracking-tight text-slate-900 drop-shadow-sm">
              TESTIMONIAL
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-slate-900 to-violet-600 mx-auto" />
          </div>

          {testimonials.filter(t => t.is_active).length === 0 ? (
            <div className="text-center p-8 bg-white/10 rounded-2xl border border-slate-200 relative z-10">
              <p className="text-slate-600 font-serif italic text-sm">Belum ada testimoni yang ditampilkan.</p>
            </div>
          ) : (
            <div className="relative overflow-hidden z-10">
              <div className="flex gap-8 animate-testimonial-marquee pause-on-hover">
                {/* First set of testimonials */}
                {[...testimonials.filter(t => t.is_active), ...testimonials.filter(t => t.is_active)].map((testimonial, index) => (
                  <motion.div
                    key={`${testimonial.id}-${index}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
                    whileHover={{ y: -5 }}
                    className="min-w-[320px] md:min-w-[400px] rounded-2xl overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer p-8 text-center bg-cover bg-center bg-no-repeat relative"
                    style={{ backgroundImage: `url(${backHero})` }}
                    onClick={() => setSelectedTestimonial(testimonial)}
                  >
                    {/* Dark overlay to keep text readable */}
                    <div className="absolute inset-0 bg-sky-700/55 backdrop-blur-[2px] rounded-2xl" />
                    <div className="relative z-10">
                      {/* Thumbnail Lingkaran */}
                      <div className="mx-auto w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                        <img src={testimonial.thumbnail_url} alt={testimonial.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      
                      {/* Unit Tag */}
                      <div className="mb-4">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.3em] ${(unitDetails as any)[testimonial.rps_unit]?.tagBg || 'bg-violet-500'} text-white`}>
                          {testimonial.rps_unit === 'PPS_Raharjo' ? 'PPS Raharjo' : `RPS ${testimonial.rps_unit}`}
                        </span>
                      </div>
                      
                      {/* Nama */}
                      <h4 className="font-serif text-white text-xl font-bold mb-2 uppercase tracking-wider drop-shadow-sm">
                        {testimonial.name.toUpperCase()}
                      </h4>
                      
                      {/* Rating Bintang */}
                      <div className="flex justify-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-6 h-6 fill-current ${i < testimonial.rating ? (testimonial.rating === 5 ? 'text-amber-500' : testimonial.rating >=4 ? 'text-yellow-500' : 'text-red-500') : 'text-slate-300'}`} viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                      
                      {/* Testimonial Text */}
                      <p className="text-slate-200 text-xs leading-relaxed text-justify font-sans">
                        "{testimonial.text}"
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.section>

        {/* Separated Gallery Sections: PHOTOS and VIDEOS (baris Di pisahkan) */}
        <div className="space-y-12 pt-8 border-t border-amber-100">

          {/* PHOTO ROW */}
          <div className="relative space-y-6">
            <div 
              className="absolute bottom-0 left-0 right-0 h-3/4 bg-cover bg-center bg-no-repeat opacity-10"
              style={{ backgroundImage: `url(${backHero})` }}
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2 bg-gradient-to-r from-slate-900 to-sky-600 text-transparent bg-clip-text">
                  <Award className="w-4 h-4 text-sky-500 shrink-0" /> Galeri Dokumentasi Foto ({activeUnit === 'Semua' ? 'Semua' : activeUnit === 'PPS_Raharjo' ? 'PPS Raharjo' : `RPS ${activeUnit}`})
                </h3>
                <button
                  onClick={() => setActiveTab('galeri')}
                  className="text-xs font-extrabold uppercase tracking-widest flex items-center gap-1 text-sky-600 hover:text-sky-800 hover:underline"
                >
                  Lihat Selengkapnya <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {photoGalleries.length === 0 ? (
                <div className="text-center p-8 bg-amber-50/40 rounded-2xl border border-amber-200">
                  <p className="text-amber-700 font-serif italic text-sm">Belum ada foto galeri untuk unit ini.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4" style={{ maxHeight: 'calc((100% + 1rem) * 2)', overflow: 'hidden' }}>
                  {photoGalleries.slice(0, 12).map((g, idx) => {
                    return (
                      <motion.div
                        key={g.id}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.45, delay: idx * 0.05, ease: "easeOut" }}
                        whileHover={{ scale: 1.03 }}
                        onClick={() => setSelectedPhoto(g.image_url)}
                        className="group relative aspect-square bg-white border-[6px] border-white rounded-2xl overflow-hidden shadow-lg cursor-zoom-in"
                        id={`gallery-item-${g.id}`}
                      >
                        <img src={g.image_url} alt={g.caption} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent transition duration-300 p-3 flex flex-col justify-end text-white">
                          <p className="text-[9px] font-extrabold text-sky-300 uppercase tracking-widest mb-0.5">
                            {g.rps_unit === 'PPS_Raharjo' ? 'PPS Raharjo' : `RPS ${g.rps_unit}`}
                          </p>
                          <p className="text-[10px] font-sans font-medium line-clamp-2 leading-tight">{g.caption}</p>
                          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/20">
                            <span className="text-[8px] text-slate-800 font-bold uppercase tracking-widest"><Share2 className="w-3 h-3 inline mr-1" /></span>
                            <a href="#" onClick={(e) => e.stopPropagation()} className="text-blue-600 hover:scale-110 transition drop-shadow-sm" title="Facebook"><Facebook className="w-5 h-5 fill-current" /></a>
                            <a href="#" onClick={(e) => e.stopPropagation()} className="text-sky-500 hover:scale-110 transition drop-shadow-sm" title="Twitter"><Twitter className="w-5 h-5 fill-current" /></a>
                            <a href="#" onClick={(e) => e.stopPropagation()} className="text-pink-600 hover:scale-110 transition drop-shadow-sm" title="Instagram"><Instagram className="w-5 h-5" /></a>
                            <a href="#" onClick={(e) => e.stopPropagation()} className="text-slate-900 hover:scale-110 transition drop-shadow-sm" title="TikTok">
                              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.61-.6 3.16-1.66 4.31-1.07 1.15-2.61 1.83-4.22 1.95-1.61.12-3.23-.27-4.57-1.1-1.34-.84-2.34-2.15-2.82-3.66-.48-1.51-.4-3.13.24-4.57.64-1.44 1.81-2.58 3.25-3.17 1.44-.59 3.05-.6 4.49-.03v4.09c-.71-.24-1.5-.23-2.19.05-.68.27-1.25.79-1.58 1.42-.33.64-.39 1.39-.17 2.06.22.68.73 1.25 1.37 1.57.65.31 1.41.34 2.07.1.67-.24 1.21-.77 1.51-1.41.3-.64.35-1.39.14-2.07V.02z" /></svg>
                            </a>
                            <a href="#" onClick={(e) => e.stopPropagation()} className="text-slate-700 hover:scale-110 transition drop-shadow-sm" title="Tautan"><Link className="w-5 h-5" /></a>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* VIDEO ROW */}
          <div className="relative space-y-6 pt-4">
            <div 
              className="absolute bottom-0 left-0 right-0 h-3/4 bg-cover bg-center bg-no-repeat opacity-10"
              style={{ backgroundImage: `url(${backHero})` }}
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2 bg-gradient-to-r from-slate-900 to-violet-600 text-transparent bg-clip-text">
                  <Award className="w-4 h-4 text-violet-500 shrink-0" /> Galeri Dokumentasi Video ({activeUnit === 'Semua' ? 'Semua' : activeUnit === 'PPS_Raharjo' ? 'PPS Raharjo' : `RPS ${activeUnit}`})
                </h3>
                <button
                  onClick={() => setActiveTab('galeri')}
                  className="text-xs font-extrabold uppercase tracking-widest flex items-center gap-1 text-violet-600 hover:text-violet-800 hover:underline"
                >
                  Lihat Selengkapnya <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {videoGalleries.length === 0 ? (
                <div className="text-center p-8 bg-amber-50/40 rounded-2xl border border-amber-200">
                  <p className="text-amber-700 font-serif italic text-sm">Belum ada video galeri untuk unit ini.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {videoGalleries.slice(0, 6).map((g, idx) => {
                    const playBgColors: Record<string, string> = {
                      "PPS_Raharjo": "bg-violet-600/90 group-hover:bg-violet-500",
                      "Pamardi Siwi": "bg-sky-600/90 group-hover:bg-sky-500",
                      "Mojomulyo": "bg-emerald-600/90 group-hover:bg-emerald-500",
                      "Gondang": "bg-rose-600/90 group-hover:bg-rose-500"
                    };
                    const badgeColors: Record<string, string> = {
                      "PPS_Raharjo": "bg-violet-600",
                      "Pamardi Siwi": "bg-sky-600",
                      "Mojomulyo": "bg-emerald-600",
                      "Gondang": "bg-rose-600"
                    };
                    return (
                      <motion.div
                        key={g.id}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.45, delay: idx * 0.05, ease: "easeOut" }}
                        whileHover={{ y: -4 }}
                        onClick={() => setSelectedVideo(g.video_url || "https://www.w3schools.com/html/mov_bbb.mp4")}
                        className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-violet-300 transition duration-300 shadow-md cursor-pointer flex flex-col"
                        id={`gallery-video-item-${g.id}`}
                      >
                        <div className="aspect-video relative bg-stone-50 flex items-center justify-center overflow-hidden">
                          <img src={g.image_url} alt={g.caption} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/12 to-transparent group-hover:from-black/10 transition duration-300" />

                          {/* Pulsing play icon */}
                          <div className={`absolute w-12 h-12 rounded-full ${playBgColors[g.rps_unit] || 'bg-violet-600'} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300`}>
                            <svg className="w-6 h-6 fill-current ml-0.5" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>

                          <span className={`absolute top-3 left-3 px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-widest text-white ${badgeColors[g.rps_unit] || 'bg-violet-600'} rounded-md`}>
                            {g.rps_unit === 'PPS_Raharjo' ? 'PPS Raharjo' : `RPS ${g.rps_unit}`}
                          </span>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <p className="text-slate-800 text-xs font-semibold leading-snug font-sans group-hover:text-indigo-600 transition">
                            {g.caption}
                          </p>
                          <div>
                            <span className="text-[10px] font-mono text-slate-400 mt-2 block uppercase tracking-wider mb-2">KLIK UNTUK MEMUTAR VIDEO</span>
                            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                              <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest"><Share2 className="w-3 h-3 inline mr-1" /></span>
                              <a href="#" onClick={(e) => { e.stopPropagation(); e.preventDefault(); }} className="text-blue-600 hover:scale-110 transition drop-shadow-sm" title="Facebook"><Facebook className="w-5 h-5 fill-current" /></a>
                              <a href="#" onClick={(e) => { e.stopPropagation(); e.preventDefault(); }} className="text-sky-500 hover:scale-110 transition drop-shadow-sm" title="Twitter"><Twitter className="w-5 h-5 fill-current" /></a>
                              <a href="#" onClick={(e) => { e.stopPropagation(); e.preventDefault(); }} className="text-pink-600 hover:scale-110 transition drop-shadow-sm" title="Instagram"><Instagram className="w-5 h-5" /></a>
                              <a href="#" onClick={(e) => { e.stopPropagation(); e.preventDefault(); }} className="text-slate-900 hover:scale-110 transition drop-shadow-sm" title="TikTok">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.61-.6 3.16-1.66 4.31-1.07 1.15-2.61 1.83-4.22 1.95-1.61.12-3.23-.27-4.57-1.1-1.34-.84-2.34-2.15-2.82-3.66-.48-1.51-.4-3.13.24-4.57.64-1.44 1.81-2.58 3.25-3.17 1.44-.59 3.05-.6 4.49-.03v4.09c-.71-.24-1.5-.23-2.19.05-.68.27-1.25.79-1.58 1.42-.33.64-.39 1.39-.17 2.06.22.68.73 1.25 1.37 1.57.65.31 1.41.34 2.07.1.67-.24 1.21-.77 1.51-1.41.3-.64.35-1.39.14-2.07V.02z" />
                                </svg>
                              </a>
                              <a href="#" onClick={(e) => { e.stopPropagation(); e.preventDefault(); }} className="text-slate-700 hover:scale-110 transition drop-shadow-sm" title="Tautan"><Link className="w-5 h-5" /></a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

        </div>
      </motion.section>

      {/* PHOTO LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelectedPhoto(null)}>
          <div className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl bg-stone-50 border border-stone-200" onClick={(e) => e.stopPropagation()}>
            <img src={selectedPhoto} alt="Zoomed Gallery" className="w-full h-auto max-h-[80vh] object-contain mx-auto" />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 bg-stone-50/80 hover:bg-stone-100 border border-stone-200/50 text-slate-900 p-2.5 rounded-full transition shadow-lg cursor-pointer font-sans font-bold text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* VIDEO LIGHTBOX MODAL */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelectedVideo(null)}>
          <div className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Running light border */}
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 rounded-2xl blur-md animate-spin-slow"></div>
            <div className="relative z-10 w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
              <video
                src={selectedVideo}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 bg-amber-500/90 hover:bg-amber-400 border-2 border-amber-300 text-slate-900 p-2.5 rounded-full transition-all shadow-lg hover:shadow-xl cursor-pointer font-sans font-bold text-sm z-20"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* TESTIMONIAL LIGHTBOX MODAL */}
      {selectedTestimonial && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelectedTestimonial(null)}>
          <div className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Running light border */}
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 rounded-2xl blur-md animate-spin-slow"></div>
            <div className="relative z-10 w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
              <video
                src={selectedTestimonial.video_url}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
            <button
              onClick={() => setSelectedTestimonial(null)}
              className="absolute top-4 right-4 bg-amber-500/90 hover:bg-amber-400 border-2 border-amber-300 text-slate-900 p-2.5 rounded-full transition-all shadow-lg hover:shadow-xl cursor-pointer font-sans font-bold text-sm z-20"
            >
              ✕
            </button>
          </div>
        </div>
      )}

    </motion.div>
  );
}


// ==========================================
// 2. PROFIL VIEW
// ==========================================
