import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ErrorCardProps = {
  error: unknown;
  label: string;
};

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "object" && error !== null && "message" in error) {
    return String((error as any).message);
  }
  return "Unknown error";
}

function getErrorHint(error: unknown): string | null {
  if (typeof error === "object" && error !== null && "hint" in error) {
    return String((error as any).hint);
  }
  return null;
}

export function ErrorCard({ error, label }: Readonly<ErrorCardProps>) {
  if (!error) return null;

  return (
    <View className="bg-red-50 rounded-xl p-4 mb-3">
      <View className="flex-row items-center mb-2">
        <Ionicons name="warning" size={20} color="#DC2626" />
        <Text className="text-red-600 font-semibold ml-2">{label}</Text>
      </View>
      <Text className="text-red-500 text-sm mb-1">
        {getErrorMessage(error)}
      </Text>
      {getErrorHint(error) && (
        <Text className="text-red-400 text-xs italic">
          {getErrorHint(error)}
        </Text>
      )}
    </View>
  );
}
