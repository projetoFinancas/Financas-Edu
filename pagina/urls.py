# pagina/views.py
from django.shortcuts import render

def pagina_view(request):
    return render(request, 'pagina/index.html') 




