from django.contrib import admin

from .models import CommissionRateLimit


@admin.register(CommissionRateLimit)
class CommissionRateLimitAdmin(admin.ModelAdmin):
    list_display = ["weekday", "min_value", "max_value"]
    list_editable = ["min_value", "max_value"]
