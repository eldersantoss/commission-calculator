from rest_framework import viewsets

from ...api.v1.serializers import CustomerSerializer, VendorSerializer
from ...models import Customer, Vendor


class CustomerViewSet(viewsets.ModelViewSet):
    """
    Provides `list`, `create`, `retrieve`, `update` and `destroy`
    actions for Customer model.
    """

    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class VendorViewSet(viewsets.ModelViewSet):
    """
    Provides `list`, `create`, `retrieve`, `update` and `destroy`
    actions for Vendor model.
    """

    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer
