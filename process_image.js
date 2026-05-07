const sharp = require('sharp');

async function processImage() {
  const input = 'c:/Users/Laylo/Desktop/lol/zarabi-dental/public/media/tooth-line-art.png';
  const output = 'c:/Users/Laylo/Desktop/lol/zarabi-dental/public/media/tooth-line-art-transparent.png';

  const { data, info } = await sharp(input)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const newData = Buffer.alloc(info.width * info.height * 4);

  for (let i = 0; i < info.width * info.height; i++) {
    const r = data[i * 3];
    const g = data[i * 3 + 1];
    const b = data[i * 3 + 2];
    
    // Calculate luminance
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    
    // Alpha is inverse of luminance (dark lines = high alpha, white bg = 0 alpha)
    let alpha = 255 - luminance;
    // Boost contrast slightly so faint lines are more visible, but bg stays 0
    alpha = Math.min(255, alpha * 2.0); 

    // Target gold color: #CA8A04 (202, 138, 4)
    newData[i * 4] = 202;     // R
    newData[i * 4 + 1] = 138; // G
    newData[i * 4 + 2] = 4;   // B
    newData[i * 4 + 3] = alpha; // A
  }

  await sharp(newData, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
  .png()
  .toFile(output);
  
  console.log("Done!");
}

processImage();
