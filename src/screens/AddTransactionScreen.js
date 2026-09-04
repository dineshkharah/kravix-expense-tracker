import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function AddTransactionScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <View className="flex-row items-center gap-3 px-4 py-3">
        <Pressable
          onPress={() => navigation.goBack()}
          className="h-9 w-9 items-center justify-center rounded-full bg-white active:opacity-70"
        >
          <Text className="text-lg text-gray-700">←</Text>
        </Pressable>
        <Text className="text-lg font-bold text-gray-900">Add Transaction</Text>
      </View>

      <View className="flex-1 items-center justify-center">
        <Text className="text-sm text-gray-500">form goes here</Text>
      </View>
    </SafeAreaView>
  );
}
