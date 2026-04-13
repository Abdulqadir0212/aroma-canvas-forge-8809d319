import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";

const CartButton = () => {
  const { openCart, totalItems } = useCart();

  return (
    <button
      onClick={openCart}
      className="relative p-2 text-muted-foreground hover:text-gold transition-colors"
      aria-label="Open cart"
    >
      <ShoppingBag size={22} />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </button>
  );
};

export default CartButton;
