from django.test import TestCase
from rest_framework.test import APIRequestFactory

from ..api.v1.serializers import CustomerSerializer, VendorSerializer
from ..models import Customer, Vendor


class PersonSerializerTestsMixin:
    @classmethod
    def setUpClass(cls):
        cls.serializer_context = {"request": APIRequestFactory().get("/")}

    def test_serialization(self):
        """
        Should create a serialized representation of model instance with provided data
        """

        data = {
            "name": "Test Person",
            "email": "person@test.com",
            "phone": "5584900000000",
        }
        instance = self.model.objects.create(**data)

        serializer = self.serializer_class(instance, context=self.serializer_context)

        self.assertEqual(serializer.data["email"], data["email"])
        self.assertEqual(serializer.data["name"], data["name"])
        self.assertEqual(serializer.data["phone"], data["phone"])
        self.assertEqual(
            serializer.data["url"], "http://testserver" + instance.get_absolute_url()
        )

    def test_valid_deserialization(self):
        """
        Should create a model instance with provided data
        """

        data = {
            "name": "Test Person",
            "email": "person@test.com",
            "phone": "5584900000000",
        }

        serializer = self.serializer_class(data=data, context=self.serializer_context)

        self.assertTrue(serializer.is_valid())

        instance = serializer.save()

        self.assertEqual(self.model.objects.count(), 1)
        self.assertEqual(instance.name, data["name"])
        self.assertEqual(instance.email, data["email"])
        self.assertEqual(instance.phone, data["phone"])

    def test_invalid_deserialization(self):
        """
        Should validate provided data and provide the corresponding errors
        """

        data = {
            "email": "invalid_email",
            "phone": "very_long_invalid_phone_with",
        }

        serializer = self.serializer_class(data=data, context=self.serializer_context)

        self.assertFalse(serializer.is_valid())

        self.assertIn("name", serializer.errors)
        self.assertEqual(serializer.errors["name"][0].code, "required")

        self.assertIn("email", serializer.errors)
        self.assertEqual(serializer.errors["email"][0].code, "invalid")

        self.assertIn("phone", serializer.errors)
        self.assertEqual(serializer.errors["phone"][0].code, "invalid")
        self.assertEqual(serializer.errors["phone"][1].code, "max_length")

    @classmethod
    def tearDownClass(cls):
        pass


class VendorSerializerTestCase(PersonSerializerTestsMixin, TestCase):
    model = Vendor
    serializer_class = VendorSerializer


class CustomerSerializerTestCase(PersonSerializerTestsMixin, TestCase):
    model = Customer
    serializer_class = CustomerSerializer
