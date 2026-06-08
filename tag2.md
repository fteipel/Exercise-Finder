# Tag 2 – ExerciseCard verbessert

## Was wurde geändert
- Lade-Spinner während Bilder laden
- Fehler-Fallback wenn Bild nicht lädt
- Gradient-Banner als visueller Ersatz für GIFs
- Farbe des Banners richtet sich nach Equipment (orange = Barbell, blau = Dumbbell, grün = Body Weight usw.)
- Schwierigkeitsgrad (`difficulty`) wird als Tag angezeigt
- `gifUrl` aus den Typen entfernt, da die API kein Bild-Endpoint mehr hat

## Problem
Die ExerciseDB API (Free Plan) liefert keine `gifUrl` mehr. Der CDN-Endpunkt `v2.exercisedb.io/image/{id}` gibt 422 zurück – die IDs im Format `0009` werden vom Server als ungültig abgelehnt. GIFs sind nur im kostenpflichtigen Plan verfügbar.

## Gelernt
Immer zuerst prüfen, was eine API tatsächlich zurückgibt (`curl` oder Browser DevTools), bevor man die Typen definiert. Externe Bild-CDNs können sich ändern oder Zugangsbeschränkungen haben. Ein schöner Fallback ist oft besser als ein kaputtes Bild-Icon.
