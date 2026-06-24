export function formatPaymentAmount(amount: string, currency: string) {
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) {
    return `${amount} ${currency}`;
  }

  try {
    return new Intl.NumberFormat(undefined, {
      currency,
      maximumFractionDigits: 2,
      style: "currency",
    }).format(numericAmount);
  } catch {
    return `${numericAmount.toLocaleString()} ${currency}`;
  }
}
