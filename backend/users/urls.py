from django.urls import path
from .views import RegisterView
from rest_framework.routers import DefaultRouter
from .views import UserViewSet

# users/urls.py
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, RegisterView, GroupViewSet

router = DefaultRouter()
router.register(r"users", UserViewSet, basename="user")
router.register(r"groups", GroupViewSet, basename="group")

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
] + router.urls
