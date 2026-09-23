import type { Workout } from './types';

const API_BASE = 'https://api.abcz.workers.dev/api/fitlog';

export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_BASE, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch workouts');
  const data: Workout[] = await res.json();
  return data;
}

export async function getWorkout(id: string): Promise<Workout | null> {
  try {
    const res = await fetch(`${API_BASE}/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data: Workout = await res.json();
    return data;
  } catch {
    return null;
  }
}