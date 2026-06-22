from django.db import models

from apps.campaigns.models import Campaign
from apps.core.models import TimeStampedModel
from apps.creators.models import CreatorProfile


class ContentSubmission(TimeStampedModel):
    class Status(models.TextChoices):
        SUBMITTED = "SUBMITTED", "Submitted"
        REVISION_REQUESTED = "REVISION_REQUESTED", "Revision requested"
        APPROVED = "APPROVED", "Approved"

    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name="submissions")
    creator = models.ForeignKey(CreatorProfile, on_delete=models.CASCADE, related_name="submissions")
    file = models.FileField(upload_to="submissions/content/")
    caption = models.TextField(blank=True)
    status = models.CharField(max_length=30, choices=Status.choices, default=Status.SUBMITTED)
    brand_feedback = models.TextField(blank=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["status"]),
            models.Index(fields=["created_at"]),
        ]

    def __str__(self) -> str:
        return f"{self.creator} submission for {self.campaign}"
