from django.contrib import admin

from .models import PaymentRecord


@admin.register(PaymentRecord)
class PaymentRecordAdmin(admin.ModelAdmin):
    list_display = ("campaign", "creator", "amount", "currency", "status", "created_at")
    list_filter = ("status", "currency", "created_at")
    search_fields = ("campaign__title", "creator__display_name", "creator__user__email", "notes")
    readonly_fields = ("id", "created_at", "updated_at")
