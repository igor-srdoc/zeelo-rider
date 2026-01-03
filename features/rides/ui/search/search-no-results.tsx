import { View, Text } from "react-native";
import { useSearchRides } from "@/features/rides/api/use-search-rides";
import { useSearchStore } from "../../state/search.store";

export function SearchNoResults() {
  const { searchQuery } = useSearchStore();
  const { data: rides, isLoading, error } = useSearchRides(searchQuery);

  if (isLoading || error || searchQuery.length === 0 || rides?.length !== 0) {
    return null;
  }

  return (
    <View className="py-8 items-center">
      <Text className="text-gray-500">No rides found</Text>
    </View>
  );
}
