from drf_spectacular.utils import extend_schema
from rest_framework import parsers, status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from apps.accounts.permissions import IsCreator

from .models import CreatorProfile
from .serializers import CreatorProfileSerializer


class CreatorProfileView(GenericAPIView):
    permission_classes = [IsCreator]
    parser_classes = [parsers.JSONParser, parsers.MultiPartParser, parsers.FormParser]
    serializer_class = CreatorProfileSerializer

    @extend_schema(responses=CreatorProfileSerializer)
    def get(self, request):
        profile, _ = CreatorProfile.objects.get_or_create(
            user=request.user,
            defaults={"display_name": request.user.full_name or request.user.email},
        )
        return Response(self.get_serializer(profile).data)

    @extend_schema(request=CreatorProfileSerializer, responses=CreatorProfileSerializer)
    def put(self, request):
        profile, _ = CreatorProfile.objects.get_or_create(
            user=request.user,
            defaults={"display_name": request.user.full_name or request.user.email},
        )
        serializer = self.get_serializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
