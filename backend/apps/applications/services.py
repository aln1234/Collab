from django.db import IntegrityError, transaction
from rest_framework.exceptions import PermissionDenied, ValidationError

from apps.campaigns.models import Campaign
from apps.creators.models import CreatorProfile

from .models import CampaignApplication


@transaction.atomic
def apply_to_campaign(*, user, campaign: Campaign, message: str = "") -> CampaignApplication:
    if not user.is_authenticated or user.role != "CREATOR":
        raise PermissionDenied("Only creator users can apply to campaigns.")

    if campaign.status != Campaign.Status.OPEN:
        raise ValidationError("This campaign is not open for applications.")

    creator, _ = CreatorProfile.objects.get_or_create(
        user=user,
        defaults={"display_name": user.full_name or user.email},
    )

    try:
        return CampaignApplication.objects.create(
            campaign=campaign,
            creator=creator,
            message=message,
        )
    except IntegrityError as exc:
        raise ValidationError("You have already applied to this campaign.") from exc


def update_application_status(*, application: CampaignApplication, status: str) -> CampaignApplication:
    if status not in {CampaignApplication.Status.APPROVED, CampaignApplication.Status.REJECTED}:
        raise ValidationError("Application status must be APPROVED or REJECTED.")

    application.status = status
    application.save(update_fields=["status", "updated_at"])
    return application
