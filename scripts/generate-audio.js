import 'dotenv/config'
import OpenAI from 'openai'
import { readFileSync, mkdirSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

if (!process.env.OPENAI_API_KEY) {
  console.error('Fout: OPENAI_API_KEY ontbreekt in .env bestand')
  process.exit(1)
}

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const raw = readFileSync(resolve(root, 'src/data/data.json'), 'utf-8').trim()
const data = raw ? JSON.parse(raw) : []

if (!data.length) {
  console.log('Geen items gevonden in src/data/data.json')
  process.exit(0)
}

const outDir = resolve(root, 'public/audio')
mkdirSync(outDir, { recursive: true })

const TIMEOUT_MS = 90_000
let succeeded = 0
let failed = 0

for (const item of data) {
  const outFile = resolve(outDir, `${item.id}.mp3`)
  console.log(`→ Bezig: ${item.name} (${item.id})...`)

  try {
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout na ${TIMEOUT_MS / 1000}s`)), TIMEOUT_MS)
    )

    const response = await Promise.race([
      client.audio.speech.create({
        model: 'gpt-4o-mini-tts',
        voice: 'cedar',
        input: item.description,
        language: 'nl',
        speed: 1.1,
        response_format: 'mp3',
        instructions:
          'Affect: een mysterieuze noir detective. ' +
          'Toon: koel en afstandelijk, maar subtiel geruststellend — alsof je alles al hebt gezien en weet hoe je met elke zaak moet omgaan. ' +
          'Uitvoering: langzaam en weloverwogen, met dramatische pauzes om spanning op te bouwen — alsof elk detail van belang is in dit onderzoek. ' +
          'Emotie: een mix van wereldmoeheid en stille vastberadenheid, met een vleugje droge humor om het niet al te somber te maken. ' +
          'Leestekens: korte, bondige zinnen met beletseltekens en gedachtestepen om ritme en spanning te creëren — als de innerlijke monoloog van een detective die de puzzelstukjes op zijn plek legt.',
      }),
      timeout,
    ])

    const buffer = Buffer.from(await response.arrayBuffer())
    writeFileSync(outFile, buffer)

    console.log(`✓ ${item.name} (${item.id}.mp3)`)
    succeeded++
  } catch (err) {
    console.error(`✗ Fout bij ${item.name} (${item.id}): ${err.message}`)
    if (err.status) console.error(`  HTTP status: ${err.status}`)
    failed++
  }
}

console.log(`\n${succeeded} geslaagd, ${failed} mislukt (van ${data.length} items)`)
if (failed > 0) process.exit(1)
