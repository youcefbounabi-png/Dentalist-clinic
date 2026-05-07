const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const mediaDir = './public/media';

async function splitImages() {
  for (let i = 1; i <= 4; i++) {
    const file = `gallery-${i}.png`;
    const p = path.join(mediaDir, file);
    try {
      const meta = await sharp(p).metadata();
      const halfH = Math.floor(meta.height / 2);
      
      await sharp(p)
        .extract({ left: 0, top: 0, width: meta.width, height: halfH })
        .toFile(path.join(mediaDir, `slider-${i}-before.png`));
        
      await sharp(p)
        .extract({ left: 0, top: halfH, width: meta.width, height: meta.height - halfH })
        .toFile(path.join(mediaDir, `slider-${i}-after.png`));
        
      console.log(`Split ${file} successfully.`);
    } catch (err) {
      console.error(`Error splitting ${file}:`, err);
    }
  }
}

splitImages();
