from rest_framework import serializers
from .models import CustomUser, UserConnection

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ("password", "is_staff", "is_superuser", "groups", "user_permissions")

class ConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserConnection
        fields = ("id", "connected_user", "created_at")
        read_only_fields = ("id", "created_at")

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = CustomUser
        fields = ("id", "username", "email", "password")

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)