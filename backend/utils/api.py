import requests
from django.conf import settings


class ApiManager(object):
    def __init__(self, **kwargs) -> None:
        self.url = kwargs.pop('auth_url', None)
        self.username = kwargs.pop('username', None)
        self.password = kwargs.pop('password', None)
        self.bearer_token = kwargs.pop('bearer_token', None)

        self.username = settings.API_USERNAME
        self.password = settings.API_PASSWORD

        if not self.url:
            self.url = settings.API_AUTH_URL

        if not self.username:
            self.username = settings.API_USERNAME

        if not self.password:
            self.password = settings.API_PASSWORD

        if not self.bearer_token:
            self.login()

    def login(self):
        """
        Login to the API
        :return:
        """
        try:
            req = requests.post(self.url + "/token", auth=(
                self.username, self.password))
            if req.status_code < 300:
                self.bearer_token = req.json().get("token", None)
        except Exception as e:
            raise e

    def country_info(self, region_id):
        req = requests.get(
            self.url + "/region/{}/country".format(region_id),
            headers={"Authorization": "Bearer " + self.bearer_token})
        return req.json()

    def regions(self, country_id):
        req = requests.get(
            self.url + "/country/{}/regions".format(country_id),
            headers={"Authorization": "Bearer " + self.bearer_token})
        return req.json()

    def food_security(self, days_ago=None):
        params = ""
        if days_ago:
            params = "?days_ago={}".format(days_ago)
        req = requests.get(
            self.url + "/foodsecurity" + params,
            headers={"Authorization": "Bearer " + self.bearer_token})
        return req.json()
