import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useCart } from "@/hooks/useCart";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Checkout = () => {
  const { items, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    shipping_address: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
  });

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return toast.error("Cart is empty");
    if (!form.customer_name || !form.customer_phone || !form.shipping_address || !form.city || !form.state || !form.pincode) {
      return toast.error("Please fill all required fields");
    }

    try {
      setSubmitting(true);

      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      const orderId = crypto.randomUUID();

      const { error: orderErr } = await supabase.from("orders").insert({
        id: orderId,
        user_id: userId || null,
        customer_name: form.customer_name,
        customer_email: form.customer_email || null,
        customer_phone: form.customer_phone,
        shipping_address: form.shipping_address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        notes: form.notes || null,
        total_amount: totalAmount,
        payment_method: "cod",
        status: "pending",
        payment_status: "pending",
      });

      if (orderErr) throw orderErr;

      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity,
      }));

      const { error: itemsErr } = await supabase.from("order_items").insert(orderItems);
      if (itemsErr) throw itemsErr;

      await clearCart();
      toast.success("Order placed successfully!");
      navigate("/order-success");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <PageHeader subtitle="Checkout" title="Your Cart is Empty" />
        <section className="py-16 bg-background text-center">
          <p className="font-body text-muted-foreground mb-6">Add some products to your cart first.</p>
          <button onClick={() => navigate("/products")} className="bg-gradient-gold text-primary-foreground font-body font-semibold px-8 py-3 rounded-lg hover:opacity-90">
            Browse Products
          </button>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <PageHeader subtitle="Checkout" title="Complete Your Order" />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-5 gap-8">
            {/* Form */}
            <form onSubmit={handleSubmit} className="md:col-span-3 space-y-4">
              <h2 className="font-heading text-lg font-bold text-secondary mb-2">Shipping Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Full Name *" value={form.customer_name} onChange={(v) => update("customer_name", v)} />
                <Input label="Phone *" value={form.customer_phone} onChange={(v) => update("customer_phone", v)} type="tel" />
              </div>
              <Input label="Email" value={form.customer_email} onChange={(v) => update("customer_email", v)} type="email" />
              <Input label="Shipping Address *" value={form.shipping_address} onChange={(v) => update("shipping_address", v)} multiline />
              <div className="grid grid-cols-3 gap-4">
                <Input label="City *" value={form.city} onChange={(v) => update("city", v)} />
                <Input label="State *" value={form.state} onChange={(v) => update("state", v)} />
                <Input label="Pincode *" value={form.pincode} onChange={(v) => update("pincode", v)} />
              </div>
              <Input label="Order Notes (optional)" value={form.notes} onChange={(v) => update("notes", v)} multiline />

              <div className="bg-muted/50 rounded-xl p-4 border border-border">
                <p className="font-body text-sm text-muted-foreground mb-1">Payment Method</p>
                <p className="font-heading text-secondary font-semibold">Cash on Delivery (COD)</p>
              </div>

              <button type="submit" disabled={submitting}
                className="w-full bg-gradient-gold text-primary-foreground font-body font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50">
                {submitting ? "Placing Order..." : `Place Order — ₹${totalAmount.toLocaleString("en-IN")}`}
              </button>
            </form>

            {/* Summary */}
            <div className="md:col-span-2">
              <div className="bg-card rounded-xl border border-border p-5 sticky top-24">
                <h3 className="font-heading text-lg font-bold text-secondary mb-4">Order Summary</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product_id} className="flex gap-3">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-muted" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm text-secondary font-medium line-clamp-1">{item.name}</p>
                        <p className="font-body text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-body text-sm text-gold font-bold">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border mt-4 pt-4 flex justify-between">
                  <span className="font-body text-muted-foreground">Total</span>
                  <span className="font-heading text-xl font-bold text-secondary">₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

function Input({ label, value, onChange, type = "text", multiline }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; multiline?: boolean;
}) {
  const cls = "w-full px-3.5 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/30";
  return (
    <div>
      <label className="font-body text-sm text-secondary font-medium mb-1 block">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className={cls + " resize-none"} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </div>
  );
}

export default Checkout;
