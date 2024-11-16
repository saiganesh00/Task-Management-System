document.addEventListener('DOMContentLoaded', function() {
    // Handle Edit Task Form Submission
    document.getElementById('editTaskForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const taskId = document.getElementById('taskId').value;
        const taskData = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            priority: document.getElementById('priority').value,
            status: document.getElementById('status').value,
            deadline: document.getElementById('deadline').value
        };

        // Make the PUT request to update the task
        fetch(`/api/tasks/edit/${taskId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCsrfToken()  // CSRF token for PUT request
            },
            body: JSON.stringify(taskData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.title) {
                alert('Task updated successfully!');
                window.location.href = '/';  // Redirect to task list page
            } else {
                alert('Error updating task');
            }
        });
    });

    // Function to retrieve CSRF Token
    function getCsrfToken() {
        const csrfTokenElement = document.querySelector('[name=csrfmiddlewaretoken]');
        return csrfTokenElement ? csrfTokenElement.value : '';
    }
});
