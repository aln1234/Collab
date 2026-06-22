from django.contrib import admin

from .models import ContentSubmission


@admin.register(ContentSubmission)
class ContentSubmissionAdmin(admin.ModelAdmin):
    list_display = ("campaign", "creator", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("campaign__title", "creator__display_name", "caption", "brand_feedback")
    readonly_fields = ("id", "created_at", "updated_at")
