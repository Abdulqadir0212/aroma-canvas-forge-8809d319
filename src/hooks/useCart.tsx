import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type CartItem = {
  id: string;
  product_id: string;
  name: string;
  price: number;
  original_price?: number | null;
  image_url?: string | null;
  quantity: number;
};

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  loading: boolean;
  totalItems: number;
  totalAmount: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: { id: string; name: string; price: number; original_price?: number | null; image_url?: string | null }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

function getSessionId(): string {
  // Session ID is initialized by initSessionHeader() in main.tsx
  let sid = localStorage.getItem("cart_session_id");
  if (!sid) {
    sid = crypto.randomUUID();
    localStorage.setItem("cart_session_id", sid);
  }
  return sid;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const sessionId = getSessionId();

  // Load cart on mount
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      let cartQuery = supabase.from("carts").select("id").limit(1);
      if (userId) {
        cartQuery = cartQuery.eq("user_id", userId);
      } else {
        cartQuery = cartQuery.eq("session_id", sessionId);
      }

      const { data: carts } = await cartQuery;
      if (!carts?.length) return;

      const cid = carts[0].id;
      setCartId(cid);

      const { data: cartItems } = await supabase
        .from("cart_items")
        .select("id, product_id, quantity, products(name, price, original_price, image_url)")
        .eq("cart_id", cid);

      if (cartItems) {
        setItems(
          cartItems.map((ci: any) => ({
            id: ci.id,
            product_id: ci.product_id,
            name: ci.products?.name ?? "",
            price: ci.products?.price ?? 0,
            original_price: ci.products?.original_price,
            image_url: ci.products?.image_url,
            quantity: ci.quantity,
          }))
        );
      }
    } catch (err) {
      console.error("Failed to load cart", err);
    }
  };

  const getOrCreateCart = async (): Promise<string> => {
    if (cartId) return cartId;

    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;

    const payload: any = {};
    if (userId) {
      payload.user_id = userId;
    } else {
      payload.session_id = sessionId;
    }

    const { data, error } = await supabase.from("carts").insert(payload).select("id").single();
    if (error) throw error;
    setCartId(data.id);
    return data.id;
  };

  const addItem = useCallback(async (product: { id: string; name: string; price: number; original_price?: number | null; image_url?: string | null }) => {
    try {
      setLoading(true);
      const cid = await getOrCreateCart();

      // Check if already in cart
      const existing = items.find((i) => i.product_id === product.id);
      if (existing) {
        const newQty = existing.quantity + 1;
        await supabase.from("cart_items").update({ quantity: newQty }).eq("id", existing.id);
        setItems((prev) => prev.map((i) => i.product_id === product.id ? { ...i, quantity: newQty } : i));
      } else {
        const { data, error } = await supabase
          .from("cart_items")
          .insert({ cart_id: cid, product_id: product.id, quantity: 1 })
          .select("id")
          .single();
        if (error) throw error;
        setItems((prev) => [...prev, {
          id: data.id,
          product_id: product.id,
          name: product.name,
          price: product.price,
          original_price: product.original_price,
          image_url: product.image_url,
          quantity: 1,
        }]);
      }
      toast.success(`${product.name} added to cart`);
      setIsOpen(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add item");
    } finally {
      setLoading(false);
    }
  }, [items, cartId]);

  const removeItem = useCallback(async (productId: string) => {
    const item = items.find((i) => i.product_id === productId);
    if (!item) return;
    try {
      await supabase.from("cart_items").delete().eq("id", item.id);
      setItems((prev) => prev.filter((i) => i.product_id !== productId));
    } catch (err) {
      toast.error("Failed to remove item");
    }
  }, [items]);

  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    const item = items.find((i) => i.product_id === productId);
    if (!item) return;
    if (quantity <= 0) return removeItem(productId);
    try {
      await supabase.from("cart_items").update({ quantity }).eq("id", item.id);
      setItems((prev) => prev.map((i) => i.product_id === productId ? { ...i, quantity } : i));
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  }, [items, removeItem]);

  const clearCart = useCallback(async () => {
    if (!cartId) return;
    try {
      await supabase.from("cart_items").delete().eq("cart_id", cartId);
      setItems([]);
    } catch (err) {
      toast.error("Failed to clear cart");
    }
  }, [cartId]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, isOpen, loading, totalItems, totalAmount,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem, removeItem, updateQuantity, clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
