import { Text, View } from "react-native";

import { getCategory } from "../../data";

export default function CategoryBadge({ category, showLabel = true }) {
  const info = getCategory(category);

  return (
    <View className={"flex-row items-center gap-1 rounded-full px-2 py-1 " + info.bg}>
      <Text className="text-xs">{info.icon}</Text>
      {showLabel ? (
        <Text className={"text-xs font-medium " + info.fg}>{info.label}</Text>
      ) : null}
    </View>
  );
}
