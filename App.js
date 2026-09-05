import "./global.css";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import RootNavigator from "./src/navigation/RootNavigator";
import { TransactionsProvider } from "./src/context/TransactionsContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <TransactionsProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <RootNavigator />
        </NavigationContainer>
      </TransactionsProvider>
    </SafeAreaProvider>
  );
}
