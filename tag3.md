# Tag 3 – Deutsche Übersetzung der Körperteil-Namen

## Was wurde geändert
- `BODY_PART_DE`-Mapping in `BodyPartSelector.tsx` angelegt (back → Rücken, chest → Brust usw.)
- Mapping als `export` bereitgestellt, damit es auch auf der Hauptseite verwendet werden kann
- Überschrift nach dem Klick auf einen Körperbereich zeigt ebenfalls den deutschen Namen
- `capitalize`-Klasse aus dem Button entfernt, da deutsche Namen bereits korrekt geschrieben sind

## Problem
Die API liefert die Körperteile auf Englisch. Die englischen Begriffe direkt anzuzeigen wäre für deutsche Nutzer ungewohnt. Ein einfaches Mapping-Objekt ist die sauberste Lösung – keine externe Übersetzungsbibliothek nötig.

## Gelernt
Für kleine, feste Übersetzungen reicht ein `Record<string, string>`-Objekt völlig aus. Übersetzungs-Libraries (i18n) lohnen sich erst bei größeren Projekten mit vielen Sprachen.
