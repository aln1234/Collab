from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "email", "full_name", "role", "is_verified", "created_at", "updated_at")
        read_only_fields = ("id", "is_verified", "created_at", "updated_at")


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ("id", "email", "full_name", "role", "password")
        read_only_fields = ("id",)

    def validate_role(self, value: str) -> str:
        if value == User.Role.ADMIN:
            raise serializers.ValidationError("Admin users must be created by an existing admin.")
        return value

    def create(self, validated_data):
        password = validated_data.pop("password")
        return User.objects.create_user(password=password, **validated_data)
