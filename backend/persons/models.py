from datetime import date

from django.core.validators import RegexValidator
from django.db import models
from rest_framework.reverse import reverse


class Person(models.Model):
    phone_regex_validator = RegexValidator(
        regex=r"^\d+$",
        message="O número de telefone deve conter apenas dígitos numéricos.",
    )

    name = models.CharField("nome", max_length=100)
    email = models.EmailField("email", unique=True)
    phone = models.CharField(
        "telefone",
        max_length=20,
        validators=[phone_regex_validator],
    )

    class Meta:
        abstract = True

    def __str__(self) -> str:
        return self.name


class Customer(Person):
    class Meta:
        verbose_name = "cliente"
        verbose_name_plural = "clientes"
        ordering = ["-id"]

    def get_absolute_url(self):
        return reverse("customer-detail", kwargs={"pk": self.pk})


class Vendor(Person):
    class Meta:
        verbose_name = "vendedor"
        verbose_name_plural = "vendedores"
        ordering = ["-id"]

    def get_absolute_url(self):
        return reverse("vendor-detail", kwargs={"pk": self.pk})

    def get_commission_value_on_period(self, start: date, end: date):
        """
        Return the value of accumulated commission of this vendor on a period
        """

        sales = self.get_sales_on_period(start, end)
        commission = sum([sale.get_total_commission_value() for sale in sales])
        return commission

    def get_sales_on_period(self, start: date, end: date):
        """
        Return the sales of this vendor on a period
        """

        return self.sales.filter(date_time__date__gte=start, date_time__date__lte=end)
