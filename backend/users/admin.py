from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, UserConnection


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = (
        "id",
        "username",
        "email",
        "job",
        "mental_health",
        "wellness",
        "profile_pic",
        "tags",
        "phone",
    )
    fieldsets = UserAdmin.fieldsets + (
        (
            "Extra",
            {
                "fields": (
                    "job",
                    "mental_health",
                    "wellness",
                    "engage",
                    "location",
                    "gender",
                    "age",
                    "description",
                    "hobby",
                    "profile_pic",
                    "tags",
                    "phone",
                )
            },
        ),
    )
