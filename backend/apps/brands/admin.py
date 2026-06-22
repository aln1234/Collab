from django.contrib import admin

from .models import BrandProfile


@admin.register(BrandProfile)
class BrandProfileAdmin(admin.ModelAdmin):
    list_display = ("company_name", "user", "industry", "created_at")
    list_filter = ("industry", "created_at")
    search_fields = ("company_name", "user__email", "industry")
    readonly_fields = ("id", "created_at", "updated_at")
