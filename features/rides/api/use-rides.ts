import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function useRides() {
  return useQuery({
    queryKey: ["rides"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rides")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      return data;
    },
  });
}
