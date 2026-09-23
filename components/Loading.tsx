export default function Loading({
  label = 'Loading workouts…',
}: {
  label?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="w-12 h-12 border-4 border-white/10 border-t-accent rounded-full animate-spin" />
      <p className="mt-4 text-sm text-white/50">{label}</p>
    </div>
  );
}