from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import (User, Group)


class SignupForm(UserCreationForm):
    """Sign up form
    """
    first_name = forms.CharField(
        max_length=100, help_text='Last Name',
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Username'
        }))
    last_name = forms.CharField(
        max_length=100, help_text='Last Name',
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Last Name'
        }))
    email = forms.EmailField(
        max_length=150, help_text='Email',
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Email'
        }))

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name',
                  'email', 'password1', 'password2', 'is_active')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['is_active'].required = False
