from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer, UserSerializer
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny  # Import AllowAny
from django.contrib.auth.models import User
# Register view to create a new user (no authentication required)
@api_view(['POST'])
@permission_classes([AllowAny])  # Allow any user to register
def register(request):
    if request.method == 'POST':
        # Get the data from the request
        email = request.data.get('email')
        username = request.data.get('email')
        password = request.data.get('password')

        # Check if the necessary fields are provided
        if not email or not username or not password:
            return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the email is already in use
        if User.objects.filter(email=email).exists():
            return Response({"error": "Email is already in use"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Create the user
            user = User.objects.create_user(
                email=email,
                username=username,
                password=password
            )
            return Response({"message": "Registration successful"}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# Login view to authenticate user and provide token (no authentication required)
@api_view(['POST'])
@permission_classes([AllowAny])  # Allow any user to login
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    # Authenticate the user using email and password
    user = authenticate(username=email, password=password)
    if user is not None:
        # If user is authenticated, generate or retrieve the token
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)
    else:
        # Return error if credentials are invalid
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)


# View to get the list of tasks (requires authentication)
@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Ensure the user is authenticated
def task_list(request):
    tasks = Task.objects.filter(assigned_to=request.user)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


# View to create a new task (requires authentication)
@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Ensure the user is authenticated
def create_task(request):
    if request.method == 'POST':
        data = request.data.copy()
        data['assigned_to'] = request.user.id  # Set the user as the task assignee
        serializer = TaskSerializer(data=data, context = {'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# View to update a task (requires authentication)
@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])  # Ensure the user is authenticated
def update_task(request, task_id):
    task = get_object_or_404(Task, id=task_id, assigned_to=request.user)  # Ensure the task belongs to the user
    serializer = TaskSerializer(task, data=request.data, partial=(request.method == 'PATCH'))
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# View to delete a task (requires authentication)
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])  # Ensure the user is authenticated
def delete_task(request, task_id):
    task = get_object_or_404(Task, id=task_id, assigned_to=request.user)  # Ensure the task belongs to the user
    task.delete()
    return Response({'message': 'Task deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
