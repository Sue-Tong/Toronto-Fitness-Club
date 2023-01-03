"""club URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/dev/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from accounts.views import LoginView, SignupFormView, EditView
from django.conf import settings
from django.conf.urls.static import static
from club import views
from django.urls import re_path,include
from django.views.i18n import JavaScriptCatalog
from .router import router
from .views import *
from rest_framework_simplejwt import views as jwt_views
from rest_framework.routers import DefaultRouter

js_info_dict = {
    "packages": ("recurrence",),
}

router = DefaultRouter()

urlpatterns = [
    re_path('^', include(router.urls)),
    path("admin/", admin.site.urls),
    path("accounts/register/", SignupFormView.as_view()),
    path("accounts/login/", LoginView.as_view()),
    path("accounts/profile/", EditView.as_view()),
    path("card/update/", update_card),
    path("card/get/", get_card),
    path("subscription/add/", subscribe),
    path("class/enrol/", enrol_class),
    path("accounts/class_history/", list_classes_history),
    path("accounts/class_schedule/", list_classes_schedule),
    path("accounts/class_drop/", drop_class),
    path("subscription/", get_subscription),
    path("subscription/update/", update_subscription),
    path("subscription/cancel/", cancel_subscription),
    path("payment/history/", list_my_payment),
    path("payment/future/", list_my_future_payment),
    path("payment/make_payment/", make_payment),
    path("studio/", get_studio),
    path("studio/nearest/", nearest_studios),
    path("studio/<int:id>/", get_studio_detail),
    path("studio/<int:id>/class/", get_studio_class),
    path("class/name/all/", get_all_class_name),
    path("class/coach/all/", get_all_coach),
    path("class/start-time/all/", get_all_lesson_start_time),
    path("class/end-time/all/", get_all_lesson_end_time),
    path("amenity/type/all/", get_all_amenity_type),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    re_path(r"^jsi18n/$", JavaScriptCatalog.as_view(), js_info_dict),
]
