import categories from "./categories.json";
import transactions from "./transactions.json";

// Used when a transaction names a category that is not in the list, so an unknown value can never crash a screen.
const unknownCategory = {
  id: "uncategorized",
  label: "Uncategorized",
  icon: "❓",
  bg: "bg-gray-100",
  fg: "text-gray-700",
  bar: "bg-gray-400",
};

export function getCategory(name) {
  if (!name) {
    return unknownCategory;
  }

  const wanted = String(name).toLowerCase();
  const found = categories.find(
    (category) => category.id === wanted || category.label.toLowerCase() === wanted,
  );

  return found || unknownCategory;
}

export { categories, transactions, unknownCategory };
