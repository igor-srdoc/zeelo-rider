import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Ride } from "@/features/rides/api/use-rides";
import { formatDate, formatPrice } from "@/lib/utils";

export function RideCard({ ride }: { ride: Ride }) {
  return (
    <Pressable className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text className="text-base font-semibold text-gray-900">
            {ride.origin}
          </Text>
          <View className="flex-row items-center my-1">
            <Ionicons name="arrow-down" size={14} color="#9CA3AF" />
          </View>
          <Text className="text-base font-semibold text-gray-900">
            {ride.destination}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-sm text-gray-500">{formatDate(ride.date)}</Text>
          <Text className="text-sm text-gray-500">{ride.time}</Text>
        </View>
      </View>
      <View className="flex-row justify-between items-center pt-2 border-t border-gray-100">
        <Text className="text-violet-600 font-semibold">
          {formatPrice(ride.price)}
        </Text>
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      </View>
    </Pressable>
  );
}

