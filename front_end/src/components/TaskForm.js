import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Ensures JavaScript plugins are available

const TaskFormModal = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("Pending"); // Default status is "todo"
  const [priority, setPriority] = useState("Low"); // Default priority is "low"

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      priority,
      status,
      deadline, // ISO format for the date
    };

    // Log the data before making the request
    console.log("Task Data to be Sent: ", newTask);
    addTask(newTask);
    setTitle("");
    setDescription("");
    setDeadline("");
    setStatus("Pending"); // Reset to default
    setPriority("Low"); // Reset to default

    // Close the modal after adding the task
    document.getElementById("closeModalBtn").click();
  };

  return (
    <>
      {/* Button to trigger the modal */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#taskFormModal"
      >
        <i className="bi bi-plus-circle me-2"></i>Add Task
      </button>

      {/* Modal structure */}
      <div
        className="modal fade"
        id="taskFormModal"
        tabIndex="-1"
        aria-labelledby="taskFormModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="taskFormModalLabel">Add New Task</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="deadline" className="form-label">Deadline</label>
                  <input
                    type="date"
                    className="form-control"
                    id="deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                  />
                </div>
                {/* Priority Dropdown */}
                <div className="mb-3">
                  <label htmlFor="priority" className="form-label">Priority</label>
                  <select className="form-select" id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                {/* Status Dropdown */}
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select className="form-select" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary">
                  <i className="bi bi-plus-circle me-2"></i>Add Task
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                id="closeModalBtn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskFormModal;
