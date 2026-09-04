// Percentage widths for the progress bars. They are safelisted below because the class name is built at runtime, and tailwind only reads source text at build time, so it would never see the class otherwise.
const percentWidths = Object.fromEntries(
  Array.from({ length: 101 }, (_, i) => ["pct-" + i, i + "%"]),
);

module.exports = {
  // The data folder is scanned too, because categories.json stores tailwind class names as values and tailwind only compiles classes it can find in source text.
  content: ["./App.js", "./index.js", "./src/**/*.{js,jsx}", "./data/**/*.{js,json}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      width: percentWidths,
    },
  },
  safelist: [{ pattern: /^w-pct-\d+$/ }],
  plugins: [],
};
