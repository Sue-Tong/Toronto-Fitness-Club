from rest_framework import serializers
from django.contrib.auth.models import User
import re
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.contrib.auth.models import User
from .models import Profile

class RegistrationSerializer(serializers.ModelSerializer):

    username = serializers.CharField(max_length=120)
    password1 = serializers.CharField(max_length=120)
    password2 = serializers.CharField(max_length=120)
    email = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()

    class Meta:
        model = User
        fields = ['username', 'password1', 'password2','email','first_name','last_name']

        extra_kwargs = {
            'password1' : {'write_only': True, "style": {"input_type": "password"},
            'data-toggle': 'password1', 'id': 'password1', 'name': 'password1'},
            'password1' : {'write_only': True, "style": {"input_type": "password"},
            'data-toggle': 'password1', 'id': 'password1', 'name': 'password2'}
        }


    def validate(self, data):
        valid_email = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'

        if data.get('password2') is None or len(data.get('password2')) == 0:
            raise serializers.ValidationError( "This field is required")
        if data.get('username') is None or len(data.get('username')) == 0:
            raise serializers.ValidationError( "This field is required")
        if data.get('password1') is None or len(data.get('password1')) == 0:
            raise serializers.ValidationError("This field is required")
        if data.get('password1') != data.get('password2'):
            raise serializers.ValidationError({'password2':"The two password fields didn't match"})
        if len(data.get('email')) != 0 and not re.fullmatch(valid_email, data.get('email')):
            raise serializers.ValidationError({"email":'Enter a valid email address'})
        if User.objects.filter(username=data.get('username')).exists():
            raise serializers.ValidationError({"username":"This username already exists"})

        return data

class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=120)
    password = serializers.CharField(max_length=120)


    class Meta:
        model = User
        fields = ['password', 'username']

        extra_kwargs = {
            'password' : {'write_only': True, "style": {"input_type": "password"},
            'data-toggle': 'password', 'id': 'password1', 'name': 'password'}
    }

    def validate(self, data):
        if not (user := authenticate(username=data.get('username'), password=data.get('password'))):
            raise serializers.ValidationError( {"all":'Username or password is invalid'})
        data['user'] = user

        return data


class UpdateUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    phone = serializers.CharField()
    avatar = serializers.ImageField()

    def validate(self, data):
        valid_email = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        if not re.fullmatch(valid_email, data.get('email')):
            raise serializers.ValidationError('Enter a valid email address')
        if data.get('phone') is not None:
            if 0 < len(data.get('phone')) < 8:
                raise serializers.ValidationError( {"phone":"This phone number is too short. It must contain at least 10 characters"})

        return data

    class Meta:
        model = Profile
        fields = ['avatar', 'phone',"email","first_name","last_name"]
