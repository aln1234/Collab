from rest_framework.permissions import BasePermission


class CanUpdateApplicationStatus(BasePermission):
    def has_object_permission(self, request, view, obj) -> bool:
        if not request.user or not request.user.is_authenticated:
            return False
        if request.user.role == "ADMIN" or request.user.is_staff:
            return True
        return request.user.role == "BRAND" and obj.campaign.brand.user_id == request.user.id
