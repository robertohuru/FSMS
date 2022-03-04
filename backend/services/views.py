import json
from urllib import request
from django.template import loader
from django.contrib.auth.hashers import make_password
from django.http import (
    HttpResponse,
    JsonResponse
)
from django.contrib.auth import (
    login,
    authenticate,
    logout
)
from django.views.generic.edit import FormView
from . import forms

from utils.util import Util


def init(request):
    days_ago = request.GET.get("days_ago")
    Util.populate_countries_regions()
    return JsonResponse({
        "msg": Util.run_countries(days_ago),
        "success": True}, status=200)
