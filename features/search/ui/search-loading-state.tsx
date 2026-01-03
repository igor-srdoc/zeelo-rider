import { View, ActivityIndicator } from "react-native";

type SearchLoadingStateProps = {
  isLoading: boolean;
};

export function SearchLoadingState({ isLoading }: SearchLoadingStateProps) {
  if (!isLoading) return null;

  return (
    <View className="py-8 items-center">
      <ActivityIndicator size="large" color="#7C3AED" />
    </View>
  );
}

