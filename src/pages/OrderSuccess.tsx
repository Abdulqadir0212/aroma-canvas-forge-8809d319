import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CheckCircle } from "lucide-react";

const OrderSuccess = () => {
  return (
    <>
      <Navbar />
      <section className="py-24 bg-background min-h-[60vh] flex items-center">
        <div className="container mx-auto px-4 text-center max-w-lg">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
          <h1 className="font-heading text-3xl font-bold text-secondary mb-3">Order Placed!</h1>
          <p className="font-body text-muted-foreground mb-8">
            Thank you for your order. We will contact you shortly to confirm delivery details.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/products" className="bg-gradient-gold text-primary-foreground font-body font-semibold px-8 py-3 rounded-lg hover:opacity-90">
              Continue Shopping
            </Link>
            <Link to="/" className="border-2 border-gold text-gold font-body font-semibold px-8 py-3 rounded-lg hover:bg-gold/5">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default OrderSuccess;
