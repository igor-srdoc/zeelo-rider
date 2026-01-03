import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchHeader } from "@/features/rides/ui/search/search-header";
import { SearchInput } from "@/features/rides/ui/search/search-input";
import { SearchLoadingState } from "@/features/rides/ui/search/search-loading-state";
import { SearchErrorCard } from "@/features/rides/ui/search/search-error-card";
import { SearchResults } from "@/features/rides/ui/search/search-results";
import { SearchNoResults } from "@/features/rides/ui/search/search-no-results";

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
