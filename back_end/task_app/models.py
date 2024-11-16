from django.db import models
from django.contrib.auth.models import User  # Use the default User model

class Task(models.Model):
    PRIORITY_CHOICES = [('Low', 'Low'), ('Medium', 'Medium'), ('High', 'High')]
    STATUS_CHOICES = [('Pending', 'Pending'), ('In Progress', 'In Progress'), ('Completed', 'Completed')]

    title = models.CharField(max_length=200)
    description = models.TextField()
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES)
    status = models.CharField(max_length=25, choices=STATUS_CHOICES)
    deadline = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    # Use the default User model (no custom user model needed)
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks', null=True, blank=True)
