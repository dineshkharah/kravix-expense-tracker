import { useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyState from "../components/EmptyState";
import TransactionCard from "../components/TransactionCard";
import { useTransactions } from "../context/TransactionsContext";
import { getCategory } from "../../data";

const ALL = "All";

export default function TransactionsScreen() {
  const { transactions } = useTransactions();
  const [selected, setSelected] = useState(ALL);

  // Only categories that actually appear in the data, so the filter row never offers a choice that returns nothing.
  const options = useMemo(() => {
    const names = [];

    transactions.forEach((transaction) => {
      if (transaction.category && !names.includes(transaction.category)) {
        names.push(transaction.category);
      }
    });

    return [ALL, ...names.sort()];
  }, [transactions]);

  const filtered = useMemo(() => {
    if (selected === ALL) {
      return transactions;
    }

    return transactions.filter((transaction) => transaction.category === selected);
  }, [transactions, selected]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <View className="px-4 pb-3 pt-2">
        <Text className="text-2xl font-bold text-gray-900">All Transactions</Text>
        <Text className="mt-1 text-sm text-gray-500">
          {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
          {selected === ALL ? "" : " in " + selected}
        </Text>
      </View>

      {/* grow-0 keeps this row at its natural height instead of stretching to fill the column. */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="grow-0"
        contentContainerClassName="gap-2 px-4 pb-3"
      >
        {options.map((name) => {
          const isActive = name === selected;

          return (
            <Pressable
              key={name}
              onPress={() => setSelected(name)}
              className={
                "rounded-full border px-4 py-2 active:opacity-70 " +
                (isActive ? "border-blue-600 bg-blue-600" : "border-gray-200 bg-white")
              }
            >
              <Text
                className={
                  "text-sm font-medium " + (isActive ? "text-white" : "text-gray-700")
                }
              >
                {name === ALL ? name : getCategory(name).icon + " " + name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TransactionCard transaction={item} isLast={index === filtered.length - 1} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-6"
        ListEmptyComponent={
          <EmptyState
            icon={selected === ALL ? "🧾" : "🔍"}
            title={selected === ALL ? "No transactions yet" : "Nothing in " + selected}
            message={
              selected === ALL
                ? "Add your first transaction and it will show up here."
                : "Try another category, or tap All to see everything."
            }
          />
        }
      />
    </SafeAreaView>
  );
}
