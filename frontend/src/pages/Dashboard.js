import { useEffect, useState } from "react";
import api from "../api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    effort: "",
    dueDate: ""
  });
  const [editingTask, setEditingTask] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data } = await api.get("/tasks");
    setTasks(data);
  };

  // ---------- CREATE ----------
  const createTask = async (e) => {
    e.preventDefault();
    await api.post("/tasks", newTask);
    setNewTask({ title: "", description: "", effort: "", dueDate: "" });
    fetchTasks();
  };

  // ---------- UPDATE ----------
  const startEdit = (task) => setEditingTask({ ...task });
  const saveEdit = async () => {
    await api.put(`/tasks/${editingTask.id}`, editingTask);
    setEditingTask(null);
    fetchTasks();
  };

  // ---------- DELETE ----------
  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // ---------- EXPORT ----------
  const exportExcel = () => {
    window.location.href = "http://localhost:5000/api/tasks/export";
  };

  // ---------- UPLOAD ----------
  const uploadTasks = async () => {
    const formData = new FormData();
    formData.append("file", file);
    await api.post("/tasks/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setFile(null);
    fetchTasks();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📌 Task Dashboard</h2>

      {/* Create Task */}
      <form onSubmit={createTask} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        <input
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Effort (days)"
          value={newTask.effort}
          onChange={(e) => setNewTask({ ...newTask, effort: e.target.value })}
        />
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          required
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Export & Upload */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={exportExcel}>Export to Excel</button>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ marginLeft: "10px" }}
        />
        <button onClick={uploadTasks} disabled={!file}>
          Upload Tasks
        </button>
      </div>

      {/* Task List */}
      <ul>
        {tasks.map((t) => (
          <li key={t.id} style={{ marginBottom: "10px" }}>
            {editingTask?.id === t.id ? (
              <div>
                <input
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                />
                <input
                  type="date"
                  value={editingTask.dueDate}
                  onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                />
                <button onClick={saveEdit}>Save</button>
                <button onClick={() => setEditingTask(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <strong>{t.title}</strong> — {t.description} (Effort: {t.effort} days, Due: {t.dueDate})
                <button onClick={() => startEdit(t)}>Edit</button>
                <button onClick={() => deleteTask(t.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
