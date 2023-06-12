from persons.models import Customer, Vendor
from products.models import Product
from rest_framework import serializers

from ...models import Sale, SaleProduct


class SaleProductSerializer(serializers.ModelSerializer):
    product = serializers.HyperlinkedRelatedField(
        view_name="product-detail",
        queryset=Product.objects.all(),
    )

    class Meta:
        model = SaleProduct
        fields = ["product", "quantity"]


class SaleSerializer(serializers.HyperlinkedModelSerializer):
    customer = serializers.HyperlinkedRelatedField(
        view_name="customer-detail",
        queryset=Customer.objects.all(),
    )
    vendor = serializers.HyperlinkedRelatedField(
        view_name="vendor-detail",
        queryset=Vendor.objects.all(),
    )
    products = SaleProductSerializer(many=True, source="saleproduct_set")

    vendor_name = serializers.SerializerMethodField(read_only=True)
    customer_name = serializers.SerializerMethodField(read_only=True)
    total_value = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Sale
        fields = [
            "id",
            "url",
            "invoice_number",
            "date_time",
            "customer",
            "vendor",
            "products",
            "customer_name",
            "vendor_name",
            "total_value",
        ]
        read_only_fields = [
            "id",
            "url",
            "invoice_number",
            "vendor_name",
            "customer_name",
            "total_value",
        ]

    def get_customer_name(self, obj):
        return obj.customer.name

    def get_vendor_name(self, obj):
        return obj.vendor.name

    def get_total_value(self, obj):
        return obj.get_total_value()

    def create(self, validated_data):
        products_data = validated_data.pop("saleproduct_set", [])
        last_sale = Sale.objects.last()
        validated_data["invoice_number"] = str(last_sale.id + 1 if last_sale else 1)
        sale = Sale.objects.create(**validated_data)

        for product_data in products_data:
            SaleProduct.objects.create(sale=sale, **product_data)

        return sale

    def update(self, instance, validated_data):
        products_data = validated_data.pop("saleproduct_set", [])
        instance.invoice_number = validated_data.get(
            "invoice_number", instance.invoice_number
        )
        instance.date_time = validated_data.get("date_time", instance.date_time)
        instance.customer = validated_data.get("customer", instance.customer)
        instance.vendor = validated_data.get("vendor", instance.vendor)

        instance.saleproduct_set.all().delete()

        for product_data in products_data:
            SaleProduct.objects.create(sale=instance, **product_data)

        instance.save()

        return instance
