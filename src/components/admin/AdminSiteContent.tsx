import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";

type SiteContent = {
  id: string;
  section: string;
  key: string;
  value: string | null;
  sort_order: number | null;
};

const AdminSiteContent = () => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<SiteContent | null>(null);
  const [isNew, setIsNew] = useState(false);

  const { data: content, isLoading } = useQuery({
    queryKey: ["admin-site-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .order("section", { ascending: true })
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (item: Partial<SiteContent> & { id?: string }) => {
      const payload = {
        section: item.section!,
        key: item.key!,
        value: item.value || null,
        sort_order: item.sort_order ?? 0,
      };
      if (item.id && !isNew) {
        const { error } = await supabase.from("site_content").update(payload).eq("id", item.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("site_content").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-site-content"] });
      queryClient.invalidateQueries({ queryKey: ["site_content"] });
      setEditing(null);
      setIsNew(false);
      toast.success("Content saved!");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("site_content").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-site-content"] });
      queryClient.invalidateQueries({ queryKey: ["site_content"] });
      toast.success("Content deleted!");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const openNew = () => {
    setIsNew(true);
    setEditing({ id: "", section: "", key: "", value: null, sort_order: 0 });
  };

  // Group by section
  const sections = content?.reduce<Record<string, SiteContent[]>>((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  if (isLoading) return <p className="font-body text-muted-foreground">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl font-bold text-secondary">Site Content ({content?.length ?? 0})</h2>
        <button onClick={openNew} className="flex items-center gap-1.5 bg-gradient-gold text-primary-foreground font-body text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90">
          <Plus size={16} /> Add Content
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl border border-border w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-lg font-bold text-secondary">{isNew ? "Add" : "Edit"} Content</h3>
              <button onClick={() => { setEditing(null); setIsNew(false); }}><X size={20} className="text-muted-foreground" /></button>
            </div>
            <div className="space-y-3">
              <Field label="Section" value={editing.section} onChange={(v) => setEditing({ ...editing, section: v })} placeholder="e.g. about, brand_story, company_facts" />
              <Field label="Key" value={editing.key} onChange={(v) => setEditing({ ...editing, key: v })} placeholder="e.g. intro, founder_name" />
              <Field label="Value" value={editing.value ?? ""} onChange={(v) => setEditing({ ...editing, value: v || null })} multiline />
              <Field label="Sort Order" value={String(editing.sort_order ?? 0)} onChange={(v) => setEditing({ ...editing, sort_order: Number(v) || 0 })} type="number" />
            </div>
            <button onClick={() => saveMutation.mutate(editing)} disabled={saveMutation.isPending || !editing.section || !editing.key}
              className="w-full mt-4 bg-gradient-gold text-primary-foreground font-body font-semibold py-2.5 rounded-lg hover:opacity-90 disabled:opacity-50">
              {saveMutation.isPending ? "Saving..." : "Save Content"}
            </button>
          </div>
        </div>
      )}

      {sections && Object.entries(sections).map(([section, items]) => (
        <div key={section} className="mb-6">
          <h3 className="font-heading text-sm font-bold text-gold uppercase tracking-wider mb-3">{section.replace(/_/g, " ")}</h3>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-muted/50">
                <tr className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                  <th className="px-4 py-3">Key</th>
                  <th className="px-4 py-3">Value</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map((item) => (
                  <tr key={item.id} className="font-body text-sm">
                    <td className="px-4 py-3 text-secondary font-medium whitespace-nowrap">{item.key}</td>
                    <td className="px-4 py-3 text-muted-foreground max-w-xs truncate">{item.value ?? "—"}</td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button onClick={() => { setEditing(item); setIsNew(false); }} className="text-gold hover:text-gold/70 mr-2"><Pencil size={15} /></button>
                      <button onClick={() => { if (confirm("Delete?")) deleteMutation.mutate(item.id); }} className="text-destructive hover:text-destructive/70"><Trash2 size={15} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
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

export default AdminSiteContent;
