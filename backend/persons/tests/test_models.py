from django.test import TestCase

from ..models import Customer, Vendor


class PersonModelTestsMixin:
    def test_str_representation(self):
        """
        Should return the name attribute value
        """

        data = {
            "name": "Test Person",
            "email": "person@test.com",
            "phone": "5584900000000",
        }
        instance = self.model.objects.create(**data)

        self.assertEqual(str(instance), instance.name)

    def test_phone_field_validation(self):
        """
        A ValidationError should be raised on attempts to create a
        instance with a not number char in phone
        """

        data = {
            "name": "Test Person",
            "email": "person@test.com",
            "phone": "invalid_phone",
        }
        instance = self.model.objects.create(**data)

        self.assertEqual(str(instance), instance.name)


class VendorModelTests(PersonModelTestsMixin, TestCase):
    model = Vendor


class CustomerModelTests(PersonModelTestsMixin, TestCase):
    model = Customer
