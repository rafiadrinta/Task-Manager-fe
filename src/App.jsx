import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("pending");
  const [editingTask, setEditingTask] = useState(null);

  const API_URL = "http://localhost:3000/tasks";

  // Fetch data saat pertama kali render
  useEffect(() => {
    fetchTasks();
  }, []);

  // Ambil semua data tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  // Tambah Task
  const addTask = async () => {
    if (!title) {
      alert("Title wajib diisi!");
      return;
    }

    try {
      await axios.post(API_URL, { title, status });
      setTitle("");
      fetchTasks();
    } catch (error) {
      console.error("Gagal menambah task:", error);
    }
  };

  // Hapus Task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Gagal menghapus task:", error);
    }
  };

  // Edit Task (Load Data ke Form)
  const editTask = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setStatus(task.status);
  };

  // Update Task
  const updateTask = async () => {
    if (!editingTask) return;

    try {
      await axios.put(`${API_URL}/${editingTask.id}`, { title, status });
      setEditingTask(null);
      setTitle("");
      setStatus("pending");
      fetchTasks();
    } catch (error) {
      console.error("Gagal memperbarui task:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      <div className="mb-4">
        <input
          type="text"
          className="border p-2 w-full rounded"
          placeholder="Masukkan Judul Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="border p-2 w-full mt-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button
          onClick={editingTask ? updateTask : addTask}
          className="bg-primary text-white px-4 py-2 rounded mt-2 w-full"
        >
          {editingTask ? "Update Task" : "Tambah Task"}
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="border p-3 rounded mb-2 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{task.title}</p>
              <p className={`text-sm ${task.status === "completed" ? "text-success" : "text-secondary"}`}>
                {task.status}
              </p>
            </div>
            <div>
              <button
                onClick={() => editTask(task)}
                className="bg-warning text-white px-3 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-danger text-white px-3 py-1 rounded"
              >
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
