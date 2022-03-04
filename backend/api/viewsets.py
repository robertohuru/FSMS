from logging import critical
from rest_framework.response import Response
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView)
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from api.serializers import (
    LoginSerializer, RegisterSerializer, CountrySerializer, RegionSerializer,
    AlertSerializer, UserSerializer)
from account.models import (Country, Region, Alerts, User)
from utils.util import Util


class LoginViewSet(ModelViewSet, TokenObtainPairView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class RegistrationViewSet(ModelViewSet, TokenObtainPairView):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        res = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }

        return Response({
            "user": serializer.data,
            "refresh": res["refresh"],
            "token": res["access"]
        }, status=status.HTTP_201_CREATED)


class RefreshViewSet(ViewSet, TokenRefreshView):
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class CountryViewSet(ModelViewSet):
    # permission_classes = [
    #     IsAuthenticated,
    # ]
    serializer_class = CountrySerializer

    def perform_create(self, serializer):
        if self.request.user.is_superuser:
            serializer.save(owner=self.request.user)

    def get_queryset(self):
        return Country.objects.all()

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = Country.objects.get(lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj


class RegionViewSet(ModelViewSet):
    # permission_classes = [
    #     IsAuthenticated,
    # ]
    serializer_class = RegionSerializer

    def perform_create(self, serializer):
        if self.request.user.is_superuser:
            serializer.save()

    def get_queryset(self):
        return Region.objects.filter(country_id=self.request.GET.get("country_id")).all()

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = Region.objects.get(lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj


class UserViewSet(ModelViewSet):
    http_method_names = ['get']
    serializer_class = UserSerializer
    # permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return User.objects.all()

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = User.objects.get(lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj


class AlertViewSet(ModelViewSet):
    # permission_classes = [
    #     IsAuthenticated,
    # ]

    serializer_class = AlertSerializer
    http_method_names = ['get']

    def get_queryset(self):
        return Alerts.objects.filter(critical=True).all()
