from django.urls import path

from .views import PaymentListView, PaymentStatusUpdateView

urlpatterns = [
    path("", PaymentListView.as_view(), name="payment-list"),
    path("<uuid:pk>/status/", PaymentStatusUpdateView.as_view(), name="payment-status"),
]
