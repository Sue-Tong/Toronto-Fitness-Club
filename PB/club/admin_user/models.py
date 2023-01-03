from django.contrib.auth.models import User
from django.db import models
from recurrence.fields import RecurrenceField


class Studio(models.Model):
    name = models.CharField(max_length=120)
    address = models.CharField(max_length=120)
    location = models.CharField(max_length=120)
    postal_code = models.CharField(max_length=120)
    phone_number = models.CharField(max_length=120)


class Amenity(models.Model):
    type = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField()
    studio = models.ForeignKey(Studio, on_delete=models.CASCADE, null=True)

    class Meta:
        verbose_name_plural = "Amenities"

Duration_CHOICES = [
    ("week", 'Weekly'), ("month", 'Monthly'), ("year","Yearly")
]
class Subscription(models.Model):
    money = models.PositiveIntegerField()
    duration = models.CharField(max_length=120,choices=Duration_CHOICES,default='month')


class Class(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField(max_length=120)
    coach = models.CharField(max_length=120)
    keywords = models.CharField(max_length=120, null=True)
    capacity = models.PositiveIntegerField()
    current_student = models.IntegerField(default=0)
    studio = models.ForeignKey(Studio, on_delete=models.CASCADE, null=True)
    recurrences = RecurrenceField(null=True)
    lessonStartTime = models.TimeField("Lesson Start Time", null=True)
    lessonEndTime = models.TimeField("Lesson End Time", null=True)
    status = models.CharField(max_length=120,choices=[
    ("active", 'Active'), ("cancelled", 'Cancelled')
],default='active')


class Image(models.Model):
    name = models.CharField(max_length=255)
    studio = models.ForeignKey(Studio, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="images/")
