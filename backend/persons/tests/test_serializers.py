from django.test import TestCase

from ..api.v1.serializers import CustomerSerializer, VendorSerializer
from ..models import Customer, Vendor


class PersonSerializerTestsMixin:
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

        serializer = self.serializer_class(instance)

        self.assertEqual(serializer.data, data)

    def test_valid_deserialization(self):
        """
        Should create a model instance with provided data
        """

        data = {
            "name": "Test Person",
            "email": "person@test.com",
            "phone": "5584900000000",
        }

        serializer = self.serializer_class(data=data)

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

        serializer = self.serializer_class(data=data)

        self.assertFalse(serializer.is_valid())

        self.assertIn("name", serializer.errors)
        self.assertEqual(serializer.errors["name"][0].code, "required")

        self.assertIn("email", serializer.errors)
        self.assertEqual(serializer.errors["email"][0].code, "invalid")

        self.assertIn("phone", serializer.errors)
        self.assertEqual(serializer.errors["phone"][0].code, "invalid")
        self.assertEqual(serializer.errors["phone"][1].code, "max_length")


class VendorSerializerTestCase(PersonSerializerTestsMixin, TestCase):
    model = Vendor
    serializer_class = VendorSerializer


class CustomerSerializerTestCase(PersonSerializerTestsMixin, TestCase):
    model = Customer
    serializer_class = CustomerSerializer
