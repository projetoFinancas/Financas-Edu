from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('fullName', 'email', 'cpf')
    search_fields = ('fullName', 'email', 'cpf')
    fields = ('fullName', 'email', 'password', 'cpf', 'dateBirth')
