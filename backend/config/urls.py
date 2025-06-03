from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path("admin/", admin.site.urls),

    # JWT
    path("api/token/", TokenObtainPairView.as_view(), name="jwt-obtain"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="jwt-refresh"),

    # API v1
    path("api/v1/", include("users.urls")),

    # Docs
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema")),
]
