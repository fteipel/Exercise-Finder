# Tag 4 – Suchfunktion

## Was wurde geändert
- Suchfeld unter der Überschrift, filtert gleichzeitig nach Name, Zielmuskel und Equipment
- Filterlogik mit `useMemo` – wird nur neu berechnet wenn sich `exercises` oder `query` ändert
- Zähler zeigt `8 / 10 Übungen` an
- ✕-Button leert das Suchfeld mit einem Klick
- Suchfeld wird beim Wechsel des Körperbereichs automatisch zurückgesetzt
- Leerer-Zustand-Hinweis wenn keine Übung zum Suchbegriff passt

## Problem
Das Suchfeld sollte erst erscheinen, wenn Übungen geladen sind – sonst wirkt es verwirrend. Außerdem musste die Suchzeile auf kleinen Bildschirmen anders angeordnet werden als auf Desktop.

## Gelernt
`useMemo` verhindert unnötige Neuberechnungen beim Tippen. Clientseitiges Filtern ist für kleine Datensätze (20 Einträge) völlig ausreichend und reagiert sofort – kein API-Call nötig.
