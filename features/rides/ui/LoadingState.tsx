import { View, ActivityIndicator } from "react-native";
import { useRides } from "@/features/rides/api/use-rides";

export function LoadingState() {
  const { isLoading } = useRides();

  if (!isLoading) return null;

  return (
    <View className="py-8 items-center">
      <ActivityIndicator size="large" color="#7C3AED" />
    </View>
  );
}

