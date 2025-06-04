from rest_framework import serializers
from .models import CustomUser, UserConnection


class UserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)
    # Add new fields
    profile_pic = serializers.CharField(required=False, allow_blank=True)
    tags = serializers.CharField(required=False, allow_blank=True)
    phone = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = CustomUser
        fields = (
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
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
        # Add more fields if you extend the model


class ConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserConnection
        fields = ("id", "connected_user", "created_at")
        read_only_fields = ("id", "created_at")


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)
    job = serializers.CharField(required=False, allow_blank=True)
    mental_health = serializers.IntegerField(required=False, allow_null=True)
    wellness = serializers.IntegerField(required=False, allow_null=True)
    engage = serializers.IntegerField(required=False, allow_null=True)
    location = serializers.CharField(required=False, allow_blank=True)
    gender = serializers.CharField(required=False, allow_blank=True)
    age = serializers.IntegerField(required=False, allow_null=True)
    description = serializers.CharField(required=False, allow_blank=True)
    hobby = serializers.CharField(required=False, allow_blank=True)
    profile_pic = serializers.CharField(required=False, allow_blank=True)
    tags = serializers.CharField(required=False, allow_blank=True)
    phone = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = CustomUser
        fields = (
            "id",
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
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

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)
