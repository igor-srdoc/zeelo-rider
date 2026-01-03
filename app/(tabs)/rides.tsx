import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RidesHeader } from "@/features/rides/ui/rides-header";
import { RidesLoadingState } from "@/features/rides/ui/rides-loading-state";
import { RidesErrorCard } from "@/features/rides/ui/rides-error-card";
import { RidesList } from "@/features/rides/ui/rides-list";
import { RidesHelpCard } from "@/features/rides/ui/rides-help-card";

export default function RidesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 px-4">
        <RidesHeader />
        <RidesLoadingState />
        <RidesErrorCard />
        <RidesList />
        <RidesHelpCard />
      </ScrollView>
    </SafeAreaView>
  );
}
