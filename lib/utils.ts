export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function formatPrice(price: number): string {
  return `£${price.toFixed(2)}`;
}
