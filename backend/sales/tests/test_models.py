from decimal import Decimal

from django.test import TestCase
from django.utils import timezone
from persons.models import Customer, Vendor
from products.models import Product

from ..models import Sale, SaleProduct


class TestDataMixin:
    def setUp(self):
        self.customer_data = {
            "name": "Test Customer",
            "email": "testcustomer@email.com",
            "phone": "84991000000",
        }
        self.vendor_data = {
            "name": "Test Vendor",
            "email": "testvendor@email.com",
            "phone": "84991111111",
        }
        self.product_data = {
            "code": "12345",
            "description": "Test product 1",
            "unit_price": Decimal("10.0"),
            "commission_rate": Decimal("0.05"),
        }
        self.customer = Customer.objects.create(**self.customer_data)
        self.vendor = Vendor.objects.create(**self.vendor_data)
        self.product = Product.objects.create(**self.product_data)

        self.sale_data = {
            "invoice_number": "123456789",
            "date_time": timezone.now(),
            "customer": self.customer,
            "vendor": self.vendor,
        }
        self.sale = Sale.objects.create(**self.sale_data)


class SaleModelTests(TestDataMixin, TestCase):
    def test_create_sale(self):
        """
        Should validate that a sale instance has been created with the provided data
        """

        self.assertEqual(Sale.objects.count(), 1)
        self.assertEqual(self.sale.invoice_number, "123456789")
        self.assertEqual(self.sale.customer, self.customer)
        self.assertEqual(self.sale.vendor, self.vendor)

    def test_sale_products(self):
        """
        Should add products to the sale and retrieve them
        """

        self.sale.products.add(self.product, through_defaults={"quantity": 2})

        self.assertEqual(self.sale.products.count(), 1)
        self.assertEqual(self.sale.products.first(), self.product)

        sale_product = SaleProduct.objects.get(sale=self.sale, product=self.product)
        self.assertEqual(sale_product.quantity, 2)


class SaleProductsModelTests(TestDataMixin, TestCase):
    def test_create_sale_product(self):
        """
        Should create a SaleProduct instance with the provided data
        """

        sale_product = SaleProduct.objects.create(
            sale=self.sale,
            product=self.product,
            quantity=2,
        )

        self.assertEqual(SaleProduct.objects.count(), 1)
        self.assertEqual(sale_product.sale, self.sale)
        self.assertEqual(sale_product.product, self.product)
        self.assertEqual(sale_product.quantity, 2)
