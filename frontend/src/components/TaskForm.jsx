import { useState } from "react";

export default function TaskForm({ onCreate, isSubmitting }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await onCreate({ title, description });
    setTitle("");
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold">Add a task</h2>

      <div className="mt-4 space-y-3">
        <div>
          <label className="text-xs font-medium text-gray-700">Title *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Learn Express CRUD"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10"
            required
            minLength={3}
          />
        </div>

        <div>
          <label className="text-xs font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional..."
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10"
            rows={3}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Adding..." : "Add Task"}
        </button>

        <p className="text-xs text-gray-500">
          Title must be at least 3 characters.
        </p>
      </div>
    </form>
  );
}
