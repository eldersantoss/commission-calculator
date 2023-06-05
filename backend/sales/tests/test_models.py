from django.test import TestCase
from model_mommy import mommy

from ..models import Sale, SaleProduct
from .data import TestDataMixin


class SaleModelTests(TestDataMixin, TestCase):
    def test_create_sale(self):
        """
        Should validate that a sale instance has been created with the provided data
        """

        self.assertEqual(Sale.objects.count(), 1)
        self.assertEqual(self.sale.invoice_number, self.invoice_number)
        self.assertEqual(self.sale.customer, self.customer)
        self.assertEqual(self.sale.vendor, self.vendor)

    def test_sale_products(self):
        """
        Should add products to the sale and retrieve them
        """

        sale = mommy.make(Sale)
        sale.products.add(self.products[0], through_defaults={"quantity": 2})

        self.assertEqual(sale.products.count(), 1)
        self.assertEqual(sale.products.first(), self.products[0])

        sale_product = SaleProduct.objects.get(sale=sale, product=self.products[0])
        self.assertEqual(sale_product.quantity, 2)


class SaleProductsModelTests(TestDataMixin, TestCase):
    def test_create_sale_product(self):
        """
        Should create a SaleProduct instance with the provided data
        """

        sale = mommy.make(Sale)

        sale_product = SaleProduct.objects.create(
            sale=sale,
            product=self.products[0],
            quantity=2,
        )

        self.assertEqual(SaleProduct.objects.filter(sale=sale).count(), 1)
        self.assertEqual(sale_product.sale, sale)
        self.assertEqual(sale_product.product, self.products[0])
        self.assertEqual(sale_product.quantity, 2)
