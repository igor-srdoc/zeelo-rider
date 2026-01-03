import { View, Text } from "react-native";

type NoResultsProps = {
  searchQuery: string;
  rides: any[] | undefined;
  isLoading: boolean;
  error: unknown;
};

export function NoResults({
  searchQuery,
  rides,
  isLoading,
  error,
}: NoResultsProps) {
  if (isLoading || error || searchQuery.length === 0 || rides?.length !== 0) {
    return null;
  }

  return (
    <View className="py-8 items-center">
      <Text className="text-gray-500">No rides found</Text>
    </View>
  );
}

