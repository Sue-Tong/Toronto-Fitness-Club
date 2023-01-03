from rest_framework import serializers

from admin_user.models import *
from accounts.models import *

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Studio
        fields = (
            "id",
            "name",
            "location",
            "postal_code",
            "phone_number",
        )

class StudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Studio
        fields = (
            "id",
            "name",
            "location",
            "postal_code",
            "phone_number",
            "address"
        )
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        all = instance.location.split(",")
        representation['lat'] = float(all[0])
        representation['long'] = float(all[1])
        representation['all'] = instance.name+" Address: "+instance.address+" "+instance.postal_code

        return representation


class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = "__all__"

class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = "__all__"

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['number'] = instance.card.card_number

        return representation
    

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = "__all__"

class UserSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSubscription
        fields = "__all__"
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['plan'] = instance.subscription.duration + " plan"
        representation['amount'] = instance.subscription.money

        return representation
    

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ("name","cvv","card_number","expire_date")