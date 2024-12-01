from django.urls import path
from . import views

urlpatterns = [

    path('users/', views.user, name='user_list'),
    path('cadastro/', views.user_create, name='user_create'),
    path('login/', views.login, name='login'),
]
