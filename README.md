# Task Management System

This is a task management system that allows users to efficiently manage their tasks. The system consists of a frontend built with React and a backend built with Django. It allows users to create, update, delete, and view tasks, and provides an easy-to-use interface for managing personal tasks.

## Features

- **Create, Update, and Delete Tasks**: Users can create new tasks, update them with relevant information, or delete tasks.
- **Task Status Management**: Tasks can be marked as complete or incomplete.
- **User Authentication**: Secure authentication to ensure that only authorized users can access their tasks.
- **Responsive UI**: The frontend is responsive and optimized for both desktop and mobile devices.

## Technology Stack

### Frontend:
- **React.js**: A JavaScript library for building user interfaces.
- **React Router**: For managing routes and navigation within the app.
- **Axios**: To make HTTP requests from the frontend to the backend API.
- **Tailwind CSS**: For styling the components and making the UI responsive.

### Backend:
- **Django**: A high-level Python web framework that follows the model-template-views (MTV) pattern.
- **Django REST Framework (DRF)**: To create and manage the API for the task management system.
- **SQLite**: A lightweight relational database used to store task data.

## Folder Structure

```plaintext
task-management-system/
├── backend/
│   ├── manage.py          # Django project management script
│   ├── task_manager/      # Backend Django application
│   ├── db.sqlite3         # SQLite database
│   ├── requirements.txt   # Backend dependencies
│   ├── settings.py        # Django settings
│   └── ...
└── frontend/
    ├── public/            # Static files like index.html
    ├── src/
    │   ├── components/    # React components
    │   ├── App.js         # Main React application file
    │   ├── api.js         # API configuration for HTTP requests
    │   └── ...
    ├── package.json       # Frontend dependencies
    └── ...
```

## Installation

### Backend Setup (Django)

1. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Install the required dependencies:

    ```bash
    pip install -r requirements.txt
    ```

3. Apply the migrations to set up the database:

    ```bash
    python manage.py migrate
    ```

4. Create a superuser (admin user) to access the admin panel:

    ```bash
    python manage.py createsuperuser
    ```

5. Start the Django development server:

    ```bash
    python manage.py runserver
    ```

### Frontend Setup (React)

1. Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Start the React development server:

    ```bash
    npm start
    ```

4. The frontend will be available at `http://localhost:3000` and will connect to the backend running at `http://localhost:8000`.

## API Endpoints

Here are the key API endpoints available in the backend:

- **POST** `/api/login/` - User login
- **POST** `/api/register/` - User registration
- **GET** `/api/tasks/` - Get all tasks
- **POST** `/api/tasks/` - Create a new task
- **PUT** `/api/tasks/<id>/` - Update a task
- **DELETE** `/api/tasks/<id>/` - Delete a task

## Usage

1. Open the frontend in your browser at `http://localhost:3000`.
2. Login or register a new user.
3. Once logged in, you can view, add, edit, or delete tasks from the task dashboard.
4. The data is stored and managed in the backend using Django.
