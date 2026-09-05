import { useMemo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import ProgressBar from "../components/ProgressBar";
import Skeleton from "../components/Skeleton";
import { useTransactions } from "../context/TransactionsContext";
import { getCategory } from "../../data";
import { formatCurrency } from "../utils/format";

export default function SummaryScreen() {
  const { transactions, isLoading, loadError, clearAll, restoreSampleData } =
    useTransactions();

  const isEmpty = transactions.length === 0;

  const { rows, total } = useMemo(() => {
    const sums = {};
    let spent = 0;

    transactions.forEach((transaction) => {
      if (transaction.type !== "expense") {
        return;
      }

      const amount = Number(transaction.amount) || 0;
      const name = transaction.category || "Uncategorized";

      sums[name] = (sums[name] || 0) + amount;
      spent += amount;
    });

    const sorted = Object.keys(sums)
      .map((name) => ({ name, amount: sums[name] }))
      .sort((a, b) => b.amount - a.amount);

    return { rows: sorted, total: spent };
  }, [transactions]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <ScrollView contentContainerClassName="pb-8" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-start justify-between px-4 pb-3 pt-2">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-900">Category Summary</Text>
            <Text className="mt-1 text-sm text-gray-500">Where your money went</Text>
          </View>

          {/* Lets the empty states actually be reached on a device, since the sample data is otherwise always present. */}
          <Pressable
            onPress={isEmpty ? restoreSampleData : clearAll}
            className="rounded-full border border-gray-200 bg-white px-3 py-2 active:opacity-70"
          >
            <Text className="text-xs font-semibold text-gray-700">
              {isEmpty ? "Restore" : "Clear all"}
            </Text>
          </Pressable>
        </View>

        {loadError ? (
          <ErrorState
            message={loadError}
            actionLabel="Load the sample data"
            onAction={restoreSampleData}
          />
        ) : isLoading ? (
          <View className="px-4">
            <Skeleton className="h-28 w-full" />
            <Skeleton className="mt-3 h-72 w-full" />
          </View>
        ) : (
          <SummaryBody rows={rows} total={total} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function SummaryBody({ rows, total }) {
  return (
    <View>
      <View className="mx-4 rounded-2xl bg-gray-900 p-5">
          <Text className="text-sm font-medium text-gray-400">Total spent</Text>
          <Text className="mt-1 text-3xl font-bold text-white">{formatCurrency(total)}</Text>
          <Text className="mt-2 text-xs text-gray-400">
            Across {rows.length} {rows.length === 1 ? "category" : "categories"}
          </Text>
        </View>

        {rows.length === 0 ? (
          <EmptyState
            icon="📊"
            title="Nothing to break down"
            message="Once you add an expense, its category shows up here."
          />
        ) : (
          <View className="mx-4 mt-3 rounded-2xl border border-gray-100 bg-white p-4">
            {rows.map((row, index) => {
              const info = getCategory(row.name);
              const share = total > 0 ? (row.amount / total) * 100 : 0;

              return (
                <View key={row.name} className={index === 0 ? "" : "mt-5"}>
                  <View className="mb-2 flex-row items-center gap-2">
                    <View
                      className={
                        "h-8 w-8 items-center justify-center rounded-full " + info.bg
                      }
                    >
                      <Text className="text-sm">{info.icon}</Text>
                    </View>

                    <Text className="flex-1 text-sm font-semibold text-gray-900">
                      {info.label}
                    </Text>

                    <Text className="text-sm font-bold text-gray-900">
                      {formatCurrency(row.amount)}
                    </Text>
                  </View>

                  <ProgressBar percent={share} barClassName={info.bar} />

                  <Text className="mt-1 text-xs text-gray-500">
                    {Math.round(share)} percent of spending
                  </Text>
                </View>
              );
            })}
          </View>
        )}
    </View>
  );
}
