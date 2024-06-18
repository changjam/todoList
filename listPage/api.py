import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Task
from .forms import TaskForm

@csrf_exempt
def task(request):
    if request.method == 'GET':
        task_list = Task.objects.values()
        return JsonResponse({"result": list(task_list)})

    elif request.method == 'POST':
        try:
            body = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON.'}, status=400)

        form = TaskForm(body)
        if not form.is_valid():
            return JsonResponse({'error': form.errors}, status=400)

        task = Task(title=form.cleaned_data['title'], priority=form.cleaned_data['priority'])
        task.save()
        return JsonResponse({'result': 'Task saved successfully.'})

    elif request.method == 'PUT':
        try:
            task_data_list = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON.'}, status=400)
                
        if not isinstance(task_data_list, list):
            return JsonResponse({'error': 'Expected a list of tasks.'}, status=400)

        for task_data in task_data_list:
            tid = task_data.get('id', None)
            if tid is None:
                return JsonResponse({'error': 'Missing task id in task_list_data.'}, status=400)

            try:
                task = Task.objects.get(id=tid)
                print(task)
            except Task.DoesNotExist:
                return JsonResponse({'error': f'Task with id {tid} does not exist.'}, status=404)

            form = TaskForm(task_data)
            if not form.is_valid():
                return JsonResponse({'error': form.errors}, status=400)

            task.title = form.cleaned_data['title']
            task.priority = form.cleaned_data['priority']
            task.status = form.cleaned_data['status']
            task.created_at = form.cleaned_data['created_at']
            task.updated_at = form.cleaned_data['updated_at']
            
            task.save()

        return JsonResponse({'result': 'Task updated successfully.'})

    elif request.method == 'DELETE':
        try:
            try:
                task_data = json.loads(request.body.decode('utf-8'))
            except json.JSONDecodeError:
                return JsonResponse({'error': 'Invalid JSON.'}, status=400)
            
            task_id  = task_data.get('task_id', None)
            if task_id is None:
                return JsonResponse({'error': 'Missing task id in task_data.'}, status=400)
            
            task = Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            return JsonResponse({'error': 'Task not found.'}, status=404)

        task.delete()
        return JsonResponse({'result': 'Task deleted successfully.'})

    else:
        return JsonResponse({'error': 'Invalid request method or missing task_id.'}, status=405)
