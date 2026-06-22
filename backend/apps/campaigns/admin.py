from django.contrib import admin

from .models import Campaign


@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ("title", "brand", "budget", "currency", "status", "deadline", "created_at")
    list_filter = ("status", "currency", "deadline", "created_at")
    search_fields = ("title", "description", "brand__company_name")
    readonly_fields = ("id", "created_at", "updated_at")
