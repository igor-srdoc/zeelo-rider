import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RidesHeader } from "@/features/rides/ui/rides-header";
import { LoadingState } from "@/features/rides/ui/loading-state";
import { ErrorCard } from "@/features/rides/ui/error-card";
import { RidesList } from "@/features/rides/ui/rides-list";
import { HelpCard } from "@/features/rides/ui/help-card";

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
