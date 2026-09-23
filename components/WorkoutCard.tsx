import Link from 'next/link';
import { Clock, Flame, Star } from 'lucide-react';
import type { Workout } from '@/lib/types';

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group bg-card border border-border rounded-xl overflow-hidden hover:border-accent/60 transition-all"
    >
      <div className="aspect-square overflow-hidden bg-card-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workout.image}
          alt={workout.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {workout.muscleGroups.slice(0, 2).map((c) => (
            <span
              key={c}
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20"
            >
              {c}
            </span>
          ))}
        </div>
        <h3 className="font-display font-bold text-sm uppercase tracking-wide leading-tight">
          {workout.name}
        </h3>
        <p className="text-xs text-white/40 mt-1 truncate">
          {workout.equipment}
        </p>
        <div className="flex items-center gap-3 mt-3 text-xs text-white/60">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-accent" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-accent" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-accent fill-accent" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
