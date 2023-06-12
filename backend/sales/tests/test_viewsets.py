from django.utils import timezone
from model_mommy import mommy
from rest_framework import status
from rest_framework.renderers import JSONRenderer
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from common.tests.fixtures import TestDataMixin

from ..api.v1.serializers import SaleProductSerializer, SaleSerializer
from ..models import Sale


class SaleViewSetTests(TestDataMixin, APITestCase):
    def test_list_instances(self):
        """
        Should get a list with all model instances
        """

        mommy.make(Sale, 5)

        url = reverse("sale-list")
        response = self.client.get(url)

        instances = Sale.objects.all()
        serializer = SaleSerializer(
            instances,
            many=True,
            context=self.serializer_context,
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertCountEqual(response.data["results"], serializer.data)

    def test_instance_detail(self):
        """
        Should get instance detail for provided id
        """

        url = reverse("sale-detail", kwargs={"pk": self.sale.id})

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["invoice_number"], self.sale.invoice_number)
        self.assertEqual(
            timezone.now().fromisoformat(response.data["date_time"]),
            self.sale.date_time,
        )
        self.assertEqual(
            response.data["customer"],
            "http://testserver" + self.sale.customer.get_absolute_url(),
        )
        self.assertEqual(
            response.data["vendor"],
            "http://testserver" + self.sale.vendor.get_absolute_url(),
        )
        self.assertEqual(
            response.data["products"],
            SaleProductSerializer(
                self.sale.saleproduct_set.all(),
                many=True,
                context=self.serializer_context,
            ).data,
        )

    def test_instance_create(self):
        """
        Should create a new instance with provided data
        """

        url = reverse("sale-list")

        new_instance_data = {
            "date_time": timezone.now(),
            "customer": "http://testserver" + self.customer.get_absolute_url(),
            "vendor": "http://testserver" + self.vendor.get_absolute_url(),
            "products": [
                {
                    "product": "http://testserver"
                    + self.products[0].get_absolute_url(),
                    "quantity": 5,
                },
                {
                    "product": "http://testserver"
                    + self.products[1].get_absolute_url(),
                    "quantity": 5,
                },
            ],
        }

        response = self.client.post(
            url,
            data=JSONRenderer().render(new_instance_data),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertTrue(Sale.objects.filter(id=response.data["id"]).exists())

    def test_instance_update(self):
        """
        Should update the data of the instance with provided id
        """

        updated_instance_data = {
            "invoice_number": str(Sale.objects.count() + 1),
            "date_time": timezone.now(),
            "customer": "http://testserver" + self.customer.get_absolute_url(),
            "vendor": "http://testserver" + self.vendor.get_absolute_url(),
            "products": [
                {
                    "product": "http://testserver"
                    + self.products[0].get_absolute_url(),
                    "quantity": 5,
                },
                {
                    "product": "http://testserver"
                    + self.products[1].get_absolute_url(),
                    "quantity": 5,
                },
            ],
        }

        url = reverse("sale-detail", kwargs={"pk": self.sale.id})

        response = self.client.put(
            url,
            data=JSONRenderer().render(updated_instance_data),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        instance = Sale.objects.get(id=self.sale.id)
        serializer = SaleSerializer(instance, context=self.serializer_context)
        self.assertEqual(
            response.data["invoice_number"], serializer.data["invoice_number"]
        )

    def test_instance_delete(self):
        """
        Should delete instance with provided id
        """

        url = reverse("sale-detail", kwargs={"pk": self.sale.id})

        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Sale.objects.filter(id=self.sale.id).exists())
