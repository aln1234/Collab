from django.contrib import admin

from .models import CampaignApplication


@admin.register(CampaignApplication)
class CampaignApplicationAdmin(admin.ModelAdmin):
    list_display = ("campaign", "creator", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("campaign__title", "creator__display_name", "creator__user__email")
    readonly_fields = ("id", "created_at", "updated_at")
