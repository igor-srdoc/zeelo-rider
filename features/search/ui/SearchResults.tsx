import { View, Text } from "react-native";
import type { Ride } from "@/features/rides/api/use-rides";
import { RideCard } from "@/features/rides/ui/RideCard";

type SearchResultsProps = {
  rides: Ride[] | undefined;
  isLoading: boolean;
  error: unknown;
};

export function SearchResults({ rides, isLoading, error }: SearchResultsProps) {
  if (isLoading || error || !rides || rides.length === 0) return null;

  return (
    <View>
      <Text className="text-sm text-gray-500 mb-2">
        {rides.length} {rides.length === 1 ? "result" : "results"} found
      </Text>
      {rides.map((ride) => (
        <RideCard key={ride.id} ride={ride} />
      ))}
    </View>
  );
}
