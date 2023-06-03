from rest_framework import serializers

from ...models import Customer, Vendor


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ("name", "email", "phone")


class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ("name", "email", "phone")
