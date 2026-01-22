const statusStyles = {
  todo: "bg-gray-100 text-gray-700",
  doing: "bg-yellow-100 text-yellow-800",
  done: "bg-green-100 text-green-800"
};

export default function TaskItem({ task, onStatusChange, onDelete }) {
  return (
    <li className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold">{task.title}</h3>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[task.status]}`}
            >
              {task.status}
            </span>
          </div>
          {task.description ? (
            <p className="mt-1 text-sm text-gray-600">{task.description}</p>
          ) : null}
          <p className="mt-2 text-xs text-gray-500">
            Created: {new Date(task.createdAt).toLocaleString()}
          </p>
        </div>

        <button
          onClick={() => onDelete(task._id)}
          className="shrink-0 rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
        >
          Delete
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => onStatusChange(task._id, "todo")}
          className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
        >
          Todo
        </button>
        <button
          onClick={() => onStatusChange(task._id, "doing")}
          className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
        >
          Doing
        </button>
        <button
          onClick={() => onStatusChange(task._id, "done")}
          className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
        >
          Done
        </button>
      </div>
    </li>
  );
}
