import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, X, Upload, Image } from "lucide-react";
import { toast } from "sonner";

type Product = {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  category: string;
  tag: string | null;
  description: string | null;
  image_url: string | null;
  is_bestseller: boolean | null;
  active: boolean | null;
  sort_order: number | null;
};

const categories = ["Attar", "Perfume", "Gift Set", "Incense"];

const AdminProducts = () => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);
      if (editing) {
        setEditing({ ...editing, image_url: publicUrl });
      }
    } catch (err: any) {
      toast.error("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const { data: products, isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (product: Partial<Product> & { id?: string }) => {
      if (product.id && !isNew) {
        const { error } = await supabase
          .from("products")
          .update({
            name: product.name!,
            price: product.price!,
            original_price: product.original_price,
            category: product.category!,
            tag: product.tag || null,
            description: product.description || null,
            image_url: product.image_url || null,
            is_bestseller: product.is_bestseller ?? false,
            active: product.active ?? true,
            sort_order: product.sort_order ?? 0,
          })
          .eq("id", product.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").insert({
          name: product.name!,
          price: product.price!,
          original_price: product.original_price,
          category: product.category!,
          tag: product.tag || null,
          description: product.description || null,
          image_url: product.image_url || null,
          is_bestseller: product.is_bestseller ?? false,
          active: product.active ?? true,
          sort_order: product.sort_order ?? 0,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["bestsellers"] });
      setEditing(null);
      setIsNew(false);
      toast.success("Product saved!");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted!");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const openNew = () => {
    setIsNew(true);
    setEditing({
      id: "",
      name: "",
      price: 0,
      original_price: null,
      category: "Attar",
      tag: null,
      description: null,
      image_url: null,
      is_bestseller: false,
      active: true,
      sort_order: (products?.length ?? 0) + 1,
    });
  };

  if (isLoading) return <p className="font-body text-muted-foreground">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl font-bold text-secondary">Products ({products?.length ?? 0})</h2>
        <button onClick={openNew} className="flex items-center gap-1.5 bg-gradient-gold text-primary-foreground font-body text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl border border-border w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-lg font-bold text-secondary">{isNew ? "Add" : "Edit"} Product</h3>
              <button onClick={() => { setEditing(null); setIsNew(false); }}><X size={20} className="text-muted-foreground" /></button>
            </div>
            <div className="space-y-3">
              <Field label="Name" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} />
              <Field label="Price (₹)" value={String(editing.price)} onChange={(v) => setEditing({ ...editing, price: Number(v) || 0 })} type="number" />
              <Field label="Original Price (₹)" value={String(editing.original_price ?? "")} onChange={(v) => setEditing({ ...editing, original_price: v ? Number(v) : null })} type="number" />
              <div>
                <label className="font-body text-sm text-secondary font-medium mb-1 block">Category</label>
                <select
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm"
                >
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <Field label="Tag" value={editing.tag ?? ""} onChange={(v) => setEditing({ ...editing, tag: v || null })} placeholder="e.g. Bestseller, New" />
              
              {/* Image Upload */}
              <div>
                <label className="font-body text-sm text-secondary font-medium mb-1 block">Product Image</label>
                {editing.image_url && (
                  <div className="mb-2 rounded-lg overflow-hidden border border-border w-24 h-24">
                    <img src={editing.image_url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                      e.target.value = "";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-background font-body text-sm text-secondary hover:border-gold/30 disabled:opacity-50"
                  >
                    <Upload size={14} />
                    {uploading ? "Uploading..." : "Upload Image"}
                  </button>
                  {editing.image_url && (
                    <button
                      type="button"
                      onClick={() => setEditing({ ...editing, image_url: null })}
                      className="px-3 py-2 rounded-lg border border-border bg-background font-body text-sm text-destructive hover:border-destructive/30"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <Field label="" value={editing.image_url ?? ""} onChange={(v) => setEditing({ ...editing, image_url: v || null })} placeholder="Or paste image URL" />
              </div>

              <Field label="Description" value={editing.description ?? ""} onChange={(v) => setEditing({ ...editing, description: v || null })} multiline />
              <Field label="Sort Order" value={String(editing.sort_order ?? 0)} onChange={(v) => setEditing({ ...editing, sort_order: Number(v) || 0 })} type="number" />
              <div className="flex gap-4">
                <label className="flex items-center gap-2 font-body text-sm text-secondary">
                  <input type="checkbox" checked={editing.is_bestseller ?? false} onChange={(e) => setEditing({ ...editing, is_bestseller: e.target.checked })} />
                  Bestseller
                </label>
                <label className="flex items-center gap-2 font-body text-sm text-secondary">
                  <input type="checkbox" checked={editing.active ?? true} onChange={(e) => setEditing({ ...editing, active: e.target.checked })} />
                  Active
                </label>
              </div>
            </div>
            <button
              onClick={() => saveMutation.mutate(editing)}
              disabled={saveMutation.isPending || !editing.name}
              className="w-full mt-4 bg-gradient-gold text-primary-foreground font-body font-semibold py-2.5 rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {saveMutation.isPending ? "Saving..." : "Save Product"}
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/50">
              <tr className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Tag</th>
                <th className="px-4 py-3">Active</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products?.map((p) => (
                <tr key={p.id} className="font-body text-sm">
                  <td className="px-4 py-3 text-secondary font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">₹{p.price.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.tag ?? "—"}</td>
                  <td className="px-4 py-3">{p.active ? "✅" : "❌"}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => { setEditing(p); setIsNew(false); }} className="text-gold hover:text-gold/70 mr-2"><Pencil size={15} /></button>
                    <button onClick={() => { if (confirm("Delete this product?")) deleteMutation.mutate(p.id); }} className="text-destructive hover:text-destructive/70"><Trash2 size={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function Field({ label, value, onChange, type = "text", multiline, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; multiline?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="font-body text-sm text-secondary font-medium mb-1 block">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} placeholder={placeholder}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gold/30" />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
      )}
    </div>
  );
}

export default AdminProducts;
