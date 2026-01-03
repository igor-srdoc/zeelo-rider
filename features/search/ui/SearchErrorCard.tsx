import { View, Text } from "react-native";

type SearchErrorCardProps = {
  error: unknown;
};

export function SearchErrorCard({ error }: SearchErrorCardProps) {
  if (!error) return null;

  return (
    <View className="bg-red-50 rounded-xl p-4 mb-3">
      <Text className="text-red-600">Failed to search rides</Text>
    </View>
  );
}

