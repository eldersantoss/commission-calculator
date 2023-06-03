from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .api.v1.viewsets import CustomerViewSet, VendorViewSet

router = DefaultRouter()
router.register("customers", CustomerViewSet, basename="customer")
router.register("vendors", VendorViewSet, basename="vendor")

urlpatterns = [
    path("", include(router.urls)),
]
