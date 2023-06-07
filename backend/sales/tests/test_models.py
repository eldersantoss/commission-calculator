from decimal import Decimal

from django.core.exceptions import ValidationError
from django.test import TestCase
from model_mommy import mommy

from common.tests.fixtures import TestDataMixin

from ..models import CommissionRateLimit, Sale, SaleProduct


class SaleModelTests(TestDataMixin, TestCase):
    def test_create_sale(self):
        """
        Should validate that a sale instance has been created with the provided data
        """

        self.assertEqual(Sale.objects.count(), 1)
        self.assertEqual(self.sale.invoice_number, "0000000001")
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

    def test_get_total_commission_value_with_default_commission_rate_limits(self):
        """
        Should pass if the value of total commission calculated is correct
        for default commission rates, i.e., min rate 0% and max rate 10%
        """

        commission_value = self.sale.get_total_commission_value()

        self.assertEqual(commission_value, Decimal("177.71465"))


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

    def test_get_product_commission_value_with_default_commission_rate_limits(self):
        """
        Should pass if the correct product commission value is calculated
        with default rate, i.e., min rate 0% and max rate 10%
        """

        sale_product = SaleProduct.objects.get(sale=self.sale, product=self.products[0])

        commission = sale_product.get_product_commission_value()

        self.assertEqual(commission, 0.5)

    def test_get_product_commission_value_with_custom_commission_rate_limits(self):
        """
        Should pass if the correct value for product commission is calculed
        with custom limits for the commission rates
        """

        sale_product = SaleProduct.objects.get(sale=self.sale, product=self.products[0])

        commission_rate_limit = CommissionRateLimit.objects.create(
            weekday=self.sale.date_time.weekday(),
            min_value=Decimal("0.000"),
            max_value=Decimal("0.025"),
        )

        commission = sale_product.get_product_commission_value()

        self.assertEqual(commission, Decimal("0.250"))

        commission_rate_limit.min_value = Decimal("0.070")
        commission_rate_limit.max_value = Decimal("0.100")
        commission_rate_limit.save()

        commission = sale_product.get_product_commission_value()

        self.assertEqual(commission, Decimal("0.700"))

        commission_rate_limit.delete()


class CommissionRateLimitModelTests(TestCase):
    def test_min_value_gt_max_value(self):
        """
        Should raises an error when min_value is greater than max_value
        """

        limit = CommissionRateLimit(
            weekday=CommissionRateLimit.MONDAY,
            min_value=Decimal("0.200"),
            max_value=Decimal("0.100"),
        )

        with self.assertRaises(ValidationError) as context:
            limit.clean()

        self.assertEqual(
            context.exception.message,
            "O valor mínimo deve ser menor ou igual ao valor máximo.",
        )

    def test_min_value_lte_max_value(self):
        """
        Should passes when min_value is less than or equal to max_value
        """

        limit = CommissionRateLimit(
            weekday=CommissionRateLimit.MONDAY,
            min_value=Decimal("0.100"),
            max_value=Decimal("0.100"),
        )
        limit.clean()

        limit = CommissionRateLimit(
            weekday=CommissionRateLimit.MONDAY,
            min_value=Decimal("0.050"),
            max_value=Decimal("0.100"),
        )
        limit.clean()
