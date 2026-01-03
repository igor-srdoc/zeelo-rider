import { useRides } from "@/features/rides/api/use-rides";
import { LoadingState } from "@/ui/loading-state";

export function RidesLoadingState() {
  const { isLoading } = useRides();
  return <LoadingState isLoading={isLoading} />;
}
