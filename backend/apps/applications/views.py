from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema
from rest_framework import generics, permissions, status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from apps.accounts.permissions import IsBrand, IsCreator
from apps.campaigns.models import Campaign

from .models import CampaignApplication
from .permissions import CanUpdateApplicationStatus
from .selectors import applications_for_brand_user, applications_for_creator_user, applications_for_user
from .serializers import (
    ApplicationStatusSerializer,
    ApplyToCampaignSerializer,
    CampaignApplicationSerializer,
)
from .services import apply_to_campaign, update_application_status


class ApplyToCampaignView(GenericAPIView):
    permission_classes = [IsCreator]
    serializer_class = ApplyToCampaignSerializer

    @extend_schema(request=ApplyToCampaignSerializer, responses=CampaignApplicationSerializer)
    def post(self, request, pk):
        campaign = get_object_or_404(Campaign, pk=pk)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        application = apply_to_campaign(
            user=request.user,
            campaign=campaign,
            message=serializer.validated_data.get("message", ""),
        )
        return Response(
            CampaignApplicationSerializer(application, context={"request": request}).data,
            status=status.HTTP_201_CREATED,
        )


class CreatorApplicationListView(generics.ListAPIView):
    serializer_class = CampaignApplicationSerializer
    permission_classes = [IsCreator]
    filterset_fields = ("status", "campaign")
    ordering_fields = ("created_at", "updated_at")

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return CampaignApplication.objects.none()
        return applications_for_creator_user(self.request.user)


class BrandApplicationListView(generics.ListAPIView):
    serializer_class = CampaignApplicationSerializer
    permission_classes = [IsBrand]
    filterset_fields = ("status", "campaign")
    search_fields = ("campaign__title", "creator__display_name", "creator__user__email")
    ordering_fields = ("created_at", "updated_at")

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return CampaignApplication.objects.none()
        return applications_for_brand_user(self.request.user)


class ApplicationStatusUpdateView(generics.UpdateAPIView):
    serializer_class = ApplicationStatusSerializer
    permission_classes = [permissions.IsAuthenticated, CanUpdateApplicationStatus]
    http_method_names = ["patch", "head", "options"]

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return CampaignApplication.objects.none()
        return applications_for_user(self.request.user)

    def patch(self, request, *args, **kwargs):
        application = self.get_object()
        serializer = self.get_serializer(application, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        application = update_application_status(
            application=application,
            status=serializer.validated_data["status"],
        )
        return Response(self.get_serializer(application).data)
