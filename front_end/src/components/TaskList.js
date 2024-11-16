import React, { useState } from "react";

const TaskList = ({ tasks, updateTaskStatus, deleteTask }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskStatus, setTaskStatus] = useState("Pending"); // Added status state

  // Handle Edit button click
  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setTaskDeadline(task.deadline);
    setTaskPriority(task.priority);
    setTaskStatus(task.status);  // Populate status field when editing
  };

  // Handle cancel editing
  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setTaskTitle("");
    setTaskDescription("");
    setTaskDeadline("");
    setTaskPriority("");
    setTaskStatus(""); // Reset status field
  };

  // Handle Save after edit
  const handleSaveEdit = (taskId) => {
    const updatedTask = {
      id: taskId,
      title: taskTitle,
      description: taskDescription,
      deadline: taskDeadline,
      priority: taskPriority,
      status: taskStatus,  // Update with new status
    };
    console.log(updatedTask);

    updateTaskStatus(taskId, updatedTask);  // Ensure status is updated
    handleCancelEdit();
  };

  // Handle status update
  const handleStatusChange = (taskId, status) => {
    updateTaskStatus(taskId, status);  // Update task status when clicked
  };

  return (
    <div>
      <div id="taskList" className="task-list">
        {tasks.length === 0 ? (
          <div id="emptyState" className="text-center py-5">
            <p className="text-muted">No tasks found. Create a new task to get started!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task-item mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  {/* Edit form or normal view */}
                  {editingTaskId === task.id ? (
                    <div>
                      <h5>Edit Task</h5>
                      <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-3">
                          <label htmlFor={`editTitle-${task.id}`} className="form-label">Title</label>
                          <input
                            type="text"
                            className="form-control"
                            id={`editTitle-${task.id}`}
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor={`editDescription-${task.id}`} className="form-label">Description</label>
                          <textarea
                            className="form-control"
                            id={`editDescription-${task.id}`}
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor={`editDeadline-${task.id}`} className="form-label">Deadline</label>
                          <input
                            type="date"
                            className="form-control"
                            id={`editDeadline-${task.id}`}
                            value={taskDeadline}
                            onChange={(e) => setTaskDeadline(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor={`editPriority-${task.id}`} className="form-label">Priority</label>
                          <select
                            className="form-select"
                            id={`editPriority-${task.id}`}
                            value={taskPriority}
                            onChange={(e) => setTaskPriority(e.target.value)}
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                          </select>
                        </div>
                        {/* New Status Dropdown */}
                        <div className="mb-3">
                          <label htmlFor={`editStatus-${task.id}`} className="form-label">Status</label>
                          <select
                            className="form-select"
                            id={`editStatus-${task.id}`}
                            value={taskStatus}
                            onChange={(e) => setTaskStatus(e.target.value)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="In progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>
                        <button className="btn btn-success" onClick={() => handleSaveEdit(task.id)}>
                          Save
                        </button>
                        <button className="btn btn-secondary ms-2" onClick={handleCancelEdit}>
                          Cancel
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div>
                      <h5 className="card-title">{task.title}</h5>
                      <p className="card-text">{task.description}</p>
                      <p className="text-muted">Deadline: {new Date(task.deadline).toLocaleString()}</p>
                      <div className="d-flex justify-content-between">
                        {/* Status */}
                        <span className={`badge bg-${task.status === 'completed' ? 'success' : task.status === 'in-progress' ? 'warning' : 'primary'}`}>
                          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </span>
                        {/* Priority */}
                        <span className={`badge bg-${task.priority === 'High' ? 'danger' : task.priority === 'Medium' ? 'warning' : 'secondary'}`}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>

                        {/* Conditional Buttons */}
                        {task.status === "pending" && (
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() => handleStatusChange(task.id, "in-progress")}
                          >
                            Mark In Progress
                          </button>
                        )}

                        {task.status === "in-progress" && (
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleStatusChange(task.id, "completed")}
                          >
                            Mark Completed
                          </button>
                        )}

                        {task.status === "completed" && (
                          <span className="text-muted">Task Completed</span>
                        )}

                        {/* Edit Button */}
                        <button
                          className="btn btn-info btn-sm"
                          onClick={() => handleEditClick(task)}
                        >
                          Edit
                        </button>

                        {/* Delete Button */}
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteTask(task.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
