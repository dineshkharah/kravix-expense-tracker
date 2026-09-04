const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Indian digit grouping, so 100000 reads as 1,00,000. Written by hand because Hermes does not always ship full locale support on device.
function groupDigits(digits) {
  if (digits.length <= 3) {
    return digits;
  }

  const lastThree = digits.slice(-3);
  const rest = digits.slice(0, -3);

  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
}

export function formatCurrency(amount) {
  const value = Math.round(Number(amount) || 0);

  return "₹" + groupDigits(String(Math.abs(value)));
}

// Dates are plain YYYY-MM-DD strings, split by hand so a timezone can never shift the day.
export function formatDate(value) {
  const parts = String(value || "").split("-");
  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);

  if (!year || !month || !day || month < 1 || month > 12) {
    return "";
  }

  return day + " " + MONTHS[month - 1] + " " + year;
}

export function todayAsText() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return now.getFullYear() + "-" + month + "-" + day;
}
