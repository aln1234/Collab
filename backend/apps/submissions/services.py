from django.db import transaction
from rest_framework.exceptions import PermissionDenied, ValidationError

from apps.applications.models import CampaignApplication
from apps.campaigns.models import Campaign
from apps.creators.models import CreatorProfile
from apps.payments.services import ensure_payment_record_for_approved_submission

from .models import ContentSubmission


@transaction.atomic
def create_submission(*, user, campaign: Campaign, file, caption: str = "") -> ContentSubmission:
    if not user.is_authenticated or user.role != "CREATOR":
        raise PermissionDenied("Only creator users can submit campaign content.")

    creator, _ = CreatorProfile.objects.get_or_create(
        user=user,
        defaults={"display_name": user.full_name or user.email},
    )
    has_approved_application = CampaignApplication.objects.filter(
        campaign=campaign,
        creator=creator,
        status=CampaignApplication.Status.APPROVED,
    ).exists()

    if not has_approved_application:
        raise ValidationError("You need an approved application before submitting content.")

    return ContentSubmission.objects.create(
        campaign=campaign,
        creator=creator,
        file=file,
        caption=caption,
    )


@transaction.atomic
def update_submission_status(
    *,
    submission: ContentSubmission,
    status: str,
    brand_feedback: str | None = None,
) -> ContentSubmission:
    if status not in {ContentSubmission.Status.REVISION_REQUESTED, ContentSubmission.Status.APPROVED}:
        raise ValidationError("Submission status must be APPROVED or REVISION_REQUESTED.")

    submission.status = status
    if brand_feedback is not None:
        submission.brand_feedback = brand_feedback
    submission.save(update_fields=["status", "brand_feedback", "updated_at"])

    if status == ContentSubmission.Status.APPROVED:
        ensure_payment_record_for_approved_submission(
            campaign=submission.campaign,
            creator=submission.creator,
        )

    return submission
