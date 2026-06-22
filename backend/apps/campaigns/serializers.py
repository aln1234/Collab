from rest_framework import serializers

from apps.brands.serializers import BrandProfileSerializer

from .models import Campaign


class CampaignSerializer(serializers.ModelSerializer):
    brand = BrandProfileSerializer(read_only=True)

    class Meta:
        model = Campaign
        fields = (
            "id",
            "brand",
            "title",
            "description",
            "budget",
            "currency",
            "status",
            "deliverables",
            "deadline",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "brand", "created_at", "updated_at")
