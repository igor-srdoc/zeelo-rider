import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchHeader } from "@/features/search/ui/search-header";
import { SearchInput } from "@/features/search/ui/search-input";
import { SearchLoadingState } from "@/features/search/ui/search-loading-state";
import { SearchErrorCard } from "@/features/search/ui/search-error-card";
import { SearchResults } from "@/features/search/ui/search-results";
import { SearchNoResults } from "@/features/search/ui/search-no-results";

export default function SearchScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4">
        <SearchHeader />
        <SearchInput />
        <SearchLoadingState />
        <SearchErrorCard />
        <SearchResults />
        <SearchNoResults />
      </View>
    </SafeAreaView>
  );
}
