# Tag 6 – Dark Mode

## Was wurde geändert
- `dark:`-Varianten in allen Komponenten ergänzt: `page.tsx`, `ExerciseCard`, `ExerciseGrid`, `BodyPartSelector`
- Hintergrund: Dunkelblau-Gradient (`slate-900 → indigo-950`)
- Karten: `slate-800` mit hellen Texten
- Buttons: `slate-800` Hintergrund, hellgrauer Text
- Skeleton-Loader: `slate-700` statt hellgrau
- Tags mit dunklen Varianten (`indigo-900`, `emerald-900`, `amber-900`)
- Suchfeld mit dunklem Hintergrund und hellem Placeholder

## Problem
Tailwind v4 aktiviert Dark Mode automatisch über `prefers-color-scheme` – kein manueller Toggle nötig, aber auch keine manuelle Umschaltmöglichkeit. Jede Klasse musste einzeln mit einer `dark:`-Variante versehen werden.

## Gelernt
Dark Mode mit Tailwind ist systematische Arbeit: jede Hintergrund-, Text- und Randfarbe braucht eine dunkle Variante. Am besten Komponente für Komponente durchgehen. Der Dark Mode folgt der Systemeinstellung des Nutzers – das ist meistens das richtige Verhalten.
