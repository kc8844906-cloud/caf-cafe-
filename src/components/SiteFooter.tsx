import { CAFE } from "@/lib/cafe";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/80 bg-[#07080a] py-14 text-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:grid-cols-2 md:grid-cols-3 sm:px-8">
        {/* Brand */}
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground font-black text-sm tracking-widest">
              CΛF
            </div>
            <div>
              <p className="font-display text-xl font-bold text-foreground">{CAFE.name}</p>
              <p lang="ar" dir="rtl" className="text-xs text-accent">
                {CAFE.nameAr}
              </p>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground max-w-xs">
            Specialty coffee roasters and cafe at Crystal Tower, Ahmad Al Jaber St, Kuwait City. Serving premium coffee, artisan sandwiches, and signature treats.
          </p>
        </div>

        {/* Location & Hours */}
        <div className="min-w-0 space-y-2 text-xs text-muted-foreground">
          <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Location & Hours</p>
          <p className="text-foreground font-medium">{CAFE.address}</p>
          <p>{CAFE.hoursLong}</p>
          <p className="text-muted-foreground">Crystal Tower Ground Floor</p>
        </div>

        {/* Quick Navigation & Directions */}
        <div className="min-w-0 flex flex-col items-start space-y-3">
          <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Navigation & Map</p>
          <a
            href={CAFE.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline underline-offset-4 font-semibold"
          >
            <span>Google Maps Directions</span>
            <span>↗</span>
          </a>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <a href="#menu" className="hover:text-foreground transition-colors">Menu</a>
            <span>·</span>
            <a href="#gallery" className="hover:text-foreground transition-colors">Photos</a>
            <span>·</span>
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
            <span>·</span>
            <a href="#visit" className="hover:text-foreground transition-colors">Visit</a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-border/40 pt-6 px-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground sm:px-8">
        <p>© {new Date().getFullYear()} {CAFE.name}. Crystal Tower, Kuwait City. All rights reserved.</p>
        <p className="text-[11px] text-accent font-medium">Specialty Coffee Experience · Kuwait</p>
      </div>
    </footer>
  );
}
