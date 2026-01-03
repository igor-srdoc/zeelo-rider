import { View, Pressable, Text } from "react-native";
import { useRides } from "@/features/rides/api/use-rides";
import { PageTitle } from "@/ui/page-title";

export function RidesHeader() {
  const { data: rides } = useRides();
  const hasRides = rides && rides.length > 0;

  return (
    <View className="flex-row justify-between items-center mt-4 mb-4">
      <PageTitle title="Rides" />
      {hasRides && (
        <Pressable>
          <Text className="text-violet-600 font-medium">See all</Text>
        </Pressable>
      )}
    </View>
  );
}
