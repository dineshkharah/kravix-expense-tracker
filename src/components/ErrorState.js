import { Pressable, Text, View } from "react-native";

export default function ErrorState({
  title = "Something went wrong",
  message,
  actionLabel,
  onAction,
}) {
  return (
    <View className="items-center justify-center px-8 py-16">
      <Text className="text-5xl">⚠️</Text>
      <Text className="mt-4 text-base font-semibold text-gray-900">{title}</Text>

      {message ? (
        <Text className="mt-1 text-center text-sm leading-5 text-gray-500">{message}</Text>
      ) : null}

      {onAction ? (
        <Pressable
          onPress={onAction}
          className="mt-5 rounded-xl bg-gray-900 px-5 py-3 active:opacity-70"
        >
          <Text className="text-sm font-semibold text-white">{actionLabel || "Try again"}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
