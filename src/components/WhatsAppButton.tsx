import { MessageCircle } from "lucide-react";

const whatsappNumber = "911234567890"; // Replace with actual number
const defaultMessage = encodeURIComponent("Hello! I'd like to enquire about your fragrance products.");

const WhatsAppButton = () => (
  <a
    href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] shadow-lg flex items-center justify-center transition-all hover:scale-110"
  >
    <MessageCircle className="text-[hsl(0,0%,100%)]" size={28} fill="hsl(0,0%,100%)" strokeWidth={0} />
  </a>
);

export default WhatsAppButton;
