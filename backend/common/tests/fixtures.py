from decimal import Decimal

from rest_framework.test import APIRequestFactory
from django.utils import timezone

from persons.models import Customer, Vendor
from products.models import Product
from sales.models import Sale, SaleProduct


class TestDataMixin:
    @classmethod
    def setUpClass(cls):
        cls.customer_data = {
            "name": "Test Customer",
            "email": "testcustomer@email.com",
            "phone": "84991000000",
        }
        cls.customer = Customer.objects.create(**cls.customer_data)

        cls.vendor_data = {
            "name": "Test Vendor",
            "email": "testvendor@email.com",
            "phone": "84991111111",
        }
        cls.vendor = Vendor.objects.create(**cls.vendor_data)

        cls.products_data = [
            {
                "code": "000001",
                "description": "Test product 1",
                "unit_price": Decimal("10.00"),
                "commission_rate": Decimal("0.05"),
            },
            {
                "code": "000002",
                "description": "Test product 2",
                "unit_price": Decimal("22.99"),
                "commission_rate": Decimal("0.03"),
            },
            {
                "code": "000003",
                "description": "Test product 3",
                "unit_price": Decimal("781.49"),
                "commission_rate": Decimal("0.075"),
            },
        ]
        cls.products = [Product.objects.create(**pd) for pd in cls.products_data]

        date_time = timezone.now().astimezone(timezone.get_default_timezone())
        cls.sale_data = {
            "invoice_number": "0000000001",
            "date_time": date_time,
            "customer": cls.customer,
            "vendor": cls.vendor,
        }
        cls.sale = Sale.objects.create(**cls.sale_data)

        cls.sale.products.add(cls.products[0], through_defaults={"quantity": 1})
        cls.sale.products.add(cls.products[1], through_defaults={"quantity": 2})
        cls.sale.products.add(cls.products[2], through_defaults={"quantity": 3})

        cls.serializer_context = {"request": APIRequestFactory().get("/")}

    @classmethod
    def tearDownClass(cls):
        SaleProduct.objects.all().delete()
        Sale.objects.all().delete()
        Product.objects.all().delete()
        Customer.objects.all().delete()
        Vendor.objects.all().delete()
