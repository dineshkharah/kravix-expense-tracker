import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SummaryScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-bold text-gray-900">Category Summary</Text>
      </View>
    </SafeAreaView>
  );
}
