import { useState, useRef } from "react";
import { useOrder } from "@/context/OrderContext";

interface VideoOption {
  id: string;
  title: string;
  titleAr: string;
  tag: string;
  src: string;
  poster: string;
  description: string;
}

const VIDEOS: VideoOption[] = [
  {
    id: "barista-pour",
    title: "Latte Art & Micro-Foam Velvet Pour",
    titleAr: "صب الحليب المخملي واللاتيه آرت",
    tag: "Signature Craft",
    src: "/videos/caf-barista-craft.mp4",
    poster: "/images/real/caf-flatwhite-cake.jpg",
    description: "Watch our master barista pour silky textured micro-foam creating our award-winning Flat-White and Spanish Latte.",
  },
  {
    id: "espresso-pull",
    title: "Precision 9-Bar Espresso Extraction",
    titleAr: "استخلاص الإسبريسو بالضغط العالي",
    tag: "Single Origin",
    src: "/videos/caf-espresso-extraction.mp4",
    poster: "/images/real/caf-interior-wide.jpg",
    description: "Freshly ground specialty beans extracted at exactly 92°C to produce the dense, aromatic golden crema at CAF Cafe.",
  },
];

export function CinematicVideo() {
  const [selectedVideo, setSelectedVideo] = useState<VideoOption>(VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setIsCartOpen } = useOrder();

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSelectVideo = (vid: VideoOption) => {
    setSelectedVideo(vid);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  };

  return (
    <section id="cinema" className="scroll-reveal relative overflow-hidden border-t border-border/80 bg-gradient-to-b from-background via-card to-background py-16 sm:py-24">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[800px] rounded-full bg-primary/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-primary uppercase shadow-sm">
              <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
              Live Craft Motion · 1080p HD
            </div>
            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Specialty Coffee in Motion
            </h2>
            <p className="mt-2 text-muted-foreground text-sm max-w-xl">
              Experience the craftsmanship behind every brew at Crystal Tower. High-definition footage captured straight from the barista bar.
            </p>
          </div>

          {/* Video Switcher Tabs */}
          <div className="flex flex-wrap gap-2">
            {VIDEOS.map((vid) => {
              const isSelected = selectedVideo.id === vid.id;
              return (
                <button
                  key={vid.id}
                  type="button"
                  onClick={() => handleSelectVideo(vid)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all active:scale-95 cursor-pointer ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-secondary/70 text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <span>{vid.id === "barista-pour" ? "✨" : "☕"}</span>
                  <span>{vid.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cinematic Video Showcase Container */}
        <div className="mt-8 relative group rounded-2xl sm:rounded-3xl border border-primary/30 bg-black/90 p-2 sm:p-3 shadow-2xl shadow-primary/10 overflow-hidden">
          {/* Subtle Video Border Glow */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl aspect-[16/9] w-full bg-black">
            <video
              ref={videoRef}
              key={selectedVideo.src}
              src={selectedVideo.src}
              poster={selectedVideo.poster}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Cinematic Gradient Vignette */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40" />

            {/* Top Left Live Stream Badge */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2.5">
              <span className="flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 text-[11px] font-bold text-amber-300 backdrop-blur-md border border-amber-500/30">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                LIVE AMBIENCE
              </span>
              <span className="hidden sm:inline-flex rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium text-white/80 backdrop-blur-md">
                1080p HD · 60 FPS
              </span>
            </div>

            {/* Top Right Controls (Play/Pause & Mute) */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2">
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md border border-white/20 transition-all hover:bg-black/90 hover:scale-110 active:scale-90 cursor-pointer"
              >
                {isMuted ? "🔇" : "🔊"}
              </button>
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground backdrop-blur-md shadow-lg transition-all hover:scale-110 active:scale-90 cursor-pointer"
              >
                {isPlaying ? "⏸" : "▶"}
              </button>
            </div>

            {/* Bottom Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div className="max-w-xl text-white">
                <div className="inline-block rounded-md bg-primary/90 px-2 py-0.5 text-[10px] font-black uppercase text-primary-foreground tracking-wider mb-1.5">
                  {selectedVideo.tag}
                </div>
                <h3 className="text-lg sm:text-2xl font-bold drop-shadow-md">
                  {selectedVideo.title}
                </h3>
                <p lang="ar" dir="rtl" className="text-xs sm:text-sm text-accent font-display mt-0.5">
                  {selectedVideo.titleAr}
                </p>
                <p className="mt-1.5 text-xs text-white/80 sm:text-sm line-clamp-2 drop-shadow">
                  {selectedVideo.description}
                </p>
              </div>

              {/* Action Buttons inside video */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="#menu"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-white/20 px-4 py-2 text-xs font-bold text-white backdrop-blur-md hover:bg-white/30 transition-all active:scale-95"
                >
                  <span>☕ Menu</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all active:scale-95 cursor-pointer"
                >
                  <span>🛒 Order This Brew</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Spec Highlights */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <div className="rounded-xl border border-border/70 bg-card/60 p-3.5 backdrop-blur-sm">
            <span className="text-xl">⏱️</span>
            <h4 className="mt-1 text-xs font-bold text-foreground">9-Bar Pressure</h4>
            <p className="text-[11px] text-muted-foreground">Optimal espresso extraction</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card/60 p-3.5 backdrop-blur-sm">
            <span className="text-xl">🌡️</span>
            <h4 className="mt-1 text-xs font-bold text-foreground">92°C Temperature</h4>
            <p className="text-[11px] text-muted-foreground">Thermal brew consistency</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card/60 p-3.5 backdrop-blur-sm">
            <span className="text-xl">🥛</span>
            <h4 className="mt-1 text-xs font-bold text-foreground">Micro-Foam Velvet</h4>
            <p className="text-[11px] text-muted-foreground">Silky latte art texture</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card/60 p-3.5 backdrop-blur-sm">
            <span className="text-xl">✨</span>
            <h4 className="mt-1 text-xs font-bold text-foreground">Single Origin</h4>
            <p className="text-[11px] text-muted-foreground">100% Arabica craft beans</p>
          </div>
        </div>
      </div>
    </section>
  );
}
