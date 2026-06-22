from .base import *  # noqa: F403

DEBUG = get_bool_env("DEBUG", True)  # noqa: F405

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
