import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function FindRideCard() {
  return (
    <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
      <View className="flex-row">
        <View className="flex-1 pr-4">
          <Text className="text-lg font-bold text-gray-900 mb-1">
            Find your next ride
          </Text>
          <Text className="text-sm text-gray-500 mb-4">
            Your upcoming rides will be listed here.
          </Text>
          <Pressable className="flex-row items-center bg-gray-100 rounded-full px-4 py-2 self-start">
            <Ionicons name="search" size={16} color="#7C3AED" />
            <Text className="text-violet-600 ml-2 font-medium">
              Search rides
            </Text>
          </Pressable>
        </View>
        <View className="w-20 h-20 bg-pink-100 rounded-lg items-center justify-center">
          <Ionicons name="ticket" size={40} color="#DB2777" />
        </View>
      </View>
    </View>
  );
}

