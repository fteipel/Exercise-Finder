# Tag 5 – Mobile Optimierung

## Was wurde geändert
- Körperteil-Buttons scrollen horizontal statt umzubrechen (`overflow-x-auto`, `shrink-0`)
- Scrollbar auf Mobile ausgeblendet (`.scrollbar-hide` in `globals.css`)
- `min-h-[44px]` für alle Buttons – Apple und Google empfehlen 44px als Mindestgröße für Touch-Targets
- Seitenabstand auf Mobile reduziert (`py-6` statt `py-12`)
- Überschrift auf Mobile kleiner (`text-3xl` statt `text-4xl`)
- Suchfeld volle Breite auf Mobile, ✕-Button mit 44px Touch-Target
- Grid-Abstände auf Mobile kleiner (`gap-4` statt `gap-6`)

## Problem
Auf kleinen Bildschirmen brachen die Buttons in mehrere Zeilen um und waren schwer zu tippen. Das `scrollbar-hide`-Utility von Tailwind benötigt normalerweise ein Plugin – stattdessen direkt per CSS gelöst.

## Gelernt
Touch-Targets kleiner als 44px führen zu Fehlklicks. Horizontales Scrollen ist auf Mobile oft besser als Umbrüche, solange der Nutzer sieht, dass es weitergeht. Responsive Design beginnt beim Layout, nicht nur bei der Schriftgröße.
