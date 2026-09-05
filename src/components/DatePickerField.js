import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

import { formatDate, todayAsText } from "../utils/format";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function pad(value) {
  return String(value).padStart(2, "0");
}

function toText(year, month, day) {
  return year + "-" + pad(month) + "-" + pad(day);
}

function readParts(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || "").trim());

  if (!match) {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  }

  return { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) };
}

// Lays the month out as rows of seven, padding the first and last week with blanks so the columns line up.
function buildWeeks(year, month) {
  const firstWeekday = new Date(year, month - 1, 1).getDay();
  const dayCount = new Date(year, month, 0).getDate();
  const cells = [];

  for (let i = 0; i < firstWeekday; i += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= dayCount; day += 1) {
    cells.push(day);
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const weeks = [];

  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return weeks;
}

export default function DatePickerField({ value, onChange, hasError }) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState(() => {
    const parts = readParts(value);
    return { year: parts.year, month: parts.month };
  });

  const selected = readParts(value);
  const weeks = buildWeeks(view.year, view.month);

  function openPicker() {
    const parts = readParts(value);
    setView({ year: parts.year, month: parts.month });
    setIsOpen(true);
  }

  function shiftMonth(step) {
    setView((current) => {
      let month = current.month + step;
      let year = current.year;

      if (month < 1) {
        month = 12;
        year -= 1;
      }

      if (month > 12) {
        month = 1;
        year += 1;
      }

      return { year, month };
    });
  }

  function pick(day) {
    onChange(toText(view.year, view.month, day));
    setIsOpen(false);
  }

  return (
    <View>
      <Pressable
        onPress={openPicker}
        className={
          "flex-row items-center justify-between rounded-xl border bg-white px-3 py-3 active:opacity-70 " +
          (hasError ? "border-rose-400" : "border-gray-200")
        }
      >
        <Text className="text-base text-gray-900">{formatDate(value) || "Pick a date"}</Text>
        <Text className="text-base">📅</Text>
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        {/* Tapping the dark area closes. The inner Pressable swallows taps so they do not reach it. */}
        <Pressable
          onPress={() => setIsOpen(false)}
          className="flex-1 items-center justify-center bg-black/40 px-6"
        >
          <Pressable onPress={() => {}} className="w-full rounded-2xl bg-white p-4">
            <View className="mb-3 flex-row items-center justify-between">
              <Pressable
                onPress={() => shiftMonth(-1)}
                className="h-9 w-9 items-center justify-center rounded-full bg-gray-100 active:opacity-70"
              >
                <Text className="text-lg text-gray-700">‹</Text>
              </Pressable>

              <Text className="text-base font-bold text-gray-900">
                {MONTHS[view.month - 1]} {view.year}
              </Text>

              <Pressable
                onPress={() => shiftMonth(1)}
                className="h-9 w-9 items-center justify-center rounded-full bg-gray-100 active:opacity-70"
              >
                <Text className="text-lg text-gray-700">›</Text>
              </Pressable>
            </View>

            <View className="flex-row">
              {WEEKDAYS.map((label, index) => (
                <View key={index} className="flex-1 items-center py-1">
                  <Text className="text-xs font-medium text-gray-400">{label}</Text>
                </View>
              ))}
            </View>

            {weeks.map((week, weekIndex) => (
              <View key={weekIndex} className="flex-row">
                {week.map((day, dayIndex) => {
                  if (!day) {
                    return <View key={dayIndex} className="flex-1 py-1" />;
                  }

                  const isSelected =
                    day === selected.day &&
                    view.month === selected.month &&
                    view.year === selected.year;

                  return (
                    <Pressable
                      key={dayIndex}
                      onPress={() => pick(day)}
                      className="flex-1 items-center py-1 active:opacity-70"
                    >
                      <View
                        className={
                          "h-9 w-9 items-center justify-center rounded-full " +
                          (isSelected ? "bg-blue-600" : "")
                        }
                      >
                        <Text
                          className={
                            "text-sm " +
                            (isSelected ? "font-bold text-white" : "text-gray-800")
                          }
                        >
                          {day}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            ))}

            <View className="mt-3 flex-row gap-2">
              <Pressable
                onPress={() => {
                  onChange(todayAsText());
                  setIsOpen(false);
                }}
                className="flex-1 items-center rounded-xl border border-gray-200 py-3 active:opacity-70"
              >
                <Text className="text-sm font-semibold text-gray-700">Today</Text>
              </Pressable>

              <Pressable
                onPress={() => setIsOpen(false)}
                className="flex-1 items-center rounded-xl bg-gray-900 py-3 active:opacity-70"
              >
                <Text className="text-sm font-semibold text-white">Close</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
