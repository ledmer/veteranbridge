from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    job = models.CharField(max_length=100, null=True, blank=True)
    mental_health = models.PositiveSmallIntegerField(null=True, blank=True)
    wellness = models.PositiveSmallIntegerField(null=True, blank=True)
    engage = models.PositiveSmallIntegerField(null=True, blank=True)
    location = models.CharField(max_length=120, null=True, blank=True)
    gender = models.CharField(max_length=30, null=True, blank=True)
    age = models.PositiveSmallIntegerField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    hobby = models.CharField(max_length=120, null=True, blank=True)

    def __str__(self):
        return self.username


class UserConnection(models.Model):
    user = models.ForeignKey(
        CustomUser, related_name="connections", on_delete=models.CASCADE
    )
    connected_user = models.ForeignKey(
        CustomUser, related_name="connected_to", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "connected_user")
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user_id} ➜ {self.connected_user_id}"
