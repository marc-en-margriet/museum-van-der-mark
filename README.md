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

## Object ID mapping

| ID | Naam |
|----|------|
| `be855d47-0abb-4f50-94c0-00586bb06f34` | Stoel |
| `4e64ad17-da17-4948-ada6-342f0e145603` | Koelkast |
| `fc0f1f12-e11d-4522-aefe-30fa0f5f3363` | Tandenborstel |
| `ace628a8-2d45-46a5-997e-6a1f1598f960` | Bank |
| `4d658618-9bae-4834-8796-65fcc281c51c` | Bed |
| `70efda15-051c-49d3-85c1-84dc6380d74f` | Wasmand |
| `d3f930d0-0947-460f-ac8f-e7f20734eb1c` | Kamerplant |
| `75ed337e-c159-4eaa-b2f9-ad957f145633` | Spiegel |
| `6d72cf9f-ecd6-4635-b13c-b32aa1aa88e8` | WC |
| `98ae4cfa-d6ab-41d8-af06-765b3943f542` | Kapstok |
| `35988a11-385d-44c6-8ff7-5a6540f04e25` | Trapkast |
| `b44e9941-965f-4827-8600-a8ef885b6c9e` | Vaatwasser |
| `f0ca98fb-df59-4587-945a-b6793c869cc1` | Wasmachine |
| `23ea0603-e716-4687-9447-ca7b7717079f` | Droger |
| `3ddadd0d-92d9-4f58-961b-e511001be7a4` | TV |
| `8bfa34b4-3fa8-451f-95ed-89ee9777aff0` | TV-kast |
| `cbe4880b-0725-4f4a-bbc2-5c532b2389cb` | Kussen |
| `067ff762-90b7-40c4-b228-451774b3541a` | Spelletjeskast |
| `dc587271-7618-4228-acc9-4cd53ee9f3ce` | Kledingkast |
| `791439af-29d8-4c81-8798-54a8eed69704` | Dartbord |
| `35059d6b-730c-481e-a820-41a9e53ae852` | Douchekop |
| `8a27ce8f-8768-4b10-8c5f-375e1bea3aee` | Doucheruimte |
| `ab7aebd2-5464-4e2e-ab33-b623753c175f` | WC-rol |
| `0b106f8e-df9e-4bbf-8977-dd4a83a12d22` | Nachtkastje (vrouw) |
| `7734d73c-b6fd-4b39-971d-a8d3cd7e61eb` | Nachtkastje (man) |
| `13af3760-149a-46b0-85b6-3a9e42492302` | Dekbed |
| `ec1d4abd-0c00-4532-9706-e8e68aa1281a` | Kraan met heetwatersysteem |
| `67dd5b58-ff62-4bc2-8e8e-21cf22e1ceae` | Glasvezelaansluiting |
| `a33469c8-7b53-49bd-b5d9-cee5277f70b6` | Zolderberging |
| `c8cb4570-9f3c-4e33-9a06-22330ea910d9` | Niets |

## Deployment

De site wordt gehost op GitHub Pages. De Vite config gebruikt `/museum-van-der-mark/` als base path in productie. Een `public/404.html` zorgt voor correcte SPA routing op GitHub Pages.
