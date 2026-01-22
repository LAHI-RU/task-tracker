import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import { fetchTasks, createTask, updateTask, deleteTask } from "./services/api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function loadTasks() {
    try {
      setError("");
      setLoading(true);
      const res = await fetchTasks();
      setTasks(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleCreate(payload) {
    try {
      setSubmitting(true);
      setError("");
      const res = await createTask(payload);
      setTasks((prev) => [res.data, ...prev]);
    } catch (err) {
      const apiMsg = err?.response?.data?.message;
      const apiErrors = err?.response?.data?.errors;
      if (apiErrors?.length) setError(`${apiMsg}: ${apiErrors.join(", ")}`);
      else setError(apiMsg || err.message || "Failed to create task");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleStatusChange(id, status) {
    try {
      setError("");
      const res = await updateTask(id, { status });
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to update task");
    }
  }

  async function handleDelete(id) {
    try {
      setError("");
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to delete task");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Task Tracker</h1>
            <p className="mt-2 text-sm text-gray-600">
              React + Tailwind v4 frontend connected to Express + MongoDB API.
            </p>
          </div>
          <button
            onClick={loadTasks}
            className="rounded-lg border bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Refresh
          </button>
        </div>

        {error ? (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {error}
          </div>
        ) : null}

        <div className="mt-6">
          <TaskForm onCreate={handleCreate} isSubmitting={submitting} />
        </div>

        <div className="mt-6">
          <h2 className="text-sm font-semibold text-gray-800">Tasks</h2>

          {loading ? (
            <div className="mt-3 rounded-xl border bg-white p-5 text-sm text-gray-600">
              Loading tasks...
            </div>
          ) : tasks.length === 0 ? (
            <div className="mt-3 rounded-xl border bg-white p-5 text-sm text-gray-600">
              No tasks yet. Add your first task above.
            </div>
          ) : (
            <ul className="mt-3 space-y-3">
              {tasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
