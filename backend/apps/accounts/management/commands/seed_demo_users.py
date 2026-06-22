from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError

from apps.brands.models import BrandProfile
from apps.creators.models import CreatorProfile


DEMO_PASSWORD = "ConnectDemo123!"


class Command(BaseCommand):
    help = "Create or update local demo users for Connect development."

    def handle(self, *args, **options):
        if not settings.DEBUG:
            raise CommandError(
                "Refusing to seed demo users when DEBUG=False. "
                "This command is for local development only."
            )

        User = get_user_model()

        users = [
            {
                "email": "admin@connect.test",
                "full_name": "Connect Demo Admin",
                "role": User.Role.ADMIN,
                "is_staff": True,
                "is_superuser": True,
            },
            {
                "email": "brand@connect.test",
                "full_name": "Connect Demo Brand",
                "role": User.Role.BRAND,
                "is_staff": False,
                "is_superuser": False,
            },
            {
                "email": "creator@connect.test",
                "full_name": "Connect Demo Creator",
                "role": User.Role.CREATOR,
                "is_staff": False,
                "is_superuser": False,
            },
        ]

        self.stdout.write(self.style.WARNING("Local development only: seeding demo Connect accounts."))

        for user_data in users:
            user, created = User.objects.get_or_create(
                email=user_data["email"],
                defaults={
                    "full_name": user_data["full_name"],
                    "role": user_data["role"],
                    "is_staff": user_data["is_staff"],
                    "is_superuser": user_data["is_superuser"],
                    "is_verified": True,
                    "is_active": True,
                },
            )
            user.full_name = user_data["full_name"]
            user.role = user_data["role"]
            user.is_staff = user_data["is_staff"]
            user.is_superuser = user_data["is_superuser"]
            user.is_verified = True
            user.is_active = True
            user.set_password(DEMO_PASSWORD)
            user.save()

            action = "Created" if created else "Updated"
            self.stdout.write(f"{action} {user.email}")

            if user.role == User.Role.BRAND:
                BrandProfile.objects.update_or_create(
                    user=user,
                    defaults={
                        "company_name": "Connect Demo Brand",
                        "website": "https://connect.test",
                        "industry": "Creator marketing",
                        "description": "A local demo brand account for testing campaign workflows.",
                    },
                )

            if user.role == User.Role.CREATOR:
                CreatorProfile.objects.update_or_create(
                    user=user,
                    defaults={
                        "display_name": "Connect Demo Creator",
                        "bio": "A local demo creator account for testing marketplace workflows.",
                        "niche": "Lifestyle",
                        "location": "Demo City",
                        "instagram_url": "https://instagram.com/connectdemo",
                        "tiktok_url": "https://www.tiktok.com/@connectdemo",
                        "youtube_url": "https://www.youtube.com/@connectdemo",
                    },
                )

        self.stdout.write("")
        self.stdout.write(self.style.SUCCESS("Demo users are ready."))
        self.stdout.write(self.style.WARNING("Do not use these credentials outside local development."))
        self.stdout.write("")
        self.stdout.write("Login credentials:")
        self.stdout.write(f"  Admin:   admin@connect.test / {DEMO_PASSWORD}")
        self.stdout.write(f"  Brand:   brand@connect.test / {DEMO_PASSWORD}")
        self.stdout.write(f"  Creator: creator@connect.test / {DEMO_PASSWORD}")
