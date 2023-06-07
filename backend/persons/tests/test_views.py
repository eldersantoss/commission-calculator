from rest_framework.test import APITestCase
from rest_framework.reverse import reverse
from rest_framework import status
from django.utils import timezone
from model_mommy import mommy

from sales.models import SaleProduct


from common.tests.fixtures import TestDataMixin


class VendorCommissionListViewTests(TestDataMixin, APITestCase):
    def test_get_vendor_commission_list(self):
        """
        Should get a list with all vendors with sales in the period and
        its commission data
        """

        mommy.make(SaleProduct, 5)

        url = reverse("vendor-commission-list")
        start_period = timezone.now().date().replace(year=2022)
        end_period = timezone.now().date().replace(year=2024)
        params = {"start_period": start_period, "end_period": end_period}

        response = self.client.get(url, data=params)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 6)
        self.assertContains(
            response,
            self.vendor.get_commission_value_on_period(start_period, end_period),
        )

    def test_get_vendor_commission_list_with_invalid_period(self):
        """
        Should return a status code 400 and a error message
        """

        url = reverse("vendor-commission-list")
        response = self.client.get(url)

        self.assertContains(
            response=response,
            text="Os parâmetros start_period e end_period são obrigatórios.",
            count=1,
            status_code=status.HTTP_400_BAD_REQUEST,
        )

        start_period = "2000-05-06"
        end_period = "1999-05-06"
        params = {"start_period": start_period, "end_period": end_period}
        response = self.client.get(url, data=params)

        self.assertContains(
            response=response,
            text="A data de início do período deve ser anterior ou igual à data de término.",
            count=1,
            status_code=status.HTTP_400_BAD_REQUEST,
        )

        start_period = "2023-05-06"
        end_period = "2024-05-aa"
        params = {"start_period": start_period, "end_period": end_period}
        response = self.client.get(url, data=params)

        self.assertContains(
            response=response,
            text="Os parâmetros start_period e end_period são obrigatórios.",
            count=1,
            status_code=status.HTTP_400_BAD_REQUEST,
        )
