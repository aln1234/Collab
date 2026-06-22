from django.urls import path

from .views import ApplicationStatusUpdateView

urlpatterns = [
    path("<uuid:pk>/status/", ApplicationStatusUpdateView.as_view(), name="application-status"),
]
