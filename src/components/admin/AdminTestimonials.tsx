import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";

type Testimonial = {
  id: string;
  name: string;
  location: string | null;
  rating: number;
  review: string;
  active: boolean | null;
  sort_order: number | null;
};

const AdminTestimonials = () => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isNew, setIsNew] = useState(false);

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (item: Partial<Testimonial> & { id?: string }) => {
      const payload = {
        name: item.name!,
        location: item.location || null,
        rating: item.rating!,
        review: item.review!,
        active: item.active ?? true,
        sort_order: item.sort_order ?? 0,
      };
      if (item.id && !isNew) {
        const { error } = await supabase.from("testimonials").update(payload).eq("id", item.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("testimonials").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      setEditing(null);
      setIsNew(false);
      toast.success("Testimonial saved!");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial deleted!");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const openNew = () => {
    setIsNew(true);
    setEditing({
      id: "", name: "", location: null, rating: 5, review: "",
      active: true, sort_order: (testimonials?.length ?? 0) + 1,
    });
  };

  if (isLoading) return <p className="font-body text-muted-foreground">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl font-bold text-secondary">Testimonials ({testimonials?.length ?? 0})</h2>
        <button onClick={openNew} className="flex items-center gap-1.5 bg-gradient-gold text-primary-foreground font-body text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl border border-border w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-lg font-bold text-secondary">{isNew ? "Add" : "Edit"} Testimonial</h3>
              <button onClick={() => { setEditing(null); setIsNew(false); }}><X size={20} className="text-muted-foreground" /></button>
            </div>
            <div className="space-y-3">
              <Field label="Customer Name" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} />
              <Field label="Location" value={editing.location ?? ""} onChange={(v) => setEditing({ ...editing, location: v || null })} placeholder="e.g. Mumbai, Maharashtra" />
              <div>
                <label className="font-body text-sm text-secondary font-medium mb-1 block">Rating</label>
                <select value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm">
                  {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>)}
                </select>
              </div>
              <Field label="Review" value={editing.review} onChange={(v) => setEditing({ ...editing, review: v })} multiline />
              <Field label="Sort Order" value={String(editing.sort_order ?? 0)} onChange={(v) => setEditing({ ...editing, sort_order: Number(v) || 0 })} type="number" />
              <label className="flex items-center gap-2 font-body text-sm text-secondary">
                <input type="checkbox" checked={editing.active ?? true} onChange={(e) => setEditing({ ...editing, active: e.target.checked })} />
                Active
              </label>
            </div>
            <button onClick={() => saveMutation.mutate(editing)} disabled={saveMutation.isPending || !editing.name || !editing.review}
              className="w-full mt-4 bg-gradient-gold text-primary-foreground font-body font-semibold py-2.5 rounded-lg hover:opacity-90 disabled:opacity-50">
              {saveMutation.isPending ? "Saving..." : "Save Testimonial"}
            </button>
          </div>
        </div>
      )}

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/50">
              <tr className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3">Active</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {testimonials?.map((t) => (
                <tr key={t.id} className="font-body text-sm">
                  <td className="px-4 py-3 text-secondary font-medium">{t.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{t.location ?? "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{"⭐".repeat(t.rating)}</td>
                  <td className="px-4 py-3">{t.active ? "✅" : "❌"}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => { setEditing(t); setIsNew(false); }} className="text-gold hover:text-gold/70 mr-2"><Pencil size={15} /></button>
                    <button onClick={() => { if (confirm("Delete?")) deleteMutation.mutate(t.id); }} className="text-destructive hover:text-destructive/70"><Trash2 size={15} /></button>
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

export default AdminTestimonials;
