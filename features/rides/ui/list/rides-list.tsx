import { useRides } from "@/features/rides/api/use-rides";
import { RideCard } from "./ride-card";
import { FindRideCard } from "../find-ride-card";

export function RidesList() {
  const { data: rides, isLoading, error } = useRides();
  const hasRides = rides && rides.length > 0;

  if (isLoading || error) return null;

  if (hasRides) {
    return (
      <>
        {rides.map((ride) => (
          <RideCard key={ride.id} ride={ride} />
        ))}
      </>
    );
  }

  return <FindRideCard />;
}

