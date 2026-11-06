<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:art-director-rule -->
# UI/UX & Art Direction Standard (Awwwards / Godly)

Zodra er gewerkt wordt aan het ontwerpen, restylen of bouwen van een template, website, landingspagina, CSS-styling of UI-componenten: activeer en betrek altijd de skill `godly-awwwards-art-director`. Geen generieke templates, bento boxes of standaard UI-componenten.
<!-- END:art-director-rule -->

<!-- BEGIN:lead-hunter-rule -->
# Lead Hunter Sub-Agent Routing (Studio Maaijen)

Wanneer de gebruiker vraagt om **"nieuwe leads"**, **"zoek MKB klanten"** of **"draai de wekelijkse lead-run"**, delegeer deze taak direct aan de `lead-hunter` sub-agent (`Model: "flash"`, zie `/agents/lead-hunter.md`).
- Deduplicatiebestand: `/leads/benaderde-bedrijven.json`
- Screenshot-script: `node scripts/screenshot-helper.js <url> <slug>` → `/leads/screenshots/`
- Wekelijks rapport: `/leads/week-[weeknummer]-[jaar]-leads.md`
<!-- END:lead-hunter-rule -->

<!-- BEGIN:design-stijlen-rule -->
# Designstijlen Bibliotheek (33 Stijlen + Stijl-Mix)

Zodra er gevraagd wordt om een specifieke designstijl (bijv. `/dark-tech`, `/swiss`, `/swiss-brutalism`, `/neo-brutalism`, `/editorial`, `/minimalism`, `/japandi`, `/quiet-luxury`, `/liquid-glass`, `/glassmorphism`, `/bento-grid`, `/scandinavisch`, etc.) of `/stijl-mix`:
- Laad de skill `design-stijlen` en het bijbehorende bestand uit `stijlen/<naam>.md`.
- Pas de kleurentabellen, typografie, layout, radius, design tokens en dos & don'ts 1-op-1 toe.
- Koppel voor de bouw aan `dev-agent`, voor Figma aan `figma-agent`, en voor beweging aan `motion-agent`.
<!-- END:design-stijlen-rule -->
