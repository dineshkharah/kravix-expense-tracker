import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { transactions as mockTransactions } from "../../data";

const TransactionsContext = createContext(null);

let addedCount = 0;

function makeId() {
  addedCount += 1;
  return "new" + addedCount;
}

export function TransactionsProvider({ children }) {
  const [items, setItems] = useState(mockTransactions);

  const addTransaction = useCallback((transaction) => {
    setItems((current) => [{ ...transaction, id: makeId() }, ...current]);
  }, []);

  const clearAll = useCallback(() => setItems([]), []);

  const restoreSampleData = useCallback(() => setItems(mockTransactions), []);

  // Sorted here rather than in each screen, so every list shows the newest first without repeating the same sort.
  const sorted = useMemo(
    () => [...items].sort((a, b) => new Date(b.date) - new Date(a.date)),
    [items],
  );

  const value = useMemo(
    () => ({
      transactions: sorted,
      addTransaction,
      clearAll,
      restoreSampleData,
    }),
    [sorted, addTransaction, clearAll, restoreSampleData],
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
