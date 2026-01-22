import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// --- Tasks API ---
export async function fetchTasks() {
  const res = await api.get("/api/tasks");
  return res.data; // { success, message, data }
}

export async function createTask(payload) {
  const res = await api.post("/api/tasks", payload);
  return res.data;
}

export async function updateTask(id, payload) {
  const res = await api.patch(`/api/tasks/${id}`, payload);
  return res.data;
}

export async function deleteTask(id) {
  const res = await api.delete(`/api/tasks/${id}`);
  return res.data;
}
