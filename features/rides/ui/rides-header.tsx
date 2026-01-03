import { View, Text, Pressable } from "react-native";
import { useRides } from "@/features/rides/api/use-rides";

export function RidesHeader() {
  const { data: rides } = useRides();
  const hasRides = rides && rides.length > 0;

  return (
    <View className="flex-row justify-between items-center mt-4 mb-4">
      <Text className="text-3xl font-bold text-gray-900">Rides</Text>
      {hasRides && (
        <Pressable>
          <Text className="text-violet-600 font-medium">See all</Text>
        </Pressable>
      )}
    </View>
  );
}

