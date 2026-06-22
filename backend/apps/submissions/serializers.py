from rest_framework import serializers

from apps.campaigns.serializers import CampaignSerializer
from apps.creators.serializers import CreatorProfileSerializer

from .models import ContentSubmission


class ContentSubmissionSerializer(serializers.ModelSerializer):
    campaign = CampaignSerializer(read_only=True)
    creator = CreatorProfileSerializer(read_only=True)

    class Meta:
        model = ContentSubmission
        fields = (
            "id",
            "campaign",
            "creator",
            "file",
            "caption",
            "status",
            "brand_feedback",
            "created_at",
            "updated_at",
        )
        read_only_fields = (
            "id",
            "campaign",
            "creator",
            "status",
            "brand_feedback",
            "created_at",
            "updated_at",
        )


class CreateSubmissionSerializer(serializers.Serializer):
    file = serializers.FileField()
    caption = serializers.CharField(required=False, allow_blank=True)


class SubmissionStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentSubmission
        fields = ("id", "status", "brand_feedback", "updated_at")
        read_only_fields = ("id", "updated_at")

    def validate_status(self, value: str) -> str:
        if value not in {ContentSubmission.Status.REVISION_REQUESTED, ContentSubmission.Status.APPROVED}:
            raise serializers.ValidationError("Use APPROVED or REVISION_REQUESTED.")
        return value

    def validate(self, attrs):
        if "status" not in attrs:
            raise serializers.ValidationError({"status": "This field is required."})
        return attrs
