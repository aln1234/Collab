import type { Campaign } from "@/features/campaigns/types";

export function formatCampaignBudget(campaign: Campaign) {
  const amount = Number(campaign.budget);

  if (!Number.isFinite(amount)) {
    return `${campaign.budget} ${campaign.currency}`;
  }

  try {
    return new Intl.NumberFormat(undefined, {
      currency: campaign.currency,
      maximumFractionDigits: 2,
      style: "currency",
    }).format(amount);
  } catch {
    return `${amount.toLocaleString()} ${campaign.currency}`;
  }
}

export function formatCampaignDate(value: string) {
  const date = new Date(value.includes("T") ? value : `${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatCampaignStatus(status: Campaign["status"]) {
  return status.replaceAll("_", " ").toLowerCase();
}
