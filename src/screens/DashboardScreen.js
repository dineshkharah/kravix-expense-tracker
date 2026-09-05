import { useMemo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import Card from "../components/Card";
import EmptyState from "../components/EmptyState";
import TransactionCard from "../components/TransactionCard";
import { useTransactions } from "../context/TransactionsContext";
import { formatCurrency } from "../utils/format";

export default function DashboardScreen() {
  const navigation = useNavigation();
  const { transactions } = useTransactions();

  const totals = useMemo(() => {
    let income = 0;
    let expenses = 0;

    transactions.forEach((transaction) => {
      const amount = Number(transaction.amount) || 0;

      if (transaction.type === "income") {
        income += amount;
      } else {
        expenses += amount;
      }
    });

    return { income, expenses, balance: income - expenses };
  }, [transactions]);

  const recent = transactions.slice(0, 5);

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      {/* Padding at the bottom of the content, not on the ScrollView itself, so the floating button never covers the last row. */}
      <ScrollView contentContainerClassName="pb-28" showsVerticalScrollIndicator={false}>
        <View className="px-4 pt-2">
          <Text className="text-2xl font-bold text-gray-900">Dashboard</Text>
          <Text className="mt-1 text-sm text-gray-500">Your money at a glance</Text>
        </View>

        <View className="mx-4 mt-4 rounded-2xl bg-blue-600 p-5">
          <Text className="text-sm font-medium text-blue-100">Total balance</Text>
          <Text className="mt-1 text-3xl font-bold text-white">
            {formatCurrency(totals.balance)}
          </Text>
          <Text className="mt-2 text-xs text-blue-100">
            Across {transactions.length} transaction{transactions.length === 1 ? "" : "s"}
          </Text>
        </View>

        <View className="mx-4 mt-3 flex-row gap-3">
          <Card className="flex-1">
            <View className="h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
              <Text className="text-sm">↑</Text>
            </View>
            <Text className="mt-2 text-xs text-gray-500">Income</Text>
            <Text className="mt-0.5 text-base font-bold text-emerald-600">
              {formatCurrency(totals.income)}
            </Text>
          </Card>

          <Card className="flex-1">
            <View className="h-8 w-8 items-center justify-center rounded-full bg-rose-100">
              <Text className="text-sm">↓</Text>
            </View>
            <Text className="mt-2 text-xs text-gray-500">Expenses</Text>
            <Text className="mt-0.5 text-base font-bold text-rose-600">
              {formatCurrency(totals.expenses)}
            </Text>
          </Card>
        </View>

        <View className="mx-4 mb-2 mt-6 flex-row items-center justify-between">
          <Text className="text-base font-bold text-gray-900">Recent transactions</Text>
          <Pressable
            onPress={() => navigation.navigate("Transactions")}
            className="active:opacity-70"
          >
            <Text className="text-sm font-semibold text-blue-600">View all</Text>
          </Pressable>
        </View>

        <View className="mx-4 overflow-hidden rounded-2xl border border-gray-100 bg-white">
          {recent.length === 0 ? (
            <EmptyState
              icon="🧾"
              title="Nothing here yet"
              message="Add your first transaction and it will show up here."
            />
          ) : (
            recent.map((transaction, index) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                isLast={index === recent.length - 1}
              />
            ))
          )}
        </View>
      </ScrollView>

      <Pressable
        onPress={() => navigation.navigate("AddTransaction")}
        className="absolute bottom-6 right-6 h-14 w-14 items-center justify-center rounded-full bg-blue-600 active:opacity-70"
      >
        <Text className="text-3xl leading-none text-white">+</Text>
      </Pressable>
    </SafeAreaView>
  );
}
