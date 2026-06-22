from rest_framework import serializers

from apps.campaigns.serializers import CampaignSerializer
from apps.creators.serializers import CreatorProfileSerializer

from .models import CampaignApplication


class CampaignApplicationSerializer(serializers.ModelSerializer):
    campaign = CampaignSerializer(read_only=True)
    creator = CreatorProfileSerializer(read_only=True)

    class Meta:
        model = CampaignApplication
        fields = (
            "id",
            "campaign",
            "creator",
            "message",
            "status",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "campaign", "creator", "status", "created_at", "updated_at")


class ApplyToCampaignSerializer(serializers.Serializer):
    message = serializers.CharField(required=False, allow_blank=True)


class ApplicationStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampaignApplication
        fields = ("id", "status", "updated_at")
        read_only_fields = ("id", "updated_at")

    def validate_status(self, value: str) -> str:
        if value not in {CampaignApplication.Status.APPROVED, CampaignApplication.Status.REJECTED}:
            raise serializers.ValidationError("Use APPROVED or REJECTED.")
        return value

    def validate(self, attrs):
        if "status" not in attrs:
            raise serializers.ValidationError({"status": "This field is required."})
        return attrs
