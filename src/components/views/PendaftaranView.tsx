import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { createRegistration, uploadFile, fileToBase64 } from "../../api";
import { getRpsTerms } from "./PublicPageHelpers";

export function PendaftaranView() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [regId, setRegId] = useState("");
  const [agreedTerms, setAgreedTerms] = useState(false);

  // Email verification state
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [otpAlertMessage, setOtpAlertMessage] = useState("");
  const [otpError, setOtpError] = useState("");

  useEffect(() => {
    if (otpCountdown > 0) {
      const timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpCountdown]);

  const handleSendOtp = () => {
    if (!email || !email.includes("@")) {
      setOtpError("Alamat email tidak valid.");
      return;
    }
    setIsSendingOtp(true);
    setOtpError("");
    setTimeout(() => {
      const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
      setOtpCode(generatedCode);
      setIsOtpSent(true);
      setIsSendingOtp(false);
      setOtpCountdown(60);
      setOtpAlertMessage(`[SIMULASI EMAIL SERVER] Kode OTP Verifikasi Anda adalah: ${generatedCode}`);
    }, 800);
  };

  const handleVerifyOtp = () => {
    if (userOtp === otpCode && otpCode !== "") {
      setIsEmailVerified(true);
      setOtpError("");
      setPenerimaData(prev => ({ ...prev, email }));
    } else {
      setOtpError("Kode OTP salah / kedaluwarsa. Silakan periksa kembali.");
    }
  };

  // Registration Form State
  const [penerimaData, setPenerimaData] = useState({
    name: "",
    birth_place: "",
    birth_date: "",
    gender: "Laki-laki" as 'Laki-laki' | 'Perempuan',
    address: "",
    rps_target: "PPS_Raharjo" as 'Pamardi Siwi' | 'Mojomulyo' | 'Gondang' | 'PPS_Raharjo',
    guardian_name: "",
    guardian_phone: "",
    email: "",
    status: "Pending" as 'Pending',
    ktp_url: "",
    kk_url: "",
    sktm_url: ""
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fileKey: 'ktp_url' | 'kk_url' | 'sktm_url') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const base64 = await fileToBase64(file);
      const uploadedUrl = await uploadFile(base64, file.name, file.type);
      setPenerimaData(prev => ({ ...prev, [fileKey]: uploadedUrl }));
    } catch (err) {
      console.error(err);
      alert("Gagal mengupload file.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const result = await createRegistration(penerimaData);
      setRegId(result.id);
      setStep(4);
    } catch (err) {
      console.error(err);
      alert("Gagal memproses pendaftaran.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 py-4 animate-fade-in font-serif" id="pendaftaran-page">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-3xl font-serif text-slate-900 font-bold tracking-tight">Pendaftaran Penerima Manfaat Online</h2>
        <p className="text-slate-500 font-sans text-xs uppercase tracking-wider">
          Formulir pendaftaran digital pelayanan rehabilitasi sosial terintegrasi. Isikan data yang valid.
        </p>
      </div>

      {/* Steps Stepper */}
      <div className="max-w-xl mx-auto flex items-center justify-between border-b border-amber-100 pb-4">
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex items-center gap-2" id={`stepper-num-${num}`}>
            <span className={`w-8 h-8 rounded-full border-2 font-sans font-bold flex items-center justify-center text-xs transition duration-300 ${step >= num
              ? "bg-gradient-to-r from-amber-400 to-orange-500 border-transparent text-slate-900 shadow-xs"
              : "bg-white border-slate-200 text-slate-400"
              }`}>
              0{num}
            </span>
            <span className={`text-[10px] font-sans font-extrabold uppercase tracking-wider ${step >= num ? "text-slate-900" : "text-slate-400"}`}>
              {num === 1 ? 'Data Diri' : num === 2 ? 'Kontak Wali' : 'Upload Berkas'}
            </span>
          </div>
        ))}
      </div>

      <div className={`max-w-xl mx-auto bg-white border rounded-2xl p-6 md:p-8 shadow-sm transition-all duration-300 ${penerimaData.rps_target === 'PPS_Raharjo' ? 'border-violet-200 shadow-violet-100/50' :
        penerimaData.rps_target === 'Pamardi Siwi' ? 'border-sky-200 shadow-sky-100/50' :
          penerimaData.rps_target === 'Mojomulyo' ? 'border-emerald-200 shadow-emerald-100/50' :
            penerimaData.rps_target === 'Gondang' ? 'border-rose-200 shadow-rose-100/50' : 'border-amber-100 shadow-sm'
        }`}>
        {step === 1 && (
          <div className="space-y-4" id="step-1-container">
            <h3 className="text-sm font-serif font-extrabold text-slate-900 border-b border-amber-100 pb-2 uppercase tracking-wide">Bagian 1: Data Diri Calon Penerima Manfaat (PM)</h3>

            <div className="space-y-1">
              <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-700 block">Nama Lengkap PM *</label>
              <input
                type="text"
                required
                value={penerimaData.name}
                onChange={(e) => setPenerimaData({ ...penerimaData, name: e.target.value })}
                className="w-full text-xs p-2.5 border border-amber-200 rounded-xl bg-white font-sans focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-xs"
                placeholder="Nama sesuai akta / KTP"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-700 block">Tempat Lahir *</label>
                <input
                  type="text"
                  required
                  value={penerimaData.birth_place}
                  onChange={(e) => setPenerimaData({ ...penerimaData, birth_place: e.target.value })}
                  className="w-full text-xs p-2.5 border border-amber-200 rounded-xl bg-white font-sans focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-xs"
                  placeholder="e.g. Surakarta"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-700 block">Tanggal Lahir *</label>
                <input
                  type="date"
                  required
                  value={penerimaData.birth_date}
                  onChange={(e) => setPenerimaData({ ...penerimaData, birth_date: e.target.value })}
                  className="w-full text-xs p-2.5 border border-amber-200 rounded-xl bg-white font-sans focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-xs"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-700 block">Jenis Kelamin *</label>
                <select
                  value={penerimaData.gender}
                  onChange={(e) => setPenerimaData({ ...penerimaData, gender: e.target.value as any })}
                  className="w-full text-xs p-2.5 border border-amber-200 rounded-xl bg-white font-sans focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-xs"
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-700 block">Tujuan Rumah Pelayanan Sosial *</label>
                <select
                  value={penerimaData.rps_target}
                  onChange={(e) => {
                    setPenerimaData({ ...penerimaData, rps_target: e.target.value as any });
                    setAgreedTerms(false);
                  }}
                  className="w-full text-xs p-2.5 border border-amber-200 rounded-xl bg-white font-sans focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-xs"
                >
                  <option value="PPS_Raharjo">PPS Raharjo (Disabilitas Intelektual)</option>
                  <option value="Pamardi Siwi">RPS Pamardi Siwi (Anak)</option>
                  <option value="Mojomulyo">RPS Mojomulyo (Lanjut Usia)</option>
                  <option value="Gondang">RPS Gondang (PMKS)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-700 block">Alamat Tempat Tinggal Saat Ini *</label>
              <textarea
                required
                rows={3}
                value={penerimaData.address}
                onChange={(e) => setPenerimaData({ ...penerimaData, address: e.target.value })}
                className="w-full text-xs p-2.5 border border-amber-200 rounded-xl bg-white font-sans focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-xs"
                placeholder="Tulis alamat rumah lengkap..."
              ></textarea>
            </div>

            {/* Email & Verifikasi OTP */}
            <div className="space-y-3 p-4 border border-amber-200 rounded-2xl bg-amber-50/10 shadow-xs">
              <div>
                <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-700 block mb-1">
                  Alamat Email Pendaftar * <span className="text-slate-400 font-normal">(Untuk Menerima Verifikasi & Update Status)</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    disabled={isEmailVerified}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 text-xs p-2.5 border border-amber-200 rounded-xl bg-white font-sans focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 disabled:bg-slate-50 disabled:text-slate-500"
                    placeholder="e.g. wali_pendaftar@gmail.com"
                  />
                  {!isEmailVerified && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isSendingOtp || !email || !email.includes("@") || otpCountdown > 0}
                      className="px-3 py-2 bg-stone-50 text-slate-900 rounded-xl text-xs font-sans font-bold uppercase tracking-wider hover:bg-stone-100 disabled:opacity-50 transition cursor-pointer shrink-0"
                    >
                      {isSendingOtp ? "Mengirim..." : otpCountdown > 0 ? `${otpCountdown}s` : "Kirim OTP"}
                    </button>
                  )}
                </div>
              </div>

              {/* Simulated OTP Notification Banner if sent */}
              {otpAlertMessage && (
                <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs font-sans font-bold animate-fade-in flex items-start gap-2">
                  <span className="text-sm shrink-0">📬</span>
                  <div className="flex-1">
                    <p className="leading-snug">{otpAlertMessage}</p>
                    <p className="text-[9px] text-amber-700 font-normal mt-0.5">Silakan salin kode di atas untuk memverifikasi pendaftaran Anda.</p>
                  </div>
                  <button onClick={() => setOtpAlertMessage("")} className="text-amber-500 hover:text-amber-800 text-xs font-sans">✕</button>
                </div>
              )}

              {isOtpSent && !isEmailVerified && (
                <div className="space-y-2 pt-1 animate-fade-in">
                  <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-700 block">
                    Masukkan 6-Digit Kode OTP *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={userOtp}
                      onChange={(e) => setUserOtp(e.target.value.replace(/\D/g, ""))}
                      className="flex-1 text-xs p-2.5 border border-amber-200 rounded-xl bg-white font-mono tracking-widest text-center focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                      placeholder="e.g. 123456"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={userOtp.length !== 6}
                      className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl text-xs font-sans font-bold uppercase tracking-wider hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 transition cursor-pointer"
                    >
                      Verifikasi
                    </button>
                  </div>
                </div>
              )}

              {otpError && (
                <p className="text-red-500 text-[10px] font-bold font-sans mt-1">⚠️ {otpError}</p>
              )}

              {isEmailVerified && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-sans font-extrabold flex items-center gap-2 animate-pulse">
                  <span className="text-sm">✓</span>
                  <div>
                    <span>Email Terverifikasi Berhasil!</span>
                    <span className="block text-[9px] text-emerald-700 font-normal">Pendaftaran Anda telah diikat secara aman dengan email {penerimaData.email || email}.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Persyaratan & Ketentuan Dinamis berdasarkan Unit Kerja */}
            {(() => {
              const rpsTerms = getRpsTerms(penerimaData.rps_target);
              if (!rpsTerms) return null;
              return (
                <div className={`p-4 border rounded-xl space-y-3 font-sans transition-all duration-300 ${rpsTerms.colorClass}`} id="persyaratan-ketentuan-box">
                  <div className="flex items-center gap-2 border-b border-current pb-2">
                    <span className="text-sm">📋</span>
                    <h4 className="text-xs font-black uppercase tracking-wider">
                      Persyaratan & Ketentuan: {rpsTerms.title}
                    </h4>
                  </div>
                  <ul className="space-y-1.5 text-[11px] list-disc pl-4 leading-relaxed font-medium marker:text-amber-400 marker:text-lg">
                    {rpsTerms.terms.map((term, i) => (
                      <li key={i}>{term}</li>
                    ))}
                  </ul>
                  <div className="pt-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="checkbox-agreed-terms"
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer"
                    />
                    <label htmlFor="checkbox-agreed-terms" className="text-[10px] font-bold uppercase tracking-wider text-slate-700 cursor-pointer select-none">
                      Saya menyatakan memenuhi persyaratan & menyetujui ketentuan di atas.
                    </label>
                  </div>
                </div>
              );
            })()}

            <div className="pt-2">
              <button
                disabled={!penerimaData.name || !penerimaData.birth_place || !penerimaData.birth_date || !penerimaData.address || !agreedTerms || !isEmailVerified}
                onClick={() => setStep(2)}
                className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:opacity-90 disabled:opacity-50 text-slate-900 font-sans font-extrabold uppercase tracking-widest rounded-xl text-xs transition cursor-pointer shadow-md"
                id="btn-pendaftaran-next-1"
              >
                Lanjutkan Isi Data Wali
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4" id="step-2-container">
            <h3 className="text-sm font-serif font-extrabold text-slate-900 border-b border-amber-100 pb-2 uppercase tracking-wide">Bagian 2: Data Orang Tua / Wali / Penanggung Jawab</h3>

            <div className="space-y-1">
              <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-700 block">Nama Lengkap Wali / Pengaju *</label>
              <input
                type="text"
                required
                value={penerimaData.guardian_name}
                onChange={(e) => setPenerimaData({ ...penerimaData, guardian_name: e.target.value })}
                className="w-full text-xs p-2.5 border border-amber-200 rounded-xl bg-white font-sans focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-xs"
                placeholder="e.g. Yatno (Paman) atau Suhartini (Ibu)"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-700 block">Nomor Telepon/WA Aktif Wali *</label>
              <input
                type="tel"
                required
                value={penerimaData.guardian_phone}
                onChange={(e) => setPenerimaData({ ...penerimaData, guardian_phone: e.target.value })}
                className="w-full text-xs p-2.5 border border-amber-200 rounded-xl bg-white font-sans focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-xs"
                placeholder="e.g. 0812345678"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <button
                onClick={() => setStep(1)}
                className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-sans font-bold uppercase tracking-widest rounded-xl text-xs transition cursor-pointer border border-slate-200"
                id="btn-pendaftaran-prev-2"
              >
                Kembali
              </button>
              <button
                disabled={!penerimaData.guardian_name || !penerimaData.guardian_phone}
                onClick={() => setStep(3)}
                className="py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:opacity-90 text-slate-900 font-sans font-extrabold uppercase tracking-widest rounded-xl text-xs transition cursor-pointer shadow-md"
                id="btn-pendaftaran-next-2"
              >
                Lanjutkan ke Berkas
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4" id="step-3-container">
            <h3 className="text-sm font-serif font-extrabold text-slate-900 border-b border-amber-100 pb-2 uppercase tracking-wide">Bagian 3: Unggah Berkas Persyaratan Kelengkapan</h3>
            <p className="text-slate-500 font-sans text-[10px] uppercase tracking-wider leading-relaxed">
              Berkas berupa foto / scan berformat JPG, PNG, atau PDF. Jika tidak ada file, Anda dapat langsung mengklik kirim.
            </p>

            <div className="space-y-3">
              <div className="border border-amber-100 rounded-xl p-3.5 bg-amber-50/20 flex flex-col md:flex-row justify-between md:items-center gap-3 shadow-xs">
                <div>
                  <div className="text-xs font-sans font-bold text-slate-800">Scan KTP PM / Wali</div>
                  <div className="text-[9px] font-sans text-slate-500">File KTP asli penanggung jawab</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => handleFileUpload(e, 'ktp_url')}
                    className="hidden"
                    id="ktp-uploader"
                  />
                  <label htmlFor="ktp-uploader" className="px-3.5 py-1.5 bg-white border border-amber-200 rounded-lg text-xs text-slate-700 hover:bg-amber-50 cursor-pointer font-sans font-bold uppercase tracking-wider transition shadow-2xs">
                    {penerimaData.ktp_url ? 'Ganti File' : 'Pilih File'}
                  </label>
                  {penerimaData.ktp_url && <Check className="w-5 h-5 text-emerald-500" />}
                </div>
              </div>

              <div className="border border-amber-100 rounded-xl p-3.5 bg-amber-50/20 flex flex-col md:flex-row justify-between md:items-center gap-3 shadow-xs">
                <div>
                  <div className="text-xs font-sans font-bold text-slate-800">Scan Kartu Keluarga (KK)</div>
                  <div className="text-[9px] font-sans text-slate-500">KK penanggung jawab / PM</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => handleFileUpload(e, 'kk_url')}
                    className="hidden"
                    id="kk-uploader"
                  />
                  <label htmlFor="kk-uploader" className="px-3.5 py-1.5 bg-white border border-amber-200 rounded-lg text-xs text-slate-700 hover:bg-amber-50 cursor-pointer font-sans font-bold uppercase tracking-wider transition shadow-2xs">
                    {penerimaData.kk_url ? 'Ganti File' : 'Pilih File'}
                  </label>
                  {penerimaData.kk_url && <Check className="w-5 h-5 text-emerald-500" />}
                </div>
              </div>

              <div className="border border-amber-100 rounded-xl p-3.5 bg-amber-50/20 flex flex-col md:flex-row justify-between md:items-center gap-3 shadow-xs">
                <div>
                  <div className="text-xs font-sans font-bold text-slate-800">Surat Keterangan Tidak Mampu (SKTM)</div>
                  <div className="text-[9px] font-sans text-slate-500">Surat keterangan resmi dari Kelurahan</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => handleFileUpload(e, 'sktm_url')}
                    className="hidden"
                    id="sktm-uploader"
                  />
                  <label htmlFor="sktm-uploader" className="px-3.5 py-1.5 bg-white border border-amber-200 rounded-lg text-xs text-slate-700 hover:bg-amber-50 cursor-pointer font-sans font-bold uppercase tracking-wider transition shadow-2xs">
                    {penerimaData.sktm_url ? 'Ganti File' : 'Pilih File'}
                  </label>
                  {penerimaData.sktm_url && <Check className="w-5 h-5 text-emerald-500" />}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <button
                onClick={() => setStep(2)}
                className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-sans font-bold uppercase tracking-widest rounded-xl text-xs transition cursor-pointer border border-slate-200"
                id="btn-pendaftaran-prev-3"
              >
                Kembali
              </button>
              <button
                disabled={loading}
                onClick={handleRegister}
                className="py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:opacity-90 text-slate-900 font-sans font-extrabold uppercase tracking-widest rounded-xl text-xs transition cursor-pointer shadow-md"
                id="btn-pendaftaran-register"
              >
                {loading ? "Menyimpan..." : "Kirim Pendaftaran"}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-6 space-y-4 animate-scale-up" id="pendaftaran-finish-container">
            <div className="w-16 h-16 bg-emerald-50 border-2 border-emerald-500 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-xs animate-pulse">
              <Check className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-serif font-bold text-slate-900">Pendaftaran Berhasil Dikirimkan</h3>
              <p className="text-slate-600 font-sans text-xs">
                Calon Penerima Manfaat atas nama <strong>{penerimaData.name}</strong> terdaftar dengan nomor registrasi unik berikut:
              </p>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 inline-block font-mono text-base font-black text-amber-900 tracking-wider shadow-sm">
              {regId || "REG-PPS-9872138"}
            </div>
            <p className="text-[11px] text-slate-500 max-w-sm mx-auto leading-relaxed font-sans">
              Mohon simpan kode registrasi Anda. Petugas panti kami akan menindaklanjuti berkas melalui panggilan telepon ke nomor wali (<strong>{penerimaData.guardian_phone}</strong>) dalam kurun waktu 3x24 jam kerja.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setStep(1);
                  setPenerimaData({
                    name: "", birth_place: "", birth_date: "", gender: "Laki-laki", address: "",
                    rps_target: "PPS_Raharjo", guardian_name: "", guardian_phone: "", email: "", status: "Pending",
                    ktp_url: "", kk_url: "", sktm_url: ""
                  });
                  setAgreedTerms(false);
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:opacity-90 text-slate-900 font-sans font-bold uppercase tracking-widest text-xs rounded-xl cursor-pointer shadow-md transition"
                id="btn-pendaftaran-reset"
              >
                Buat Pendaftaran Baru
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
