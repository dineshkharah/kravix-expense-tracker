import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DashboardScreen from "../screens/DashboardScreen";
import TransactionsScreen from "../screens/TransactionsScreen";
import SummaryScreen from "../screens/SummaryScreen";

const Tab = createBottomTabNavigator();

// Tab icons are plain emoji in a Text, so the app needs no icon library and no image files.
function makeTabIcon(icon) {
  return function TabIcon({ focused }) {
    return <Text className={focused ? "text-xl" : "text-xl opacity-40"}>{icon}</Text>;
  };
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#9ca3af",
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ tabBarIcon: makeTabIcon("🏠") }}
      />
      <Tab.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{ tabBarIcon: makeTabIcon("📋") }}
      />
      <Tab.Screen
        name="Summary"
        component={SummaryScreen}
        options={{ tabBarIcon: makeTabIcon("📊") }}
      />
    </Tab.Navigator>
  );
}
