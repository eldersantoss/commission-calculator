from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include("sales.urls")),
    path("api/v1/", include("products.urls")),
    path("api/v1/persons/", include("persons.urls")),
]
