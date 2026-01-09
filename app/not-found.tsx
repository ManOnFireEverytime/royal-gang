export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-2">
      <h2 className="text-2xl font-bold">404 - Page Not Found</h2>

      <p>The page you're looking for doesn't exist.</p>

      <a
        href="/"
        className="rounded bg-saddleBrown px-4 py-2 text-white hover:bg-amber-900"
      >
        Return Home
      </a>
    </div>
  );
}
