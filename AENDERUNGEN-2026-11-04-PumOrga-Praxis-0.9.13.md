# Änderungen vom 04.11.2026: PumOrga Praxis 0.9.12 → 0.9.13

Übernahme der Änderungsliste von PumOrga Hygiene 0.9.13 in die Haupt-App.
Datei: `PumOrga-Praxis-0.9.13-Shopify.html.txt` (ersetzt den Shopify-Code von 0.9.12).

**Grundprinzip wie in der Hygiene-App:** Alle Änderungen wirken nur auf die Darstellung (`docHtml()`).
`docHtmlRaw()` ist unverändert. Die Prüfsummen (`docHash`) sind für alle 24 Dokumente identisch mit 0.9.12,
**bestehende Freigaben bleiben also gültig.**

## Übernommen (Punkte der Hygiene-Liste)

| Nr. | Thema | Stand |
|---|---|---|
| 1 | Tabellen ohne Schreibstriche (`td.wl`) | übernommen |
| 2 | Ausfüllfelder je Zeile (`fillLines()`), auch die Unterschriftszeilen im Hinweiskasten | übernommen |
| 3 | Alte leere Tabelle „Instrumentengruppe · Kontaktart …“ entfernt | übernommen |
| 4 | Umnummerierung der Bereiche | **entfällt** (alle 10 Bereiche enthalten, AA-Nummern lückenlos) |
| 5 | Seitenzahlen = gedruckte Blätter (`paginate()`), Fußzeile „Seite X von Y“ | übernommen, Messung verbessert (s. u.) |
| 6 | Gemeinsames Inhaltsverzeichnis bei „Alles drucken“ | übernommen, als eigenes erstes Blatt (s. u.) |
| 7 | Texte nach der Freigabe (`relTexts()`) | übernommen |
| 8 | Hinweiskasten: „PumOrga Praxis“ statt „Vorlage PumOrga Praxis“, Satz zur Rechtsberatung entfernt | übernommen |
| 9 | Vollbild-Knopf (grün, „⛶ Vollbild“ / „✕ Vollbild beenden“, Esc auch mit Fokus in der App, Ersatz-Overlay, im Druck ausgeblendet) | übernommen, ersetzt den bisherigen Knopf „Vollbildansicht“ |
| 11 | Verweis auf „Klärung mit dem Gesundheitsamt“ entfällt ohne Bundesland | übernommen |
| 12 | `APP_VERSION` 0.9.13, Kommentarzeile angepasst | übernommen |

## Abweichungen von der Hygiene-App

1. **Inhaltsverzeichnis als eigenes erstes Blatt.** In der Haupt-App beginnt der Gesamtausdruck mit der
   Praxisbeurteilung, der Hygieneplan folgt erst danach. Deshalb steht das Gesamtverzeichnis
   („Inhaltsverzeichnis · Gesamtausdruck“) als eigenes Blatt ganz vorn. Es erscheint bei „Alles drucken“, wenn mehr
   als 3 Dokumente gedruckt werden (Gesamtkonzept, Hygieneplan, Arbeitsanweisungen, Formulare & Aushänge).
   Die Kapitelübersicht im Hygieneplan bleibt erhalten und zeigt jetzt die echten Seitenzahlen.
   Gruppen: Grundlage, Hygieneplan, Anlagen zum Hygieneplan, Aushänge, Arbeitsanweisungen (je Bereich und AA),
   Qualitätsmanagement, Patienten, Datenschutz, Personal, Formulare, Arbeitshilfen.
2. **Genauere Seitenmessung.** Die einfache Höhenmessung lag in der Haupt-App (140+ Blätter, lange Formulare) bei
   4 von 10 Testausdrucken um 1 Blatt daneben. `paginate()` bildet jetzt den Seitenumbruch des Browsers nach:
   Textzeilen und Tabellenzeilen werden nicht geteilt, Kästen wandern mit ihrem Innenabstand auf die neue Seite,
   wiederholte Tabellenköpfe zählen mit, Überschriften bleiben beim folgenden Text, mindestens 2 Zeilen eines
   Absatzes bleiben zusammen. Verweise auf eine AA, die mitten in einer Einheit beginnt (z. B. AA-02-01 nach
   „Wichtige Grundlagen“), zeigen aufs richtige Blatt.
3. **Fußzeile „Seite X von Y“ in den Arbeitsanweisungen:** keine doppelte Fußzeile, wenn „Wichtige Grundlagen“ und
   die erste AA auf demselben Blatt beginnen.
4. Im Inhaltsverzeichnis steht der Bereichstitel aus dem Dokument (z. B. „Heilmittelverordnung und Abrechnung“).
5. **Zusätzliche Entwurfstexte der Haupt-App (zu Punkt 7):**
   - Praxisbeurteilung, Fußzeile „Arbeitsentwurf · Gefährdungsbeurteilung mit Betriebsarzt / Fachkraft für
     Arbeitssicherheit abstimmen“ wird nach der Freigabe zu „In Kraft seit DATUM · freigegeben von NAME“.
   - Datenschutz, oranger Kasten „Arbeitsentwurf. Datenschutztexte bitte vor Verwendung prüfen lassen …“
     entfällt nach der Freigabe.

## Fehleranalyse

- 5 Praxis-Varianten (leer; Hessen Mehrweg + Sterilisator + alles angekreuzt; Bayern nur Einweg; NRW Einweg und
  Mehrweg; Sachsen Mehrweg ohne Sterilisator mit langem Praxisnamen), jeweils ohne und mit Freigabe:
  10 Gesamtausdrucke mit 142 bis 149 Blättern (Chrome-PDF). Ergebnis:
  - jede gedruckte Seitenzahl entspricht dem tatsächlichen Blatt, die Gesamtzahl stimmt,
  - alle 129 bis 132 Einträge im Inhaltsverzeichnis zeigen auf das Blatt mit dem richtigen Titel,
  - Prüfsummen identisch mit 0.9.12, keine JavaScript-Fehler, AA-Nummern lückenlos,
  - nach der Freigabe keine Entwurfstexte mehr. Übrig bleiben nur gewollte Linien: „geprüft“, Vertretung,
    D-Arzt-Datum sowie die Felder in Patientenformularen (Behandlungsvertrag, Anamnesebogen, Einwilligung
    Nagelspange), die pro Patient von Hand ausgefüllt werden.
- Zusätzlich geprüft: Module Arbeitsanweisungen, Hygieneplan, Behandlungsvertrag, Formulare, QM-Handbuch sowie
  Einzelausdrucke (Hygieneplan, Bereich 9, Bereich 10, Behandlungsvertrag, QM-Handbuch, Hautschutzplan):
  alle Seitenzahlen richtig. Unterschriftsmodus (Vertrag, Anamnese, Nagelspange) ohne Fehler.
- Vollbild: mit echter Fullscreen-API und mit Ersatz-Overlay getestet, Esc aus der App heraus.
- **Einschränkung:** Die Nummer steht am Ende jeder Einheit. Läuft eine Einheit über mehrere Blätter
  (z. B. Praxisbeurteilung, Behandlungsvertrag, Fragenkatalog, Inhaltsverzeichnis), tragen nur deren letzte Blätter
  eine Nummer, die Kapitel des Hygieneplans zusätzlich oben.
- **Nicht getestet:** Safari, iPad und iPhone, Firefox sowie das echte Shopify-Theme. Bitte beim ersten Ausdruck
  stichprobenartig ein paar Seitenzahlen kontrollieren.
