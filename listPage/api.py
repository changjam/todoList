import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Task
from .forms import TaskForm

@csrf_exempt
def save_task(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON.'}, status=400)
        
        form = TaskForm(body)
        if not form.is_valid():
            return JsonResponse({'error': form.errors}, status=400)
        
        task = Task(title = form.cleaned_data['title'], priority = form.cleaned_data['priority'])
        task.save()
        return JsonResponse({'result': 'Task saved successfully.'})
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)