"""backend URL Configuration

"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('api.urls')),
    path('api/', include('api.urls')),
    path('services/', include('services.urls')),
]
