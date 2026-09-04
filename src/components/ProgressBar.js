import { View } from "react-native";

// The width comes from a safelisted class like w-pct-73, never from a style object. Clamped to 0 up to 100 because only those classes exist.
export default function ProgressBar({ percent, barClassName = "bg-blue-500" }) {
  const safePercent = Math.max(0, Math.min(100, Math.round(Number(percent) || 0)));

  return (
    <View className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
      <View className={"h-full rounded-full w-pct-" + safePercent + " " + barClassName} />
    </View>
  );
}
