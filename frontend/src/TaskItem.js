import React from "react";

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-2">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <label
          className={`form-check-label ${
            task.completed ? "text-decoration-line-through" : ""
          }`}
        >
          {task.title}
        </label>
      </div>
      <button
        className="btn btn-danger btn-sm"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default TaskItem;
