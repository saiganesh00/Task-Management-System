from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Task

class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model for registration."""
    
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True, 'required': True},
        }

    def create(self, validated_data):
        # Create a new user with hashed password
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['email'],  # You can customize this based on your needs
            password=validated_data['password'],
        )
        return user

class TaskSerializer(serializers.ModelSerializer):
    """Serializer for Task model."""

    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['assigned_to', 'created_at']

    def create(self, validated_data):
        user = self.context['request'].user  # Access the user from the request context
        validated_data['assigned_to'] = user  # Assign the logged-in user to the task
        return super().create(validated_data)
