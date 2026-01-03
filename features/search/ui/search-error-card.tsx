import { useSearchRides } from "@/features/rides/api/use-search-rides";
import { useSearchStore } from "../search.store";
import { ErrorCard } from "@/ui/error-card";

export function SearchErrorCard() {
  const { searchQuery } = useSearchStore();
  const { error } = useSearchRides(searchQuery);
  return <ErrorCard error={error} label="Failed to search rides" />;
}
