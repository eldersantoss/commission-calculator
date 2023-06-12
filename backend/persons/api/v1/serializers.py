from rest_framework import serializers

from ...models import Customer, Vendor


class CustomerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Customer
        fields = ("id", "url", "name", "email", "phone")


class VendorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Vendor
        fields = ("id", "url", "name", "email", "phone")


class VendorCommissionSerializer(serializers.ModelSerializer):
    code = serializers.SerializerMethodField()
    number_of_sales = serializers.SerializerMethodField()
    commission_value = serializers.SerializerMethodField()

    class Meta:
        model = Vendor
        fields = ("code", "name", "number_of_sales", "commission_value")

    def get_code(self, obj: Vendor):
        return obj.id

    def get_number_of_sales(self, obj: Vendor):
        return obj.get_sales_on_period(*self._get_period()).count()

    def get_commission_value(self, obj: Vendor):
        return obj.get_commission_value_on_period(*self._get_period())

    def _get_period(self):
        return (
            self.context["request"].query_params.get("start_period"),
            self.context["request"].query_params.get("end_period"),
        )
