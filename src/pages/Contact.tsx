import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactSection from "@/components/ContactSection";

const Contact = () => (
  <>
    <Navbar />
    <PageHeader subtitle="Get In Touch" title="Contact Us" />
    <ContactSection />
    <Footer />
    <WhatsAppButton />
  </>
);

export default Contact;
