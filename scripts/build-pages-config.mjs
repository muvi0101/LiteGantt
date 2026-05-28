import fs from 'node:fs/promises';
import path from 'node:path';

const apiBase = String(process.env.LITEGANTT_API_BASE || '').replace(/\/+$/, '');
const outputPath = path.resolve('public', 'config.js');

await fs.writeFile(
  outputPath,
  `window.LITEGANTT_API_BASE = ${JSON.stringify(apiBase)};\n`,
  'utf8'
);

console.log(`Wrote ${outputPath}`);
