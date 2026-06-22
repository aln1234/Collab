from django.contrib import admin

from .models import CreatorProfile


@admin.register(CreatorProfile)
class CreatorProfileAdmin(admin.ModelAdmin):
    list_display = ("display_name", "user", "niche", "location", "created_at")
    list_filter = ("niche", "created_at")
    search_fields = ("display_name", "user__email", "niche", "location")
    readonly_fields = ("id", "created_at", "updated_at")
