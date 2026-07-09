import type { Gallery } from "../../types";

export function GaleriView({ galleries }: { galleries: Gallery[] }) {
  const imageGalleries = galleries.filter((gallery) => gallery.type !== 'video');
  const videoGalleries = galleries.filter((gallery) => gallery.type === 'video');

  return (
    <div className="space-y-10 py-6" id="galeri-page">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-black tracking-tight text-slate-900">Galeri Foto & Video</h2>
          <p className="text-sm text-slate-500 mt-2">Dokumentasi kegiatan PPS dan RPS.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {imageGalleries.length === 0 ? (
            <div className="rounded-3xl border border-amber-100 bg-amber-50 p-8 text-center text-slate-600 col-span-full">
              Belum ada foto galeri.
            </div>
          ) : (
            imageGalleries.map((gallery) => (
              <div key={gallery.id} className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={gallery.image_url} alt={gallery.caption} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="p-4 text-sm text-slate-700">{gallery.caption}</div>
              </div>
            ))
          )}
        </div>

        {videoGalleries.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">Video Dokumentasi</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {videoGalleries.map((gallery) => (
                <div key={gallery.id} className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
                  <div className="relative aspect-video bg-black">
                    <img src={gallery.image_url} alt={gallery.caption} className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-white/90 p-3 shadow-lg">
                        <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 text-sm text-slate-700">{gallery.caption}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 2. BERANDA (HOME) VIEW
// ==========================================
