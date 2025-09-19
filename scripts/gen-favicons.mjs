import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { writeFile } from 'node:fs/promises';

const SRC = 'public/logo/hpg-badge.png'; // your 1024×1024 transparent master

await sharp(SRC).resize(16,16).png().toFile('public/favicon-16x16.png');
await sharp(SRC).resize(32,32).png().toFile('public/favicon-32x32.png');
await sharp(SRC).resize(180,180).png().toFile('public/apple-touch-icon.png');
await sharp(SRC).resize(192,192).png().toFile('public/android-chrome-192x192.png');
await sharp(SRC).resize(512,512).png().toFile('public/android-chrome-512x512.png');

// make an .ico that packs 16/32/48
await sharp(SRC).resize(48,48).png().toFile('public/favicon-48x48.png');
const ico = await pngToIco([
  'public/favicon-16x16.png',
  'public/favicon-32x32.png',
  'public/favicon-48x48.png'
]);
await writeFile('public/favicon.ico', ico);

console.log('Favicons generated ✓');
