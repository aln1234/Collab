from django.urls import path

from .views import CreatorProfileView

urlpatterns = [
    path("profile/", CreatorProfileView.as_view(), name="creator-profile"),
]
