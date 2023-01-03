from django.contrib import admin
from admin_user.models import *

@admin.register(Studio)
class StudioAdmin(admin.ModelAdmin):
    list_display = ['name']

@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ["money","duration"]

@admin.register(Class)
class ClassAdmin(admin.ModelAdmin):
    list_display = ['name','get_studio',"recurrences","get_cancel","capacity","status"]

    @admin.display(description='Cancelled Date')
    def get_cancel(self, obj):
        return obj.recurrences.exdates

    @admin.display(description='Studio')
    def get_studio(self, obj):
        return obj.studio.name
    

@admin.register(Amenity)
class AmenityAdmin(admin.ModelAdmin):
    list_display = ['get_name',"type","quantity"]

    @admin.display(description='Studio')
    def get_name(self, obj):
        return obj.studio.name

@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ['get_name',"name","image"]

    @admin.display(description='Studio')
    def get_name(self, obj):
        return obj.studio.name