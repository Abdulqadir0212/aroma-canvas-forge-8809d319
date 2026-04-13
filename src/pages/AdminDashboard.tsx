import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Link, useLocation } from "react-router-dom";
import { Package, MessageSquare, FileText, LogOut, Home } from "lucide-react";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminTestimonials from "@/components/admin/AdminTestimonials";
import AdminSiteContent from "@/components/admin/AdminSiteContent";

const tabs = [
  { id: "products", label: "Products", icon: Package },
  { id: "testimonials", label: "Testimonials", icon: MessageSquare },
  { id: "content", label: "Site Content", icon: FileText },
];

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("products");

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-body text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="font-heading text-lg font-bold text-secondary">Admin Panel</h1>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-secondary transition-colors">
              <Home size={18} />
            </Link>
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-destructive transition-colors font-body text-sm"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-body text-sm border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-gold text-gold font-semibold"
                  : "border-transparent text-muted-foreground hover:text-secondary"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        {activeTab === "products" && <AdminProducts />}
        {activeTab === "testimonials" && <AdminTestimonials />}
        {activeTab === "content" && <AdminSiteContent />}
      </div>
    </div>
  );
};

export default AdminDashboard;
