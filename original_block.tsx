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
              {filteredNews.map((n) => (
                <article key={n.id} className="bg-white rounded-2xl border border-amber-100 overflow-hidden hover:border-amber-300 hover:shadow-md transition duration-200" id={`news-item-${n.id}`}>
                  <div className="aspect-video relative overflow-hidden bg-slate-50 border-b border-amber-100">
                    <img src={n.image_url} alt={n.title} className="w-full h-full object-cover transition duration-500" referrerPolicy="no-referrer" />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-orange-500 text-white text-[9px] font-extrabold uppercase tracking-widest">
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
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1"><Share2 className="w-3 h-3"/> Bagikan</span>
                      <div className="flex gap-2">
                        <a href="#" onClick={(e) => e.preventDefault()} className="text-blue-600 hover:scale-110 transition drop-shadow-sm"><Facebook className="w-3.5 h-3.5 fill-current"/></a>
                        <a href="#" onClick={(e) => e.preventDefault()} className="text-sky-500 hover:scale-110 transition drop-shadow-sm"><Twitter className="w-3.5 h-3.5 fill-current"/></a>
                        <a href="#" onClick={(e) => e.preventDefault()} className="text-pink-600 hover:scale-110 transition drop-shadow-sm"><Instagram className="w-3.5 h-3.5"/></a>
                        <a href="#" onClick={(e) => e.preventDefault()} className="text-slate-900 hover:scale-110 transition drop-shadow-sm">
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.61-.6 3.16-1.66 4.31-1.07 1.15-2.61 1.83-4.22 1.95-1.61.12-3.23-.27-4.57-1.1-1.34-.84-2.34-2.15-2.82-3.66-.48-1.51-.4-3.13.24-4.57.64-1.44 1.81-2.58 3.25-3.17 1.44-.59 3.05-.6 4.49-.03v4.09c-.71-.24-1.5-.23-2.19.05-.68.27-1.25.79-1.58 1.42-.33.64-.39 1.39-.17 2.06.22.68.73 1.25 1.37 1.57.65.31 1.41.34 2.07.1.67-.24 1.21-.77 1.51-1.41.3-.64.35-1.39.14-2.07V.02z"/></svg>
                        </a>
                        <a href="#" onClick={(e) => e.preventDefault()} className="text-slate-600 hover:text-slate-800 transition"><Link className="w-3.5 h-3.5"/></a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Facilities Grid */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2 bg-gradient-to-r from-slate-900 to-emerald-600 text-transparent bg-clip-text">
              <Users className="w-4 h-4 text-emerald-500 shrink-0" /> Fasilitas Pendukung Penunjang ({activeUnit === 'Semua' ? 'Semua' : activeUnit === 'PPS_Raharjo' ? 'PPS Raharjo' : `RPS ${activeUnit}`})
            </h3>
          </div>

          {filteredFacilities.length === 0 ? (
            <div className="text-center p-8 bg-amber-50/40 rounded-2xl border border-amber-200">
              <p className="text-amber-700 font-serif italic text-sm">Belum ada fasilitas yang diinputkan untuk unit ini.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {filteredFacilities.map((f) => (
                <div key={f.id} className="bg-white rounded-2xl border border-amber-100 p-4 space-y-4 hover:border-amber-300 hover:shadow-md transition duration-200 flex gap-4 items-start" id={`fac-item-${f.id}`}>
                  <img src={f.image_url} alt={f.name} className="w-20 h-20 rounded-xl object-cover bg-slate-50 shrink-0 border border-amber-100" referrerPolicy="no-referrer" />
                  <div className="space-y-1">
                    <span className="text-[9px] font-extrabold text-emerald-600 font-mono tracking-widest uppercase block">
                      {f.rps_unit === 'PPS_Raharjo' ? 'PPS Raharjo' : `RPS ${f.rps_unit}`}
                    </span>
                    <h4 className="font-serif text-slate-900 text-sm font-bold">{f.name}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 text-justify">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Separated Gallery Sections: PHOTOS and VIDEOS (baris Di pisahkan) */}
        <div className="space-y-12 pt-8 border-t border-amber-100">
          
          {/* CAMERA ROLL SIMULATOR WIDGET */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 shadow-xl border border-slate-800 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-[10px] font-sans font-bold uppercase tracking-wider rounded-full border border-amber-500/30">
                  ⚡ Fitur Interaktif Baru
                </span>
                <h3 className="text-lg font-serif font-black tracking-wide mt-2 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-amber-400" /> Simulasi Kamera Dokumentasi Unit Kerja
                </h3>
                <p className="text-slate-400 text-xs font-sans mt-1">
                  Ambil dokumentasi foto atau rekam video simulasi untuk ditambahkan ke Roll Galeri Publik secara langsung!
                </p>
              </div>
              <button
                onClick={() => setIsCameraActive(!isCameraActive)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-sans font-extrabold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/20"
              >
                {isCameraActive ? "Sembunyikan Kamera" : "Aktifkan Kamera"}
              </button>
            </div>

            {isCameraActive && (
              <div className="grid lg:grid-cols-12 gap-6 pt-2 animate-fade-in" id="camera-simulation-body">
                {/* LENS VIEWPORT (7 cols) */}
                <div className="lg:col-span-7 relative aspect-video bg-black rounded-2xl overflow-hidden border border-slate-700 shadow-inner flex flex-col justify-between p-4 group select-none">
                  {/* Camera Flash Overlay */}
                  {flashEffect && (
                    <div className="absolute inset-0 bg-white z-50 animate-flash" />
                  )}

                  {/* Camera Viewfinder Elements */}
                  <div className="absolute inset-0 border-[20px] border-black/30 pointer-events-none z-10 flex items-center justify-center">
                    <div className="w-full h-full border border-slate-500/40 relative">
                      {/* Gridlines */}
                      <div className="absolute inset-y-0 left-1/3 border-l border-dashed border-slate-500/20" />
                      <div className="absolute inset-y-0 left-2/3 border-l border-dashed border-slate-500/20" />
                      <div className="absolute inset-x-0 top-1/3 border-t border-dashed border-slate-500/20" />
                      <div className="absolute inset-x-0 top-2/3 border-t border-dashed border-slate-500/20" />
                      
                      {/* Focus Box */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-amber-400/60 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-ping" />
                      </div>
                    </div>
                  </div>

                  {/* Simulated Lens Image under Grid */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={currentPreset.image_url} 
                      alt="Live feed" 
                      className="w-full h-full object-cover brightness-90 transition-all duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                  </div>

                  {/* Viewfinder HUD Top */}
                  <div className="z-20 flex justify-between items-center text-[10px] font-mono tracking-widest text-white/90">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                      <span className="uppercase">{cameraMode} MODE</span>
                    </div>
                    <div className="bg-black/50 px-2 py-0.5 rounded border border-white/10 uppercase">
                      {selectedCameraUnit === 'PPS_Raharjo' ? 'PPS Raharjo' : `RPS ${selectedCameraUnit}`}
                    </div>
                    <div className="flex items-center gap-1">
                      <span>BAT 88%</span>
                      <span className="inline-block w-4 h-2.5 border border-white rounded-xs p-0.5"><span className="block h-full w-4/5 bg-white rounded-3xs" /></span>
                    </div>
                  </div>

                  {/* Video Recording Status Overlay */}
                  {isCapturing && cameraMode === 'video' && (
                    <div className="absolute inset-0 z-30 bg-red-600/10 flex flex-col justify-center items-center font-mono">
                      <span className="text-red-500 text-sm font-bold uppercase animate-pulse flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-600 animate-ping inline-block" />
                        RECORDING...
                      </span>
                      <div className="w-48 bg-slate-800/80 rounded-full h-2 mt-3 overflow-hidden border border-slate-700">
                        <div className="bg-red-500 h-full transition-all duration-200" style={{ width: `${captureProgress}%` }} />
                      </div>
                      <span className="text-[10px] text-white/80 mt-1">{captureProgress}%</span>
                    </div>
                  )}

                  {/* Viewfinder HUD Bottom */}
                  <div className="z-20 flex justify-between items-end text-[10px] font-mono text-white/90">
                    <div>
                      <p className="font-bold text-amber-400">SCENARIO:</p>
                      <p className="uppercase max-w-xs truncate">{currentPreset.title}</p>
                    </div>
                    <div>
                      <span>ISO 400</span>
                      <span className="mx-2">|</span>
                      <span>F/2.8</span>
                    </div>
                  </div>
                </div>

                {/* CONTROLS PANEL (5 cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-4 bg-slate-800/50 p-5 rounded-2xl border border-slate-800">
                  <div className="space-y-4">
                    {/* Unit Selector */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 block">
                        Pilih Unit Kerja Penerima Manfaat
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {(['PPS_Raharjo', 'Pamardi Siwi', 'Mojomulyo', 'Gondang'] as const).map((unit) => (
                          <button
                            key={unit}
                            type="button"
                            onClick={() => {
                              setSelectedCameraUnit(unit);
                              setCameraPresetIndex(0);
                            }}
                            className={`py-2 px-3 text-[10px] font-sans font-extrabold uppercase tracking-wider rounded-xl transition text-center border cursor-pointer ${
                              selectedCameraUnit === unit 
                                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md' 
                                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                            }`}
                          >
                            {unit === 'PPS_Raharjo' ? 'PPS Raharjo' : `RPS ${unit}`}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Mode Selector */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 block">
                        Pilih Mode Media
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setCameraMode('photo')}
                          className={`py-2 px-3 text-[10px] font-sans font-extrabold uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-1.5 border cursor-pointer ${
                            cameraMode === 'photo' 
                              ? 'bg-amber-500 text-slate-950 border-amber-400' 
                              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                          }`}
                        >
                          <Camera className="w-3.5 h-3.5" /> FOTO (JPG)
                        </button>
                        <button
                          type="button"
                          onClick={() => setCameraMode('video')}
                          className={`py-2 px-3 text-[10px] font-sans font-extrabold uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-1.5 border cursor-pointer ${
                            cameraMode === 'video' 
                              ? 'bg-amber-500 text-slate-950 border-amber-400' 
                              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                          }`}
                        >
                          <Video className="w-3.5 h-3.5" /> VIDEO (MP4)
                        </button>
                      </div>
                    </div>

                    {/* Skenario Dropdown */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 block">
                        Pilih Skenario Kegiatan Bimbingan
                      </label>
                      <select
                        value={cameraPresetIndex}
                        onChange={(e) => setCameraPresetIndex(Number(e.target.value))}
                        className="w-full text-xs p-2.5 border border-slate-700 bg-slate-900 text-slate-200 rounded-xl font-sans focus:outline-hidden focus:border-amber-400"
                      >
                        {activePresets.map((preset, idx) => (
                          <option key={idx} value={idx}>
                            {preset.title}
                          </option>
                        ))}
                      </select>
                      <p className="text-[11px] text-slate-400 italic font-sans leading-relaxed pt-1">
                        &ldquo;{currentPreset.caption}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Capture Button and Success Indicator */}
                  <div className="space-y-3 pt-2">
                    <button
                      type="button"
                      disabled={isCapturing}
                      onClick={handleCapture}
                      className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:opacity-90 disabled:opacity-40 text-white font-sans font-extrabold uppercase tracking-widest rounded-xl text-xs transition cursor-pointer shadow-lg flex items-center justify-center gap-2"
                    >
                      <span className="w-3 h-3 rounded-full bg-white animate-pulse" />
                      {isCapturing ? "PROSES..." : cameraMode === 'photo' ? "AMBIL FOTO 📸" : "REKAM VIDEO 🎥"}
                    </button>

                    {recentCapture && (
                      <div className="p-3 bg-emerald-950/40 border border-emerald-800 text-emerald-300 rounded-xl text-xs font-sans flex items-center gap-3 animate-fade-in">
                        <img src={recentCapture.image_url} alt="last taken" className="w-10 h-10 object-cover rounded-md bg-slate-800 shrink-0 border border-emerald-800/40" referrerPolicy="no-referrer" />
                        <div className="flex-1 min-w-0">
                          <p className="font-extrabold text-[10px] uppercase text-emerald-400">Captured Berhasil!</p>
                          <p className="truncate text-[10px] text-emerald-200/90">{recentCapture.caption}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* PHOTO ROW */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2 bg-gradient-to-r from-slate-900 to-sky-600 text-transparent bg-clip-text">
                <Award className="w-4 h-4 text-sky-500 shrink-0" /> Galeri Dokumentasi Foto ({activeUnit === 'Semua' ? 'Semua' : activeUnit === 'PPS_Raharjo' ? 'PPS Raharjo' : `RPS ${activeUnit}`})
              </h3>
            </div>

            {photoGalleries.length === 0 ? (
              <div className="text-center p-8 bg-amber-50/40 rounded-2xl border border-amber-200">
                <p className="text-amber-700 font-serif italic text-sm">Belum ada foto galeri untuk unit ini.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {photoGalleries.map((g) => {
                  return (
                    <motion.div 
                      key={g.id} 
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
                          <span className="text-[8px] text-slate-800 font-bold uppercase tracking-widest"><Share2 className="w-3 h-3 inline mr-1"/></span>
                          <a href="#" onClick={(e) => e.stopPropagation()} className="text-blue-600 hover:scale-110 transition drop-shadow-sm"><Facebook className="w-3 h-3 fill-current"/></a>
                          <a href="#" onClick={(e) => e.stopPropagation()} className="text-sky-500 hover:scale-110 transition drop-shadow-sm"><Twitter className="w-3 h-3 fill-current"/></a>
                          <a href="#" onClick={(e) => e.stopPropagation()} className="text-pink-600 hover:scale-110 transition drop-shadow-sm"><Instagram className="w-3 h-3"/></a>
                          <a href="#" onClick={(e) => e.stopPropagation()} className="text-slate-900 hover:scale-110 transition drop-shadow-sm">
                            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.61-.6 3.16-1.66 4.31-1.07 1.15-2.61 1.83-4.22 1.95-1.61.12-3.23-.27-4.57-1.1-1.34-.84-2.34-2.15-2.82-3.66-.48-1.51-.4-3.13.24-4.57.64-1.44 1.81-2.58 3.25-3.17 1.44-.59 3.05-.6 4.49-.03v4.09c-.71-.24-1.5-.23-2.19.05-.68.27-1.25.79-1.58 1.42-.33.64-.39 1.39-.17 2.06.22.68.73 1.25 1.37 1.57.65.31 1.41.34 2.07.1.67-.24 1.21-.77 1.51-1.41.3-.64.35-1.39.14-2.07V.02z"/></svg>
                          </a>
                          <a href="#" onClick={(e) => e.stopPropagation()} className="text-slate-600 hover:text-slate-800 transition"><Link className="w-3 h-3"/></a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* VIDEO ROW */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2 bg-gradient-to-r from-slate-900 to-violet-600 text-transparent bg-clip-text">
                <Award className="w-4 h-4 text-violet-500 shrink-0" /> Galeri Dokumentasi Video ({activeUnit === 'Semua' ? 'Semua' : activeUnit === 'PPS_Raharjo' ? 'PPS Raharjo' : `RPS ${activeUnit}`})
              </h3>
            </div>

            {videoGalleries.length === 0 ? (
              <div className="text-center p-8 bg-amber-50/40 rounded-2xl border border-amber-200">
                <p className="text-amber-700 font-serif italic text-sm">Belum ada video galeri untuk unit ini.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {videoGalleries.map((g) => {
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
                      whileHover={{ y: -4 }}
                      onClick={() => setSelectedVideo(g.video_url || "https://www.w3schools.com/html/mov_bbb.mp4")}
                      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-violet-300 transition duration-300 shadow-md cursor-pointer flex flex-col"
                      id={`gallery-video-item-${g.id}`}
                    >
                      <div className="aspect-video relative bg-slate-950 flex items-center justify-center overflow-hidden">
                        <img src={g.image_url} alt={g.caption} className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition duration-500" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/20 transition duration-300" />
                        
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
                            <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest"><Share2 className="w-3 h-3 inline mr-1"/></span>
                            <a href="#" onClick={(e) => { e.stopPropagation(); e.preventDefault(); }} className="text-blue-600 hover:scale-110 transition drop-shadow-sm"><Facebook className="w-3 h-3 fill-current"/></a>
                            <a href="#" onClick={(e) => { e.stopPropagation(); e.preventDefault(); }} className="text-sky-500 hover:scale-110 transition drop-shadow-sm"><Twitter className="w-3 h-3 fill-current"/></a>
                            <a href="#" onClick={(e) => { e.stopPropagation(); e.preventDefault(); }} className="text-pink-600 hover:scale-110 transition drop-shadow-sm"><Instagram className="w-3 h-3"/></a>
                            <a href="#" onClick={(e) => { e.stopPropagation(); e.preventDefault(); }} className="text-slate-900 hover:scale-110 transition drop-shadow-sm">
                              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.61-.6 3.16-1.66 4.31-1.07 1.15-2.61 1.83-4.22 1.95-1.61.12-3.23-.27-4.57-1.1-1.34-.84-2.34-2.15-2.82-3.66-.48-1.51-.4-3.13.24-4.57.64-1.44 1.81-2.58 3.25-3.17 1.44-.59 3.05-.6 4.49-.03v4.09c-.71-.24-1.5-.23-2.19.05-.68.27-1.25.79-1.58 1.42-.33.64-.39 1.39-.17 2.06.22.68.73 1.25 1.37 1.57.65.31 1.41.34 2.07.1.67-.24 1.21-.77 1.51-1.41.3-.64.35-1.39.14-2.07V.02z"/></svg>
                            </a>
                            <a href="#" onClick={(e) => { e.stopPropagation(); e.preventDefault(); }} className="text-slate-600 hover:text-slate-800 transition"><Link className="w-3 h-3"/></a>
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
      </section>

      {/* PHOTO LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelectedPhoto(null)}>
          <div className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl bg-slate-900 border border-slate-800" onClick={(e) => e.stopPropagation()}>
            <img src={selectedPhoto} alt="Zoomed Gallery" className="w-full h-auto max-h-[80vh] object-contain mx-auto" />
            <button 
              onClick={() => setSelectedPhoto(null)} 
              className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-900 border border-slate-700/50 hover:text-rose-400 text-white p-2.5 rounded-full transition shadow-lg cursor-pointer font-sans font-bold text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* VIDEO LIGHTBOX MODAL */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelectedVideo(null)}>
          <div className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <video 
              src={selectedVideo} 
              controls 
              autoPlay 
              className="w-full h-full object-contain"
            />
            <button 
              onClick={() => setSelectedVideo(null)} 
              className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-900 border border-slate-700/50 hover:text-rose-400 text-white p-2.5 rounded-full transition shadow-lg cursor-pointer font-sans font-bold text-sm z-10"
            >
              ✕
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

// ==========================================
// 2. PROFIL VIEW
// ==========================================
function ProfilView({ settings, staff, achievements }: { settings: AppSettings; staff: Staff[]; achievements: Achievement[] }) {
  const [activeUnit, setActiveUnit] = useState<'Semua' | 'Pamardi Siwi' | 'Mojomulyo' | 'Gondang' | 'PPS' | 'PPS_Raharjo'>('Semua');
  const [activeProfilTab, setActiveProfilTab] = useState<'sambutan' | 'dasar_hukum' | 'sejarah' | 'visi_misi' | 'struktur' | 'sdm' | 'prestasi'>('sambutan');

  useEffect(() => {
    const handleNav = (e: any) => {
      if (e.detail) setActiveProfilTab(e.detail);
    };
    window.addEventListener('nav-profil', handleNav);
    return () => window.removeEventListener('nav-profil', handleNav);
  }, []);

  const filteredStaff = staff.filter(s => activeUnit === 'Semua' || s.rps_unit === activeUnit);
  const filteredAchievements = achievements.filter(a => activeUnit === 'Semua' || a.rps_unit === activeUnit);

  const renderTabButton = (tabId: typeof activeProfilTab, label: string) => (
    <button
      onClick={() => setActiveProfilTab(tabId)}
      className={`px-4 py-3 font-sans text-[10px] font-extrabold uppercase tracking-widest border-b-2 transition cursor-pointer whitespace-nowrap ${
        activeProfilTab === tabId
          ? "border-amber-500 text-amber-600"
          : "border-transparent text-slate-400 hover:text-amber-500"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-8 py-4 animate-fade-in" id="profil-page">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-amber-100 pb-2">
        <div>
          <h2 className="text-3xl font-serif text-slate-900 font-bold tracking-tight">Profil Panti</h2>
          <p className="text-xs font-sans text-slate-500 uppercase tracking-wider mt-1">Mengenal lebih dekat Panti Pelayanan Sosial Raharjo.</p>
        </div>
      </div>

      {/* Tabs and Socials */}
      <div className="flex border-b border-amber-100 flex-wrap justify-between items-center w-full overflow-x-auto no-scrollbar">
        <div className="flex flex-nowrap">
          {renderTabButton('sambutan', 'Sambutan Kepala Panti')}
          {renderTabButton('dasar_hukum', 'Dasar Hukum')}
          {renderTabButton('sejarah', 'Sejarah Singkat')}
          {renderTabButton('visi_misi', 'Visi Misi')}
          {renderTabButton('struktur', 'Struktur Organisasi')}
          {renderTabButton('sdm', 'Sumber Daya Manusia')}
          {renderTabButton('prestasi', 'Prestasi')}
        </div>
        <div className="flex items-center gap-3 px-4 py-2 shrink-0">
          <a href="#" onClick={(e) => e.preventDefault()} className="text-blue-600 hover:scale-110 transition drop-shadow-sm"><Facebook className="w-4 h-4 fill-current"/></a>
          <a href="#" onClick={(e) => e.preventDefault()} className="text-sky-500 hover:scale-110 transition drop-shadow-sm"><Twitter className="w-4 h-4 fill-current"/></a>
          <a href="#" onClick={(e) => e.preventDefault()} className="text-pink-600 hover:scale-110 transition drop-shadow-sm"><Instagram className="w-4 h-4"/></a>
          <a href="#" onClick={(e) => e.preventDefault()} className="text-slate-900 hover:scale-110 transition drop-shadow-sm">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.61-.6 3.16-1.66 4.31-1.07 1.15-2.61 1.83-4.22 1.95-1.61.12-3.23-.27-4.57-1.1-1.34-.84-2.34-2.15-2.82-3.66-.48-1.51-.4-3.13.24-4.57.64-1.44 1.81-2.58 3.25-3.17 1.44-.59 3.05-.6 4.49-.03v4.09c-.71-.24-1.5-.23-2.19.05-.68.27-1.25.79-1.58 1.42-.33.64-.39 1.39-.17 2.06.22.68.73 1.25 1.37 1.57.65.31 1.41.34 2.07.1.67-.24 1.21-.77 1.51-1.41.3-.64.35-1.39.14-2.07V.02z"/>
            </svg>
          </a>
          <a href="#" onClick={(e) => e.preventDefault()} className="text-slate-700 hover:scale-110 transition drop-shadow-sm"><Link className="w-4 h-4"/></a>
        </div>
      </div>

      <div className="pt-4">
      {/* Sambutan Kepala Panti */}
      {activeProfilTab === 'sambutan' && (
      <section className="bg-gradient-to-br from-amber-50 to-orange-50/70 rounded-2xl p-6 md:p-10 border border-amber-200 flex flex-col md:flex-row gap-8 items-center md:items-start shadow-xs animate-fade-in" id="sambutan-section">
        <div className="w-48 h-48 md:w-60 md:h-60 rounded-2xl overflow-hidden shrink-0 bg-slate-50 border-2 border-amber-300 shadow-md">
          <img src={settings.sambutan_foto} alt={settings.sambutan_nama} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
@@ -1251,7 +1251,8 @@
      )}

      {/* Visi & Misi */}
      <section className="grid md:grid-cols-2 gap-8" id="visimisi-section">
        <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl p-8 md:p-10 flex flex-col justify-between border border-transparent shadow-md hover:scale-[1.01] transition duration-350">
          <div className="space-y-4">
            <span className="text-indigo-100 text-[10px] font-extrabold tracking-widest uppercase font-sans">Prinsip Arah</span>
@@ -1279,10 +1279,12 @@
          </ul>
        </div>
      </section>

      {/* Sejarah & Dasar Hukum */}
      <section className="grid md:grid-cols-2 gap-8" id="sejarah-section">
        <div className="space-y-4">
          <h3 className="text-2xl font-serif text-slate-900 font-bold tracking-tight">Sejarah Singkat</h3>
          <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line font-serif text-justify">
            {settings.sejarah_singkat}
@@ -1289,6 +1289,11 @@
        </div>

        <div className="space-y-4 bg-gradient-to-r from-sky-50 to-indigo-50/70 p-6 md:p-8 rounded-2xl border border-sky-100 shadow-xs">
          <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-500" /> Dasar Hukum Operasional
          </h3>
@@ -1295,5 +1295,5 @@
            {settings.dasar_hukum.map((d, i) => (
              <li key={i} className="text-slate-700 text-xs leading-relaxed flex gap-2 items-start font-sans" id={`dasar-hukum-item-${i}`}>
                <span className="text-indigo-600 font-extrabold shrink-0">•</span>
                <span className="font-medium text-justify">{d}</span>
              </li>
@@ -1300,9 +1300,11 @@
          </ul>
        </div>
      </section>

      {/* Struktur Organisasi */}
      <section className="text-center space-y-6" id="struktur-section">
        <div className="max-w-2xl mx-auto space-y-2">
          <h3 className="text-2xl font-serif text-slate-900 font-bold tracking-tight">Struktur Organisasi</h3>
          <p className="text-slate-500 text-xs uppercase tracking-wider font-sans">
@@ -1317,13 +1317,15 @@
          />
        </div>
      </section>

      {/* Sumber Daya Manusia (SDM) & Prestasi with Filter */}
      <section className="space-y-8" id="sdm-section">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-amber-100 pb-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Sumber Daya Manusia & Prestasi</h3>
            <p className="text-sm text-slate-500 font-sans">Filter personil staff pelayanan dan pencapaian prestasi panti.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['Semua', 'PPS_Raharjo', 'PPS', 'Pamardi Siwi', 'Mojomulyo', 'Gondang'] as const).map((unit) => {
@@ -1360,9 +1360,7 @@
          </div>
        </div>

        {/* Staff List */}
        <div className="space-y-6">
          <h4 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900">Daftar Pejabat & Staff Pelayanan</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filteredStaff.map((s) => (
              <div key={s.id} className="bg-white border border-amber-100 rounded-2xl p-4 text-center space-y-3 shadow-sm hover:shadow-md hover:border-amber-300 transition duration-200" id={`staff-item-${s.id}`}>
@@ -1369,28 +1369,6 @@
                  <img src={s.photo_url} alt={s.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h5 className="font-serif text-slate-900 text-sm font-bold line-clamp-1">{s.name}</h5>
                  <p className="text-slate-500 text-xs font-sans mt-0.5 line-clamp-1">{s.position}</p>
                  <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[9px] font-extrabold uppercase tracking-widest border border-amber-200">
                    {s.rps_unit === 'PPS' ? 'Kantor Pusat' : s.rps_unit === 'PPS_Raharjo' ? 'PPS Raharjo' : `RPS ${s.rps_unit}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements List */}
        <div className="space-y-6 pt-6">
          <h4 className="text-xs font-sans font-bold uppercase tracking-widest text-slate-900">Prestasi & Piagam Penghargaan</h4>
          {filteredAchievements.length === 0 ? (
            <div className="text-center p-8 bg-amber-50/40 rounded-2xl border border-amber-200">
              <p className="text-amber-700 font-serif italic text-sm">Belum ada prestasi yang dicatat untuk unit ini.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {filteredAchievements.map((a) => (
                <div key={a.id} className="bg-white border border-amber-100 rounded-2xl p-4 flex gap-4 items-start hover:shadow-md hover:border-amber-300 transition duration-200 shadow-sm" id={`achievement-item-${a.id}`}>
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-amber-100 shadow-xs">
                    <img src={a.image_url} alt={a.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
