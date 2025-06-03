import environ, os, datetime
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
env = environ.Env(DEBUG=(bool, False))
environ.Env.read_env(BASE_DIR / ".env")     # 读取 .env

DEBUG = env("DEBUG")
SECRET_KEY = env("SECRET_KEY")
ALLOWED_HOSTS = ["*"]

ROOT_URLCONF = "config.urls"

# -- 应用注册 --
INSTALLED_APPS = [
    # Django 内置
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # 第三方
    "rest_framework",
    "rest_framework.authtoken",  # 若要 session 认证
    "drf_spectacular",
    # 本地
    "users",
]

# -- 数据库 --
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",      # ★ 必须
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",   # ★ 必须
    "django.contrib.messages.middleware.MessageMiddleware",      # ★ 必须
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# ------------------------------------------------------------------
# TEMPLATES —— 必须有 DjangoTemplates 后端
# ------------------------------------------------------------------
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",  # ★ 必须
        "DIRS": [BASE_DIR / "templates"],      # 没有模板文件也保留即可
        "APP_DIRS": True,                      # 让 admin 自己的模板可被发现
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


# -- 自定义用户模型 --
AUTH_USER_MODEL = "users.CustomUser"

# -- DRF 全局设置 --
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticatedOrReadOnly",),
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

# -- Simple JWT --
from datetime import timedelta
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=15),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
}

# -- drf-spectacular --
SPECTACULAR_SETTINGS = {
    "TITLE": "User Wellness API",
    "DESCRIPTION": "Backend powered by Django & DRF",
    "VERSION": "0.1.0",
}

# -- 静态文件 --
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
