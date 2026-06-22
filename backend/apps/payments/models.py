from django.db import models

from apps.campaigns.models import Campaign
from apps.core.models import TimeStampedModel
from apps.creators.models import CreatorProfile


class PaymentRecord(TimeStampedModel):
    class Status(models.TextChoices):
        UNPAID = "UNPAID", "Unpaid"
        PENDING = "PENDING", "Pending"
        PAID = "PAID", "Paid"
        DISPUTED = "DISPUTED", "Disputed"

    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name="payments")
    creator = models.ForeignKey(CreatorProfile, on_delete=models.CASCADE, related_name="payments")
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    currency = models.CharField(max_length=3, default="USD")
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.UNPAID)
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ["-created_at"]
        constraints = [
            models.UniqueConstraint(fields=["campaign", "creator"], name="unique_campaign_creator_payment"),
        ]
        indexes = [
            models.Index(fields=["status"]),
            models.Index(fields=["created_at"]),
        ]

    def __str__(self) -> str:
        return f"{self.creator} / {self.campaign} / {self.status}"
