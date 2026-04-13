import { useCart } from "@/hooks/useCart";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const { items, isOpen, closeCart, totalItems, totalAmount, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-heading text-secondary flex items-center gap-2">
            <ShoppingBag size={20} className="text-gold" />
            Your Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag size={48} className="text-muted-foreground/30 mb-4" />
            <p className="font-body text-muted-foreground">Your cart is empty</p>
            <button onClick={closeCart} className="mt-4 font-body text-gold text-sm hover:underline">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map((item) => (
                <div key={item.product_id} className="flex gap-3 bg-muted/50 rounded-xl p-3">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-muted flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading text-sm font-semibold text-secondary line-clamp-1">{item.name}</h4>
                    <p className="font-body text-gold font-bold text-sm mt-0.5">₹{item.price.toLocaleString("en-IN")}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:border-gold/40 transition-colors">
                        <Minus size={14} />
                      </button>
                      <span className="font-body text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:border-gold/40 transition-colors">
                        <Plus size={14} />
                      </button>
                      <button onClick={() => removeItem(item.product_id)}
                        className="ml-auto text-destructive/60 hover:text-destructive transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between font-body">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold text-secondary">₹{totalAmount.toLocaleString("en-IN")}</span>
              </div>
              <button onClick={handleCheckout}
                className="w-full bg-gradient-gold text-primary-foreground font-body font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity">
                Proceed to Checkout
              </button>
              <button onClick={closeCart}
                className="w-full text-center font-body text-sm text-muted-foreground hover:text-gold transition-colors">
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
