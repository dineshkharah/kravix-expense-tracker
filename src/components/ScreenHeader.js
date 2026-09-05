import { Text, View } from "react-native";

export default function ScreenHeader({ title, subtitle, action }) {
  return (
    <View className="flex-row items-start justify-between px-4 pb-3 pt-2">
      <View className="flex-1">
        <Text className="text-2xl font-bold text-gray-900">{title}</Text>
        {subtitle ? <Text className="mt-1 text-sm text-gray-500">{subtitle}</Text> : null}
      </View>
      {action}
    </View>
  );
}
