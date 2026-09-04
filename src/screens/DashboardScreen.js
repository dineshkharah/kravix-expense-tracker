import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function DashboardScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <View className="flex-1 items-center justify-center gap-4">
        <Text className="text-lg font-bold text-gray-900">Dashboard</Text>

        <Pressable
          onPress={() => navigation.navigate("AddTransaction")}
          className="rounded-full bg-blue-600 px-5 py-3 active:opacity-70"
        >
          <Text className="text-sm font-semibold text-white">Add transaction</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
