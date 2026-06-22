from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema
from rest_framework import generics, parsers, permissions, status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from apps.accounts.permissions import IsBrand, IsCreator
from apps.campaigns.models import Campaign

from .models import ContentSubmission
from .permissions import CanUpdateSubmissionStatus
from .selectors import submissions_for_brand_user, submissions_for_creator_user, submissions_for_user
from .serializers import (
    ContentSubmissionSerializer,
    CreateSubmissionSerializer,
    SubmissionStatusSerializer,
)
from .services import create_submission, update_submission_status


class CreateCampaignSubmissionView(GenericAPIView):
    permission_classes = [IsCreator]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    serializer_class = CreateSubmissionSerializer

    @extend_schema(request=CreateSubmissionSerializer, responses=ContentSubmissionSerializer)
    def post(self, request, pk):
        campaign = get_object_or_404(Campaign, pk=pk)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        submission = create_submission(
            user=request.user,
            campaign=campaign,
            file=serializer.validated_data["file"],
            caption=serializer.validated_data.get("caption", ""),
        )
        return Response(
            ContentSubmissionSerializer(submission, context={"request": request}).data,
            status=status.HTTP_201_CREATED,
        )


class CreatorSubmissionListView(generics.ListAPIView):
    serializer_class = ContentSubmissionSerializer
    permission_classes = [IsCreator]
    filterset_fields = ("status", "campaign")
    ordering_fields = ("created_at", "updated_at")

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return ContentSubmission.objects.none()
        return submissions_for_creator_user(self.request.user)


class BrandSubmissionListView(generics.ListAPIView):
    serializer_class = ContentSubmissionSerializer
    permission_classes = [IsBrand]
    filterset_fields = ("status", "campaign")
    search_fields = ("campaign__title", "creator__display_name", "creator__user__email")
    ordering_fields = ("created_at", "updated_at")

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return ContentSubmission.objects.none()
        return submissions_for_brand_user(self.request.user)


class SubmissionStatusUpdateView(generics.UpdateAPIView):
    serializer_class = SubmissionStatusSerializer
    permission_classes = [permissions.IsAuthenticated, CanUpdateSubmissionStatus]
    http_method_names = ["patch", "head", "options"]

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return ContentSubmission.objects.none()
        return submissions_for_user(self.request.user)

    def patch(self, request, *args, **kwargs):
        submission = self.get_object()
        serializer = self.get_serializer(submission, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        submission = update_submission_status(
            submission=submission,
            status=serializer.validated_data["status"],
            brand_feedback=serializer.validated_data.get("brand_feedback"),
        )
        return Response(self.get_serializer(submission).data)
