import React, { createContext, useContext, useState, useEffect } from "react";
import { MenuItem } from "@/data/menu";

export interface CartItem {
  cartId: string;
  menuId: string;
  name: string;
  nameAr: string;
  image: string;
  unitPrice: number;
  quantity: number;
  size?: ("Single" | "Double") | undefined;
  milk?: string | undefined;
  notes?: string | undefined;
}

export type OrderStatus = "PLACED" | "PREPARING" | "READY" | "CANCELLED";

export interface CustomerOrder {
  orderId: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  serviceType: "DINE_IN" | "TAKEAWAY";
  tableNumber?: string | undefined;
  notes?: string | undefined;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  cancelledAt?: string | undefined;
  cancelReason?: string | undefined;
}

interface OrderContextType {
  cart: CartItem[];
  orders: CustomerOrder[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isOrdersOpen: boolean;
  setIsOrdersOpen: (open: boolean) => void;
  addToCart: (
    item: MenuItem,
    options?: {
      size?: ("Single" | "Double") | undefined;
      milk?: string | undefined;
      notes?: string | undefined;
      quantity?: number | undefined;
    } | undefined
  ) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
  placeOrder: (details: {
    customerName: string;
    customerPhone: string;
    serviceType: "DINE_IN" | "TAKEAWAY";
    tableNumber?: string | undefined;
    notes?: string | undefined;
  }) => CustomerOrder;
  cancelOrder: (orderId: string, reason?: string | undefined) => void;
  totalCartPrice: number;
  totalCartCount: number;
  activeOrdersCount: number;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function parseItemPrice(priceStr: string, size?: ("Single" | "Double") | undefined): number {
  const matches = priceStr.match(/\d+(\.\d+)?/g);
  if (!matches || matches.length === 0) return 0;
  if (size === "Double" && matches.length > 1) {
    return parseFloat(matches[1] ?? "0");
  }
  return parseFloat(matches[0] ?? "0");
}

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("caf_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("caf_orders");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("caf_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("caf_orders", JSON.stringify(orders));
    } catch (e) {
      console.error("Failed to save orders to localStorage", e);
    }
  }, [orders]);

  const addToCart = (
    item: MenuItem,
    options?: {
      size?: ("Single" | "Double") | undefined;
      milk?: string | undefined;
      notes?: string | undefined;
      quantity?: number | undefined;
    } | undefined
  ) => {
    const size: ("Single" | "Double") | undefined =
      options?.size ?? (item.price.includes("/") || item.price.includes(",") ? "Single" : undefined);
    const milk = options?.milk;
    const notes = options?.notes ?? "";
    const qty = options?.quantity && options.quantity > 0 ? options.quantity : 1;

    let unitPrice = parseItemPrice(item.price, size ?? "Single");
    if (milk && milk.includes("+0.25")) {
      unitPrice += 0.25;
    }

    const cartId = `${item.id}-${size ?? "std"}-${milk ?? "none"}-${notes ? encodeURIComponent(notes) : "none"}`;

    setCart((prev) => {
      const existing = prev.find((i) => i.cartId === cartId);
      if (existing) {
        return prev.map((i) =>
          i.cartId === cartId ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      const newItem: CartItem = {
        cartId,
        menuId: item.id,
        name: item.name,
        nameAr: item.nameAr,
        image: item.image,
        unitPrice,
        quantity: qty,
        size,
        milk,
        notes,
      };
      return [...prev, newItem];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((i) => i.cartId !== cartId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (details: {
    customerName: string;
    customerPhone: string;
    serviceType: "DINE_IN" | "TAKEAWAY";
    tableNumber?: string | undefined;
    notes?: string | undefined;
  }): CustomerOrder => {
    const orderId = `CAF-${Math.floor(1000 + Math.random() * 9000)}`;
    const total = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

    const newOrder: CustomerOrder = {
      orderId,
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + " Today",
      customerName: details.customerName,
      customerPhone: details.customerPhone,
      serviceType: details.serviceType,
      tableNumber: details.tableNumber,
      notes: details.notes,
      items: [...cart],
      total: Number(total.toFixed(2)),
      status: "PLACED",
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setIsCartOpen(false);
    setIsOrdersOpen(true);
    return newOrder;
  };

  const cancelOrder = (orderId: string, reason = "Cancelled by customer directly") => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.orderId === orderId
          ? {
              ...ord,
              status: "CANCELLED" as const,
              cancelledAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              cancelReason: reason,
            }
          : ord
      )
    );
  };

  const totalCartPrice = Number(
    cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0).toFixed(2)
  );

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const activeOrdersCount = orders.filter((o) => o.status === "PLACED" || o.status === "PREPARING").length;

  return (
    <OrderContext.Provider
      value={{
        cart,
        orders,
        isCartOpen,
        setIsCartOpen,
        isOrdersOpen,
        setIsOrdersOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        placeOrder,
        cancelOrder,
        totalCartPrice,
        totalCartCount,
        activeOrdersCount,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return ctx;
}
