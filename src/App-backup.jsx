import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./component/Button";
import EditTask from "./component/EditTask";
import Header from "./component/header";

const API_URL = "http://localhost:3000/tasks";

const App = () => {

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
    <>
    <Header />
    <EditTask />

    
    <Button />

    </>


   );
}
 
export default App;