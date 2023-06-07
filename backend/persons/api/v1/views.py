from datetime import date
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework import status

from ...models import Vendor

from .serializers import VendorCommissionSerializer


class VendorCommissionListAPIView(ListAPIView):
    queryset = Vendor.objects.all()
    serializer_class = VendorCommissionSerializer

    def get(self, request, *args, **kwargs):
        return self.validate_period(request) or super().get(request, *args, **kwargs)

    def validate_period(self, request):
        start_period = request.query_params.get("start_period")
        end_period = request.query_params.get("end_period")

        try:
            date.fromisoformat(start_period)
            date.fromisoformat(end_period)

        except:
            return Response(
                {"error": "Os parâmetros start_period e end_period são obrigatórios."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if start_period > end_period:
            return Response(
                {
                    "error": "A data de início do período deve ser anterior ou igual à data de término."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
