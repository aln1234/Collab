from rest_framework import serializers

from .models import BrandProfile


class BrandProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = BrandProfile
        fields = (
            "id",
            "email",
            "company_name",
            "website",
            "industry",
            "description",
            "logo",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "email", "created_at", "updated_at")
