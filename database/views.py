from django.shortcuts import render, redirect
from .models import User
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_protect

# Exibe a lista de usuários
def user(request):
    users = User.objects.all()
    return render(request, 'pagina/index.html', {'users': users})

# Cria um novo usuário
@csrf_exempt  # Aplicar proteção CSRF
def user_create(request):
    if request.method == 'POST':
        fullName = request.POST.get('nome')
        password = request.POST.get('senha')
        cpf = request.POST.get('cpf')
        email = request.POST.get('email')
        dateBirth = request.POST.get('data_nascimento')
        
        if not all([fullName, password, cpf, email, dateBirth]):
            return JsonResponse({"erro": "Todos os campos são obrigatorios"}, status=400)
        
        user = User(
            fullName=fullName,
            password=password,
            cpf=cpf,
            email=email,
            dateBirth=dateBirth
        )
        user.save()
        message = "Cadastro realizado com sucesso."
    
    return redirect('cadastro')


@csrf_exempt
def login(request):
    message = ""
    
    if request.method == 'POST':
        email = request.POST.get('emaillogin')
        password = request.POST.get('senhalogin')
        
        if not all([email, password]):
            return JsonResponse({"erro": "Todos os campos são obrigatorios"}, status=400)
        
        user = authenticate(request, username=email, password=password)
        
        if user is not None:
            login(request, user)    
            messages.success(request, "Login realizado com sucesso.")
            return redirect('pagina/index.html')
        else:
            messages.success(request, "Usuário não encontrado ou senha incorreta.")
    
    return render(request, 'pagina/logado.html', {'message': message})
