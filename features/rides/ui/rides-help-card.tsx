import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function RidesHelpCard() {
  return (
    <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
      <View className="flex-row">
        <View className="flex-1 pr-4">
          <Text className="text-lg font-bold text-gray-900 mb-1">
            Need help with anything?
          </Text>
          <Text className="text-sm text-gray-500 mb-3">
            Search help articles or get in touch with our customer care team
          </Text>
          <Pressable>
            <Text className="text-violet-600 font-semibold">Get help</Text>
          </Pressable>
        </View>
        <View className="w-20 h-20 bg-violet-100 rounded-full items-center justify-center">
          <Ionicons name="headset" size={36} color="#7C3AED" />
        </View>
      </View>
    </View>
  );
}

