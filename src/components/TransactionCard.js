import { Text, View } from "react-native";

import { getCategory } from "../../data";
import { formatCurrency, formatDate } from "../utils/format";

export default function TransactionCard({ transaction }) {
  const info = getCategory(transaction.category);
  const isIncome = transaction.type === "income";

  return (
    <View className="flex-row items-center gap-3 border-b border-gray-100 bg-white px-4 py-3">
      <View className={"h-10 w-10 items-center justify-center rounded-full " + info.bg}>
        <Text className="text-base">{info.icon}</Text>
      </View>

      {/* flex-1 here is what lets numberOfLines truncate. Without it a long title pushes the amount off the screen. */}
      <View className="flex-1">
        <Text numberOfLines={1} className="text-sm font-semibold text-gray-900">
          {transaction.title}
        </Text>
        <Text className="mt-0.5 text-xs text-gray-500">
          {info.label} · {formatDate(transaction.date)}
        </Text>
      </View>

      <Text
        className={
          "text-sm font-bold " + (isIncome ? "text-emerald-600" : "text-gray-900")
        }
      >
        {isIncome ? "+" : ""}
        {formatCurrency(transaction.amount)}
      </Text>
    </View>
  );
}
