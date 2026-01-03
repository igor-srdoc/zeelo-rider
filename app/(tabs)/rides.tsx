import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

type Ride = {
  id: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  price: number;
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function formatPrice(price: number): string {
  return `£${price.toFixed(2)}`;
}

function RideCard({ ride }: { ride: Ride }) {
  return (
    <Pressable className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
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

function FindRideCard() {
  return (
    <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
      <View className="flex-row">
        <View className="flex-1 pr-4">
          <Text className="text-lg font-bold text-gray-900 mb-1">
            Find your next ride
          </Text>
          <Text className="text-sm text-gray-500 mb-4">
            Your upcoming rides will be listed here.
          </Text>
          <Pressable className="flex-row items-center bg-gray-100 rounded-full px-4 py-2 self-start">
            <Ionicons name="search" size={16} color="#7C3AED" />
            <Text className="text-violet-600 ml-2 font-medium">
              Search rides
            </Text>
          </Pressable>
        </View>
        <View className="w-20 h-20 bg-pink-100 rounded-lg items-center justify-center">
          <Ionicons name="ticket" size={40} color="#DB2777" />
        </View>
      </View>
    </View>
  );
}

function HelpCard() {
  return (
    <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
      <View className="flex-row">
        <View className="flex-1 pr-4">
          <Text className="text-lg font-bold text-gray-900 mb-1">
            Need help with anything?
          </Text>
          <Text className="text-sm text-gray-500 mb-3">
            Search help articles or get in touch with our customer care team
          </Text>
          <Pressable>
            <Text className="text-violet-600 font-semibold">Get help</Text>
          </Pressable>
        </View>
        <View className="w-20 h-20 bg-violet-100 rounded-full items-center justify-center">
          <Ionicons name="headset" size={36} color="#7C3AED" />
        </View>
      </View>
    </View>
  );
}

export default function RidesScreen() {
  const {
    data: rides,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["rides"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rides")
        .select("*")
        .order("date", { ascending: true });

      if (error) throw error;
      return data as Ride[];
    },
  });

  const hasRides = rides && rides.length > 0;

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 px-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mt-4 mb-4">
          <Text className="text-3xl font-bold text-gray-900">Rides</Text>
          {hasRides && (
            <Pressable>
              <Text className="text-violet-600 font-medium">See all</Text>
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
            <Text className="text-red-600">Failed to load rides</Text>
          </View>
        )}

        {/* Rides list or empty state */}
        {!isLoading &&
          !error &&
          (hasRides ? (
            <>
              {rides.map((ride) => (
                <RideCard key={ride.id} ride={ride} />
              ))}
            </>
          ) : (
            <FindRideCard />
          ))}

        {/* Help card - always shown */}
        <HelpCard />
      </ScrollView>
    </SafeAreaView>
  );
}
