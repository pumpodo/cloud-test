# Änderungen vom 04.11.2026: PumOrga Hygiene 0.9.12 → 0.9.13

Diese Liste dient als Vorlage, um dieselben Änderungen in die Haupt-App zu übernehmen.
Referenz-Umsetzung: `PumOrga-Hygiene-0.9.13-Shopify.html.txt` (Branch `claude/ecstatic-hawking-19a7nx`).

**Grundprinzip:** Alle Änderungen wirken nur auf die Darstellung, also beim Anzeigen und Drucken in `docHtml()`.
`docHtmlRaw()` bleibt unverändert. Dadurch ändern sich die Prüfsummen (`docHash`) nicht,
und **bestehende Freigaben bleiben gültig**. Bitte in der Haupt-App genauso vorgehen.

---

## 1. Tabellen: keine Schreibstriche in den Zellen
- **Problem:** In leeren Tabellenzellen standen Unterstriche (`<td>______</td>`), die im Ausdruck störten.
- **Lösung:** `<td>___…</td>` und `<td>___ / ___</td>` werden zu `<td class="wl"></td>`.
- CSS: `td.wl{height:34px}`, im Druck `height:9mm`.
- Betrifft die Anlagen A bis F, die Einstufung der Medizinprodukte, den Reinigungsplan, die Freigabe-Tabelle und die Verantwortlichkeiten.
- Bewusst unverändert: „Name der verantwortlichen Person / ______“ (Feld für die Vertretung).

## 2. Ausfüllfelder: jedes in eine eigene Zeile
- **Problem:** Mehrere Felder standen in einem Absatz hintereinander, zum Beispiel „Ablageort: ____ Verteilt an: ____“. Die Linien waren viel zu kurz.
- **Lösung:** Die Funktion `fillLines()` verarbeitet jeden `<p>` mit Unterstrichen:
  - jedes Feld „Label: ____“ wird zu `<div class="fill"><span class="fill-l">Label:</span><span class="fill-v"></span></div>`,
  - die Linie (`.fill-v`) geht per Flexbox bis zum rechten Rand,
  - steht vor den Feldern eine fette Überschrift (z. B. „Prüfprotokoll:“, „Maßnahmen nach STOP:“), wird sie als eigene Zeile (`.fill-h`) darüber gesetzt,
  - Zeilen mit `<br>` werden einzeln behandelt,
  - Sätze mit Lücke („… aufgesucht am ____.“) bleiben unverändert, denn umgewandelt wird nur, wenn jedes Label auf „:“ endet.
- Die Unterschriftszeilen im Hinweiskasten (geprüft und freigegeben von, Datum, Unterschrift) nutzen ebenfalls diese Zeilen.
- Schriftgröße in der Vorschau wie der Fließtext: `.preview .fill{font-size:12.5px}`, `.chapter-page .fill{font-size:12px}`, im Druck 9,5pt und Zeilenhöhe mindestens 8 mm.

## 3. Alte leere Tabelle bei „Einstufung und Auswahl wiederverwendbarer Medizinprodukte“ entfernt
- Die Tabelle „Instrumentengruppe · Kontaktart / Herstellerzweck · Einstufung · Freigegebener Prozess“ war ein Überbleibsel. Sie wird nie ausgefüllt, weil sie durch die „Instrumentenliste mit Risikoeinstufung“ ersetzt wurde.
- Die Zeile „Hersteller / Gebrauchsanweisung: ____“ bleibt.

## 4. Nummerierung der Bereiche (nur Hygiene-App)
- In der Hygiene-App sind die Bereiche 3, 5, 6, 7, 8 neu als **1 bis 5** nummeriert (`BNUM={3:1,5:2,6:3,7:4,8:5}`).
- Die interne Nummer (Dokument-ID, Freigabe-Schlüssel) bleibt. Geändert wird nur die Anzeige: `aaMap()` (AA-Nummern), `fixBer()` („Bereich N“ im Text), `docIco()` und das Badge im Fragenkatalog.
- Verweise auf nicht enthaltene Arbeitsanweisungen entfernt `fixAA()` bereits.
- **Haupt-App:** Dort sind alle 10 Bereiche enthalten, eine Umnummerierung ist also **nicht nötig**. Nur prüfen, ob die AA-Nummern lückenlos sind. Das macht `fixAA()` bei ausgeblendeten Anweisungen bereits.

## 5. Seitenzahlen stimmen mit dem Ausdruck überein
- **Problem:** Inhaltsverzeichnis und Fußzeilen zählten Kapitel statt gedruckter Blätter. Lange Kapitel (Inhaltsverzeichnis, Einstufungstabelle) liefen auf ein zweites Blatt über, und ab dort war alles verschoben.
- **Lösung:** Die Funktion `paginate(root)` misst vor dem Drucken das echte Druckbild:
  - Sie übernimmt alle `@media print`-Regeln vorübergehend als `<style>` und setzt den Container auf 180 mm Breite (A4 abzüglich 15 mm Rand je Seite).
  - „Einheiten“ beginnen bei jedem erzwungenen Seitenumbruch: `.print-doc`, `.chapter-page` (außer der ersten), `.aa` (außer `.first`, nicht innerhalb von `.flow`).
  - Blätter je Einheit = `ceil(Höhe / 269mm − 0.03)`.
  - Danach werden `.pg-a` (erstes Blatt), `.pg-b` (letztes Blatt), `.pg-r` (Bereich „–X“), `.pg-n` (Gesamtzahl), `.pg-doc` (Blätter des Dokuments) und `[data-to]` (Verweise im Inhaltsverzeichnis) gefüllt.
- Die Vorschau des Hygieneplans zeigt dieselben Zahlen (`previewPages()`).
- Arbeitsanweisungen und Aushänge haben jetzt am Ende jeder Einheit eine Fußzeile „Seite X von Y“ (`.unit-foot`, nur im Druck sichtbar).
- Getestet in Chrome mit einem Gesamtausdruck von 78 Blättern: Alle Nummern und Verweise stimmen. Einschränkung: Läuft eine Einheit über 3 oder mehr Blätter, haben die mittleren Blätter keine Nummer.

## 6. Gemeinsames Inhaltsverzeichnis bei „Alles drucken“
- `buildToc(ids)` ersetzt im Druck die Kapitelübersicht des Hygieneplans durch ein Gesamtverzeichnis:
  - Hygieneplan (Kapitel), Anlagen zum Hygieneplan, Aushänge (Hautschutzplan, Reinigungs- und Desinfektionsplan),
  - Arbeitsanweisungen: je Bereich eine Zeile und darunter jede einzelne AA mit Nummer und Seite,
  - Arbeitshilfen: Fragenkatalog, Prüf- und Freigabeliste. Beide werden weiter bei „Alles drucken“ mitgedruckt.
- Die Überschrift „Kapitelübersicht“ wird im Gesamtdruck zu „Inhaltsverzeichnis“.

## 7. Texte ändern sich nach der Freigabe (`relTexts()`)
Gilt für jedes Dokument einzeln, je nach eigenem Freigabestatus. Werden Angaben später geändert, hebt die App die Freigabe auf, und die Entwurfstexte kommen automatisch zurück.

| Stelle | vor der Freigabe | nach der Freigabe |
|---|---|---|
| Fußzeile jeder Plan-Seite | Version 1.0 · Datum · intern prüfen und freigeben | Version 1.0 · freigegeben am DATUM · NAME |
| Kopf des Hygieneplans | NN Seiten · Dokumentenentwurf · Datum | NN Seiten · freigegeben am DATUM |
| Kopf des Hygieneplans | „Ausführlicher Praxisentwurf … freigeben.“ | entfällt |
| Deckblatt | oranger Kasten „Vor der Freigabe: …“ | entfällt |
| Deckblatt | „Praxisbezogener Entwurf … freigeben.“ | „Praxisbezogener Hygieneplan mit konkreten Verfahrensabläufen und Aufzeichnungsformularen.“ |
| Ende jedes Bereichs | Interner Praxisentwurf · vor Inkraftsetzung prüfen und freigeben | In Kraft seit DATUM · freigegeben von NAME |
| Kopf jeder AA: gültig ab | Linie | Freigabedatum |
| Kopf jeder AA: freigegeben | Linie | NAME, DATUM |
| Kopf jeder AA: geprüft | Linie | **bleibt Linie** (Eintrag von Hand, z. B. Hygieneberatung) |
| Aushänge: „freigegeben: ____“ | Linie | NAME, DATUM |

## 8. Hinweiskasten unter jedem Dokument (`aiNote()`)
- Das Wort „Vorlage“ ist entfernt: **„PumOrga Hygiene“** statt „Vorlage PumOrga Hygiene“.
- Der Satz „Die Vorlage ersetzt keine Rechtsberatung und keine Abstimmung mit dem Gesundheitsamt.“ ist entfernt.
- **Vor der Freigabe:** „… Mit KI-Unterstützung erstellt. Die Praxisleitung muss das Dokument prüfen, anpassen und freigeben.“, darunter die Ausfüllzeilen.
- **Nach der Freigabe:** „… Mit KI-Unterstützung erstellt.“ und darunter „Freigegeben von: NAME am: DATUM“.
- Nicht freigabefähige Dokumente (Fragenkatalog, Prüfliste): nur der erste Satz, ohne Freigabezeilen.

## 9. Vollbild-Knopf im Shopify-Rahmen
- Ein grüner Knopf „⛶ Vollbild“ rechts über der App, sichtbar sobald die App geladen ist.
- Nutzt die Fullscreen-API (`requestFullscreen` / `webkitRequestFullscreen`). Fehlt sie (z. B. auf dem iPhone), legt sich die App per CSS-Overlay über die ganze Seite.
- Beenden per Knopf („✕ Vollbild beenden“) oder Esc. Esc funktioniert auch, wenn der Fokus in der App liegt.
- Im Druck ausgeblendet.

## 10. Hinweis zur Internetadresse im Ausdruck (keine Code-Änderung)
- Die https-Zeile unten im Ausdruck stammt vom Browser und nicht von der App. Abschalten lässt sie sich im Druckfenster unter „Kopf- und Fußzeilen“.

## 11. Version
- `APP_VERSION` 0.9.12 → 0.9.13; die Kommentarzeile im Shopify-Code ist angepasst.
