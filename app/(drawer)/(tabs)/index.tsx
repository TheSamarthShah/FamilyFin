import PageWrapper from "@/components/PageWrapper";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <PageWrapper scrollable>
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-bold">Welcome to Sword & Shadow</Text>
      </View>
    </PageWrapper>
  );
}
