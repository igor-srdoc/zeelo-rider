import { View, Text } from "react-native";
import { RideCard } from "@/features/rides/ui/ride-card";
import { useSearchRides } from "@/features/rides/api/use-search-rides";
import { useSearchStore } from "../search.store";

export function SearchResults() {
  const { searchQuery } = useSearchStore();
  const { data: rides, isLoading, error } = useSearchRides(searchQuery);

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
