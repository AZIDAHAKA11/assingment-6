import { notFound } from 'next/navigation';
import {
  Clock,
  Flame,
  Star,
  Dumbbell,
  BarChart3,
  Repeat,
  Timer,
} from 'lucide-react';
import { getWorkout } from '@/lib/api';
import WorkoutDetailActions from '@/components/WorkoutDetailActions';

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkout(id);
  if (!workout) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* LEFT: image */}
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden border border-border bg-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={workout.image}
              alt={workout.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT: info */}
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            {workout.muscleGroups.map((c) => (
              <span
                key={c}
                className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-accent/10 text-accent border border-accent/20"
              >
                {c}
              </span>
            ))}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wide leading-tight">
            {workout.name}
          </h1>
          <p className="mt-3 text-white/60 text-sm sm:text-base">
            {workout.description}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-accent" /> {workout.duration} min
            </span>
            <span className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-accent" /> {workout.caloriesBurned} kcal
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-accent fill-accent" /> {workout.rating}
            </span>
          </div>

          {/* Specs panel */}
          <div className="mt-8 bg-card border border-border rounded-xl overflow-hidden">
            <SpecRow icon={<Dumbbell className="w-4 h-4" />} label="Equipment" value={workout.equipment} />
            <SpecRow icon={<BarChart3 className="w-4 h-4" />} label="Difficulty" value={workout.difficulty} />
            <SpecRow icon={<Repeat className="w-4 h-4" />} label="Sets" value={String(workout.sets)} />
            <SpecRow icon={<Repeat className="w-4 h-4" />} label="Reps" value={workout.reps} />
            <SpecRow icon={<Timer className="w-4 h-4" />} label="Duration" value={`${workout.duration} min`} />
            <SpecRow icon={<Flame className="w-4 h-4" />} label="Calories" value={`${workout.caloriesBurned} kcal`} />
            <SpecRow icon={<Star className="w-4 h-4" />} label="Rating" value={String(workout.rating)} last />
          </div>

          {/* Instructions */}
          {workout.instructions.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-xl font-bold uppercase tracking-wide mb-4">
                Instructions
              </h2>
              <ol className="space-y-3">
                {workout.instructions.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-white/70">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-accent text-black font-bold text-xs flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8">
            <WorkoutDetailActions workout={workout} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecRow({
  icon,
  label,
  value,
  last,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 ${
        last ? '' : 'border-b border-border'
      }`}
    >
      <div className="flex items-center gap-2 text-white/60 text-sm">
        <span className="text-accent">{icon}</span>
        {label}
      </div>
      <span className="text-sm font-semibold text-white">{value}</span>
    </div>
  );
}