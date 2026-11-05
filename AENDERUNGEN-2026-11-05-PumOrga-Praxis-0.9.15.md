# Änderungen vom 05.11.2026: PumOrga Praxis 0.9.14 → 0.9.15

Restliche Bausteine aus der ISO-9001-Lückenanalyse (ohne Normtext). Datei: `PumOrga-Praxis-0.9.15-Shopify.html.txt`.
**0.9.15 ersetzt 0.9.14.** Bitte 0.9.14 nicht einspielen: Dort konnte die Seitenzählung bei Tabellen mit festen
Spaltenbreiten (Qualifikationsmatrix, Maßnahmenplan) um ein Blatt danebenliegen.

**Freigaben:** Neu freigegeben werden müssen **Bereich 9**, **Bereich 10**, **Praxisbeurteilung** und **QM-Handbuch**.
Alle anderen Dokumente behalten Prüfsumme und Freigabe. Bei der neuen Freigabe zeigen die geänderten Dokumente
automatisch **Version 2.0** (siehe Versionszähler).

## Bereich 10: Beschwerden und Qualität

Reihenfolge jetzt: Beschwerden · Fehler · Maßnahmenplan · **Selbstcheck der Bereiche** · Pflege der Arbeitsanweisungen
und Dokumente · Patientenbefragung (falls gewählt) · **Jährliche Praxisbewertung**.

- **Neu: AA „Selbstcheck der Bereiche“**: jeder Bereich einmal im Jahr, verteilt über die Quartale; beobachten,
  Stichproben, mit dem Team sprechen; „teilweise“/„nein“ → Maßnahmenplan; „Geprüft werden Abläufe, nicht Personen.“
- **Neu: AA „Jährliche Praxisbewertung“** (Kreis aus Planen, Umsetzen, Prüfen, Verbessern): Unterlagen des Jahres
  zusammentragen, bewerten, 3–5 messbare Ziele, Maßnahmen und Jahresplan fürs neue Jahr, Protokoll. Termin aus dem
  neuen Feld im Fragenkatalog „Jährliche Praxisbewertung im Monat“.
- **AA „Pflege der Arbeitsanweisungen und Dokumente“** (vorher „… Arbeitsanweisungen“): Die App zählt die Version bei
  der Freigabe hoch (statt „Version und Datum anpassen“); neuer Abschnitt „Dokumentenverzeichnis“; jährliche
  Durchsicht umfasst auch Dokumentenverzeichnis und Rechtsregister.
- **Neue Anlagen:** 10.4 Selbstcheck je Bereich (3–6 Fragen je Bereich, aus den Arbeitsanweisungen abgeleitet;
  Fragen zu nicht gewählten AAs, z. B. Hausbesuch oder Nagelspange, entfallen automatisch; jeder Block bleibt auf
  einem Blatt) · 10.5 Jahresplan Qualität · 10.6 Protokoll der jährlichen Praxisbewertung.
  Der Patientenfragebogen ist jetzt **Anlage 10.7**.
- Maßnahmenplan: Quellen S = Selbstcheck / Begehung, J = Jährliche Praxisbewertung.

## Bereich 9: Personal und Organisation

- **Neu: AA „Ausscheiden von Mitarbeitenden“** (nicht in der Einzelpraxis) mit **Anlage 9.4 Austritts-Checkliste**:
  Übergabe, Schlüssel, Zugänge sperren und Passwörter ändern, Schweigepflicht, Teamliste / Zuständigkeiten /
  Notrufliste / Qualifikationsmatrix aktualisieren, Nachfolge Ersthilfe und Brandschutz.
- AA „Qualifikationen und Fortbildungen planen“: jährliches **Mitarbeitergespräch** (Rückblick, Wünsche,
  Fortbildungsbedarf).

## Praxisbeurteilung und QM-Handbuch

- Praxisbeurteilung: offene Maßnahmen in den Maßnahmenplan; Spalte der Begehung heißt
  „Maßnahme Nr. (Maßnahmenplan)“.
- QM-Handbuch, Qualitätsziele: Ohne Patientenbefragung lautet das dritte Beispielziel „Beschwerden pro Quartal,
  höchstens 2“ statt „Weiterempfehlung über 90 %“.
- QM-Handbuch, Jährliche Bewertung: bezieht Selbstchecks, Maßnahmenplan und Qualifikationsmatrix ein und verweist auf
  die AA „Jährliche Praxisbewertung“; neue Kennzahlen „Maßnahmen im Maßnahmenplan (erledigt / offen)“,
  „Selbstchecks durchgeführt“, „Abgelaufene Qualifikationsnachweise“; Kennzahl zur Befragung nur, wenn gewählt.

## Dokumentenverzeichnis und Versionszähler

- Die **Prüf- und Freigabeliste** enthält jetzt das **Dokumentenverzeichnis**: Dokument, Version, offene Angaben,
  freigegeben von / am, nächste Prüfung (ein Jahr nach der Freigabe). Dazu die Tabelle **„Weitere Unterlagen (nicht
  aus der App)“** mit Ablageort, verantwortlich, geprüft am (Gebrauchsanweisungen, Sicherheitsdatenblätter,
  Bestandsverzeichnis, Prüfnachweise, Verträge, Personalunterlagen, Nachweise, Ordner Qualität).
- **Versionszähler:** Jede neue Freigabe eines geänderten Dokuments erhöht die Version (1.0 → 2.0 …). Angezeigt im
  Kopf jeder AA, auf dem Deckblatt und in den Fußzeilen des Hygieneplans sowie im Dokumentenverzeichnis.
  Rücknahme und unveränderte Neufreigabe behalten die Version. Bestehende Freigaben aus 0.9.12–0.9.14 zählen als 1.0.
  Nur Darstellung: Die Prüfsummen hängen nicht von der Version ab.

## Technisch

- `APP_VERSION` 0.9.15. Neue Funktionen `selfCheckHtml()`, `addYear()`, `relEntry()`, `docVer()`, `verTexts()`.
  Freigabe-Einträge speichern zusätzlich `v` (Version); bei Rücknahme bleibt `{v, lastHash}` erhalten.
- Seitenmessung (`paginate()`): `<col>`-Elemente werden übersprungen (sie melden die Höhe der ganzen Tabelle);
  Überlaufgrenze von 0,5 px auf 0,05 px verkleinert (eine Ausfüllzeile ragte 0,1 mm über den Rand).

## Tests

- 7 Praxis-Varianten (leer; Hessen alles; Bayern nur Einweg; NRW; Sachsen langer Name; **Einzelpraxis Berlin ohne
  Befragung**; **großes Team mit 8 Personen**), jeweils ohne und mit Freigabe: 14 Gesamtausdrucke mit 154 bis 163
  Blättern. Alle Seitenzahlen, alle 133 bis 137 Verzeichniseinträge, AA-Nummern lückenlos, keine JavaScript-Fehler.
- Prüfsummen gegenüber 0.9.12: geändert nur Bereich 9, Bereich 10, Praxisbeurteilung, QM-Handbuch (dazu Prüfliste
  und Fragenkatalog, die keine Freigabe haben).
- Versionszähler: alte Freigabe → 1.0; Änderung → Entwurf 2.0; Neufreigabe → 2.0; Rücknahme + unverändert → 2.0;
  Rücknahme + Änderung → 3.0.
- Module, Einzelausdrucke, Unterschriftsmodus, neues Fragenkatalog-Feld und Vollbild-Knopf geprüft.
- Nicht getestet: Safari, iPhone/iPad, Firefox, echtes Shopify-Theme.
