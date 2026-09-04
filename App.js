import "./global.css";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import RootNavigator from "./src/navigation/RootNavigator";
import { TransactionsProvider } from "./src/context/TransactionsContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <TransactionsProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </TransactionsProvider>
    </SafeAreaProvider>
  );
}
