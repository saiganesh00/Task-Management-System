# task_app/urls.py
from django.urls import path
from .views import task_list, create_task, update_task, delete_task, register, login
urlpatterns = [
    # Backend API Routes for CRUD operations
    path('api/register/', register, name='register'),
    path('api/login/', login, name='login'),
    path('api/tasks/', task_list, name='task-list'),  # List all tasks (GET)
    path('api/tasks/create', create_task, name='task-create'),  # Create a new task (POST)
    path('api/tasks/edit/<int:task_id>', update_task, name='task-edit'),  # Update a task (PUT/PATCH)
    path('api/tasks/delete/<int:task_id>', delete_task, name='task-delete'),  # Delete a task (DELETE)
   
]
