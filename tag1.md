# Tag 1 – Projekt initialisiert

## Was wurde geändert
- Next.js-Projekt mit TypeScript und Tailwind CSS erstellt
- ExerciseDB API von RapidAPI eingebunden
- API-Key wird aus `.env.local` gelesen (`NEXT_PUBLIC_RAPIDAPI_KEY`)
- Komponenten erstellt: `BodyPartSelector`, `ExerciseCard`, `ExerciseGrid`
- Körperbereiche werden dynamisch von der API geladen
- Klick auf einen Bereich zeigt bis zu 20 passende Übungen

## Problem
Der API-Key darf nicht direkt im Code stehen, sonst landet er im Git-Repository und ist öffentlich sichtbar.

## Gelernt
Umgebungsvariablen in `.env.local` speichern und die Datei in `.gitignore` eintragen. In Next.js müssen clientseitige Variablen mit `NEXT_PUBLIC_` beginnen.
