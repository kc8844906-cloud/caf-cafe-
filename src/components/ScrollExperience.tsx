import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "top", label: "Top", icon: "✨" },
  { id: "cinema", label: "Live Cinema", icon: "🎬" },
  { id: "menu", label: "Menu", icon: "☕" },
  { id: "gallery", label: "Photos", icon: "📸" },
  { id: "about", label: "About", icon: "🏛️" },
  { id: "visit", label: "Visit", icon: "📍" },
  { id: "reviews", label: "Reviews", icon: "⭐" },
];

export function ScrollExperience() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [currentSection, setCurrentSection] = useState("top");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;
          const percent = docHeight > 0 ? Math.min(100, Math.max(0, (currentScroll / docHeight) * 100)) : 0;
          setScrollPercent(Math.round(percent));
          setShowScrollTop(currentScroll > 280);

          // Detect active section
          for (let i = SECTIONS.length - 1; i >= 0; i--) {
            const sec = document.getElementById(SECTIONS[i].id);
            if (sec) {
              const rect = sec.getBoundingClientRect();
              if (rect.top <= window.innerHeight * 0.4) {
                setCurrentSection(SECTIONS[i].id);
                break;
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Scroll reveal observer fallback for browsers without CSS animation-timeline
    if (!CSS.supports("(animation-timeline: view()) and (animation-range: entry)")) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
      );

      const elements = document.querySelectorAll(".scroll-reveal");
      elements.forEach((el) => observer.observe(el));

      return () => {
        window.removeEventListener("scroll", handleScroll);
        observer.disconnect();
      };
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentSecObj = SECTIONS.find((s) => s.id === currentSection) || SECTIONS[0];
  const strokeDashoffset = 100 - (scrollPercent / 100) * 100;

  return (
    <>
      {/* 1. Golden Luxury Scroll Progress Bar at Top */}
      <div
        className="pointer-events-none fixed top-0 left-0 right-0 z-50 h-[3px] bg-secondary/40 backdrop-blur-sm"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-amber-600 via-primary to-amber-300 shadow-[0_0_12px_rgba(212,175,55,0.9)] transition-all duration-75 ease-out"
          style={{ width: `${scrollPercent}%` }}
        >
          {/* Glowing particle at the leading tip */}
          <div className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary shadow-[0_0_8px_#ffffff,0_0_16px_rgba(212,175,55,1)]" />
        </div>
      </div>

      {/* 2. Floating Luxury Scroll Assistant / HUD (Bottom Left) */}
      <div className="fixed bottom-5 left-5 z-40 hidden sm:flex items-center gap-2">
        {/* Active Section Pill */}
        <div className="flex items-center gap-2 rounded-full border border-border/80 bg-card/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-xl backdrop-blur-md transition-all duration-300 hover:border-primary/50">
          <span className="text-sm">{currentSecObj.icon}</span>
          <span className="text-muted-foreground">{currentSecObj.label}</span>
          <span className="font-mono text-[11px] text-primary font-bold">
            {scrollPercent}%
          </span>
        </div>

        {/* Scroll To Top Circular Button with Progress Ring */}
        {showScrollTop && (
          <button
            type="button"
            onClick={scrollToTop}
            title="Scroll to top"
            aria-label="Scroll to top"
            className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-card/95 text-primary shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-primary hover:bg-primary hover:text-primary-foreground active:scale-95 cursor-pointer"
          >
            {/* SVG Progress Circle */}
            <svg className="absolute inset-0 h-full w-full -rotate-90 p-0.5" viewBox="0 0 36 36">
              <path
                className="text-border"
                strokeWidth="2.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-primary transition-all duration-100"
                strokeDasharray="100, 100"
                strokeDashoffset={strokeDashoffset}
                strokeWidth="2.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="text-xs font-bold transition-transform group-hover:-translate-y-0.5">
              ↑
            </span>
          </button>
        )}
      </div>
    </>
  );
}
