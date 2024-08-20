import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/tasks/")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = () => {
    fetch("http://localhost:8000/api/tasks/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTask }),
    })
      .then((response) => response.json())
      .then((data) => setTasks([...tasks, data]));

    setNewTask("");
  };

  const toggleTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    fetch(`http://localhost:8000/api/tasks/update/${id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...task, completed: !task.completed }),
    })
      .then((response) => response.json())
      .then((data) => setTasks(tasks.map((t) => (t.id === id ? data : t))));
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:8000/api/tasks/delete/${id}/`, {
      method: "DELETE",
    }).then(() => setTasks(tasks.filter((task) => task.id !== id)));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">To-Do List by Zongdao Wen</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button className="btn btn-primary" onClick={addTask}>
          Add Task
        </button>
      </div>
      <div>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </div>
      <br></br>
      <h10>zongdaow@usc.edu</h10>
    </div>
  );
}

export default TaskList;
