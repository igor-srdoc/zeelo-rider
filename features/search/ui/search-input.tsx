import { View, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSearchStore } from "../search.store";

export function SearchInput() {
  const { searchQuery, setSearchQuery } = useSearchStore();

  return (
    <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 mb-4">
      <Ionicons name="search" size={20} color="#9CA3AF" />
      <TextInput
        className="flex-1 ml-3 text-base text-gray-900"
        placeholder="Search workplace or school"
        placeholderTextColor="#9CA3AF"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {searchQuery.length > 0 && (
        <Pressable onPress={() => setSearchQuery("")}>
          <Ionicons name="close-circle" size={20} color="#9CA3AF" />
        </Pressable>
      )}
    </View>
  );
}
