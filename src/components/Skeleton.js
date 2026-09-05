import { View } from "react-native";

export default function Skeleton({ className = "" }) {
  return <View className={"animate-pulse rounded-xl bg-gray-200 " + className} />;
}
