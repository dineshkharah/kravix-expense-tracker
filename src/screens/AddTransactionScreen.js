import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import DatePickerField from "../components/DatePickerField";
import FormField from "../components/FormField";
import { categories } from "../../data";
import { useTransactions } from "../context/TransactionsContext";
import { todayAsText } from "../utils/format";

const TYPES = [
  { value: "expense", label: "Expense" },
  { value: "income", label: "Income" },
];

const PLACEHOLDER_COLOR = "#9ca3af";

function inputClasses(hasError) {
  return (
    "rounded-xl border bg-white px-3 py-3 text-base text-gray-900 " +
    (hasError ? "border-rose-400" : "border-gray-200")
  );
}

// Checks the date is really a date, not just the right shape. Rules out 2026-02-31 and 2026-13-01.
function isRealDate(text) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(text).trim());

  if (!match) {
    return false;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (month < 1 || month > 12 || day < 1) {
    return false;
  }

  return day <= new Date(year, month, 0).getDate();
}

export default function AddTransactionScreen() {
  const navigation = useNavigation();
  const { addTransaction } = useTransactions();

  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(todayAsText());
  const [errors, setErrors] = useState({});

  // Errors clear as soon as the user fixes the field, so a message never lingers on something already corrected.
  function clearError(field) {
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];

      return next;
    });
  }

  // The number keyboard is only a hint, so letters and a minus sign can still arrive from other keyboards. Strip them here and keep at most one dot.
  function handleAmountChange(text) {
    const digitsAndDots = text.replace(/[^0-9.]/g, "");
    const parts = digitsAndDots.split(".");

    clearError("amount");

    if (parts.length > 2) {
      setAmount(parts[0] + "." + parts.slice(1).join(""));
      return;
    }

    setAmount(digitsAndDots);
  }

  function findErrors() {
    const found = {};
    const value = Number(amount);

    if (!amount.trim()) {
      found.amount = "Enter an amount.";
    } else if (!Number.isFinite(value) || value <= 0) {
      found.amount = "Enter an amount greater than zero.";
    }

    if (!title.trim()) {
      found.title = "Give this a title.";
    }

    if (!category) {
      found.category = "Pick a category.";
    }

    if (!isRealDate(date)) {
      found.date = "Use a real date, like 2026-09-05.";
    }

    return found;
  }

  function handleSave() {
    const found = findErrors();
    setErrors(found);

    if (Object.keys(found).length > 0) {
      return;
    }

    addTransaction({
      title: title.trim(),
      amount: Number(amount),
      category,
      type,
      date: date.trim(),
      wallet: null,
      note: "",
    });

    navigation.goBack();
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <View className="flex-row items-center gap-3 px-4 py-3">
        <Pressable
          onPress={() => navigation.goBack()}
          className="h-9 w-9 items-center justify-center rounded-full bg-white active:opacity-70"
        >
          <Text className="text-lg text-gray-700">←</Text>
        </Pressable>
        <Text className="text-lg font-bold text-gray-900">Add Transaction</Text>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* keyboardShouldPersistTaps stops the first tap on Save from being swallowed by the keyboard dismissing. */}
        <ScrollView
          contentContainerClassName="px-4 pb-10"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-5 flex-row rounded-xl bg-gray-200 p-1">
            {TYPES.map((option) => {
              const isActive = type === option.value;

              return (
                <Pressable
                  key={option.value}
                  onPress={() => setType(option.value)}
                  className={
                    "flex-1 items-center rounded-lg py-2.5 " + (isActive ? "bg-white" : "")
                  }
                >
                  <Text
                    className={
                      "text-sm font-semibold " +
                      (isActive ? "text-gray-900" : "text-gray-500")
                    }
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <FormField label="Amount" error={errors.amount}>
            <View
              className={
                "flex-row items-center rounded-xl border bg-white px-3 " +
                (errors.amount ? "border-rose-400" : "border-gray-200")
              }
            >
              <Text className="text-lg text-gray-400">₹</Text>
              <TextInput
                value={amount}
                onChangeText={handleAmountChange}
                keyboardType="decimal-pad"
                placeholder="0"
                placeholderTextColor={PLACEHOLDER_COLOR}
                className="flex-1 px-2 py-3 text-lg text-gray-900"
              />
            </View>
          </FormField>

          <FormField label="Title" error={errors.title}>
            <TextInput
              value={title}
              onChangeText={(text) => {
                clearError("title");
                setTitle(text);
              }}
              placeholder="What was it for?"
              placeholderTextColor={PLACEHOLDER_COLOR}
              className={inputClasses(errors.title)}
            />
          </FormField>

          <FormField label="Category" error={errors.category}>
            <View className="flex-row flex-wrap gap-2">
              {categories.map((item) => {
                const isActive = category === item.label;

                return (
                  <Pressable
                    key={item.id}
                    onPress={() => {
                      clearError("category");
                      setCategory(item.label);
                    }}
                    className={
                      "flex-row items-center gap-1 rounded-full border px-3 py-2 active:opacity-70 " +
                      (isActive ? "border-blue-600 bg-blue-600" : "border-gray-200 bg-white")
                    }
                  >
                    <Text className="text-xs">{item.icon}</Text>
                    <Text
                      className={"text-sm " + (isActive ? "text-white" : "text-gray-700")}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </FormField>

          <FormField label="Date" error={errors.date}>
            <DatePickerField
              value={date}
              hasError={Boolean(errors.date)}
              onChange={(next) => {
                clearError("date");
                setDate(next);
              }}
            />
          </FormField>

          <Pressable
            onPress={handleSave}
            className="mt-2 items-center rounded-xl bg-blue-600 py-4 active:opacity-70"
          >
            <Text className="text-base font-semibold text-white">Save transaction</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
