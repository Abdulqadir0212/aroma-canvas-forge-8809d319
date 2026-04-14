import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useProducts(filter?: string) {
  return useQuery({
    queryKey: ["products", filter],
    queryFn: async ({ signal }) => {
      const timeout = setTimeout(() => {
        if (signal && !signal.aborted) {
          // AbortController will handle this via tanstack
        }
      }, 8000);

      let query = supabase
        .from("products")
        .select("*")
        .order("sort_order", { ascending: true });

      if (filter && filter !== "All") {
        query = query.eq("category", filter);
      }

      const { data, error } = await query;
      clearTimeout(timeout);
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}

export function useBestsellers() {
  return useQuery({
    queryKey: ["bestsellers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_bestseller", true)
        .order("sort_order", { ascending: true })
        .limit(6);
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}

export function useTestimonials(limit?: number) {
  return useQuery({
    queryKey: ["testimonials", limit],
    queryFn: async () => {
      let query = supabase
        .from("testimonials")
        .select("*")
        .order("sort_order", { ascending: true });

      if (limit) query = query.limit(limit);

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}

export function useSiteContent(section: string) {
  return useQuery({
    queryKey: ["site_content", section],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("section", section)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      // Convert to key-value map
      const map: Record<string, string> = {};
      data?.forEach((item) => {
        if (item.value) map[item.key] = item.value;
      });
      return map;
    },
  });
}

export function useCompanyFacts() {
  return useQuery({
    queryKey: ["site_content", "company_facts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("section", "company_facts")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data?.map((item) => ({ label: item.key, value: item.value })) ?? [];
    },
  });
}

export function useWhyChooseUs() {
  return useQuery({
    queryKey: ["site_content", "why_choose_us"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("section", "why_choose_us")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data?.map((item) => item.value ?? "") ?? [];
    },
  });
}
