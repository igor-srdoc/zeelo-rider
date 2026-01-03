import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRides, type Ride } from "@/hooks/use-rides";
import { formatDate, formatPrice } from "@/lib/utils";

export default function RidesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 px-4">
        <RidesHeader />
        <LoadingState />
        <ErrorCard />
        <RidesList />
        <HelpCard />
      </ScrollView>
    </SafeAreaView>
  );
}

function RidesHeader() {
  const { data: rides } = useRides();
  const hasRides = rides && rides.length > 0;

  return (
    <View className="flex-row justify-between items-center mt-4 mb-4">
      <Text className="text-3xl font-bold text-gray-900">Rides</Text>
      {hasRides && (
        <Pressable>
          <Text className="text-violet-600 font-medium">See all</Text>
        </Pressable>
      )}
    </View>
  );
}

function LoadingState() {
  const { isLoading } = useRides();

  if (!isLoading) return null;

  return (
    <View className="py-8 items-center">
      <ActivityIndicator size="large" color="#7C3AED" />
    </View>
  );
}

function ErrorCard() {
  const { error } = useRides();

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === "object" && error !== null && "message" in error) {
      return String((error as any).message);
    }
    return "Unknown error";
  };

  const getErrorHint = (error: unknown): string | null => {
    if (typeof error === "object" && error !== null && "hint" in error) {
      return String((error as any).hint);
    }
    return null;
  };

  if (!error) return null;

  return (
    <View className="bg-red-50 rounded-xl p-4 mb-3">
      <View className="flex-row items-center mb-2">
        <Ionicons name="warning" size={20} color="#DC2626" />
        <Text className="text-red-600 font-semibold ml-2">
          Failed to load rides
        </Text>
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

function RidesList() {
  const { data: rides, isLoading, error } = useRides();
  const hasRides = rides && rides.length > 0;

  if (isLoading || error) return null;

  if (hasRides) {
    return (
      <>
        {rides.map((ride) => (
          <RideCard key={ride.id} ride={ride} />
        ))}
      </>
    );
  }

  return <FindRideCard />;
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
