from drf_spectacular.utils import extend_schema
from rest_framework import parsers, status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from apps.accounts.permissions import IsBrand

from .models import BrandProfile
from .serializers import BrandProfileSerializer


class BrandProfileView(GenericAPIView):
    permission_classes = [IsBrand]
    parser_classes = [parsers.JSONParser, parsers.MultiPartParser, parsers.FormParser]
    serializer_class = BrandProfileSerializer

    @extend_schema(responses=BrandProfileSerializer)
    def get(self, request):
        profile, _ = BrandProfile.objects.get_or_create(
            user=request.user,
            defaults={"company_name": request.user.full_name or request.user.email},
        )
        return Response(self.get_serializer(profile).data)

    @extend_schema(request=BrandProfileSerializer, responses=BrandProfileSerializer)
    def put(self, request):
        profile, _ = BrandProfile.objects.get_or_create(
            user=request.user,
            defaults={"company_name": request.user.full_name or request.user.email},
        )
        serializer = self.get_serializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
