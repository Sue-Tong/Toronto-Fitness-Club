from django.contrib.auth import login
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.contrib.auth import logout
from accounts.models import *
from rest_framework.views import APIView
from .utils import get_tokens_for_user
from .serializers import RegistrationSerializer,LoginSerializer,UpdateUserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import  Response
from rest_framework import status

class SignupFormView(APIView):

    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.create_user(
                username=serializer.validated_data['username'],
                password=serializer.validated_data['password1'],
                email=serializer.validated_data['email'],
                first_name=serializer.validated_data['first_name'],
                last_name=serializer.validated_data['last_name'])
            user.set_password(serializer.validated_data['password1'])
            user.is_active = True
            profile = Profile.objects.create(user=user)
            card = Card.objects.create(user=user)
            profile.save()
            user.save()
            card.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class LoginView(APIView):

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            login(self.request, serializer.validated_data['user'])
            auth_data = get_tokens_for_user(request.user)
            return Response(auth_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EditView(APIView):
    
    def get(self, request):
        serializer = UpdateUserSerializer(data={"first_name":request.user.first_name,"last_name":request.user.last_name,
        "email":request.user.email,
        "phone":request.user.profile.phone,
        "avatar":request.user.profile.avatar,})
        if serializer.is_valid():
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        serializer = UpdateUserSerializer(data=request.data)
        if serializer.is_valid():
            owner = self.request.user
            owner.email = serializer.validated_data['email']
            owner.first_name = serializer.validated_data['first_name']
            owner.last_name = serializer.validated_data['last_name']
            profile = owner.profile
            profile.phone = serializer.validated_data['phone']
            profile.avatar = serializer.validated_data['avatar']
            owner.save()
            profile.save()
            login(self.request, owner)
            return JsonResponse({"code": 200, "msg": "Profile updated successfully"})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)







