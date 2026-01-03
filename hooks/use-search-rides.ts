import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Ride } from "./use-rides";

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
      return data as Ride[];
    },
    enabled: query.trim().length > 0,
  });
}
