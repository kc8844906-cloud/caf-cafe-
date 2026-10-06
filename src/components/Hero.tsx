import { CAFE } from "@/lib/cafe";
import { DirectionsButton } from "./ActionButtons";

export function Hero() {
  return (
    <section id="top" className="relative mx-auto max-w-6xl px-5 pt-8 pb-12 sm:px-8 sm:pt-14 sm:pb-16">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -top-10 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute top-40 right-10 h-64 w-64 rounded-full bg-accent/10 blur-[100px]" />

      <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-primary uppercase shadow-sm">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Official Location · Crystal Tower Kuwait
          </div>

          <h1 className="mt-5 text-4xl leading-[1.08] font-bold text-foreground sm:text-5xl lg:text-6xl">
            Where Craft Coffee Meets Modern Luxury
          </h1>

          <p lang="ar" dir="rtl" className="mt-3 font-display text-2xl text-accent font-medium">
            {CAFE.nameAr}
          </p>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Experience Kuwait City's premier specialty coffee destination. From our famous <strong className="text-foreground">Con Helado</strong> and <strong className="text-foreground">Spanish Latte</strong> to slow-extracted Dutch Brew and artisan sandwiches.
          </p>

          {/* Action Buttons: Clean without duplicate WhatsApp/Phone */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#menu"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:bg-primary/90 hover:shadow-primary/30 active:scale-95"
            >
              <span>Explore Real Menu</span>
              <span>↓</span>
            </a>
            <DirectionsButton />
          </div>

          {/* Info pill */}
          <div className="mt-7 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              {CAFE.hours}
            </span>
            <span>·</span>
            <span>Ahmad Al Jaber St, Kuwait City</span>
            <span>·</span>
            <span className="text-accent font-semibold">4.1 ★ (635+ Reviews)</span>
          </div>
        </div>

        {/* Real photo showcase (restored authentic cafe photo) */}
        <figure className="relative min-w-0 group">
          <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-primary/10">
            <img
              src="/images/real/caf-interior-wide.jpg"
              alt="Authentic interior of CAF Cafe at Crystal Tower, Kuwait City"
              width={1600}
              height={1067}
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute -bottom-4 right-4 sm:right-6 rounded-xl bg-card/95 backdrop-blur-md border border-border/80 px-4 py-2.5 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <p className="text-xs font-bold text-foreground">CAF Cafe Crystal Tower</p>
            </div>
            <p className="text-[11px] text-muted-foreground">Verified Real Location Photo</p>
          </div>
        </figure>
      </div>

      {/* Elegant Scroll Indicator pointing to the Cinema section */}
      <div className="mt-12 flex flex-col items-center justify-center">
        <a
          href="#cinema"
          className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
        >
          <span className="text-[11px] font-semibold tracking-widest uppercase opacity-80 group-hover:opacity-100">
            Scroll to Watch Live Video ↓
          </span>
          {/* Animated Mouse Icon */}
          <div className="relative flex h-8 w-5 justify-center rounded-full border-2 border-primary/50 p-1 group-hover:border-primary group-hover:shadow-[0_0_10px_rgba(212,175,55,0.4)] transition-all">
            <div className="h-1.5 w-1 rounded-full bg-primary animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
}
