import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-8xl sm:text-9xl font-bold text-accent">
        404
      </p>
      <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide mt-4">
        Page not found
      </h1>
      <p className="text-white/50 mt-2 max-w-md text-sm">
        The page you&apos;re looking for doesn&apos;t exist. Maybe it skipped leg day.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block px-6 py-3 rounded bg-accent text-black font-bold text-sm uppercase tracking-wide hover:bg-accent-dark transition"
      >
        Back to Workouts
      </Link>
    </div>
  );
}