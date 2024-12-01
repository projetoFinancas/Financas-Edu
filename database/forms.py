from django import forms
from .models import User

class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['fullName', 'password', 'cpf', 'email', 'dateBirth']
        widgets = {
            'password': forms.PasswordInput(),
        }
