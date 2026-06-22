from .models import ContentSubmission


def submissions_for_brand_user(user):
    return ContentSubmission.objects.select_related(
        "campaign",
        "campaign__brand",
        "campaign__brand__user",
        "creator",
        "creator__user",
    ).filter(campaign__brand__user=user)


def submissions_for_creator_user(user):
    return ContentSubmission.objects.select_related(
        "campaign",
        "campaign__brand",
        "creator",
        "creator__user",
    ).filter(creator__user=user)


def submissions_for_user(user):
    queryset = ContentSubmission.objects.select_related(
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
