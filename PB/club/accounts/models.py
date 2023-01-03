from django.db import models
from django.contrib.auth.models import User
from admin_user.models import *

class UserSubscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    subscription = models.ForeignKey(Subscription, on_delete=models.CASCADE, null=True)
    end_date = models.DateField()
    status = models.CharField(max_length =120,choices=[("active","Active"),("cancelled","Cancelled")],default='active')

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    course = models.ForeignKey(Class, on_delete=models.CASCADE, null=True)
    booking_time = models.DateTimeField(auto_now_add=True)


class Cancel(models.Model):
    date = models.DateField(null=True)
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, null=True)

class Card(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=200, default="default fake card")
    cvv = models.CharField(max_length=3, default="000")
    card_number = models.CharField(max_length=20, default="0000000000000000")
    expire_date = models.DateField(default="1990-12-25")

class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    amount = models.CharField(max_length=120, null=False)
    card = models.ForeignKey(Card, on_delete=models.CASCADE, null=True)
    date = models.DateTimeField(auto_now_add=True)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(default='default.png', upload_to='profile_images')
    phone = models.CharField(max_length=120,default="00000000")

    def __str__(self):
        return self.user.username
