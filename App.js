import "./global.css";

import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Temporary check that NativeWind is wired up. The navigation shell replaces all of this in the next step.
export default function App() {
  const percent = 73;

  return (
    <SafeAreaProvider>
      <View className="flex-1 items-center justify-center bg-white">
        <View className="h-32 w-32 items-center justify-center rounded-2xl bg-red-500">
          <Text className="text-base font-bold text-white">it works</Text>
        </View>

        <View className="mt-8 h-3 w-64 overflow-hidden rounded-full bg-gray-200">
          <View className={"h-full rounded-full bg-blue-500 w-pct-" + percent} />
        </View>

        <Text className="mt-3 text-sm text-gray-500">
          the blue bar should fill {percent} percent
        </Text>
      </View>
    </SafeAreaProvider>
  );
}
