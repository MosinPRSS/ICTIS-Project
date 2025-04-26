from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.exceptions import ValidationError
from .models import User_Extended, User

@receiver(post_save, sender=User)
def create_user_extended(sender, instance, created, **kwargs):
    if created:
        try:
            User_Extended.objects.create(user=instance)
        except Exception as e:
            raise ValidationError(f"Error creating User_Extended: {e}")
