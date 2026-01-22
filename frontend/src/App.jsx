export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Task Tracker</h1>
        <p className="mt-2 text-sm text-gray-600">
          Mini MERN app (React + Tailwind v4). Backend will connect next.
        </p>

        <div className="mt-6 rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Tailwind is working ✅</span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
              Ready
            </span>
          </div>

          <button className="mt-4 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            Test Button
          </button>
        </div>
      </div>
    </div>
  );
}
