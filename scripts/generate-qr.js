import QRCode from 'qrcode'
import { readFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const raw = readFileSync(resolve(root, 'src/data/data.json'), 'utf-8').trim()
const data = raw ? JSON.parse(raw) : []

if (!data.length) {
  console.log('Geen items gevonden in src/data/data.json')
  process.exit(0)
}
const outDir = resolve(root, 'public/qr')

mkdirSync(outDir, { recursive: true })

const BASE_URL = 'https://bobmulder.github.io/museum-van-der-mark/x'

for (const item of data) {
  const url = `${BASE_URL}/${item.id}`
  const outFile = resolve(outDir, `${item.id}.png`)

  await QRCode.toFile(outFile, url, {
    width: 400,
    margin: 2,
    color: { dark: '#1a1a1a', light: '#faf9f7' },
  })

  console.log(`✓ ${item.id} → ${url}`)
}

console.log(`\nGenerated ${data.length} QR code(s) in public/qr/`)
