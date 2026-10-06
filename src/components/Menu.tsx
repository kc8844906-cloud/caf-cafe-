import { useState, useMemo } from "react";
import { MENU_ITEMS, MENU_CATEGORIES, MenuItem } from "@/data/menu";
import { useOrder, parseItemPrice } from "@/context/OrderContext";

export function Menu() {
  const { addToCart, setIsCartOpen } = useOrder();
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showRealOnly, setShowRealOnly] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Modal customizer state
  const [modalSize, setModalSize] = useState<"Single" | "Double">("Single");
  const [modalMilk, setModalMilk] = useState<string>("Standard");
  const [modalQty, setModalQty] = useState<number>(1);
  const [modalNotes, setModalNotes] = useState<string>("");

  const handleOpenItem = (item: MenuItem) => {
    setSelectedItem(item);
    setModalSize("Single");
    setModalMilk("Standard");
    setModalQty(1);
    setModalNotes("");
  };

  const hasSizeOption = useMemo(() => {
    if (!selectedItem) return false;
    return selectedItem.price.includes("/") || selectedItem.price.includes(",");
  }, [selectedItem]);

  const currentModalPrice = useMemo(() => {
    if (!selectedItem) return 0;
    let base = parseItemPrice(selectedItem.price, modalSize);
    if (modalMilk.includes("+0.25")) base += 0.25;
    return Number((base * modalQty).toFixed(2));
  }, [selectedItem, modalSize, modalMilk, modalQty]);

  const handleAddFromModal = () => {
    if (!selectedItem) return;
    addToCart(selectedItem, {
      size: hasSizeOption ? modalSize : undefined,
      milk: modalMilk !== "Standard" ? modalMilk : undefined,
      notes: modalNotes.trim() || undefined,
      quantity: modalQty,
    });
    setSelectedItem(null);
  };

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === "ALL" || item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nameAr.includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesReal = !showRealOnly || item.isRealPhoto;

      return matchesCategory && matchesSearch && matchesReal;
    });
  }, [activeCategory, searchQuery, showRealOnly]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: MENU_ITEMS.length };
    for (const item of MENU_ITEMS) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <section id="menu" className="scroll-reveal relative border-y border-border/80 bg-card/40 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs font-semibold tracking-wider text-primary uppercase">
              Official Cafe Menu · كاف كافيه
            </div>
            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
              Specialty Menu & Direct Ordering
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground text-sm">
              Add any dish directly to your cart and place your order right here on the website.
            </p>
          </div>

          {/* Toggle for Real Photo Items */}
          <button
            type="button"
            onClick={() => setShowRealOnly((prev) => !prev)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 border ${
              showRealOnly
                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                : "bg-secondary/70 text-foreground border-border hover:border-primary/50"
            }`}
          >
            <span className="text-sm">★</span>
            <span>{showRealOnly ? "Showing Real Photo Items" : "Filter Real CAF Photos"}</span>
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = categoryCounts[cat.id] ?? 0;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 active:scale-95 cursor-pointer border ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/25 scale-[1.02]"
                      : "bg-background/80 border-border text-muted-foreground hover:text-foreground hover:bg-secondary/80 hover:border-border/80"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <input
              type="text"
              placeholder="Search drinks or food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border/80 bg-background/90 px-3.5 py-2 pl-9 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
            />
            <svg
              className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-border py-16 text-center">
            <p className="text-base text-muted-foreground">No dishes or drinks match your search.</p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("ALL");
                setSearchQuery("");
                setShowRealOnly(false);
              }}
              className="mt-3 text-xs font-bold text-primary hover:underline cursor-pointer active:scale-95"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onSelect={() => handleOpenItem(item)}
                onQuickAdd={() => addToCart(item, { quantity: 1 })}
              />
            ))}
          </div>
        )}

        {/* Bottom Notice */}
        <div className="mt-12 rounded-2xl border border-border/80 bg-secondary/30 p-6 text-center backdrop-blur">
          <p className="text-sm font-semibold text-foreground">
            Custom brewing requests, non-dairy alternatives, and takeaway packaging available directly at the counter.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            All prices in Kuwaiti Dinars (KD). Visit us at Crystal Tower, Ahmad Al Jaber St, Kuwait City.
          </p>
        </div>
      </div>

      {/* Interactive Dish Order & Customization Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border/90 bg-card p-6 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 rounded-full bg-black/70 p-2 text-white hover:bg-black/90 active:scale-90 transition-all cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-muted">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="h-full w-full object-cover"
              />
              {selectedItem.isRealPhoto && (
                <div className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-md">
                  ★ CAF Real Photo
                </div>
              )}
            </div>

            {/* Modal Content */}
            <div className="mt-5 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {selectedItem.name}
                  </h3>
                  <p lang="ar" dir="rtl" className="text-sm font-medium text-accent font-display mt-0.5">
                    {selectedItem.nameAr}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block rounded-xl bg-primary/15 border border-primary/30 px-3 py-1.5 text-base font-bold text-primary">
                    {selectedItem.price}
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-secondary/40 p-3.5 border border-border/60">
                <p className="text-xs font-semibold text-accent uppercase tracking-wider">
                  Description & Tasting Notes
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {selectedItem.description}
                </p>
              </div>

              {/* Size Options (if item has Single / Double) */}
              {hasSizeOption && (
                <div className="rounded-xl border border-border/80 bg-secondary/20 p-3">
                  <p className="text-xs font-bold text-foreground mb-2">Select Portion / Size</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setModalSize("Single")}
                      className={`rounded-lg py-2 text-xs font-bold transition-all border cursor-pointer ${
                        modalSize === "Single"
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : "bg-background text-muted-foreground border-border hover:text-foreground"
                      }`}
                    >
                      Single Shot / Standard
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalSize("Double")}
                      className={`rounded-lg py-2 text-xs font-bold transition-all border cursor-pointer ${
                        modalSize === "Double"
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : "bg-background text-muted-foreground border-border hover:text-foreground"
                      }`}
                    >
                      Double Shot / Large
                    </button>
                  </div>
                </div>
              )}

              {/* Milk preference for coffee */}
              {(selectedItem.category === "WHITE" || selectedItem.category === "BLACK") && (
                <div className="rounded-xl border border-border/80 bg-secondary/20 p-3">
                  <p className="text-xs font-bold text-foreground mb-2">Milk Choice</p>
                  <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                    {["Standard", "Oat Milk (+0.25)", "Almond (+0.25)"].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setModalMilk(m)}
                        className={`rounded-lg py-1.5 px-2 font-medium transition-all border cursor-pointer text-center ${
                          modalMilk === m
                            ? "bg-primary text-primary-foreground border-primary font-bold shadow-sm"
                            : "bg-background text-muted-foreground border-border hover:text-foreground"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Instructions Note */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Special Notes for Barista
                </label>
                <input
                  type="text"
                  placeholder="e.g. Extra hot, low sugar, take-away cup..."
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>

              {/* Quantity and Add to Cart Buttons */}
              <div className="flex items-center gap-3 pt-2">
                {/* Quantity */}
                <div className="flex items-center rounded-xl border border-border bg-secondary/40 p-1">
                  <button
                    type="button"
                    onClick={() => setModalQty((q) => Math.max(1, q - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-muted-foreground hover:bg-secondary hover:text-foreground active:scale-90"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-foreground">
                    {modalQty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setModalQty((q) => q + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-muted-foreground hover:bg-secondary hover:text-foreground active:scale-90"
                  >
                    +
                  </button>
                </div>

                {/* Direct Order Button */}
                <button
                  type="button"
                  onClick={handleAddFromModal}
                  className="flex-1 rounded-xl bg-primary py-3 text-xs font-bold text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all shadow-lg shadow-primary/25 cursor-pointer text-center"
                >
                  Add to Order • {currentModalPrice.toFixed(2)} KD
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function MenuItemCard({
  item,
  onSelect,
  onQuickAdd,
}: {
  item: MenuItem;
  onSelect: () => void;
  onQuickAdd: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/50 active:scale-[0.98] cursor-pointer select-none"
    >
      {/* Dish Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <img
          src={imgError ? "/images/menu/espresso.jpg" : item.image}
          alt={item.name}
          loading="lazy"
          onError={() => setImgError(true)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {item.isRealPhoto && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-bold text-primary-foreground shadow-md">
              <span>★</span> Real Photo
            </span>
          )}
          {item.badge && !item.isRealPhoto && (
            <span className="rounded-full bg-black/70 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-medium text-white shadow-sm border border-white/10">
              {item.badge}
            </span>
          )}
        </div>

        {/* Category Pill */}
        <div className="absolute bottom-3 right-3 rounded-lg bg-black/75 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white border border-white/10">
          {item.category}
        </div>
      </div>

      {/* Dish Details */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {item.name}
              </h3>
              <p lang="ar" dir="rtl" className="text-xs text-accent font-display mt-0.5">
                {item.nameAr}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block rounded-xl bg-secondary px-2.5 py-1 text-sm font-bold text-primary whitespace-nowrap border border-border/80">
                {item.price}
              </span>
            </div>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
          <span className="text-[11px] text-muted-foreground">
            {item.category === "BLACK"
              ? "Single Origin Specialty"
              : item.category === "WHITE"
              ? "Artisan Espresso & Milk"
              : item.category === "SANDWICHES"
              ? "Fresh Baked Bread"
              : "Cold Refreshment"}
          </span>

          {/* Quick Add Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd();
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary/15 border border-primary/40 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            <span>+</span>
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  );
}
