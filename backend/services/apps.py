from django.apps import AppConfig
from django.contrib.auth import get_user_model
from django.conf import settings


class ServicesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'services'

    def ready(self):
        user_model = get_user_model()
        try:
            if not user_model.objects.filter(
                    username=settings.ADMIN_USERNAME,
                    email=settings.ADMIN_EMAIL).first():
                user_model.objects.create_superuser(
                    settings.ADMIN_USERNAME,
                    settings.ADMIN_EMAIL,
                    settings.ADMIN_PASSWORD)
                print("Created super admin")
        except Exception as e:
            print(e)
