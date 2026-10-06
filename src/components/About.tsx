import { CAFE } from "@/lib/cafe";

export function About() {
  return (
    <section id="about" className="scroll-reveal mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <figure className="order-last min-w-0 lg:order-first group">
          <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl transition-all duration-300 group-hover:border-primary/50">
            <img
              src="/images/real/caf-bar-counter.jpg"
              alt="Real CAF Cafe espresso bar and bakery counter at Crystal Tower"
              width={1408}
              height={1008}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <figcaption className="mt-3 text-xs font-medium text-muted-foreground flex items-center justify-between">
            <span>Real photo · The CAF Espresso & Brew Bar</span>
            <span className="text-primary font-semibold">Crystal Tower Kuwait</span>
          </figcaption>
        </figure>

        <div className="min-w-0">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-0.5 text-xs font-semibold tracking-widest text-primary uppercase">
            Our Story & Craft
          </span>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
            Kuwait's Premier Specialty Cafe
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            CAF Cafe (كاف كافيه) is celebrated for its distinctive black marble architecture, world-class single-origin beans, and beloved signature creations like Con Helado, Dutch Brew, and Spanish Latte.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Located in Crystal Tower on Ahmad Al Jaber Street, our space is designed for coffee aficionados and relaxed conversations alike. Every cup is brewed with exact grind distribution and temperature precision.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3 border-y border-border/60 py-5">
            <div className="text-center sm:text-left">
              <p className="text-xl font-bold text-primary">7 AM – 11 PM</p>
              <p className="text-xs text-muted-foreground">Open Daily</p>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xl font-bold text-primary">Specialty</p>
              <p className="text-xs text-muted-foreground">Single Origin</p>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xl font-bold text-primary">Kuwait City</p>
              <p className="text-xs text-muted-foreground">Crystal Tower</p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p lang="ar" dir="rtl" className="font-display text-2xl text-accent font-semibold">
              {CAFE.nameAr}
            </p>
            <span className="text-xs text-muted-foreground">Crafted in Kuwait</span>
          </div>
        </div>
      </div>
    </section>
  );
}
