import { useEffect, useState } from "react";
import api from "../../api";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data } = await api.get("/tasks");
    setTasks(data);
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const exportExcel = () => {
    window.location.href = "http://localhost:5000/api/tasks/export";
  };

  return (
    <div>
      <h3>Your Tasks</h3>
      <button onClick={exportExcel}>Export to Excel</button>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title} (Due: {t.dueDate})
            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
