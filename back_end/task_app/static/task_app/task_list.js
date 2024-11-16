// Task Creation Modal
document.getElementById('createTaskBtn').addEventListener('click', function() {
    $('#createTaskModal').modal('show'); // Open the modal
    document.getElementById('createTaskForm').reset();  // Reset form fields when opening the modal
});

// Ensure the modal close button works even if jQuery is not loading properly
document.querySelector('.close').addEventListener('click', function() {
    $('#createTaskModal').modal('hide'); // Manually hide the modal using jQuery
});

// Handle Create Task Form Submission
document.getElementById('createTaskForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const taskData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        priority: document.getElementById('priority').value,
        status: document.getElementById('status').value,
        deadline: document.getElementById('deadline').value
    };

    fetch('/api/tasks/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCsrfToken()  // CSRF token for POST request
        },
        body: JSON.stringify(taskData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.title) {
            alert('Task created successfully!');
            $('#createTaskModal').modal('hide');
            loadTasks(); // Reload task list
        } else {
            alert('Error creating task');
        }
    });
});

// Load Tasks and Display in Table
function loadTasks() {
    fetch('/api/tasks/')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#taskTable tbody');
        tableBody.innerHTML = '';  // Clear existing rows

        data.forEach(task => {
            const row = `
                <tr id="task-${task.id}">
                    <td>${task.title}</td>
                    <td>${task.description}</td>
                    <td>${task.priority}</td>
                    <td>${task.status}</td>
                    <td>${task.deadline}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editTask(${task.id})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Delete</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    });
}

// Delete Task function
function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        fetch(`/tasks/${taskId}/delete/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCsrfToken()  // CSRF token for POST request
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                document.getElementById(`task-${taskId}`).remove();  // Remove the row from the table
            } else {
                alert('Error deleting task');
            }
        });
    }
}

// Get CSRF Token
function getCsrfToken() {
    const csrfTokenElement = document.querySelector('[name=csrfmiddlewaretoken]');
    return csrfTokenElement ? csrfTokenElement.value : '';
}

// Initial load of tasks
loadTasks();
