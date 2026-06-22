from rest_framework import serializers

from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ("id", "title", "message", "is_read", "created_at", "updated_at")
        read_only_fields = ("id", "title", "message", "created_at", "updated_at")


class NotificationReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ("id", "is_read", "updated_at")
        read_only_fields = ("id", "updated_at")
