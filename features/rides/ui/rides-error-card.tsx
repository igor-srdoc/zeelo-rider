import { useRides } from "@/features/rides/api/use-rides";
import { ErrorCard } from "@/ui/error-card";

export function RidesErrorCard() {
  const { error } = useRides();
  return <ErrorCard error={error} label="Failed to load rides" />;
}
