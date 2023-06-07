from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .api.v1.viewsets import CustomerViewSet, VendorViewSet
from .api.v1.views import VendorCommissionListAPIView

router = DefaultRouter()
router.register("customers", CustomerViewSet, basename="customer")
router.register("vendors", VendorViewSet, basename="vendor")

urlpatterns = [
    path(
        "vendors/commissions/",
        VendorCommissionListAPIView.as_view(),
        name="vendor-commission-list",
    ),
    path("", include(router.urls)),
]
