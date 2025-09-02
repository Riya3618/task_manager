import { useState } from "react";
import api from "../../api";

export default function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [effort, setEffort] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !dueDate) return alert("Title & Due Date required!");
    const { data } = await api.post("/tasks", { title, description, effort, dueDate });
    onTaskCreated(data);
    setTitle(""); setDescription(""); setEffort(""); setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Task</h3>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="number" placeholder="Effort (days)" value={effort} onChange={(e) => setEffort(e.target.value)} />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <button type="submit">Add Task</button>
    </form>
  );
}
