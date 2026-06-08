# Tag 7 – Favoriten-Funktion

## Was wurde geändert
- `useFavorites`-Hook in `app/hooks/useFavorites.ts` – liest und schreibt in `localStorage`
- Herz-Button (🤍 / ❤️) oben rechts auf jedem Karten-Banner
- Tab-Leiste mit „🔍 Übungen" und „❤️ Favoriten"
- Badge-Zähler im Favoriten-Tab zeigt die Anzahl gespeicherter Übungen
- Favoriten-Tab zeigt alle gespeicherten Übungen im selben Grid
- Entfernen funktioniert direkt aus dem Favoriten-Tab
- Favoriten bleiben nach Seitenreload erhalten

## Problem
`localStorage` ist nur im Browser verfügbar – auf dem Server (Next.js SSR) würde ein direkter Zugriff beim Laden crashen. Lösung: Den Zustand erst in `useEffect` aus `localStorage` laden, damit er nur clientseitig ausgeführt wird.

## Gelernt
Custom Hooks (`useFavorites`) halten die Logik sauber und wiederverwendbar. Bei Next.js immer aufpassen: Code der `window` oder `localStorage` nutzt, darf nur im Client laufen – deshalb `useEffect` verwenden.
