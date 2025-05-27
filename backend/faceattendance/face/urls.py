from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrganizationViewSet, AdminViewSet, CourseViewSet, StudentViewSet, AttendanceViewSet, admin_login

router = DefaultRouter()
router.register(r'organizations', OrganizationViewSet)
router.register(r'admins', AdminViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'students', StudentViewSet)
router.register(r'attendance', AttendanceViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/admin-login/', admin_login),
]
