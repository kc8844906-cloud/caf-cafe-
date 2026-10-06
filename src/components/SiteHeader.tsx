import { useState, useEffect } from "react";
import { CAFE } from "@/lib/cafe";
import { DirectionsButton, WhatsAppButton, WhatsAppIcon } from "./ActionButtons";
import { useOrder } from "@/context/OrderContext";

const navLinks = [
  { href: "#cinema", label: "Live Cinema", labelAr: "فيديو كافيه" },
  { href: "#menu", label: "Menu", labelAr: "المنيو" },
  { href: "#gallery", label: "Photos", labelAr: "الصور" },
  { href: "#about", label: "About", labelAr: "عن كاف" },
  { href: "#visit", label: "Visit Us", labelAr: "موقعنا" },
];

export function SiteHeader() {
  const [activeNav, setActiveNav] = useState("#menu");
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalCartCount, totalCartPrice, setIsCartOpen, orders, setIsOrdersOpen } = useOrder();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeOrdersCount = orders.filter((o) => o.status === "PLACED" || o.status === "PREPARING").length;

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        isScrolled
          ? "border-primary/30 bg-background/95 backdrop-blur-xl shadow-xl shadow-black/40 py-1"
          : "border-border/80 bg-background/90 backdrop-blur-md py-0"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        {/* Brand / Logo */}
        <a
          href="#top"
          className="group flex items-center gap-3 transition-transform active:scale-95"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground font-black text-lg tracking-widest shadow-md group-hover:shadow-primary/30">
            CΛF
          </div>
          <div className="min-w-0">
            <span className="block font-display text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
              {CAFE.name}
            </span>
            <span lang="ar" dir="rtl" className="block text-xs font-medium text-accent">
              {CAFE.nameAr} · Crystal Tower
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-3">
          <nav aria-label="Main Navigation" className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = activeNav === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setActiveNav(link.href)}
                  className={`relative rounded-lg px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95 ${
                    isActive
                      ? "text-primary bg-primary/10 shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-primary rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Cart & Orders Buttons */}
          <div className="flex items-center gap-2">
            {/* My Orders Button */}
            {orders.length > 0 && (
              <button
                type="button"
                onClick={() => setIsOrdersOpen(true)}
                className="relative inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-secondary/60 px-3 py-1.5 text-xs font-semibold text-foreground hover:border-primary/50 transition-all active:scale-95 cursor-pointer"
              >
                <span>📋</span>
                <span className="hidden sm:inline">My Orders</span>
                {activeOrdersCount > 0 && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-black text-black">
                    {activeOrdersCount}
                  </span>
                )}
              </button>
            )}

            {/* Cart Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all shadow-md shadow-primary/20 cursor-pointer"
            >
              <span>🛒</span>
              <span className="hidden sm:inline">Order</span>
              <span className="rounded-full bg-primary-foreground/20 px-1.5 py-0.2 text-[11px] font-black">
                {totalCartCount}
              </span>
              {totalCartPrice > 0 && (
                <span className="hidden md:inline font-semibold opacity-90">
                  · {totalCartPrice.toFixed(2)} KD
                </span>
              )}
            </button>

            {/* Phone */}
            <a
              href={CAFE.phoneHref}
              className="hidden xl:inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-secondary/50 px-3 py-1.5 text-xs font-semibold text-foreground hover:border-primary/50 transition-colors"
            >
              <span className="text-primary text-sm">📞</span>
              <span>{CAFE.phoneDisplay}</span>
            </a>

            {/* WhatsApp */}
            <WhatsAppButton className="hidden sm:inline-flex px-3 py-1.5 text-xs font-medium" />

            {/* Directions */}
            <DirectionsButton className="hidden lg:inline-flex px-3 py-1.5 text-xs" />
          </div>
        </div>
      </div>

      {/* Mobile Navigation bar with Cart, Orders, Phone & WhatsApp */}
      <nav
        aria-label="Mobile Navigation"
        className="flex items-center justify-between border-t border-border/60 bg-background/95 px-4 py-2 md:hidden overflow-x-auto gap-2"
      >
        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeNav === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveNav(link.href)}
                className={`rounded-lg px-2 py-1 text-xs font-medium transition-all active:scale-90 ${
                  isActive
                    ? "bg-primary text-primary-foreground font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {orders.length > 0 && (
            <button
              type="button"
              onClick={() => setIsOrdersOpen(true)}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-foreground bg-secondary px-2 py-1 rounded-lg active:scale-95"
            >
              <span>📋</span>
              <span>Orders</span>
              {activeOrdersCount > 0 && (
                <span className="h-2 w-2 rounded-full bg-amber-400" />
              )}
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-primary-foreground bg-primary px-2.5 py-1 rounded-lg active:scale-95 shadow-sm"
          >
            <span>🛒</span>
            <span>{totalCartCount}</span>
          </button>

          <a
            href={CAFE.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#25D366] bg-[#25D366]/10 px-2 py-1 rounded-lg active:scale-95"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
            <span>WA</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
