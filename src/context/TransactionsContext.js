import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { transactions as mockTransactions } from "../../data";

const TransactionsContext = createContext(null);

// If the data file is ever malformed, the app shows an error state instead of crashing on a missing method.
const dataIsUsable = Array.isArray(mockTransactions);
const startingItems = dataIsUsable ? mockTransactions : [];

let addedCount = 0;

function makeId() {
  addedCount += 1;
  return "new" + addedCount;
}

export function TransactionsProvider({ children }) {
  const [items, setItems] = useState(startingItems);
  const [isLoading, setIsLoading] = useState(true);

  // The data is already in memory, so this short wait only exists to show the loading state. It is not a network call.
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const addTransaction = useCallback((transaction) => {
    setItems((current) => [{ ...transaction, id: makeId() }, ...current]);
  }, []);

  const clearAll = useCallback(() => setItems([]), []);

  const restoreSampleData = useCallback(() => setItems(startingItems), []);

  // Sorted here rather than in each screen, so every list shows the newest first without repeating the same sort.
  const sorted = useMemo(
    () => [...items].sort((a, b) => new Date(b.date) - new Date(a.date)),
    [items],
  );

  const value = useMemo(
    () => ({
      transactions: sorted,
      isLoading,
      loadError: dataIsUsable ? null : "We could not read the transaction data.",
      addTransaction,
      clearAll,
      restoreSampleData,
    }),
    [sorted, isLoading, addTransaction, clearAll, restoreSampleData],
  );

  return (
    <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error("useTransactions has to be used inside TransactionsProvider");
  }

  return context;
}
