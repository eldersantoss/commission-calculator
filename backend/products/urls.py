from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .api.v1.viewsets import ProductViewSet

router = DefaultRouter()
router.register("products", ProductViewSet, basename="product")


urlpatterns = [
    path("", include(router.urls)),
]
