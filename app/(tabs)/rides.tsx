import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RidesHeader } from "@/features/rides/ui/RidesHeader";
import { LoadingState } from "@/features/rides/ui/LoadingState";
import { ErrorCard } from "@/features/rides/ui/ErrorCard";
import { RidesList } from "@/features/rides/ui/RidesList";
import { HelpCard } from "@/features/rides/ui/HelpCard";

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
