from .models import Campaign


def campaign_list_for_user(user, mine: bool = False):
    queryset = Campaign.objects.select_related("brand", "brand__user")

    if user.is_authenticated and (user.role == "ADMIN" or user.is_staff):
        return queryset

    if mine and user.is_authenticated and user.role == "BRAND":
        return queryset.filter(brand__user=user)

    if user.is_authenticated and user.role == "BRAND":
        return queryset.filter(status=Campaign.Status.OPEN) | queryset.filter(brand__user=user)

    return queryset.filter(status=Campaign.Status.OPEN)


def campaign_detail_for_user(user):
    queryset = Campaign.objects.select_related("brand", "brand__user")

    if user.is_authenticated and (user.role == "ADMIN" or user.is_staff):
        return queryset

    if user.is_authenticated and user.role == "BRAND":
        return queryset.filter(status=Campaign.Status.OPEN) | queryset.filter(brand__user=user)

    return queryset.filter(status=Campaign.Status.OPEN)
