from django.test import TestCase
from django.utils import timezone
from model_mommy import mommy

from common.tests.fixtures import TestDataMixin

from ..api.v1.serializers import SaleProductSerializer, SaleSerializer
from ..models import Sale, SaleProduct


class SaleProductSerializerTests(TestDataMixin, TestCase):
    def test_valid_serialization(self):
        """
        Serializer should create a serialized representation of the model instance with provided data
        """

        sale_products = SaleProduct.objects.all()
        serializer = SaleProductSerializer(
            sale_products,
            many=True,
            context=self.serializer_context,
        )
        self.assertEqual(len(serializer.data), sale_products.count())
        for data in serializer.data:
            self.assertIn("product", data)
            self.assertIn("quantity", data)


class SaleSerializerTests(TestDataMixin, TestCase):
    def test_valid_serialization(self):
        """
        Serializer should create a serialized representation of the model instance with provided data
        """

        serialized_sale_data = {
            "invoice_number": self.sale_data["invoice_number"],
            "date_time": self.sale_data["date_time"].isoformat(),
            "customer": "http://testserver"
            + self.sale_data["customer"].get_absolute_url(),
            "vendor": "http://testserver" + self.sale_data["vendor"].get_absolute_url(),
            "products": [
                {
                    "product": "http://testserver"
                    + self.products[0].get_absolute_url(),
                    "quantity": 1,
                },
                {
                    "product": "http://testserver"
                    + self.products[1].get_absolute_url(),
                    "quantity": 2,
                },
                {
                    "product": "http://testserver"
                    + self.products[2].get_absolute_url(),
                    "quantity": 3,
                },
            ],
        }

        serializer = SaleSerializer(self.sale, context=self.serializer_context)

        self.assertEqual(
            serializer.data["invoice_number"], serialized_sale_data["invoice_number"]
        )
        self.assertEqual(
            serializer.data["date_time"], serialized_sale_data["date_time"]
        )
        self.assertEqual(serializer.data["customer"], serialized_sale_data["customer"])
        self.assertEqual(serializer.data["vendor"], serialized_sale_data["vendor"])

    def test_valid_deserialization(self):
        """
        Serializer should be valid and create the model instance with provided data
        """

        serialized_sale_data = {
            "invoice_number": str(Sale.objects.first().id + 1),
            "date_time": self.sale_data["date_time"].isoformat(),
            "customer": "http://testserver"
            + self.sale_data["customer"].get_absolute_url(),
            "vendor": "http://testserver" + self.sale_data["vendor"].get_absolute_url(),
            "products": [
                {
                    "product": "http://testserver"
                    + self.products[0].get_absolute_url(),
                    "quantity": 5,
                },
                {
                    "product": "http://testserver"
                    + self.products[1].get_absolute_url(),
                    "quantity": 5,
                },
            ],
        }

        serializer = SaleSerializer(data=serialized_sale_data)
        self.assertTrue(serializer.is_valid())

        sale = serializer.save()
        self.assertEqual(sale.invoice_number, serialized_sale_data["invoice_number"])
        self.assertEqual(sale.date_time.isoformat(), serialized_sale_data["date_time"])
        self.assertEqual(
            "http://testserver" + sale.customer.get_absolute_url(),
            serialized_sale_data["customer"],
        )
        self.assertEqual(
            "http://testserver" + sale.vendor.get_absolute_url(),
            serialized_sale_data["vendor"],
        )

        sale_products = SaleProduct.objects.filter(sale=sale)
        serializer = SaleProductSerializer(
            sale_products, many=True, context=self.serializer_context
        )
        self.assertCountEqual(serializer.data, serialized_sale_data["products"])

    def test_instance_update(self):
        """
        Serializer should be valid and update the model instance with provided data
        """

        sale = mommy.make(Sale, invoice_number="0000000010")

        now = timezone.now()
        desired_timezone = timezone.get_default_timezone()
        adjusted_now = now.astimezone(desired_timezone)
        updated_date_time = adjusted_now.isoformat()

        updated_sale_data = {
            "invoice_number": sale.invoice_number,
            "date_time": updated_date_time,
            "customer": "http://testserver" + self.customer.get_absolute_url(),
            "vendor": "http://testserver" + self.vendor.get_absolute_url(),
            "products": [
                {
                    "product": "http://testserver"
                    + self.products[0].get_absolute_url(),
                    "quantity": 5,
                },
            ],
        }

        serializer = SaleSerializer(instance=sale, data=updated_sale_data)
        self.assertTrue(serializer.is_valid())

        updated_sale = serializer.save()
        self.assertEqual(
            updated_sale.date_time.isoformat(),
            updated_sale_data["date_time"],
        )
        self.assertEqual(updated_sale.products.count(), 1)

    def test_invalid_deserialization(self):
        """
        Serializer should be invalid for missing or invalid data
        """

        invalid_data = [
            {
                "invoice_number": "0000000002",
                "date_time": "",
                "customer": "http://testserver" + self.customer.get_absolute_url(),
                "vendor": "http://testserver" + self.vendor.get_absolute_url(),
                "products": [],
            },
            {
                "invoice_number": "0000000003",
                "date_time": "2023-06-04T21:12:45.529818-03:00",
                "customer": "http://testserver",
                "vendor": "http://testserver" + self.vendor.get_absolute_url(),
                "products": [],
            },
            {
                "invoice_number": "0000000004",
                "date_time": "2023-06-04T21:12:45.529818-03:00",
                "customer": "http://testserver" + self.customer.get_absolute_url(),
                "vendor": "http://testserver" + self.vendor.get_absolute_url(),
                "products": [
                    {
                        "product": "",
                    },
                ],
            },
        ]

        for data in invalid_data:
            serializer = SaleSerializer(data=data)
            self.assertFalse(serializer.is_valid())
