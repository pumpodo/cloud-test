# Pinterest-Wochenplanung – Podologie und mehr

Diese Anleitung beschreibt die wöchentliche Aufgabe. Jeden **Mittwoch früh** werden die Pins für die **nächsten 7 Tage (Donnerstag bis Mittwoch)** erstellt und in Metricool fest eingeplant.

## Eckdaten

| | |
|---|---|
| Shop | https://podologie-und-mehr.com (Shopify) |
| Produktdaten | `https://podologie-und-mehr.com/products.json?limit=250` (alle Produkte, Texte, Bilder, Preise) |
| Produktübersicht | https://podologie-und-mehr.com/pages/produkte |
| Blog | https://podologie-und-mehr.com/blogs/neuigkeiten, Feed: `https://podologie-und-mehr.com/blogs/neuigkeiten.atom` |
| Metricool-Marke | „Podologie und mehr“, **blogId `7857821`**, Zeitzone `Europe/Berlin`, Pinterest-Konto @podologieundmehr |
| Absenderin | Podologin Andrea (Andrea Königsberger, Podologin, Wundexpertin, Heilpraktikerin) |

## Wochenplan

- **3 Pins pro Tag** um **08:15**, **12:30** und **20:30** Uhr (Europe/Berlin).
- Zeitraum: Donnerstag nach dem Lauf bis einschließlich Mittwoch der Folgewoche, also 21 Plätze.
- **Bereits belegte Plätze zählen mit.** Vorher mit `getScheduledPosts` (blogId 7857821) alle Posts im Zeitraum abrufen. Ein Platz gilt als belegt, wenn am selben Tag innerhalb von ±90 Minuten schon ein Pinterest-Post (Entwurf oder geplant) liegt. Nur freie Plätze füllen.
- Mischung pro Tag: **2 Produkt-Pins + 1 Wissens-Pin.** Der Wissens-Pin kommt bevorzugt auf den Abendplatz.

## Produkt-Pins

1. Alle Produkte aus `products.json` laden. **Jedes Produkt mindestens einmal pro Woche**, dann die übrigen Plätze verteilen. Sets, Eckenzange und Profi-Nagelzange dürfen häufiger erscheinen.
2. Abwechslung: Mit `getScheduledPosts` die **letzten 28 Tage** prüfen und keinen Pin-Titel bzw. keine Überschrift wiederholen. Pro Produkt wechselnde Blickwinkel nutzen: Problem/Lösung, Nutzen, Zielgruppe (Profi, Ausbildung/Gründung, zu Hause), Saison (z. B. Weihnachten bis 20.12., Neujahr/Gründung im Januar).
3. Inhalte **nur aus der Produktbeschreibung** ableiten. Nichts erfinden, keine Heilversprechen („heilt“, „garantiert“ o. Ä.).
4. Feste Fakten:
   - Handle-Zuordnung (Achtung, vertauscht): **Set 1** = `podologin-andrea-profi-set-2` (5 Instrumente inkl. Eckenzange, Profis); **Set 2** = `podologin-andrea-profi-set-1` (gewölbte Nagelzange, Zielgruppe **Fußpflege zu Hause**); **Set 3** = `podologin-andrea-profi-set` (Kopfschneider 20 mm, Grundausstattung, Praxisstart/Ausbildung).
   - Den Exkavator auf Pins **„Exkavator doppelendig“** nennen, nicht den Shop-Titel.
   - Skalpell-Themen richten sich nur an Profis. Bei Set 2 (zu Hause) nicht zum Skalpell-Gebrauch für Laien auffordern.
   - Digitale Produkte („PumOraga Hygiene“, „Preisgestaltung in der Praxis“) richten sich an Praxisinhaber:innen und kommen auf die Pinnwand „Praxis Management“.
5. **Keine Preise im Bild.** Den Preis als letzten Satz in die Pin-Beschreibung schreiben (aus `products.json`, Format „… gibt es für 80 €.“).

## Wissens-Pins

1. Blog-Feed laden. **Neue Artikel zuerst**, sonst Artikel nehmen, die in den letzten 28 Tagen nicht verlinkt waren (UTM-Link bzw. `utm_content` in `getScheduledPosts` prüfen).
2. Den Artikel lesen und **3–4 Kernaussagen** als Tipps zusammenfassen: kurzer Titel plus ein Satz. Nur wiedergeben, was im Artikel steht. Bei medizinischen Themen den Hinweis „bei Beschwerden zur Podologin“ beibehalten, wenn der Artikel ihn hat.
3. Link auf den Blog-Artikel.

## KI-Szenen (optional, kostet Credits)

- **Höchstens 2 Szenen-Pins pro Woche** und nur, wenn das Higgsfield-Guthaben (`balance`) vorher **mindestens 15 Credits** beträgt. Sonst ohne KI weitermachen.
- Modell **FLUX 3 Image** (`flux_3_image`), `aspect_ratio` 2:3, `resolution` 2k. Kosten etwa 3 Credits pro Bild, vorher mit `get_cost` prüfen.
- Der Prompt nennt **den Schauplatz ausdrücklich** und beschreibt die **Stimmung** (Licht, Gefühl). Farben Mint/Weiß/Limette. Immer mit dem Zusatz: „Large empty area in the lower half left free. No people, no tools, no instruments, no scissors, no text, no logos. Photorealistic.“
- Die Instrumente kommen **nie aus der KI**: Das echte Produktfoto wird über das Layout `szene` als Karte eingesetzt.
- Das Bild selbst prüfen: Schauplatz, Stimmung, keine falschen Requisiten, keine Instrumente, kein Text. Bei Mängeln nicht verwenden und keine erneute Generierung ohne Not.
- In Metricool bei Szenen-Pins `isAiGenerated: true` setzen.

## Pins rendern

```bash
cd pinterest-podologie
node render_pins.js woche.json ausgabe/
```

`woche.json` ist eine Liste von Pins. Felder:

| Feld | Bedeutung |
|---|---|
| `id` | Dateiname, z. B. `2026-11-05_0815_set2` |
| `layout` | `produkt`, `wissen` oder `szene` |
| `kicker` | kleines Etikett oben, max. ~30 Zeichen |
| `headline` | Überschrift, max. ~55 Zeichen; `*Text*` wird grün |
| `sub` oder `bullets` | Unterzeile oder 2–3 Häkchen-Punkte (je max. ~50 Zeichen) |
| `deal` | optionales Limetten-Etikett, `*fett*` |
| `image` | Produktbild-URL aus `products.json`; erstes Bild, bei Sets `"cover": true` |
| `tips` | nur `wissen`: `[{"titel":…, "text":…}]`, 3–4 Stück |
| `scene_image`, `scene_top`, `card_style` | nur `szene`: Pfad zum KI-Bild, Beginn der Szene (Standard 470), CSS-Position der Produktkarte |
| `cta` | Button-Text, z. B. „Set ansehen“, „Mehr erfahren“, „Merken & lesen“ |

Gibt das Skript `WARNUNG Text zu lang` aus, den Text kürzen und neu rendern. **Jedes PNG anschauen**: Text lesbar, nichts verdeckt, richtiges Produkt.

## Hochladen (öffentliche Bild-URL für Metricool)

1. Higgsfield `media_upload` mit allen Dateinamen aufrufen (bis zu 20 pro Aufruf).
2. Pro Datei: `curl -X PUT -H "Content-Type: image/png" -H "If-None-Match: *" --data-binary @datei.png '<upload_url>'` und auf HTTP 200 prüfen.
3. `media_confirm` (type `image`, alle media_ids).
4. Die zurückgegebene `url` (`https://d2ol7oe51mr4n9.cloudfront.net/...png`) in Metricool als `media` verwenden.

## In Metricool einplanen

`createScheduledPost` mit `blogId` `7857821`, `draft: false`, `autoPublish: true`, `providers: [{"network":"pinterest"}]`, `publicationDate` mit `timezone: "Europe/Berlin"`, und:

- `text`: Pin-Beschreibung, 2–4 Sätze, max. 480 Zeichen, mit natürlichen Suchbegriffen (z. B. Fußpflege, Podologie, Nagelzange, eingewachsener Nagel, Fußpflege zu Hause), dazu der Preis bei Produkten.
- `mediaAltText`: sachliche Bildbeschreibung.
- `pinterestData`:
  - `boardId`: exakter Pinnwand-Name (siehe unten)
  - `pinTitle`: max. 100 Zeichen, Suchbegriff vorne
  - `pinLink`: Produkt- oder Artikel-URL + `?utm_source=pinterest&utm_medium=social&utm_campaign=wochenplan_<JJJJ>_kw<KW>&utm_content=<id>`
  - `isAiGenerated`: `true` nur bei Szenen-Pins

### Pinnwände (exakte Namen)

| Pinnwand | Wofür |
|---|---|
| `Fußpflege Instrumente` | Einzelinstrumente, Set 2 (zu Hause) |
| `Fußpflege Praxis einrichten, verwalten` | Set 1, Profi-Ausstattung, Fräser-Set, Mykose-Set |
| `Praxis eröffnen` | Set 3, Grundausstattung, Gründung, Ausbildung |
| `Praxis Management` | Preisgestaltung, PumOraga Hygiene, Praxis-Organisation, Blog-Themen zu Praxisführung |
| `Podologie` | Wissens-Pins zu Fuß- und Nagelthemen |

Schlägt ein Name fehl, eine andere passende Pinnwand aus der Liste nehmen und das im Bericht erwähnen.

## Abschlussbericht

Am Ende eine kurze Übersicht ausgeben:
- Tabelle mit Datum, Uhrzeit, Pin-Titel, Typ, Pinnwand und Link
- verbrauchte Credits und Restguthaben
- übersprungene Plätze oder Fehler

Bei Fehlern in Metricool den Pin **nicht** doppelt anlegen. Erst mit `getScheduledPosts` prüfen, ob er schon existiert.
