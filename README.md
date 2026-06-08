# Museum Van der Mark

Een interactieve museumwebsite die alledaagse huishoudelijke voorwerpen uit het Van der Mark gezin catalogiseert als historische artefacten — compleet met academische beschrijvingen en audio-geleiding.

## Tech stack

- **Vue 3** — frontend framework
- **Vue Router 4** — client-side routing
- **Vite** — build tool
- **OpenAI TTS** — audio generatie (Dutch narration)
- **QRCode** — QR code generatie per object

## Ontwikkeling

```bash
npm install
npm run dev
```

## Productie build

```bash
npm run build
npm run preview
```

## Scripts

### QR codes genereren

Genereert een QR code PNG per object in `public/qr/`:

```bash
npm run generate-qr
```

### Audio genereren

Genereert een MP3 per object via OpenAI TTS in `public/audio/`. Vereist een `.env` bestand met:

```
OPENAI_API_KEY=sk-...
```

```bash
npm run generate-audio
```

## Projectstructuur

```
src/
├── data/data.json          # Objecten met beschrijvingen
├── views/
│   ├── HomePage.vue        # Overzicht met voortgangsbalk
│   └── ItemPage.vue        # Detailpagina met audiospeler
├── composables/
│   └── useVisitedItems.js  # LocalStorage voortgang bijhouden
└── router/
public/
├── audio/                  # Gegenereerde MP3 bestanden
└── qr/                     # Gegenereerde QR code afbeeldingen
scripts/
├── generate-audio.js
└── generate-qr.js
```

## Deployment

De site wordt gehost op GitHub Pages. De Vite config gebruikt `/museum-van-der-mark/` als base path in productie. Een `public/404.html` zorgt voor correcte SPA routing op GitHub Pages.
