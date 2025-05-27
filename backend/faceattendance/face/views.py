from rest_framework import viewsets
from .models import Organization, Admin, Course, Student, Attendance
from .serializers import OrganizationSerializer, AdminSerializer, CourseSerializer, StudentSerializer, AttendanceSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password


class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

class AdminViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer


@api_view(['POST'])
def admin_login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"success": False, "message": "Email and password are required."}, status=400)

    try:
        admin = Admin.objects.get(email=email)
    except Admin.DoesNotExist:
        return Response({"success": False, "message": "Invalid email or password."}, status=401)

    if not check_password(password, admin.password):
        return Response({"success": False, "message": "Invalid email or password."}, status=401)

    # Simulating token (you can switch to real token auth later if needed)
    token = f"admin-token-{admin.id}"

    return Response({
        "success": True,
        "admin": {
            "id": admin.id,
            "name": admin.name,
            "email": admin.email,
            "organization": admin.organization.name,
            "organization_id": admin.organization.id
        },
        "token": token
    })
