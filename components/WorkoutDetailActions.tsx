'use client';

import { Plus, Bookmark, Check, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useFitLog } from '@/context/FitLogContext';
import type { Workout } from '@/lib/types';

export default function WorkoutDetailActions({
  workout,
}: {
  workout: Workout;
}) {
  const {
    addToPlan,
    saveForLater,
    isInPlan,
    isInSaved,
    plan,
    hydrated,
  } = useFitLog();

  const inPlan = isInPlan(workout.id);
  const inSaved = isInSaved(workout.id);
  const planFull = plan.length >= 5;

  if (!hydrated) {
    return (
      <div className="flex items-center gap-3 text-white/40 text-sm">
        <Loader2 className="w-4 h-4 animate-spin" /> Loading…
      </div>
    );
  }

  const handleAdd = () => {
    if (inPlan) {
      toast.error('Already in your plan');
      return;
    }
    if (planFull) {
      toast.error('Plan is full (max 5 lifts)');
      return;
    }
    addToPlan(workout);
    toast.success("Added to today's plan");
  };

  const handleSave = () => {
    if (inSaved) {
      toast.error('Already saved');
      return;
    }
    saveForLater(workout);
    toast.success('Saved for later');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={handleAdd}
        className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wide transition ${
          inPlan
            ? 'bg-accent/20 text-accent border border-accent/40 hover:bg-accent/30 cursor-pointer'
            : planFull
            ? 'bg-white/10 text-white/40 hover:bg-white/20 cursor-pointer'
            : 'bg-accent text-black hover:bg-accent-dark'
        }`}
      >
        {inPlan ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        {inPlan
          ? 'Already in Plan'
          : planFull
          ? 'Plan Full'
          : "Add to Today's Plan"}
      </button>

      <button
        onClick={handleSave}
        className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wide border transition ${
          inSaved
            ? 'border-accent/40 text-accent hover:bg-accent/5 cursor-pointer'
            : 'border-white/20 text-white hover:border-white'
        }`}
      >
        {inSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
        {inSaved ? 'Already Saved' : 'Save for Later'}
      </button>
    </div>
  );
}