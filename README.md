# FitLog — Workout Library

A dark, no-nonsense gym companion built with Next.js and TypeScript. Browse workouts from a live API, add them to today's plan, save them for later, and log your sessions — all persisted locally.

## Technologies Used

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **React Hot Toast** for notifications
- **Lucide Icons**
- **localStorage** for persistence

##  Key Features

1. **Workout Library** — 12 workouts loaded from a live API in a responsive grid, with a sort dropdown (Duration / Calories / Rating).
2. **Workout Details** — Each workout has a full page with image, muscle-group tags, spec table (equipment, difficulty, sets, reps, duration, calories, rating), and numbered instructions.
3. **Today's Plan & Saved** — Add up to 5 lifts to today's plan or save workouts for later. Badges in the navbar show live counts.
4. **My Plan Dashboard** — Tabs for Today's Plan and Saved, live metrics (exercises / minutes / calories), mark-as-done, remove, and empty state.
5. **Persistent & Responsive** — Plan and saved data survive page reloads via localStorage. Fully responsive with a custom 404 page and loading states.