from decimal import Decimal

from django.test import TestCase

from ..api.v1.serializers import ProductSerializer
from ..models import Product


class ProductSerializerTests(TestCase):
    def setUp(self):
        self.data = {
            "code": "12345",
            "description": "Test Product",
            "unit_price": "9.99",
            "commission_rate": "0.070",
        }

    def test_serialization(self):
        """
        Serializer should create a serialized representation of the model instance with provided data
        """

        instance = Product.objects.create(**self.data)

        serializer = ProductSerializer(instance)
        self.assertEqual(serializer.data, self.data)

    def test_valid_deserialization(self):
        """
        Serializer should be valid and create a new model instance with provided data
        """

        serializer = ProductSerializer(data=self.data)
        self.assertTrue(serializer.is_valid())

        instance = serializer.save()
        self.assertEqual(instance.code, self.data["code"])
        self.assertEqual(instance.description, self.data["description"])
        self.assertEqual(
            instance.unit_price,
            Decimal(self.data["unit_price"]),
        )
        self.assertEqual(
            instance.commission_rate,
            Decimal(self.data["commission_rate"]),
        )

    def test_invalid_deserialization(self):
        """
        Serializer should be invalid for missing or invalid data
        """

        invalid_data = [
            {
                "code": "",
                "description": "Test Product",
                "unit_price": "9.99",
                "commission_rate": "0.05",
            },
            {
                "code": "12345",
                "description": "",
                "unit_price": "9.99",
                "commission_rate": "0.05",
            },
            {
                "code": "12345",
                "description": "Test Product",
                "unit_price": "",
                "commission_rate": "0.05",
            },
            {
                "code": "12345",
                "description": "Test Product",
                "unit_price": "9.99",
                "commission_rate": "",
            },
            {
                "code": "abcde",
                "description": "Test Product",
                "unit_price": "9.99",
                "commission_rate": "0.05",
            },
            {
                "code": "12345",
                "description": "Test Product",
                "unit_price": "abc",
                "commission_rate": "0.05",
            },
            {
                "code": "12345",
                "description": "Test Product",
                "unit_price": "-9.99",
                "commission_rate": "0.05",
            },
            {
                "code": "12345",
                "description": "Test Product",
                "unit_price": "9.99",
                "commission_rate": "abc",
            },
            {
                "code": "12345",
                "description": "Test Product",
                "unit_price": "9.99",
                "commission_rate": "0.5",
            },
        ]

        for data in invalid_data:
            serializer = ProductSerializer(data=data)
            self.assertFalse(serializer.is_valid())
