import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useSearchRides } from "@/hooks/use-search-rides";
import type { Ride } from "@/hooks/use-rides";
import { formatDate, formatPrice } from "@/lib/utils";

function RideCard({ ride }: { ride: Ride }) {
  return (
    <Pressable className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100">
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text className="text-base font-semibold text-gray-900">
            {ride.origin}
          </Text>
          <View className="flex-row items-center my-1">
            <Ionicons name="arrow-down" size={14} color="#9CA3AF" />
          </View>
          <Text className="text-base font-semibold text-gray-900">
            {ride.destination}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-sm text-gray-500">{formatDate(ride.date)}</Text>
          <Text className="text-sm text-gray-500">{ride.time}</Text>
        </View>
      </View>
      <View className="flex-row justify-between items-center pt-2 border-t border-gray-100">
        <Text className="text-violet-600 font-semibold">
          {formatPrice(ride.price)}
        </Text>
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      </View>
    </Pressable>
  );
}

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: rides, isLoading, error } = useSearchRides(searchQuery);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4">
        {/* Header */}
        <Text className="text-3xl font-bold text-gray-900 mt-4 mb-4">
          Search
        </Text>

        {/* Search Input */}
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

        {/* Loading state */}
        {isLoading && (
          <View className="py-8 items-center">
            <ActivityIndicator size="large" color="#7C3AED" />
          </View>
        )}

        {/* Error state */}
        {error && (
          <View className="bg-red-50 rounded-xl p-4 mb-3">
            <Text className="text-red-600">Failed to search rides</Text>
          </View>
        )}

        {/* Results */}
        {!isLoading && !error && rides && rides.length > 0 && (
          <View>
            <Text className="text-sm text-gray-500 mb-2">
              {rides.length} {rides.length === 1 ? "result" : "results"} found
            </Text>
            {rides.map((ride) => (
              <RideCard key={ride.id} ride={ride} />
            ))}
          </View>
        )}

        {/* No results */}
        {!isLoading &&
          !error &&
          searchQuery.length > 0 &&
          rides?.length === 0 && (
            <View className="py-8 items-center">
              <Text className="text-gray-500">No rides found</Text>
            </View>
          )}
      </View>
    </SafeAreaView>
  );
}
