from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import CustomUser, UserConnection
from .serializers import UserSerializer, ConnectionSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    @action(
        detail=True,
        methods=["post", "get", "delete"],
        url_path="connections(?:/(?P<connected_pk>[^/.]+))?",
    )
    def connections(self, request, pk=None, connected_pk=None):
        user = self.get_object()

        # ---------- POST ----------
        if request.method == "POST":
            if user.pk == request.data.get("connected_user"):
                return Response({"detail": "Cannot connect user to self"},
                                status=status.HTTP_400_BAD_REQUEST)

            ser = ConnectionSerializer(data=request.data)
            ser.is_valid(raise_exception=True)
            ser.save(user=user)
            return Response(ser.data, status=status.HTTP_201_CREATED)

        # ---------- GET ----------
        if request.method == "GET":
            qs = user.connections.select_related("connected_user")
            return Response(ConnectionSerializer(qs, many=True).data)

        # ---------- DELETE ----------
        if request.method == "DELETE":
            deleted, _ = user.connections.filter(connected_user_id=connected_pk).delete()
            if not deleted:
                return Response(status=status.HTTP_404_NOT_FOUND)
            return Response(status=status.HTTP_204_NO_CONTENT)


from rest_framework import generics, permissions
from .serializers import RegisterSerializer, UserSerializer

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Group, GroupMembership, CustomUser
from .serializers import GroupSerializer, GroupMembershipSerializer

class GroupViewSet(viewsets.ModelViewSet):
    queryset           = Group.objects.all().prefetch_related("memberships")
    serializer_class   = GroupSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    # 自动把 owner 设为当前用户
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    # ----------  用户加入  ----------
    @action(detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def join(self, request, pk=None):
        group = self.get_object()
        if GroupMembership.objects.filter(user=request.user, group=group).exists():
            return Response({"detail": "Already joined"}, status=status.HTTP_409_CONFLICT)

        membership = GroupMembership.objects.create(user=request.user, group=group)
        return Response(GroupMembershipSerializer(membership).data, status=status.HTTP_201_CREATED)

    # ----------  用户退出  ----------
    @action(detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def exit(self, request, pk=None):
        group = self.get_object()
        deleted, _ = GroupMembership.objects.filter(user=request.user, group=group).delete()
        if not deleted:
            return Response({"detail": "Not a member"}, status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)
