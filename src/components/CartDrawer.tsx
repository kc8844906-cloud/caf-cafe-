import { useState } from "react";
import { useOrder } from "@/context/OrderContext";

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    placeOrder,
    totalCartPrice,
    totalCartCount,
  } = useOrder();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [serviceType, setServiceType] = useState<"DINE_IN" | "TAKEAWAY">("DINE_IN");
  const [tableNumber, setTableNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [formError, setFormError] = useState("");

  if (!isCartOpen) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setFormError("Please enter your name.");
      return;
    }
    if (!customerPhone.trim()) {
      setFormError("Please enter your contact phone number.");
      return;
    }
    if (serviceType === "DINE_IN" && !tableNumber.trim()) {
      setFormError("Please enter your Table number (or type 'Bar').");
      return;
    }

    setFormError("");
    placeOrder({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      serviceType,
      tableNumber: serviceType === "DINE_IN" ? tableNumber.trim() : undefined,
      notes: notes.trim(),
    });
    setIsCheckingOut(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm transition-all animate-in fade-in duration-200"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full w-full max-w-md flex-col bg-card border-l border-border/80 shadow-2xl animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-border/80 p-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary font-bold">
              🛒
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">
                {isCheckingOut ? "Checkout & Confirm" : "Your Order"}
              </h2>
              <p className="text-xs text-muted-foreground">
                {totalCartCount} item{totalCartCount !== 1 ? "s" : ""} · Crystal Tower
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsCartOpen(false);
              setIsCheckingOut(false);
            }}
            className="rounded-xl p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-2xl text-muted-foreground">
                ☕
              </div>
              <h3 className="mt-4 text-base font-bold text-foreground">Your order is empty</h3>
              <p className="mt-1 text-xs text-muted-foreground max-w-xs">
                Explore our specialty coffees, cold brews, Con Helado, and artisan sandwiches.
              </p>
              <a
                href="#menu"
                onClick={() => setIsCartOpen(false)}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all shadow-md shadow-primary/20"
              >
                Browse Menu
              </a>
            </div>
          ) : isCheckingOut ? (
            /* Checkout Form */
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="rounded-xl border border-border/80 bg-secondary/30 p-3.5">
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                  Order Type
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setServiceType("DINE_IN")}
                    className={`rounded-lg py-2.5 text-xs font-bold transition-all cursor-pointer border ${
                      serviceType === "DINE_IN"
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-background text-muted-foreground border-border hover:text-foreground"
                    }`}
                  >
                    ☕ Dine-In (Table)
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceType("TAKEAWAY")}
                    className={`rounded-lg py-2.5 text-xs font-bold transition-all cursor-pointer border ${
                      serviceType === "TAKEAWAY"
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-background text-muted-foreground border-border hover:text-foreground"
                    }`}
                  >
                    🛍️ Takeaway (Pickup)
                  </button>
                </div>
              </div>

              {serviceType === "DINE_IN" && (
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Table Number <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Table 4 or Bar Seating"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Your Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Abdullah / Sarah"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Contact Mobile Number <span className="text-primary">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +965 5255 3551"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Barista Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Extra hot, separate sugar, light ice..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none resize-none"
                />
              </div>

              <div className="rounded-xl border border-border/60 bg-secondary/20 p-3 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Payment Method:</span> Pay directly at the counter upon order (K-Net, Credit Card, or Cash).
              </div>

              {formError && (
                <p className="text-xs font-semibold text-destructive">{formError}</p>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="flex-1 rounded-xl border border-border px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-secondary cursor-pointer"
                >
                  ← Back to Cart
                </button>
                <button
                  type="submit"
                  className="flex-[2] rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all shadow-md shadow-primary/20 cursor-pointer"
                >
                  Confirm Order ({totalCartPrice.toFixed(2)} KD)
                </button>
              </div>
            </form>
          ) : (
            /* Items List */
            <div className="space-y-3.5">
              {cart.map((item) => (
                <div
                  key={item.cartId}
                  className="flex items-center gap-3 rounded-2xl border border-border/80 bg-secondary/20 p-3 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-14 w-14 rounded-xl object-cover border border-border/60 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-foreground leading-snug">{item.name}</p>
                    <p lang="ar" dir="rtl" className="text-[11px] text-accent font-display leading-tight">
                      {item.nameAr}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1 text-[10px] text-muted-foreground">
                      {item.size && <span className="rounded bg-secondary px-1.5 py-0.5">{item.size}</span>}
                      {item.milk && <span className="rounded bg-secondary px-1.5 py-0.5">{item.milk}</span>}
                      {item.notes && <span className="italic">"{item.notes}"</span>}
                    </div>
                    <p className="mt-1 text-xs font-bold text-primary">
                      {(item.unitPrice * item.quantity).toFixed(2)} KD
                    </p>
                  </div>

                  {/* Quantity selector */}
                  <div className="flex items-center gap-1.5 rounded-xl border border-border bg-background p-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.cartId, -1)}
                      className="flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold text-muted-foreground hover:bg-secondary hover:text-foreground active:scale-90"
                    >
                      -
                    </button>
                    <span className="w-5 text-center text-xs font-bold text-foreground">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.cartId, 1)}
                      className="flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold text-muted-foreground hover:bg-secondary hover:text-foreground active:scale-90"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.cartId)}
                    className="text-xs text-muted-foreground hover:text-destructive p-1"
                    title="Remove item"
                  >
                    🗑
                  </button>
                </div>
              ))}

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[11px] font-medium text-muted-foreground hover:text-destructive underline"
                >
                  Clear all items
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer (if not checking out and cart has items) */}
        {cart.length > 0 && !isCheckingOut && (
          <div className="border-t border-border/80 bg-card p-5">
            <div className="space-y-1.5 text-xs mb-4">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal ({totalCartCount} items)</span>
                <span>{totalCartPrice.toFixed(2)} KD</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Service & Packaging</span>
                <span className="text-emerald-400 font-semibold">Free</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-foreground pt-2 border-t border-border/60">
                <span>Total Amount</span>
                <span className="text-primary text-base font-extrabold">
                  {totalCartPrice.toFixed(2)} KD
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCheckingOut(true)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all shadow-lg shadow-primary/25 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <span>→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
