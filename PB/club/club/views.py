import datetime
import time
from django.http import JsonResponse
from rest_framework.decorators import api_view
from accounts.models import *
from admin_user.models import *
from .serializers import *
from django.core.serializers import serialize
import json
from math import sqrt, radians, sin, cos, asin
from accounts.models import *
from admin_user.models import *
from django.http import HttpResponse
from dateutil.relativedelta import relativedelta
from django.utils import timezone

@api_view(["POST"])
def subscribe(request):
    """
    add one subscription
    """
    if request.method == "POST":
        card = request.user.card
        if card != None and card.expire_date > datetime.date.today():
            try:
                studio_subscription = Subscription.objects.get(id=request.data.get("id"))
                current = UserSubscription.objects.filter(user=request.user,status="active")
                if current.exists():
                    return JsonResponse({"code": 200, "msg": "You already have a subscription, do not repeat."}, safe=False)
                if studio_subscription.duration == "week":
                    subscription = UserSubscription.objects.create(
                        user=request.user,
                        subscription= studio_subscription,
                        end_date = datetime.date.today() + relativedelta(weeks=+1)
                        )
                elif studio_subscription.duration == "month":
                    subscription = UserSubscription.objects.create(
                        user=request.user,
                        subscription= studio_subscription,
                        end_date = datetime.date.today() + relativedelta(months=+1)
                    )
                elif studio_subscription.duration == "year":
                    subscription = UserSubscription.objects.create(
                        user=request.user,
                        subscription= subscription,
                        end_date = datetime.date.today() + relativedelta(years=+1)
                    )
                subscription.save()
                payment = Payment.objects.create(
                    user=request.user,
                    amount= studio_subscription.money,
                    card=card,
                    date = datetime.date.today()
                )
                payment.save()
                data = {"code": 200, "msg": "Subscription successfully"}
            except Exception as e:
                data = {"code": 500, "msg": str(e)}
        else:
            data = {"code": 200, "msg": "There is no card exists or the card has expired, please try again"}
    return JsonResponse(data, safe=False)


@api_view(["PUT"])
def update_subscription(request):
    """
    update one subscription
    """
    if request.method == "PUT":
        try:
            card = request.user.card
            usersubscription = UserSubscription.objects.filter(user = request.user,status = "active")[0]
            if card == None or card.expire_date < datetime.date.today():
                data = {"code": 200, "msg": "There is no card exists or the card has expired, please try again"}
            else:
                new = Subscription.objects.get(id = request.data.get("id"))
                if new == usersubscription.subscription:
                    data = {"code": 200, "msg": "This is your current plan"}
                else:
                    usersubscription.subscription = new
                    if new.duration == "week":
                        usersubscription.end_date = datetime.date.today() + relativedelta(weeks=+1)
                    elif new.duration == "month":
                        usersubscription.end_date = datetime.date.today() + relativedelta(months=+1)
                    else:
                        usersubscription.end_date = datetime.date.today() + relativedelta(years=+1)
                    usersubscription.save()
                    payment = Payment.objects.create(
                        user=request.user,
                        amount= new.money,
                        card= card,
                        date = datetime.date.today()
                    )
                    payment.save()
                    data = {"code": 200, "msg": "Updated successfully"}
        except Exception as e:
            data = {"code": 500, "msg": str(e)}
    return JsonResponse(data, safe=False)

@api_view(["GET"])
def get_subscription(request):
    if request.method == "GET":
        subscription_list = Subscription.objects.all()
        return JsonResponse(SubscriptionSerializer(subscription_list.all(), many=True).data, safe=False)

@api_view(["PUT"])
def make_payment(request):
    if request.method == "PUT":
        card = request.user.card
        usersubscription = UserSubscription.objects.filter(user = request.user, end_date = datetime.date.today(),status = "active")
        if not usersubscription:
            data = {"code": 200, "msg": "You do not need to make any payments today"}
        elif card != None and card.expire_date < datetime.date.today():
            data = {"code": 200, "msg": "There is so card exists or the card has expired, please try again"}
        else:
            for renew in usersubscription:
                if renew.subscription.duration == "week":
                    renew.end_date = datetime.date.today() + relativedelta(weeks=+1)
                elif renew.subscription.duration == "month":
                    renew.end_date = datetime.date.today() + relativedelta(months=+1)
                else:
                    renew.end_date = datetime.date.today() + relativedelta(years=+1)
                renew.save()
                payment = Payment.objects.create(
                    user=request.user,
                    amount= renew.subscription.money,
                    card= card,
                    date = datetime.date.today()
                )
                payment.save()
            data = {"code": 200, "msg": "Payment successfully"}
    return JsonResponse(data, safe=False)

@api_view(["POST"])
def cancel_subscription(request):
    """
    cancel the subscription with the given id
    """
    if request.method == "POST":
        try:
            subscription = UserSubscription.objects.get(user = request.user, status="active")
            subscription.status = "cancelled"
            subscription.save()
            data = {"code": 200, "msg": "Cancelled successfully"}
        except UserSubscription.DoesNotExist:
                data = {
                    "code": 200,
                    "msg": "You do not have any subscription"
                    ,
                }
        except Exception as e:
            data = {"code": 500, "msg": str(e)}
    return JsonResponse(data, safe=False)


@api_view(["POST"])
def enrol_class(request):
    """
    add booking record
    """
    if request.method == "POST":
        try:
            user = request.user
            course = Class.objects.get(id=request.data.get("id"))
            if Booking.objects.filter(user = request.user, course=course).exists() :
                data = {"code": 200, "msg": "You have already booked this class"}
            elif course.capacity > course.current_student and UserSubscription.objects.filter(user=user,end_date__gt=datetime.date.today(),status = "active"):
                booking = Booking.objects.create(
                    user = user, course= course)
                booking.save()
                course.current_student += 1
                data = {"code": 200, "msg": "Successfully booked"}
            elif course.capacity <= course.current_student :
                data = {"code": 200, "msg": "The class has reached its capacity, please book another class instaed."}
            else:
                data = {"code": 200, "msg": "You have not subscribed this studio or your subscription is expired"}
        except Exception as e:
            data = {"code": 500, "msg": str(e)}
    return JsonResponse(data, safe=False)


@api_view(["POST"])
def drop_class(request):
    """
    delete a class
    """
    if request.method == "POST":
        course = Class.objects.get(id = request.data.get("id"))
        booking = Booking.objects.filter(user=request.user,course=course)
        if not booking.exists():
            data = {"code": 500, "msg": "You did not enrol in this course"}
        elif request.data.get("cancel") == "all":
            try:
                course.current_student -= 1
                booking[0].delete()
                data = {"code": 200, "msg": "You have successfully drop all classes"}
            except Exception as e:
                data = {"code": 500, "msg": str(e)}
        else:
            try:
                cancel = Cancel.objects.create(date = request.data.get("date"), booking= booking[0])
                cancel.save()
                data = {"code": 200, "msg": "You have successfully drop a class"}
            except Exception as e:
                data = {"code": 500, "msg": str(e)}
    return JsonResponse(data, safe=False)


@api_view(["POST"])
def update_card(request):
    """
    update card
    """
    if request.method == "POST":
        try:
            card = request.user.card
            card.name = request.POST.get("name")
            card.cvv = request.POST.get("cvv")
            card.card_number = request.POST.get("card_number")
            card.expire_date = request.POST.get("expire_date")
            card.save()
            data = {"code": 200, "msg": "Card updated successfully"}
        except Exception as e:
            data = {"code": 500, "msg": str(e)}
    return JsonResponse(data, safe=False)

@api_view(["GET"])
def get_card(request):
    if request.method == "GET":
        card = Card.objects.get(user=request.user)
        return JsonResponse(CardSerializer(card).data, safe=False)

@api_view(["GET"])
def list_my_payment(request):
    """
    query all my payments
    """
    if request.method == "GET":
        payments = (Payment.objects.filter(user=request.user).order_by("date").all())
        return JsonResponse(PaymentSerializer(payments, many=True).data, safe=False)
    else:
        return JsonResponse(data={})

@api_view(["GET"])
def list_my_future_payment(request):
    """
    query all my payments
    """
    if request.method == "GET":
        future = (
            UserSubscription.objects
            .filter(user=request.user,status = "active")
            .order_by("end_date")
            .all()
        )
        return JsonResponse(UserSubscriptionSerializer(future, many=True).data, safe=False)
    else:
        return JsonResponse(data={})

@api_view(["GET"])
def list_classes_schedule(request):
    """
    query classes history
    """
    if request.method == "GET":
        try:
            bookings = Booking.objects.filter(user=request.user)
            data = []
            classes = {}
            for booking in bookings:
                booked_class = booking.course
                if booked_class.status == "active":
                    dates = booked_class.recurrences.occurrences()
                    classes["id"] = booked_class.id
                    classes["name"] = booked_class.name
                    classes["schedule"] = []
                    for i in range(10):
                        if not Cancel.objects.filter(date = dates[i], booking = booking).exists() :
                            classes["schedule"].append(dates[i].strftime("%m/%d/%Y")+ " "+
                            booked_class.lessonStartTime.strftime("%H:%M - ") + 
                            booked_class.lessonEndTime.strftime("%H:%M")+' ')
            data.append(classes)
        except Exception as e:
            data = {"code": 500, "msg": str(e)}
        if data == [{}]:
            data = [{"id":"None", "name":"None", "schedule":"None"}]
    return JsonResponse(data, safe=False)

@api_view(["GET"])
def list_classes_history(request):
    """
    query classes history
    """
    if request.method == "GET":
        try:
            bookings = Booking.objects.filter(user=request.user)
            data = []
            classes = {}
            for booking in bookings:
                booked_class = booking.course
                if booked_class.status == "active":
                    dates = booked_class.recurrences.between(
                        timezone.make_naive(booking.booking_time), timezone.make_naive(timezone.now()), inc=True)
                    if dates != []:
                        classes[booked_class.name] = []
                        classes[booked_class.name].extend(dates)
            data.append(classes)
        except Exception as e:
            data = {"code": 500, "msg": str(e)}
        if data == [{}]:
            data = [{"id":"None", "name":"None", "schedule":"None"}]
    return JsonResponse(data, safe=False)


@api_view(["GET"])
def nearest_studios(request):
    """
    request has three params, longitude, latitude and limit for studios
    """
    if request.method == "GET":
        studios = Studio.objects.all()
        longitude = float(request.GET.get("longitude"))
        latitude = float(request.GET.get("latitude"))
        limit = int(request.GET.get("limit"))

        # a dict, key is id, value is object and distance tuple
        result_maps = {}
        # order by distance from user
        for studio in studios:
            s_lon = float(studio.location.split(",")[0].strip())
            s_lat = float(studio.location.split(",")[1].strip())
            distance = geo_distance(s_lon, s_lat, longitude, latitude)
            result_maps[studio.id] = (studio, distance)

        # sort by distance
        result_studios = sorted(result_maps.values(), key=lambda x: x[1])
        result_studios = result_studios[:limit]
        serializer = StudioSerializer([x[0] for x in result_studios], many=True)
        data = serializer.data
        for d in data:
            d["distance"] = result_maps[d["id"]][1]
        return JsonResponse(data, safe=False)


@api_view(["GET"])
def get_studio(request):
    if request.method == "GET":
        studio_result = Studio.objects.all()

        # search in table class
        coach_list = request.GET.getlist("coach")

        if coach_list:
            # when no attribute in Class table is queried, class_result still None
            studio_result = studio_result.filter(class__coach__in=coach_list)
        class_name_list = request.GET.getlist("class-name")
        if class_name_list:
            studio_result = studio_result.filter(class__name__in=class_name_list)

        amenity_type_list = request.GET.getlist("amenity-type")
        if amenity_type_list:
            studio_result = studio_result.filter(amenity__type__in=amenity_type_list)

        studio_name_list = request.GET.getlist("name")
        if studio_name_list:
            studio_result = studio_result.filter(name__in=studio_name_list)
            
        return JsonResponse(
            StudioSerializer(studio_result.distinct().all(), many=True).data, safe=False
        )


@api_view(["GET"])
def get_studio_detail(request, id):
    if request.method == "GET":
        studio_list = Studio.objects.get(id=id)
        if studio_list:
            class_list = (
                Class.objects.filter(studio=studio_list, status="active")
                .order_by("lessonStartTime")
                .all()
            )
            amenity_list = (
                Amenity.objects.filter(studio=studio_list)
                .all()
            )
            image_list = (
                Image.objects.filter(studio=studio_list)
                .all()
            )
            studio_data = StudioSerializer(studio_list).data
            studio_data["classes"] = ClassSerializer(class_list, many=True).data
            studio_data["amenity"] = AmenitySerializer(amenity_list, many=True).data
            studio_data["images"] = ImageSerializer(image_list, many=True).data
            return JsonResponse(studio_data, safe=False)
        else:
            return JsonResponse(data={})


@api_view(["GET"])
def get_studio_class(request, id):
    if request.method == "GET":
        class_list = Class.objects.filter(studio=Studio.objects.get(id=id), status="active")
        name_list = request.GET.getlist("name")
        if name_list:
            class_list = class_list.filter(name__in=name_list)
        coach_list = request.GET.getlist("coach")
        if coach_list:
            class_list = class_list.filter(coach__in=coach_list)

        date_list = request.GET.getlist("date")
        date_list = list(map(datetime.date.fromisoformat, date_list))
        if date_list:
            id_set = set()
            all_dates_map = class_list.values("id", "recurrences")
            for x in all_dates_map:
                for d in date_list:
                    if x["recurrences"]:
                        if x["recurrences"].between(
                                datetime.datetime.combine(d, datetime.time.min),
                                datetime.datetime.combine(d, datetime.time.max),
                                dtstart=datetime.datetime.combine(d, datetime.time.min),
                                inc=True):
                            id_set.add(x["id"])
            class_list = class_list.filter(id__in=id_set)

        start_time = request.GET.get("start-time")
        if start_time:
            class_list = class_list.filter(lessonStartTime__gt=start_time)

        end_time = request.GET.get("end-time")
        if end_time:
            class_list = class_list.filter(lessonEndTime__lt=end_time)

        return JsonResponse(ClassSerializer(class_list, many=True).data, safe=False)



@api_view(["GET"])
def get_all_class_name(request):
    return JsonResponse(
        list(set(Class.objects.values_list("name", flat=True))), safe=False
    )


@api_view(["GET"])
def get_all_coach(request):
    return JsonResponse(
        list(set(Class.objects.values_list("coach", flat=True))), safe=False
    )


@api_view(["GET"])
def get_all_lesson_start_time(request):
    return JsonResponse(list(set(Class.objects.values_list("lessonStartTime", flat=True))), safe=False)


@api_view(["GET"])
def get_all_lesson_end_time(request):
    return JsonResponse(list(set(Class.objects.values_list("lessonEndTime", flat=True))), safe=False)


@api_view(["GET"])
def get_all_amenity_type(request):
    return JsonResponse(
        list(set(Amenity.objects.values_list("type", flat=True))), safe=False
    )

def geo_distance(lng1, lat1, lng2, lat2) -> float:
    """
    returns meters between two points
    """
    # lon and lat to radian
    lng1, lat1, lng2, lat2 = map(
        radians, [float(lng1), float(lat1), float(lng2), float(lat2)]
    )
    d_lon = lng2 - lng1
    d_lat = lat2 - lat1
    a = sin(d_lat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(d_lon / 2) ** 2
    # earth avg r is 6371km
    distance = 2 * asin(sqrt(a)) * 6371 * 1000
    distance = round(distance / 1000, 3)
    return distance
