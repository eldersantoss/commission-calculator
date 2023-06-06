from model_mommy import mommy
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from ..api.v1.serializers import ProductSerializer
from ..models import Product


class ProductsViewSetTests(APITestCase):
    def setUp(self) -> None:
        self.data = {
            "code": "12345",
            "description": "Test Product",
            "unit_price": "9.99",
            "commission_rate": "0.030",
        }
        self.instance = Product.objects.create(**self.data)

    def test_list_instances(self):
        """
        Should get a list with all model instances
        """

        mommy.make(Product, 5)
        instances = Product.objects.all()
        serializer = ProductSerializer(instances, many=True)

        url = reverse("product-list")

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertCountEqual(response.data["results"], serializer.data)

    def test_instance_detail(self):
        """
        Should get instance detail for provided id
        """

        url = reverse("product-detail", kwargs={"pk": self.instance.id})

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["code"], self.instance.code)
        self.assertEqual(response.data["description"], self.instance.description)
        self.assertEqual(response.data["unit_price"], self.instance.unit_price)
        self.assertEqual(
            response.data["commission_rate"],
            self.instance.commission_rate,
        )

    def test_instance_create(self):
        """
        Should create a new instance with provided data
        """

        url = reverse("product-list")

        new_instance_data = {
            "code": "12346",
            "description": "New Product",
            "unit_price": "17.49",
            "commission_rate": "0.050",
        }

        response = self.client.post(url, data=new_instance_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        instance = Product.objects.get(code=new_instance_data["code"])
        serializer = ProductSerializer(instance)
        self.assertEqual(serializer.data, new_instance_data)

    def test_instance_update(self):
        """
        Should update the data of the instance with provided id
        """

        updated_instance_data = {
            "code": "12346",
            "description": "Updated Product",
            "unit_price": "17.49",
            "commission_rate": "0.05",
        }

        url = reverse("product-detail", kwargs={"pk": self.instance.id})

        response = self.client.put(url, data=updated_instance_data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        instance = Product.objects.get(id=self.instance.id)
        serializer = ProductSerializer(instance)
        self.assertEqual(response.data, serializer.data)

    def test_instance_delete(self):
        """
        Should delete instance with provided id
        """

        url = reverse("product-detail", kwargs={"pk": self.instance.id})

        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Product.objects.filter(id=self.instance.id).exists())
