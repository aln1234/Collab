from django.utils.dateparse import parse_date
from rest_framework import generics, permissions

from .permissions import IsCampaignBrandOwnerOrReadOnly
from .selectors import campaign_detail_for_user, campaign_list_for_user
from .serializers import CampaignSerializer
from .services import create_campaign_for_user


class CampaignListCreateView(generics.ListCreateAPIView):
    serializer_class = CampaignSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ("status", "currency")
    search_fields = ("title", "description", "brand__company_name")
    ordering_fields = ("created_at", "deadline", "budget")
    ordering = ("-created_at",)

    def get_queryset(self):
        mine = self.request.query_params.get("mine") in {"1", "true", "True"}
        queryset = campaign_list_for_user(self.request.user, mine=mine)
        deadline_after = self.request.query_params.get("deadline_after")
        deadline_before = self.request.query_params.get("deadline_before")

        if deadline_after:
            parsed = parse_date(deadline_after)
            if parsed:
                queryset = queryset.filter(deadline__gte=parsed)
        if deadline_before:
            parsed = parse_date(deadline_before)
            if parsed:
                queryset = queryset.filter(deadline__lte=parsed)
        return queryset.distinct()

    def perform_create(self, serializer):
        create_campaign_for_user(self.request.user, serializer)


class CampaignDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = CampaignSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsCampaignBrandOwnerOrReadOnly]
    http_method_names = ["get", "patch", "head", "options"]

    def get_queryset(self):
        return campaign_detail_for_user(self.request.user).distinct()
