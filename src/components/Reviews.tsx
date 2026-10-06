import { CAFE } from "@/lib/cafe";

export function Reviews() {
  return (
    <section id="reviews" className="scroll-reveal mx-auto max-w-6xl px-5 py-16 text-center sm:px-8 sm:py-20">
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-0.5 text-xs font-semibold tracking-wider text-primary uppercase">
        Guest Feedback
      </span>
      <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">What Our Guests Say</h2>
      
      <div className="mt-8 flex items-center justify-center gap-1 text-primary text-2xl">
        {"★★★★★".split("").map((star, i) => (
          <span key={i}>{star}</span>
        ))}
      </div>

      <p className="mt-2 font-display text-4xl font-bold text-foreground sm:text-5xl">
        {CAFE.rating} <span className="text-xl font-normal text-muted-foreground">/ 5.0</span>
      </p>

      <p className="mt-2 text-sm text-muted-foreground font-medium">
        Based on {CAFE.reviewCount}+ authentic reviews on Google Maps
      </p>

      <div className="mx-auto mt-6 flex justify-center">
        <a
          href={CAFE.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-6 py-3 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground active:scale-95 shadow-sm"
        >
          <span>Read Reviews on Google Maps</span>
          <span>↗</span>
        </a>
      </div>
    </section>
  );
}
