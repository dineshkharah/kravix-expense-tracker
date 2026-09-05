import { Text, View } from "react-native";

export default function FormField({ label, error, children }) {
  return (
    <View className="mb-4">
      <Text className="mb-1.5 text-sm font-medium text-gray-700">{label}</Text>
      {children}
      {error ? <Text className="mt-1 text-xs font-medium text-rose-600">{error}</Text> : null}
    </View>
  );
}
