from rest_framework import serializers

from .models import CreatorProfile


class CreatorProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = CreatorProfile
        fields = (
            "id",
            "email",
            "display_name",
            "bio",
            "niche",
            "location",
            "instagram_url",
            "tiktok_url",
            "youtube_url",
            "profile_image",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "email", "created_at", "updated_at")
