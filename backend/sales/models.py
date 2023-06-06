from decimal import Decimal

from common.validators import only_numbers_validator
from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from persons.models import Customer, Vendor
from products.models import Product


class Sale(models.Model):
    invoice_number = models.CharField(
        "Número da nota fiscal",
        max_length=44,
        unique=True,
        validators=[only_numbers_validator],
    )
    date_time = models.DateTimeField("Data e hora")
    customer = models.ForeignKey(
        Customer,
        on_delete=models.PROTECT,
        related_name="purchases",
    )
    vendor = models.ForeignKey(
        Vendor,
        on_delete=models.PROTECT,
        related_name="sales",
    )
    products = models.ManyToManyField(
        Product,
        related_name="sale_products",
        through="SaleProduct",
    )

    def get_commission_rate_limit(self):
        """
        Return the commission rate limit for the weekday of this sale
        """

        commission_rate_limit, _ = CommissionRateLimit.objects.get_or_create(
            weekday=self.date_time.weekday()
        )
        return commission_rate_limit

    def get_total_commission_value(self) -> Decimal:
        """
        Return the accumulated commission value of all products in this sale
        """

        sale_products = SaleProduct.objects.filter(sale=self)
        commission = sum(
            [
                sale_product.get_product_commission_value()
                for sale_product in sale_products
            ]
        )
        return commission

    def __str__(self) -> str:
        return f"{self.invoice_number}"

    class Meta:
        verbose_name = "venda"
        verbose_name_plural = "vendas"
        ordering = ["-id"]


class SaleProduct(models.Model):
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveSmallIntegerField("Quantidade", default=1)

    def get_product_commission_value(self) -> Decimal:
        """
        Return the commission value for this product on this sale
        """

        weekday_commission_rate = self.get_commission_rate_for_weekday()

        return self.product.unit_price * self.quantity * weekday_commission_rate

    def get_commission_rate_for_weekday(self):
        """
        Return the commission rate for the weekday
        """

        commission_rate_limit = self.sale.get_commission_rate_limit()

        if (
            commission_rate_limit.min_value
            <= self.product.commission_rate
            <= commission_rate_limit.max_value
        ):
            return self.product.commission_rate

        elif self.product.commission_rate < commission_rate_limit.min_value:
            return commission_rate_limit.min_value

        else:
            return commission_rate_limit.max_value


class CommissionRateLimit(models.Model):
    SUNDAY = 0
    MONDAY = 1
    TUESDAY = 2
    WEDNESDAY = 3
    THURSDAY = 4
    FRIDAY = 5
    SATURDAY = 6

    WEEKDAY_CHOICES = [
        (SUNDAY, "Domingo"),
        (MONDAY, "Segunda-feira"),
        (TUESDAY, "Terça-feira"),
        (WEDNESDAY, "Quarta-feira"),
        (THURSDAY, "Quinta-feira"),
        (FRIDAY, "Sexta-feira"),
        (SATURDAY, "Sábado"),
    ]

    weekday = models.PositiveSmallIntegerField(
        "Dia da semana",
        choices=WEEKDAY_CHOICES,
        unique=True,
    )
    min_value = models.DecimalField(
        "Comissão mínima",
        max_digits=4,
        decimal_places=3,
        default=Decimal("0.000"),
        validators=[
            MinValueValidator(Decimal("0.000")),
            MaxValueValidator(Decimal("0.100")),
        ],
    )
    max_value = models.DecimalField(
        "Comissão máxima",
        max_digits=4,
        decimal_places=3,
        default=Decimal("0.100"),
        validators=[
            MinValueValidator(Decimal("0.000")),
            MaxValueValidator(Decimal("0.100")),
        ],
    )

    def clean(self):
        if self.min_value > self.max_value:
            raise ValidationError(
                "O valor mínimo deve ser menor ou igual ao valor máximo."
            )

    class Meta:
        verbose_name = "limites de taxa de comissão"
        verbose_name_plural = "limites de taxa de comissão"
        ordering = ["weekday"]
