'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dumbbell, Bookmark } from 'lucide-react';
import { useFitLog } from '@/context/FitLogContext';

export default function Navbar() {
    const pathname = usePathname();
    const { plan, saved, hydrated } = useFitLog();

    const links = [
        { href: '/', label: 'Workout' },
        { href: '/my-plan', label: 'My Plan' },
    ];

    const planCount = hydrated ? plan.length : 0;
    const savedCount = hydrated ? saved.length : 0;

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <img src="/logo.png" alt="FitLog" className="h-9 w-auto" />
                    <span className="font-display font-bold tracking-wider text-lg">
                        FIT<span className="text-accent">LOG</span>
                    </span>
                </Link>

                {/* Links (centered on desktop) */}
                <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                    {links.map((l) => {
                        const active =
                            l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
                        return (
                            <Link
                                key={l.href}
                                href={l.href}
                                className={`px-4 py-2 text-sm font-medium uppercase tracking-wide transition-colors ${active
                                    ? 'text-accent border-b-2 border-accent'
                                    : 'text-white/70 hover:text-white'
                                    }`}
                            >
                                {l.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Plan + Saved badges */}
                <div className="flex items-center gap-2">
                    <Link
                        href="/my-plan"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent text-black text-xs font-bold uppercase tracking-wide hover:bg-accent-dark transition"
                    >
                        Plan
                        <span className="bg-black/20 rounded-full w-5 h-5 flex items-center justify-center text-[11px]">
                            {planCount}
                        </span>
                    </Link>
                    <Link
                        href="/my-plan"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/30 text-white text-xs font-bold uppercase tracking-wide hover:border-white transition"
                    >
                        <Bookmark className="w-3 h-3" />
                        Saved
                        <span className="border border-white/40 rounded-full w-5 h-5 flex items-center justify-center text-[11px]">
                            {savedCount}
                        </span>
                    </Link>
                </div>
            </nav>

            {/* Mobile links row */}
            <div className="md:hidden border-t border-border bg-bg">
                <div className="flex justify-center gap-6 py-2">
                    {links.map((l) => {
                        const active =
                            l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
                        return (
                            <Link
                                key={l.href}
                                href={l.href}
                                className={`text-xs font-semibold uppercase tracking-widest ${active ? 'text-accent' : 'text-white/60'
                                    }`}
                            >
                                {l.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </header>
    );
}