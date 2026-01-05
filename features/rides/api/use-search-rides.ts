import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function useSearchRides(query: string) {
  return useQuery({
    queryKey: ["rides", "search", query],
    queryFn: async () => {
      if (!query.trim()) return [];

      const { data, error } = await supabase
        .from("rides")
        .select("*")
        .or(`origin.ilike.%${query}%,destination.ilike.%${query}%`)
        .order("date", { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: query.trim().length > 0,
  });
}

