from rest_framework.exceptions import ValidationError

from apps.campaigns.models import Campaign
from apps.creators.models import CreatorProfile

from .models import PaymentRecord


def ensure_payment_record_for_approved_submission(
    *,
    campaign: Campaign,
    creator: CreatorProfile,
) -> PaymentRecord:
    payment, _ = PaymentRecord.objects.get_or_create(
        campaign=campaign,
        creator=creator,
        defaults={
            "amount": campaign.budget,
            "currency": campaign.currency,
            "status": PaymentRecord.Status.UNPAID,
        },
    )
    return payment


def update_payment_status(*, payment: PaymentRecord, status: str, notes: str | None = None) -> PaymentRecord:
    if status not in PaymentRecord.Status.values:
        raise ValidationError("Invalid payment status.")

    payment.status = status
    if notes is not None:
        payment.notes = notes
    payment.save(update_fields=["status", "notes", "updated_at"])
    return payment
