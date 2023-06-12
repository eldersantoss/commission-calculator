from decimal import Decimal

from django.test import TestCase
from rest_framework.test import APIRequestFactory

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
        self.serializer_context = {"request": APIRequestFactory().get("/")}

    def test_serialization(self):
        """
        Serializer should create a serialized representation of the model instance with provided data
        """

        data = {
            "code": "12345",
            "description": "Test Product",
            "unit_price": "9.99",
            "commission_rate": "0.070",
        }
        instance = Product.objects.create(**data)

        serializer = ProductSerializer(instance, context=self.serializer_context)

        self.assertEqual(serializer.data["code"], data["code"])
        self.assertEqual(serializer.data["description"], data["description"])
        self.assertEqual(serializer.data["unit_price"], data["unit_price"])
        self.assertEqual(
            Decimal(serializer.data["commission_rate"]),
            Decimal(data["commission_rate"]),
        )
        self.assertEqual(
            serializer.data["url"], "http://testserver" + instance.get_absolute_url()
        )

    def test_valid_deserialization(self):
        """
        Serializer should be valid and create a new model instance with provided data
        """

        serializer = ProductSerializer(data=self.data, context=self.serializer_context)
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
            serializer = ProductSerializer(data=data, context=self.serializer_context)
            self.assertFalse(serializer.is_valid())
