// import React, { useState, useEffect } from "react";
// import Axios from "axios";  // Import Axios
// import TaskForm from "./components/TaskForm";
// import TaskFilters from "./components/TaskFilter";
// import TaskList from "./components/TaskList";

// const App = () => {
//   const [tasks, setTasks] = useState([]);
//   const [filter, setFilter] = useState("all");

//   // Fetch tasks from the API using Axios
//   const fetchTasks = async () => {
//     try {
//       const response = await Axios.get("http://127.0.0.1:8000/api/tasks/");
//       setTasks(response.data);  // Set the fetched tasks
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   // Call fetchTasks on component mount
//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   // Add a new task
//   const addTask = async (task) => {
//     try {
//       console.log("Sending Task Data:", task); // Log task data before sending
//       const response = await Axios.post("http://127.0.0.1:8000/api/tasks/create", task, {
//         headers: {
//           'Content-Type': 'application/json', // Explicitly set content type
//         },
//       });
//       setTasks([...tasks, response.data]); // Add the new task to the list
//     } catch (error) {
//       if (error.response) {
//         console.error("Server responded with an error:", error.response.data); // Log detailed server response
//       } else {
//         console.error("Error adding task:", error.message); // Log generic error
//       }
//     }
//   };
  

//   // Update task status (in-progress or completed)
//   const updateTaskStatus = async (taskId, updatedTask) => {
//     try {
//         const response = await Axios.put(`http://127.0.0.1:8000/api/tasks/edit/${taskId}`, updatedTask);
//         fetchTasks()
//         console.log('Task updated successfully', response.data);
//     } catch (error) {
//         console.error('Error updating task:', error.response ? error.response.data : error.message);
//         console.error('Full error details:', error);
//     }
// };


//   // Delete a task
//   const deleteTask = async (taskId) => {
//     try {
//       await Axios.delete(`http://127.0.0.1:8000/api/tasks/delete/${taskId}`);
//       setTasks(tasks.filter((task) => task.id !== taskId));  // Remove task from the list
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   // Filter tasks based on the selected filter (all, in-progress, completed)
//   const filteredTasks = tasks.filter((task) => 
//     filter === "all" || task.status === filter
//   );

//   return (
//     <div className="container py-5">
//       <div className="text-center mb-5">
//         <i className="bi bi-clipboard-check display-4 text-primary"></i>
//         <h1 className="display-5 fw-bold">Task Manager</h1>
//       </div>

//       {/* Task Form to Add New Task */}
//       <TaskForm addTask={addTask} />

//       {/* Task Filters to Show Different Task Statuses */}
//       <TaskFilters setFilter={setFilter} filter={filter} tasks={tasks} />
//       {/* Task List to Display Tasks */}
//       <TaskList 
//         tasks={filteredTasks} 
//         updateTaskStatus={updateTaskStatus} 
//         deleteTask={deleteTask}
//       />
//     </div>
//   );
// };

// export default App;


import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path ='/register' element={<Register />} />
    </Routes>
  );
}

export default App;