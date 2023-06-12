from model_mommy import mommy
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase, APIRequestFactory

from ..api.v1.serializers import CustomerSerializer, VendorSerializer
from ..models import Customer, Vendor


class PersonViewSetTestsMixin:
    @classmethod
    def setUpClass(cls):
        cls.serializer_context = {"request": APIRequestFactory().get("/")}

    def setUp(self) -> None:
        self.data = {
            "name": "Test Person",
            "email": "person@test.com",
            "phone": "5584900000000",
        }
        self.instance = self.model.objects.create(**self.data)

    def test_list_instances(self):
        """
        Should get a list with all model instances
        """

        mommy.make(self.model, 5)
        instances = self.model.objects.all()
        serializer = self.serializer_class(
            instances, many=True, context=self.serializer_context
        )

        url = reverse(f"{self.url_basename}-list")

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertCountEqual(response.data["results"], serializer.data)

    def test_instance_detail(self):
        """
        Should get instance detail with provided id
        """

        url = reverse(f"{self.url_basename}-detail", kwargs={"pk": self.instance.id})

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], self.instance.name)
        self.assertEqual(response.data["email"], self.instance.email)
        self.assertEqual(response.data["phone"], self.instance.phone)

    def test_instance_create(self):
        """
        Should create a new instance with provided data
        """

        url = reverse(f"{self.url_basename}-list")

        new_instance_data = {
            "name": "New Person",
            "email": "newperson@test.com",
            "phone": "5584911111111",
        }

        response = self.client.post(url, data=new_instance_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        instance = self.model.objects.get(email=new_instance_data["email"])
        serializer = self.serializer_class(instance, context=self.serializer_context)

        self.assertEqual(serializer.data["email"], new_instance_data["email"])
        self.assertEqual(serializer.data["name"], new_instance_data["name"])
        self.assertEqual(serializer.data["phone"], new_instance_data["phone"])
        self.assertEqual(
            serializer.data["url"], "http://testserver" + instance.get_absolute_url()
        )

    def test_instance_update(self):
        """
        Should update the data of the instance with provided id
        """

        updated_instance_data = {
            "name": "Updated Person",
            "email": "newperson@test.com",
            "phone": "5584911111111",
        }

        url = reverse(f"{self.url_basename}-detail", kwargs={"pk": self.instance.id})

        response = self.client.put(url, data=updated_instance_data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        instance = self.model.objects.get(id=self.instance.id)
        serializer = self.serializer_class(instance, context=self.serializer_context)
        self.assertEqual(response.data, serializer.data)

    def test_instance_delete(self):
        """
        Should delete instance with provided id
        """

        url = reverse(f"{self.url_basename}-detail", kwargs={"pk": self.instance.id})

        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(self.model.objects.filter(id=self.instance.id).exists())

    @classmethod
    def tearDownClass(cls):
        pass


class CustomerViewSetTests(PersonViewSetTestsMixin, APITestCase):
    model = Customer
    serializer_class = CustomerSerializer
    url_basename = "customer"


class VendorViewSetTests(PersonViewSetTestsMixin, APITestCase):
    model = Vendor
    serializer_class = VendorSerializer
    url_basename = "vendor"
