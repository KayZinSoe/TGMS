#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

// Usage: node scripts/svg-to-png.js <srcDir> <outDir>
// Example: node scripts/svg-to-png.js frontend/src/assets frontend/public/assets/illustrations

const argv = process.argv.slice(2);
const srcDir = argv[0] || path.join(__dirname, '..', 'frontend', 'src', 'assets');
const outDir = argv[1] || path.join(__dirname, '..', 'frontend', 'public', 'assets', 'illustrations');

if (!fs.existsSync(srcDir)) {
  console.error('Source directory not found:', srcDir);
  process.exit(2);
}

fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(srcDir).filter(f => f.toLowerCase().endsWith('.svg'));
if (files.length === 0) {
  console.error('No SVG files found in', srcDir);
  process.exit(3);
}

(async () => {
  for (const file of files) {
    const name = path.basename(file, '.svg');
    const srcPath = path.join(srcDir, file);
    const out1x = path.join(outDir, `${name}.png`);
    const out2x = path.join(outDir, `${name}@2x.png`);

    try {
      const svgBuffer = fs.readFileSync(srcPath);

      // Default 800px width for 1x, 1600px for 2x
      await sharp(svgBuffer)
        .resize({ width: 800 })
        .png()
        .toFile(out1x);

      await sharp(svgBuffer)
        .resize({ width: 1600 })
        .png()
        .toFile(out2x);

      console.log('Converted', file, '->', out1x, out2x);
    } catch (err) {
      console.error('Failed to convert', file, err.message);
    }
  }
})();
