import { useState } from "react";
import { CAFE } from "@/lib/cafe";
import { DirectionsButton } from "./ActionButtons";

export function Visit() {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(CAFE.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="visit" className="scroll-reveal border-y border-border/80 bg-card/60 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-0.5 text-xs font-semibold tracking-wider text-primary uppercase">
            Location & Hours
          </div>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">Visit Us in Kuwait City</h2>

          <dl className="mt-8 space-y-4">
            {/* Address */}
            <div className="rounded-xl border border-border/60 bg-secondary/40 p-4 transition-colors hover:border-primary/40">
              <div className="flex items-center justify-between">
                <dt className="text-xs font-bold tracking-wider text-primary uppercase">
                  Address
                </dt>
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent hover:text-primary transition-colors cursor-pointer active:scale-95"
                >
                  {copied ? "✓ Copied!" : "📋 Copy Address"}
                </button>
              </div>
              <dd className="mt-1 text-base text-foreground font-medium">{CAFE.address}</dd>
            </div>

            {/* Opening Hours */}
            <div className="rounded-xl border border-border/60 bg-secondary/40 p-4 transition-colors hover:border-primary/40">
              <dt className="text-xs font-bold tracking-wider text-primary uppercase">
                Opening Hours
              </dt>
              <dd className="mt-1 text-base text-foreground font-medium">{CAFE.hoursLong}</dd>
            </div>

            {/* Experience */}
            <div className="rounded-xl border border-border/60 bg-secondary/40 p-4 transition-colors hover:border-primary/40">
              <dt className="text-xs font-bold tracking-wider text-primary uppercase">
                Experience
              </dt>
              <dd className="mt-1 text-base text-foreground font-medium">
                Specialty Single Origin Roasts, Con Helado & Artisan Bakery
              </dd>
            </div>
          </dl>

          {/* Action Buttons: Clean without duplicate WhatsApp/Phone */}
          <div className="mt-8 flex flex-wrap gap-3">
            <DirectionsButton />
          </div>
        </div>

        {/* Live Map */}
        <div className="min-w-0 flex flex-col">
          <div className="relative overflow-hidden rounded-2xl border border-border/80 shadow-2xl bg-muted">
            <iframe
              title="Map showing CAF Cafe at Crystal Tower, Ahmad Al Jaber St, Kuwait City"
              src="https://www.openstreetmap.org/export/embed.html?bbox=47.973%2C29.373%2C47.991%2C29.385&layer=mapnik&marker=29.3789%2C47.9819"
              loading="lazy"
              className="aspect-[4/3] w-full border-0 filter contrast-[1.05]"
            />
            {/* Overlay Pin Badge */}
            <div className="absolute top-3 left-3 rounded-lg bg-black/80 backdrop-blur px-3 py-1.5 text-xs text-white border border-white/10 shadow-md">
              <span className="font-bold text-primary">CAF Cafe</span> · Crystal Tower Kuwait
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
            <a
              href={CAFE.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline underline-offset-4"
            >
              <span>Open in Google Maps App</span>
              <span>↗</span>
            </a>
            <span>Free Parking Available at Crystal Tower</span>
          </div>
        </div>
      </div>
    </section>
  );
}
