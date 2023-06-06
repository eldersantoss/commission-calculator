from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .api.v1.viewsets import SaleViewSet

router = DefaultRouter()
router.register("sales", SaleViewSet, basename="sale")

urlpatterns = [
    path("", include(router.urls)),
]
