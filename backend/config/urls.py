from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from apps.applications.views import ApplyToCampaignView, BrandApplicationListView, CreatorApplicationListView
from apps.submissions.views import BrandSubmissionListView, CreateCampaignSubmissionView, CreatorSubmissionListView

urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/health/", include("apps.core.urls")),

    path("api/auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path("api/auth/", include("apps.accounts.urls")),
    path("api/brand/", include("apps.brands.urls")),
    path("api/creator/", include("apps.creators.urls")),

    path("api/campaigns/<uuid:pk>/apply/", ApplyToCampaignView.as_view(), name="campaign-apply"),
    path("api/campaigns/<uuid:pk>/submissions/", CreateCampaignSubmissionView.as_view(), name="campaign-submissions"),
    path("api/campaigns/", include("apps.campaigns.urls")),

    path("api/creator/applications/", CreatorApplicationListView.as_view(), name="creator-applications"),
    path("api/brand/applications/", BrandApplicationListView.as_view(), name="brand-applications"),
    path("api/applications/", include("apps.applications.urls")),

    path("api/creator/submissions/", CreatorSubmissionListView.as_view(), name="creator-submissions"),
    path("api/brand/submissions/", BrandSubmissionListView.as_view(), name="brand-submissions"),
    path("api/submissions/", include("apps.submissions.urls")),

    path("api/payments/", include("apps.payments.urls")),
    path("api/notifications/", include("apps.notifications.urls")),

    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
