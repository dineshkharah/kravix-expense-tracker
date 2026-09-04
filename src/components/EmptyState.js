import { Text, View } from "react-native";

export default function EmptyState({ icon = "📭", title, message }) {
  return (
    <View className="items-center justify-center px-8 py-16">
      <Text className="text-5xl">{icon}</Text>
      <Text className="mt-4 text-base font-semibold text-gray-900">{title}</Text>
      {message ? (
        <Text className="mt-1 text-center text-sm leading-5 text-gray-500">{message}</Text>
      ) : null}
    </View>
  );
}
