from rest_framework.viewsets import ModelViewSet

from ...models import Sale
from .serializers import SaleSerializer


class SaleViewSet(ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
