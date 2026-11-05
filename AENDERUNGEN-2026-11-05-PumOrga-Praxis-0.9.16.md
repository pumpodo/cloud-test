# Prüfung der Gesamt-App und Änderungen 0.9.15 → 0.9.16 (05.11.2026)

Datei: `PumOrga-Praxis-0.9.16-Shopify.html.txt` (ersetzt 0.9.15).

## 1. Was geprüft wurde

Automatisch über alle 24 Dokumente in 4 Praxis-Varianten (leer; alles gewählt mit Team; Einzelpraxis ohne
Befragung; Privatpraxis ohne Kasse, Nagelspange und Hausbesuch):

| Prüfung | Ergebnis |
|---|---|
| Verweise auf Arbeitsanweisungen (AA-xx-yy) zeigen auf eine vorhandene AA | ✓ alle. Nur in der Privatpraxis zeigen „Mitgeltend“-Zeilen auf die entfallenen AA-02-01/-02; die App entfernt sie beim Anzeigen sauber (geprüft, keine leeren oder kaputten Sätze). |
| Verweise auf Anlagen (z. B. „Anlage 10.3“, „Anlage A“) zeigen auf eine vorhandene Anlage | ✓ alle |
| Anlagen-Nummern je Bereich lückenlos | ✓ (Einzelpraxis: 9.1–9.3, 10.1–10.6; mit Team: 9.1–9.4, 10.1–10.7) |
| Verweise „Bereich N …“ passen zum Titel des Bereichs | ✓ |
| AA-Nummern in neuen Tabellen (Maßnahmenplan, Jahresplan) zeigen auf die richtige AA | ✓ |
| Platzhalter, die man im Fragenkatalog gar nicht ausfüllen kann | ✓ keine |
| Fragen im Fragenkatalog, die in keinem Dokument wirken | ✓ keine |
| Gleiche Angabe an mehreren Stellen aus demselben Feld (Ersthelfer, Brandschutzhelfer …) | ✓ |
| Widersprüche bei Fristen (Lagerfrist Sterilgut 6 Monate, Aufbereitung spätestens 6 Std., Verbandbuch 5 Jahre, Datenpanne 72 Std., Masernschutz, Unterweisung jährlich) | ✓ keine |
| JavaScript-Fehler, Seitenzahlen, Inhaltsverzeichnis | ✓ (7 Varianten × ohne/mit Freigabe, Module, Einzelausdrucke) |

Zusätzlich: Matrix „welches Dokument wird von welchem erwähnt“ und Abgleich der Dokumentnamen mit den Überschriften.

## 2. Gefunden und in 0.9.16 behoben

**Fehlende Verknüpfungen**
- **Einwilligung Nagelspange** wurde nirgends erwähnt → AA Nagelspangenbehandlung: neuer Schritt vor der Behandlung
  „Über Ablauf, Risiken, Alternativen und Kosten aufklären; Aufklärung und Einwilligung schriftlich festhalten
  (Formular ‚Einwilligung Nagelspange‘)“.
- **Infoblatt für Patienten** wurde bei der Neuaufnahme nicht erwähnt → AA Aufnahme von Neupatienten:
  „Infoblatt für Patienten aushändigen“.
- **Reinigungs- und Desinfektionsplan** (Aushang) fehlte in der AA Flächendesinfektion → „Weitere Flächen: … (Aushang
  ‚Reinigungs- und Desinfektionsplan‘)“.
- **Bereich 7** verwies nicht auf die **Gefährdungsbeurteilung** → AA Betriebsanweisungen und Unterweisung:
  „Grundlage: Gefährdungsbeurteilung in der Praxisbeurteilung; Hautschutz nach dem Hautschutzplan (Aushang)“.

**Doppelte oder missverständliche Begriffe**
- „Selbstcheck“ hieß sowohl die jährliche Begehung in der Praxisbeurteilung als auch der neue Selbstcheck in Bereich 10.
  → Praxisbeurteilung: Abschnitt heißt jetzt **„Jährliche Begehung (Hygiene und Arbeitsschutz)“**, Untertitel
  „Gefährdungsbeurteilung und jährliche Begehung“, ebenso Beschreibung und Stichwort auf der Startseite.
- QM-Handbuch „Jährliche Bewertung durch die Praxisleitung“ und AA „Jährliche Praxisbewertung“ waren dasselbe →
  einheitlich **„Jährliche Praxisbewertung“**.
- Einzelpraxis: Im QM-Handbuch stand „im Team vorstellen“ → entfällt ohne Team.
- Seitenleiste „Verordnung und Abrechnung“, Überschrift „Heilmittelverordnung und Abrechnung“ → einheitlich
  **„Heilmittelverordnung und Abrechnung“** (nur Anzeige).

**Aufbau**
- Im Gesamtausdruck stand das QM-Handbuch (Leitbild, Ziele, Zuständigkeiten) erst hinter den Arbeitsanweisungen.
  Neue Reihenfolge: Praxisbeurteilung → **QM-Handbuch** → Hygieneplan → Aushänge → Arbeitsanweisungen 1–10 →
  Patientenunterlagen → Formulare → Datenschutz → Fortbildungsnachweis → Fragenkatalog → Prüf- und Freigabeliste.
  Nur Reihenfolge, keine Auswirkung auf Freigaben.

## 3. Freigaben

Gegenüber dem Stand vor 0.9.13 (0.9.12) müssen neu freigegeben werden:
**Bereich 1, 4, 5, 7, 9, 10, Praxisbeurteilung, QM-Handbuch.**
(Gegenüber 0.9.15 neu hinzugekommen: Bereich 1, 4, 5, 7 – wegen der neuen Verknüpfungen.)
Alle anderen Dokumente behalten ihre Freigabe.

## 4. Hinweise ohne Änderung (zur Entscheidung)

- **Hygieneplan – doppelte Eingaben:** Im Kapitel „Blutkontakt, Stichverletzung …“ stehen Ausfüllzeilen „Interne
  Kontaktperson“, „Erste-Hilfe-Standort“ und das Freitextfeld „Notfallkontakte“, obwohl Ersthelfer/in und Standort
  Verbandkasten im Fragenkatalog (Bereich 7) schon erfasst sind. Ebenso hat die Tabelle „Aufgaben und
  Verantwortlichkeiten“ im Hygieneplan eigene leere Felder neben den Zuständigkeiten im QM-Handbuch. Eine Verknüpfung
  würde den Hygieneplan ändern (neue Freigabe) und ihn von PumOrga Hygiene abweichen lassen – daher nicht ohne
  Rücksprache geändert.
- **Fortbildungsnachweis** verweist nicht auf die Qualifikationsmatrix (umgekehrt schon). Eine Ergänzung würde eine
  neue Freigabe des Fortbildungsnachweises auslösen.
- **AA Erste Hilfe und Verbandbuch** sagt „Ersthelfer-Ausbildung regelmäßig auffrischen“, die Qualifikationsmatrix
  nennt „alle 2 Jahre“. Kein Widerspruch, könnte aber in Bereich 7 konkretisiert werden.
- Formular-Überschrift „Aufklärung und Einwilligung“ (Seitenleiste: „Einwilligung Nagelspange“) nennt die
  Nagelspange nicht; eine Änderung der Überschrift würde eine neue Freigabe auslösen.

## 5. Tests 0.9.16

- 7 Varianten × ohne/mit Freigabe: 14 Gesamtausdrucke (154–163 Blätter), alle Seitenzahlen und Verzeichniseinträge
  korrekt, keine JavaScript-Fehler, AA-Nummern lückenlos, nach Freigabe keine Entwurfstexte.
- Module, Einzelausdrucke, Unterschriftsmodus, Vollbild-Knopf geprüft.
- Nicht getestet: Safari, iPhone/iPad, Firefox, echtes Shopify-Theme.
