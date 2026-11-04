# Änderungen vom 04.11.2026: PumOrga Praxis 0.9.13 → 0.9.14

Erste Bausteine aus der ISO-9001-Lückenanalyse (ohne Normtext): **Maßnahmenplan** und **Qualifikationsmatrix**.
Datei: `PumOrga-Praxis-0.9.14-Shopify.html.txt`.

**Freigaben:** Geändert sind nur die Inhalte von **Bereich 9** und **Bereich 10**. Deren Freigabe wird aufgehoben und
muss nach der Prüfung neu erteilt werden. Alle anderen Dokumente behalten ihre Prüfsumme und Freigabe.

## Bereich 9: Personal und Organisation

- **Neu: AA „Qualifikationen und Fortbildungen planen“** (Anzeige AA-09-03, die folgenden AAs rücken eine Nummer weiter):
  - Tabelle „Welche Qualifikationen“ mit Wer und Auffrischung: Berufserlaubnis, jährliche Unterweisung, Datenschutz,
    Geräteeinweisung, Ersthelfer/in (alle 2 Jahre), Brandschutzhelfer/in (empfohlen alle 3–5 Jahre),
    Sachkunde Aufbereitung (nur bei Mehrweginstrumenten), Nagelspangen-Fortbildung 8 UE (nur bei Kasse + Nagelspange).
  - Ablauf: Matrix führen, Nachweise in der Personalakte, ohne gültigen Nachweis nicht oder nur unter Aufsicht,
    vierteljährlich auf Ablauf prüfen und Schulung als Maßnahme in den Maßnahmenplan, GKV-Punkte im Fortbildungsnachweis.
- **Neu: Anlage 9.3 „Qualifikationsmatrix“**: Zeilen = Team aus dem Praxisprofil (plus 2 Leerzeilen; Einzelpraxis:
  Praxisleitung; ohne Teamangabe 6 Leerzeilen), Spalten = Qualifikationen. Eintrag je Zelle: Datum bzw. „gültig bis“,
  „–“ = nicht erforderlich. Zeilen „Stand“ und „Geprüft von“.
- AA Einarbeitung: neuer Schritt „Qualifikationsnachweise in die Qualifikationsmatrix (Anlage 9.3) eintragen“,
  Checkliste 9.1 um „Qualifikationsnachweise erfasst“ ergänzt.
- AA Teambesprechungen: feste Punkte jetzt „offene Maßnahmen aus dem Maßnahmenplan“ und „ablaufende Qualifikationen“;
  Verbesserungen werden in den Maßnahmenplan übernommen.

## Bereich 10: Beschwerden und Qualität

- **Neu: AA „Maßnahmenplan führen“** (Anzeige AA-10-03, die folgenden AAs rücken eine Nummer weiter):
  - Quellen mit Kürzel: B Beschwerde, F Fehler, T Teambesprechung (nicht in der Einzelpraxis), P Patientenbefragung
    (nur wenn gewählt), S Begehung / Gefährdungsbeurteilung, D Durchsicht der AAs, Q Qualifikation, J Jahresbewertung,
    E extern (Behörden, Prüfungen, Wartungen).
  - Ablauf: eintragen mit Nummer, Quelle, wer, bis; konkret formulieren; offene Maßnahmen in jeder Teambesprechung
    (Einzelpraxis: monatlich) durchgehen; abhaken; nach etwa 3 Monaten Wirksamkeit prüfen; jährlich für die
    Jahresbewertung auswerten. Keine Patientennamen.
- **Neu: Anlage 10.3 „Maßnahmenplan“** (14 Zeilen; Spalten Nr., Quelle, Maßnahme, wer, bis, erledigt am,
  wirksam? geprüft am). Der Patientenfragebogen ist jetzt **Anlage 10.4**.
- Beschwerden, Fehler und Patientenbefragung verweisen auf den Maßnahmenplan.
- Beschwerdebogen 10.1: „Im Team besprochen am“, „Maßnahme (Nr. im Maßnahmenplan)“, „Abgeschlossen am“.
- Fehlerbogen 10.2: „Maßnahme (Nr. im Maßnahmenplan)“.

## Technisch

- `APP_VERSION` 0.9.14. Neue Funktionen `qualList()` und `qualMatrix()`.
- Verweise auf AA-Nummern laufen weiter über `fixAA()`; die Anzeige ist lückenlos (geprüft).

## Tests

- 5 Praxis-Varianten ohne und mit Freigabe (10 Gesamtausdrucke, 145 bis 152 Blätter): alle Seitenzahlen und alle
  131 bis 134 Verzeichniseinträge stimmen, keine JavaScript-Fehler, AA-Nummern lückenlos.
- Prüfsummen gegenüber 0.9.12/0.9.13: nur Bereich 9 und 10 geändert (sowie die Prüf- und Freigabeliste, die keine
  Freigabe hat).
- Module, Einzelausdrucke, Unterschriftsmodus und Vollbild-Knopf erneut geprüft.

## Nicht geändert (bewusst, damit deren Freigabe erhalten bleibt)

- Praxisbeurteilung (Begehung, Spalte „Maßnahme / bis wann“) und QM-Handbuch (jährliche Bewertung) verweisen noch
  nicht auf den Maßnahmenplan. Das kommt mit dem Baustein „Jährliche Praxisbewertung / Jahresplan“.
