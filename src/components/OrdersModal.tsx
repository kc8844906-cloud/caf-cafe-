import { useState } from "react";
import { useOrder, CustomerOrder } from "@/context/OrderContext";

export function OrdersModal() {
  const { orders, isOrdersOpen, setIsOrdersOpen, cancelOrder } = useOrder();
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);

  if (!isOrdersOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm transition-all animate-in fade-in duration-200"
      onClick={() => setIsOrdersOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl border border-border/80 bg-card shadow-2xl animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border/80 p-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary font-bold">
              📋
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">My Orders & Live Status</h2>
              <p className="text-xs text-muted-foreground">
                Track your active orders or cancel anytime directly from here.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOrdersOpen(false)}
            className="rounded-xl p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
            aria-label="Close orders"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {orders.length === 0 ? (
            <div className="py-16 text-center">
              <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-secondary text-2xl text-muted-foreground">
                🧾
              </div>
              <h3 className="mt-4 text-base font-bold text-foreground">No orders placed yet</h3>
              <p className="mt-1 text-xs text-muted-foreground max-w-xs mx-auto">
                Once you order coffee or sandwiches, you can track their status and cancel them here.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <OrderCard
                key={order.orderId}
                order={order}
                isConfirmingCancel={cancellingOrderId === order.orderId}
                onStartCancel={() => setCancellingOrderId(order.orderId)}
                onAbortCancel={() => setCancellingOrderId(null)}
                onConfirmCancel={() => {
                  cancelOrder(order.orderId);
                  setCancellingOrderId(null);
                }}
              />
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-border/80 p-4 bg-secondary/20 flex justify-between items-center text-xs text-muted-foreground">
          <span>Need help with an order? Contact our baristas at Crystal Tower.</span>
          <button
            type="button"
            onClick={() => setIsOrdersOpen(false)}
            className="rounded-xl bg-secondary border border-border px-4 py-2 font-semibold text-foreground hover:bg-secondary/80 active:scale-95 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function OrderCard({
  order,
  isConfirmingCancel,
  onStartCancel,
  onAbortCancel,
  onConfirmCancel,
}: {
  order: CustomerOrder;
  isConfirmingCancel: boolean;
  onStartCancel: () => void;
  onAbortCancel: () => void;
  onConfirmCancel: () => void;
}) {
  const isCancelled = order.status === "CANCELLED";

  return (
    <div
      className={`rounded-2xl border p-4.5 transition-all ${
        isCancelled
          ? "border-destructive/30 bg-destructive/5 opacity-85"
          : "border-border/80 bg-secondary/25 shadow-sm"
      }`}
    >
      {/* Top Details & Status Badge */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/60 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-base font-extrabold text-foreground">
              #{order.orderId}
            </span>
            <span className="rounded-lg bg-secondary px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
              {order.serviceType === "DINE_IN" ? `☕ Dine-In · Table ${order.tableNumber || "Bar"}` : "🛍️ Takeaway"}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Placed at {order.createdAt} · Customer: <strong className="text-foreground">{order.customerName}</strong> ({order.customerPhone})
          </p>
        </div>

        <div>
          {isCancelled ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/15 border border-destructive/30 px-3 py-1 text-xs font-bold text-destructive">
              <span className="h-2 w-2 rounded-full bg-destructive" />
              Cancelled by Customer
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-400">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              Order Placed · Preparing at Bar
            </span>
          )}
        </div>
      </div>

      {/* Items in Order */}
      <div className="mt-3 space-y-2">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-secondary font-bold text-[11px] text-primary">
                {item.quantity}x
              </span>
              <span className="font-medium text-foreground">{item.name}</span>
              {item.size && (
                <span className="text-[10px] text-muted-foreground">({item.size})</span>
              )}
              {item.milk && (
                <span className="text-[10px] text-muted-foreground">[{item.milk}]</span>
              )}
            </div>
            <span className="font-semibold text-foreground">
              {(item.unitPrice * item.quantity).toFixed(2)} KD
            </span>
          </div>
        ))}
      </div>

      {order.notes && (
        <p className="mt-2 text-[11px] text-muted-foreground bg-secondary/40 rounded-lg p-2 italic">
          Note to Barista: "{order.notes}"
        </p>
      )}

      {/* Total & Action / Self-Cancel Area */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-3">
        <div>
          <span className="text-xs text-muted-foreground">Total: </span>
          <span className="text-base font-extrabold text-primary">
            {order.total.toFixed(2)} KD
          </span>
          <span className="ml-2 text-[11px] text-muted-foreground">(Pay at counter)</span>
        </div>

        {/* Customer Self-Cancellation Button */}
        <div>
          {isCancelled ? (
            <span className="text-xs text-muted-foreground italic">
              Order cancelled at {order.cancelledAt || "recently"}.
            </span>
          ) : isConfirmingCancel ? (
            <div className="flex items-center gap-2 animate-in fade-in">
              <span className="text-xs text-destructive font-semibold">Confirm Cancel?</span>
              <button
                type="button"
                onClick={onConfirmCancel}
                className="rounded-xl bg-destructive px-3 py-1.5 text-xs font-bold text-white hover:bg-destructive/90 active:scale-95 transition-all cursor-pointer"
              >
                Yes, Cancel Order
              </button>
              <button
                type="button"
                onClick={onAbortCancel}
                className="rounded-xl border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary cursor-pointer"
              >
                Keep Order
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onStartCancel}
              className="inline-flex items-center gap-1.5 rounded-xl border border-destructive/40 bg-destructive/10 px-3.5 py-1.5 text-xs font-bold text-destructive hover:bg-destructive hover:text-white active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              <span>❌</span>
              <span>Cancel My Order</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
