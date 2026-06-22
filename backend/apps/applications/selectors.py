from .models import CampaignApplication


def applications_for_brand_user(user):
    return CampaignApplication.objects.select_related(
        "campaign",
        "campaign__brand",
        "campaign__brand__user",
        "creator",
        "creator__user",
    ).filter(campaign__brand__user=user)


def applications_for_creator_user(user):
    return CampaignApplication.objects.select_related(
        "campaign",
        "campaign__brand",
        "creator",
        "creator__user",
    ).filter(creator__user=user)


def applications_for_user(user):
    queryset = CampaignApplication.objects.select_related(
        "campaign",
        "campaign__brand",
        "campaign__brand__user",
        "creator",
        "creator__user",
    )
    if user.role == "ADMIN" or user.is_staff:
        return queryset
    if user.role == "BRAND":
        return queryset.filter(campaign__brand__user=user)
    return queryset.filter(creator__user=user)
