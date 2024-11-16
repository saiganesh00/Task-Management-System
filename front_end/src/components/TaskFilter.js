import React from "react";

const TaskFilters = ({ setFilter, filter, tasks }) => {
  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter((task) => task.status === "Pending").length,
    "in-progress": tasks.filter((task) => task.status === "In Progress").length,
    completed: tasks.filter((task) => task.status === "Completed").length,
  };

  return (
    <div className="row justify-content-center m-4 ">
      <div className="col-lg-8">
        <div className="btn-group w-100" role="group">
          {/* All filter */}
          <input
            type="radio"
            className="btn-check"
            name="filter"
            id="all"
            value="all"
            onChange={(e) => setFilter(e.target.value)} // Trigger setFilter
            checked={filter === "all"} // Checked if the filter matches
          />
          <label className="btn btn-outline-primary" htmlFor="all">
            All (<span className="all-count">{taskCounts.all}</span>)
          </label>

          {/* Pending filter */}
          <input
            type="radio"
            className="btn-check"
            name="filter"
            id="pending"
            value="Pending"
            onChange={(e) => setFilter(e.target.value)} // Trigger setFilter
            checked={filter === "Pending"} // Checked if the filter matches
          />
          <label className="btn btn-outline-primary" htmlFor="pending">
            Pending (<span className="pending-count">{taskCounts.pending}</span>)
          </label>

          {/* In-progress filter */}
          <input
            type="radio"
            className="btn-check"
            name="filter"
            id="in-progress"
            value="In Progress"
            onChange={(e) => setFilter(e.target.value)} // Trigger setFilter
            checked={filter === "In Progress"} // Checked if the filter matches
          />
          <label className="btn btn-outline-primary" htmlFor="in-progress">
            In Progress (<span className="in-progress-count">{taskCounts["in-progress"]}</span>)
          </label>

          {/* Completed filter */}
          <input
            type="radio"
            className="btn-check"
            name="filter"
            id="completed"
            value="Completed"
            onChange={(e) => setFilter(e.target.value)} // Trigger setFilter
            checked={filter === "Completed"} // Checked if the filter matches
          />
          <label className="btn btn-outline-primary" htmlFor="completed">
            Completed (<span className="completed-count">{taskCounts.completed}</span>)
          </label>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
