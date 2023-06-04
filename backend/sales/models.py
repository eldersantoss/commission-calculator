from common.validators import only_numbers_validator
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
        related_name="sales",
        through="SaleProducts",
    )

    def __str__(self) -> str:
        return f"{self.invoice_number}"

    class Meta:
        verbose_name = "venda"
        verbose_name_plural = "vendas"
        ordering = ["-id"]


class SaleProducts(models.Model):
    sale = models.ForeignKey(Sale, on_delete=models.PROTECT)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveSmallIntegerField("Quantidade", default=1)
