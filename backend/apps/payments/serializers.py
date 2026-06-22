from rest_framework import serializers

from apps.campaigns.serializers import CampaignSerializer
from apps.creators.serializers import CreatorProfileSerializer

from .models import PaymentRecord


class PaymentRecordSerializer(serializers.ModelSerializer):
    campaign = CampaignSerializer(read_only=True)
    creator = CreatorProfileSerializer(read_only=True)

    class Meta:
        model = PaymentRecord
        fields = (
            "id",
            "campaign",
            "creator",
            "amount",
            "currency",
            "status",
            "notes",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "campaign", "creator", "amount", "currency", "created_at", "updated_at")


class PaymentStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentRecord
        fields = ("id", "status", "notes", "updated_at")
        read_only_fields = ("id", "updated_at")

    def validate(self, attrs):
        if "status" not in attrs:
            raise serializers.ValidationError({"status": "This field is required."})
        return attrs
