import { useState } from "react";
import { REAL_CAFE_GALLERY } from "@/data/menu";

export function RealGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <section id="gallery" className="scroll-reveal border-t border-border/80 bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-primary uppercase">
              Authentic Photography
            </div>
            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
              Inside CAF Cafe Crystal Tower
            </h2>
            <p className="mt-2 text-muted-foreground text-sm max-w-xl">
              Real moments, authentic ambiance, and signature creations captured inside our Kuwait City location. Tap any photo to zoom.
            </p>
          </div>
          <p className="text-xs font-medium text-accent">
            5 Verified Real Photos · Crystal Tower
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REAL_CAFE_GALLERY.map((item, index) => {
            const isLarge = index === 0 || index === 2;
            return (
              <figure
                key={item.id}
                onClick={() => setSelectedPhoto(item.image)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelectedPhoto(item.image)}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-border/80 bg-card shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-primary/50 active:scale-[0.98] select-none ${
                  isLarge ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 transition-opacity" />
                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <div className="inline-block rounded-full bg-primary/90 px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase text-primary-foreground mb-2">
                    {item.tag}
                  </div>
                  <h3 className="text-base font-bold leading-snug drop-shadow-sm text-white group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p lang="ar" dir="rtl" className="text-xs text-accent font-display mt-0.5">
                    {item.titleAr}
                  </p>
                  <p className="mt-1.5 text-xs text-zinc-300 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </figure>
            );
          })}
        </div>
      </div>

      {/* Modal Lightbox */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md transition-all animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-border/60 bg-card p-2 shadow-2xl"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 rounded-full bg-black/70 p-2.5 text-white hover:bg-black/90 active:scale-90 transition-all cursor-pointer"
              aria-label="Close photo"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedPhoto}
              alt="CAF Cafe Real Full View"
              className="max-h-[85vh] w-auto rounded-xl object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
