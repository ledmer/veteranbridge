from rest_framework import serializers
from .models import CustomUser, UserConnection, Group, GroupMembership

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
    full_name = serializers.CharField(write_only=True, max_length=120)
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = CustomUser
        fields = ("id", "email", "password", "full_name")

    def create(self, validated_data):
        full_name = validated_data.pop("full_name")
        first, *rest = full_name.split(" ", 1)
        last = rest[0] if rest else ""
        # ❶ 将 email 当作 username（Simple-JWT 期望 username 字段）
        user = CustomUser.objects.create_user(
            username=validated_data["email"],
            first_name=first,
            last_name=last,
            **validated_data,
        )
        return user


class GroupSerializer(serializers.ModelSerializer):
    owner   = serializers.ReadOnlyField(source="owner.id")
    members = serializers.SerializerMethodField()

    class Meta:
        model  = Group
        fields = ("id", "name", "description", "owner", "members", "created_at")

    def get_members(self, obj):
        return [m.user_id for m in obj.memberships.all()]


class GroupMembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model  = GroupMembership
        fields = ("user", "group", "joined_at")
        read_only_fields = ("joined_at",)