from django.urls import path
from .views import get_tasks, add_task, update_task, delete_task

urlpatterns = [
    path("tasks/", get_tasks),
    path("tasks/add/", add_task),
    path("tasks/update/<int:pk>/", update_task),
    path("tasks/delete/<int:pk>/", delete_task),
]
