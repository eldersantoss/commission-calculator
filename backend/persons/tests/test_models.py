from decimal import Decimal
from django.test import TestCase
from django.utils import timezone

from model_mommy import mommy

from common.tests.fixtures import TestDataMixin
from sales.models import Sale, SaleProduct

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


class VendorModelTests(TestDataMixin, PersonModelTestsMixin, TestCase):
    model = Vendor

    def test_get_commission_value_on_period(self):
        """
        Should pass if the value of total commission calculated on period
        is correct
        """

        start = timezone.now().date().replace(year=2022)
        end = timezone.now().date().replace(year=2024)

        # Testing with sale defined in TestDataMixin
        commission_value_on_period = self.vendor.get_commission_value_on_period(
            start, end
        )

        self.assertEqual(commission_value_on_period, Decimal("177.71465"))

        # Creating another sale for the vendor and evaluating again
        another_sale = mommy.make(Sale, vendor=self.vendor, date_time=timezone.now())
        SaleProduct.objects.create(
            sale=another_sale, product=self.products[0], quantity=5
        )
        SaleProduct.objects.create(
            sale=another_sale, product=self.products[2], quantity=2
        )

        commission_value_on_period = self.vendor.get_commission_value_on_period(
            start, end
        )

        self.assertEqual(commission_value_on_period, Decimal("297.43815"))

        # Changing another_sale date_time to after of end period and evaluating again
        another_sale.date_time = another_sale.date_time + timezone.timedelta(weeks=104)
        another_sale.save()

        commission_value_on_period = self.vendor.get_commission_value_on_period(
            start, end
        )

        self.assertEqual(commission_value_on_period, Decimal("177.71465"))


class CustomerModelTests(PersonModelTestsMixin, TestCase):
    model = Customer
