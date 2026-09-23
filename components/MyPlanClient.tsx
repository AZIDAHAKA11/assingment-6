'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Clock,
  Flame,
  Star,
  Eye,
  Check,
  X,
  Loader2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useFitLog } from '@/context/FitLogContext';
import SortDropdown, { type SortKey } from './SortDropdown';
import type { Workout } from '@/lib/types';

type Tab = 'plan' | 'saved';

export default function MyPlanClient() {
  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
    markDone,
    isDone,
    hydrated,
  } = useFitLog();
  const [tab, setTab] = useState<Tab>('plan');
  const [sort, setSort] = useState<SortKey>('duration');

  if (!hydrated) {
    return (
      <div className="flex flex-col items-center py-32">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
        <p className="mt-4 text-sm text-white/50">Loading workouts…</p>
      </div>
    );
  }

  const list: Workout[] = tab === 'plan' ? plan : saved;

  // Sort every render — no memo, always fresh
  const sorted = [...list].sort((a, b) => {
    if (sort === 'duration') return a.duration - b.duration;
    if (sort === 'calories') return b.caloriesBurned - a.caloriesBurned;
    return b.rating - a.rating;
  });

  const totalExercises = plan.length;
  const totalMinutes = plan.reduce((s, w) => s + w.duration, 0);
  const totalCalories = plan.reduce((s, w) => s + w.caloriesBurned, 0);

  const handleRemove = (id: number, from: Tab) => {
    if (from === 'plan') removeFromPlan(id);
    else removeFromSaved(id);
    toast.success('Removed');
  };

  const handleDone = (id: number) => {
    if (isDone(id)) {
      toast.error('Already marked done');
      return;
    }
    markDone(id);
    toast.success('Marked as done');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Title */}
      <div className="mb-8">
        <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-wide">
          My Plan
        </h1>
        <p className="text-white/50 mt-2 text-sm">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
        <Metric label="Exercises" value={totalExercises} />
        <Metric label="Minutes" value={totalMinutes} />
        <Metric label="Calories" value={totalCalories} />
      </div>

      {/* Tabs + Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border mb-6">
        <div className="flex gap-2">
          <TabBtn active={tab === 'plan'} onClick={() => setTab('plan')}>
            Today&apos;s Plan
          </TabBtn>
          <TabBtn active={tab === 'saved'} onClick={() => setTab('saved')}>
            Saved
          </TabBtn>
        </div>
        {list.length > 0 && <SortDropdown value={sort} onChange={setSort} />}
      </div>

      {/* List */}
      {list.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3">
          {sorted.map((w) => (
            <PlanCard
              key={w.id}
              workout={w}
              done={isDone(w.id)}
              onRemove={() => handleRemove(w.id, tab)}
              onDone={() => handleDone(w.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Small helper components ---------- */

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 text-center">
      <p className="font-display text-3xl sm:text-4xl font-bold">{value}</p>
      <p className="text-xs uppercase tracking-widest text-white/40 mt-1">
        {label}
      </p>
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 text-sm font-bold uppercase tracking-wide -mb-px border-b-2 transition ${
        active
          ? 'border-accent text-accent'
          : 'border-transparent text-white/50 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}

function PlanCard({
  workout,
  done,
  onRemove,
  onDone,
}: {
  workout: Workout;
  done: boolean;
  onRemove: () => void;
  onDone: () => void;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row gap-4">
      <div className="w-full sm:w-24 sm:h-24 aspect-square sm:aspect-auto rounded-lg overflow-hidden bg-card-2 shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workout.image}
          alt={workout.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3
          className={`font-display font-bold uppercase tracking-wide text-sm ${
            done ? 'line-through text-white/40' : ''
          }`}
        >
          {workout.name}
        </h3>
        <p className="text-xs text-white/40 mt-0.5 truncate">
          {workout.equipment}
        </p>
        <div className="flex items-center gap-3 mt-2 text-xs text-white/60">
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

        <div className="flex flex-wrap gap-2 mt-3">
          <Link
            href={`/workouts/${workout.id}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wide bg-white/5 border border-white/10 hover:border-white/40 transition"
          >
            <Eye className="w-3.5 h-3.5" /> View Details
          </Link>

          <button
            onClick={onDone}
            disabled={done}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wide border transition ${
              done
                ? 'border-accent/40 text-accent cursor-not-allowed'
                : 'border-white/10 bg-white/5 hover:border-accent hover:text-accent'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            {done ? 'Done' : 'Mark as Done'}
          </button>

          <button
            onClick={onRemove}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wide bg-white/5 border border-white/10 hover:border-red-500 hover:text-red-400 transition"
          >
            <X className="w-3.5 h-3.5" /> Remove
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-card border border-dashed border-border rounded-2xl py-20 text-center">
      <p className="font-display text-2xl uppercase tracking-wide text-white/60">
        Nothing here yet
      </p>
      <p className="text-sm text-white/40 mt-2 max-w-sm mx-auto">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="inline-block mt-6 px-5 py-2.5 rounded bg-accent text-black font-bold text-xs uppercase tracking-wide hover:bg-accent-dark transition"
      >
        Go to workouts
      </Link>
    </div>
  );
}