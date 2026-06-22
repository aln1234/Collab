from rest_framework.permissions import BasePermission


def has_role(user, role: str) -> bool:
    return bool(user and user.is_authenticated and user.role == role)


class IsBrand(BasePermission):
    def has_permission(self, request, view) -> bool:
        return has_role(request.user, "BRAND")


class IsCreator(BasePermission):
    def has_permission(self, request, view) -> bool:
        return has_role(request.user, "CREATOR")


class IsAdminRole(BasePermission):
    def has_permission(self, request, view) -> bool:
        return bool(
            request.user
            and request.user.is_authenticated
            and (request.user.role == "ADMIN" or request.user.is_staff)
        )
