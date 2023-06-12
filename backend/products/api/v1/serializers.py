from rest_framework import serializers

from ...models import Product


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = (
            "url",
            "code",
            "description",
            "unit_price",
            "commission_rate",
        )
        read_only_fields = ["url"]
