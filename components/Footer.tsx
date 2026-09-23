import { Dumbbell } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-accent flex items-center justify-center">
            <Dumbbell className="w-4 h-4 text-black" strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold tracking-wider">
            FIT<span className="text-accent">LOG</span>
          </span>
        </div>

        {/* Copyright */}
        <p className="text-sm text-white/40 text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}