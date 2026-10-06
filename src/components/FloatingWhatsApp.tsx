import { useState } from "react";
import { CAFE } from "@/lib/cafe";
import { WhatsAppIcon } from "./ActionButtons";

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState("");

  const handleSend = (text?: string) => {
    const message = text || customMsg || "Hello CAF Cafe, I'm visiting Crystal Tower and would like to order or ask about your menu.";
    const url = `${CAFE.whatsappHref}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const quickMessages = [
    "Is table seating available right now?",
    "I would like to order Con Helado and Spanish Latte.",
    "What are your opening hours today?",
    "Where in Crystal Tower are you located?",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* WhatsApp Quick Chat Card */}
      {isOpen && (
        <div className="mb-3 w-80 rounded-2xl border border-border/80 bg-card p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md shrink-0">
                <WhatsAppIcon className="h-6 w-6 fill-current" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-foreground leading-tight">CAF Cafe</p>
                <a
                  href={CAFE.phoneHref}
                  className="text-xs font-bold text-primary hover:underline block leading-tight mt-0.5"
                >
                  📞 {CAFE.phoneDisplay}
                </a>
                <div className="flex items-center gap-1.5 text-[11px] text-[#25D366] mt-0.5">
                  <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
                  WhatsApp Online · Crystal Tower
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            Hi there! 👋 Tap a quick message or chat directly on WhatsApp:
          </p>

          <div className="mt-3 space-y-1.5">
            {quickMessages.map((msg, i) => (
              <button
                key={i}
                onClick={() => handleSend(msg)}
                className="w-full text-left rounded-lg bg-secondary/70 hover:bg-accent/15 hover:border-accent/40 border border-transparent px-3 py-2 text-xs font-medium text-foreground transition-all duration-150 active:scale-[0.98] cursor-pointer"
              >
                💬 {msg}
              </button>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-[#25D366] focus:outline-none"
            />
            <button
              onClick={() => handleSend()}
              className="rounded-xl bg-[#25D366] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#20ba59] active:scale-95 transition-all cursor-pointer"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button on the side */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with CAF Cafe on WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 active:scale-90 hover:shadow-2xl hover:shadow-[#25D366]/50 cursor-pointer"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-300" />
        </span>
        <WhatsAppIcon className="h-7 w-7 fill-current transition-transform group-hover:rotate-12" />

        {/* Tooltip */}
        {!isOpen && (
          <span className="absolute right-16 hidden rounded-lg bg-zinc-900/90 backdrop-blur px-3 py-1.5 text-xs font-medium text-white shadow-md sm:block whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            WhatsApp & Call: {CAFE.phoneDisplay}
          </span>
        )}
      </button>
    </div>
  );
}
