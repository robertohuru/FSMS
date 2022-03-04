from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.timezone import now


class UserManager(BaseUserManager):

    def create_user(self, username, email, password=None, **kwargs):
        """Create and return a `User` with an email, phone number, username and password."""
        if username is None:
            raise TypeError('Users must have a username.')
        if email is None:
            raise TypeError('Users must have an email.')

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password):
        """
        Create and return a `User` with superuser (admin) permissions.
        """
        if password is None:
            raise TypeError('Superusers must have a password.')
        if email is None:
            raise TypeError('Superusers must have an email.')
        if username is None:
            raise TypeError('Superusers must have an username.')

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(db_index=True, max_length=255, unique=True)
    email = models.EmailField(
        db_index=True, unique=True,  null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return f"{self.email}"


class Country(models.Model):
    id = models.BigIntegerField(primary_key=True)
    key = models.IntegerField(default=0)
    code = models.CharField(max_length=5, blank=True, null=True)
    name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        db_table = "country"

    def save(self, *args, **kwargs):
        self.key = self.key + 1
        super().save(*args, **kwargs)


class Region(models.Model):
    id = models.BigIntegerField(primary_key=True)
    key = models.IntegerField(default=0)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, blank=True, null=True)
    population = models.BigIntegerField(default=0)

    class Meta:
        db_table = "region"

    def save(self, *args, **kwargs):
        self.key = self.key + 1
        super().save(*args, **kwargs)


class Profile(models.Model):
    """
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=150, null=True,
                             blank=True, default="")
    address = models.CharField(max_length=150, null=True,
                               blank=True, default="")
    country = models.ForeignKey(Country, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.user.username

    class Meta:
        db_table = "user_profile"


@ receiver(post_save, sender=User)
def update_profile_signal(sender, instance, created, **kwargs):
    """
    """
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()


class Alerts(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    critical = models.BooleanField(null=True, default=False)
    date_created = models.DateField(default=now, null=True)

    class Meta:
        db_table = "alert"

    @property
    def country_name(self):
        return self.country.name
