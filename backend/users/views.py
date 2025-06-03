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
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]   # 注册不需要登录
