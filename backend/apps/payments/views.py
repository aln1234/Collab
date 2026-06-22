from rest_framework import generics, permissions
from rest_framework.response import Response

from .models import PaymentRecord
from .permissions import CanUpdatePaymentStatus
from .selectors import payments_for_user
from .serializers import PaymentRecordSerializer, PaymentStatusSerializer
from .services import update_payment_status


class PaymentListView(generics.ListAPIView):
    serializer_class = PaymentRecordSerializer
    filterset_fields = ("status", "campaign")
    search_fields = ("campaign__title", "creator__display_name", "creator__user__email")
    ordering_fields = ("created_at", "updated_at", "amount")

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return PaymentRecord.objects.none()
        return payments_for_user(self.request.user)


class PaymentStatusUpdateView(generics.UpdateAPIView):
    serializer_class = PaymentStatusSerializer
    permission_classes = [permissions.IsAuthenticated, CanUpdatePaymentStatus]
    http_method_names = ["patch", "head", "options"]

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return PaymentRecord.objects.none()
        return payments_for_user(self.request.user)

    def patch(self, request, *args, **kwargs):
        payment = self.get_object()
        serializer = self.get_serializer(payment, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        payment = update_payment_status(
            payment=payment,
            status=serializer.validated_data["status"],
            notes=serializer.validated_data.get("notes"),
        )
        return Response(self.get_serializer(payment).data)
