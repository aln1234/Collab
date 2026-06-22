from .models import PaymentRecord


def payments_for_user(user):
    queryset = PaymentRecord.objects.select_related(
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
