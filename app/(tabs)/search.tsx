import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useSearchRides } from "@/features/rides/api/use-search-rides";
import { SearchHeader } from "@/features/search/ui/search-header";
import { SearchInput } from "@/features/search/ui/search-input";
import { SearchLoadingState } from "@/features/search/ui/search-loading-state";
import { SearchErrorCard } from "@/features/search/ui/search-error-card";
import { SearchResults } from "@/features/search/ui/search-results";
import { NoResults } from "@/features/search/ui/no-results";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: rides, isLoading, error } = useSearchRides(searchQuery);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4">
        <SearchHeader />
        <SearchInput value={searchQuery} onChangeText={setSearchQuery} />
        <SearchLoadingState isLoading={isLoading} />
        <SearchErrorCard error={error} />
        <SearchResults rides={rides} isLoading={isLoading} error={error} />
        <NoResults
          searchQuery={searchQuery}
          rides={rides}
          isLoading={isLoading}
          error={error}
        />
      </View>
    </SafeAreaView>
  );
}
