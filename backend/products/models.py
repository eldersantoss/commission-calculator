from common.validators import only_numbers_validator
from django.db import models


class Product(models.Model):
    code = models.CharField(
        max_length=20,
        unique=True,
        validators=[only_numbers_validator],
    )
    description = models.CharField(max_length=255)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    commission_rate = models.DecimalField(max_digits=4, decimal_places=2, default=0)

    def __str__(self):
        return f"{self.code} - {self.description}"

    class Meta:
        verbose_name = "produto"
        verbose_name_plural = "produtos"
        ordering = ["-id"]
