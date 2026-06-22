from django.urls import path

from .views import SubmissionStatusUpdateView

urlpatterns = [
    path("<uuid:pk>/status/", SubmissionStatusUpdateView.as_view(), name="submission-status"),
]
