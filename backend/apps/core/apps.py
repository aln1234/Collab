import logging

from django.apps import AppConfig


class CoreConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.core"
    _startup_warnings_logged = False

    def ready(self) -> None:
        if CoreConfig._startup_warnings_logged:
            return

        CoreConfig._startup_warnings_logged = True

        from django.conf import settings

        logger = logging.getLogger(__name__)

        if settings.DEBUG:
            logger.warning("Connect backend is running with DEBUG=True. Do not use this mode in production.")

        if settings.SECRET_KEY_WAS_GENERATED_FOR_DEV:
            logger.warning(
                "SECRET_KEY is missing or shorter than %s characters. "
                "A generated development key is being used for this process. "
                "Set a long SECRET_KEY in backend/.env to keep JWT signing stable.",
                settings.SECRET_KEY_MIN_LENGTH,
            )

        if settings.DEBUG and not settings.CORS_ALLOWED_ORIGINS:
            logger.warning(
                "CORS_ALLOWED_ORIGINS is empty while DEBUG=True. "
                "Set it to http://localhost:3000 for local web development."
            )
