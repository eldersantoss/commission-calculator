from django.test import TestCase

from ..models import Product


class ProductModelTests(TestCase):
    def test_str_representation(self):
        """
        Should return the value of code and description attributes
        """

        data = {
            "code": "12345",
            "description": "Test Product",
            "unit_price": 10.0,
            "commission_rate": 0.05,
        }
        instance = Product.objects.create(**data)

        self.assertEqual(str(instance), f"{instance.code} - {instance.description}")
