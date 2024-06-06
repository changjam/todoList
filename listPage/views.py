from django.shortcuts import render
from django.http import HttpResponse
from .models import Task

# Create your views here.
def listPage(request):
    task_list = Task.objects.all()
    return render(request, 'home/index.html', {'task_list': task_list})