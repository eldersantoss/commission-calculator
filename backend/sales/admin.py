from django.contrib import admin

from .models import CommissionRateLimit, Sale, SaleProduct


@admin.register(CommissionRateLimit)
class CommissionRateLimitAdmin(admin.ModelAdmin):
    list_display = ["weekday", "min_value", "max_value"]
    list_editable = ["min_value", "max_value"]


@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ["invoice_number", "date_time", "customer", "vendor"]


@admin.register(SaleProduct)
class SaleProductAdmin(admin.ModelAdmin):
    list_display = ["sale", "product", "quantity"]
