from django.urls import path

from .views import BrandProfileView

urlpatterns = [
    path("profile/", BrandProfileView.as_view(), name="brand-profile"),
]
