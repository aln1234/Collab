from rest_framework.exceptions import PermissionDenied

from apps.brands.models import BrandProfile


def create_campaign_for_user(user, serializer):
    if not user.is_authenticated or user.role != "BRAND":
        raise PermissionDenied("Only brand users can create campaigns.")

    brand, _ = BrandProfile.objects.get_or_create(
        user=user,
        defaults={"company_name": user.full_name or user.email},
    )
    return serializer.save(brand=brand)
