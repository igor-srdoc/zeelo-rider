import { useSearchRides } from "@/features/rides/api/use-search-rides";
import { useSearchStore } from "../../state/search.store";
import { LoadingState } from "@/ui/loading-state";

export function SearchLoadingState() {
  const { searchQuery } = useSearchStore();
  const { isLoading } = useSearchRides(searchQuery);
  return <LoadingState isLoading={isLoading} />;
}
