from django.conf import settings
from django.db import models

from apps.core.models import TimeStampedModel


class CreatorProfile(TimeStampedModel):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="creator_profile")
    display_name = models.CharField(max_length=255)
    bio = models.TextField(blank=True)
    niche = models.CharField(max_length=120, blank=True)
    location = models.CharField(max_length=120, blank=True)
    instagram_url = models.URLField(blank=True)
    tiktok_url = models.URLField(blank=True)
    youtube_url = models.URLField(blank=True)
    profile_image = models.ImageField(upload_to="creators/profile-images/", blank=True, null=True)

    class Meta:
        ordering = ["display_name"]
        indexes = [models.Index(fields=["created_at"])]

    def __str__(self) -> str:
        return self.display_name
