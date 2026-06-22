from django.conf import settings
from django.db import models

from apps.core.models import TimeStampedModel


class BrandProfile(TimeStampedModel):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="brand_profile")
    company_name = models.CharField(max_length=255)
    website = models.URLField(blank=True)
    industry = models.CharField(max_length=120, blank=True)
    description = models.TextField(blank=True)
    logo = models.ImageField(upload_to="brands/logos/", blank=True, null=True)

    class Meta:
        ordering = ["company_name"]
        indexes = [models.Index(fields=["created_at"])]

    def __str__(self) -> str:
        return self.company_name
