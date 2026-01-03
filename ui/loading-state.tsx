import { View, ActivityIndicator } from "react-native";

type LoadingStateProps = {
  isLoading: boolean;
};

export function LoadingState({ isLoading }: Readonly<LoadingStateProps>) {
  if (!isLoading) return null;

  return (
    <View className="py-8 items-center">
      <ActivityIndicator size="large" color="#7C3AED" />
    </View>
  );
}

