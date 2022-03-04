import csv
import os

from datetime import date
from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator

from .api import ApiManager
from account import models


class Util(object):
    @staticmethod
    def populate_countries_regions():
        with open(os.path.dirname(
            os.path.abspath(
                __file__)) + "/population.csv") as file:
            api = ApiManager()
            csv_reader = csv.DictReader(file, delimiter=',')
            for row in csv_reader:
                resp = api.country_info(row.get("region_id"))
                if resp.get('country_id'):
                    country, created = models.Country.objects.get_or_create(
                        id=resp.get('country_id'),
                        name="Country " + str(resp.get('country_id')))

                    region, created = models.Region.objects.get_or_create(
                        id=row.get("region_id"),
                        country=country,
                        population=row.get("population"),
                        name="Region " + str(row.get("region_id")))

    @staticmethod
    def country_food_stats(country_id, days_ago=None):

        api = ApiManager()
        country = models.Country.objects.get(id=country_id)
        regions = models.Region.objects.filter(country_id=country_id)
        stats = api.food_security(days_ago=days_ago)

        food_insecure_people = 0
        tot_pop = 0
        for stat in stats:
            for region in regions:
                if region.id == stat["region_id"]:
                    food_insecure_people += stat["food_insecure_people"]
                    tot_pop += region.population
        critical = False
        if tot_pop > 0:
            critical = (100.0 * (food_insecure_people - tot_pop)/tot_pop) >= 5
        date_created = date.today()
        alert, created = models.Alerts.objects.update_or_create(
            country=country, date_created=date_created,
            defaults={
                "critical": critical, "date_created": date_created,
                "country": country
            }
        )
        return alert

    @staticmethod
    def run_countries(days_ago=30):
        countries = models.Country.objects.filter()
        for country in countries:
            alert = Util.country_food_stats(country.id, days_ago)
            if alert.critical:
                profiles = models.Profile.objects.filter(country=alert.country)
                for profile in profiles:
                    Util.send_email(profile.user)
        return countries.count()

    @staticmethod
    def send_email(user):
        subject = "Password Reset Requested"
        email_template_name = "email_template.txt"
        content = {
            "email": user.email,
            'country': user.profile.country,
        }
        email = render_to_string(email_template_name, content)
        try:
            send_mail(subject, email, settings.DEFAULT_FROM_EMAIL,
                      [user.email], fail_silently=False)
            return JsonResponse({"msg": 'Email sent.'}, status=200)
        except Exception as e:
            return JsonResponse({"msg": 'Invalid header found.'}, status=400)
