import { View, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type SearchInputProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export function SearchInput({ value, onChangeText }: SearchInputProps) {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 mb-4">
      <Ionicons name="search" size={20} color="#9CA3AF" />
      <TextInput
        className="flex-1 ml-3 text-base text-gray-900"
        placeholder="Search workplace or school"
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText("")}>
          <Ionicons name="close-circle" size={20} color="#9CA3AF" />
        </Pressable>
      )}
    </View>
  );
}

