'use client';

import { ChevronDown } from 'lucide-react';

export type SortKey = 'duration' | 'calories' | 'rating';

interface Props {
  value: SortKey;
  onChange: (v: SortKey) => void;
}

export default function SortDropdown({ value, onChange }: Props) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="appearance-none bg-card border border-border rounded-lg pl-3 pr-8 py-2 text-sm text-white/80 focus:outline-none focus:border-accent cursor-pointer"
      >
        <option value="duration">Sort: Duration</option>
        <option value="calories">Sort: Calories</option>
        <option value="rating">Sort: Rating</option>
      </select>
      <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white/50" />
    </div>
  );
}