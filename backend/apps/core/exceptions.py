import logging
from http import HTTPStatus
from typing import Any

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import exception_handler

logger = logging.getLogger(__name__)


def _message_from_details(details: Any) -> str:
    if isinstance(details, str):
        return details

    if isinstance(details, list):
        return " ".join(str(item) for item in details)

    if isinstance(details, dict):
        detail = details.get("detail")
        if detail:
            return _message_from_details(detail)

        first_error = next(iter(details.values()), None)
        if first_error:
            return _message_from_details(first_error)

    return "An API error occurred."


def _code_from_exception(exc: Exception, response_status: int) -> str:
    if hasattr(exc, "get_codes"):
        codes = exc.get_codes()
        if isinstance(codes, str):
            return codes
        if isinstance(codes, dict):
            first_code = next(iter(codes.values()), None)
            if isinstance(first_code, list) and first_code:
                return str(first_code[0])
            if first_code:
                return str(first_code)

    try:
        return HTTPStatus(response_status).phrase.lower().replace(" ", "_")
    except ValueError:
        return "api_error"


def custom_exception_handler(exc: Exception, context: dict[str, Any]) -> Response:
    response = exception_handler(exc, context)

    if response is None:
        view = context.get("view")
        logger.error(
            "Unhandled API exception in %s",
            view.__class__.__name__ if view else "unknown view",
            exc_info=(type(exc), exc, exc.__traceback__),
        )
        return Response(
            {
                "success": False,
                "error": {
                    "code": "server_error",
                    "message": "An unexpected server error occurred.",
                    "details": None,
                },
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    original_details = response.data
    response.data = {
        "success": False,
        "error": {
            "code": _code_from_exception(exc, response.status_code),
            "message": _message_from_details(original_details),
            "details": original_details,
        },
    }
    return response
