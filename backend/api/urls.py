from django.urls import path
from rest_framework import routers
from .viewsets import (
    LoginViewSet, RegistrationViewSet, RefreshViewSet,
    CountryViewSet, RegionViewSet, AlertViewSet, UserViewSet)
from services import views

routes = routers.DefaultRouter()

routes.register('login', LoginViewSet, 'auth-login')
routes.register('register', RegistrationViewSet,
                'auth-register')
routes.register('refresh', RefreshViewSet, 'auth-refresh')

routes.register('user', UserViewSet, 'user')
routes.register('country', CountryViewSet, 'country')
routes.register('region', RegionViewSet, 'region')
routes.register('alerts', AlertViewSet, 'alerts')
urlpatterns = routes.urls

urlpatterns += [path('services', views.init, name='init')]
