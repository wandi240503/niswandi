import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const userUploadsDir = '/Users/wandi/.gemini/antigravity/brain/fa3714aa-56af-4aed-a729-7b26f8204137/.user_uploaded';
const outputDir = path.resolve('public/images');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function extract() {
  const imgHome = path.join(userUploadsDir, 'media_1789226937535.png'); // 212x1024
  const imgProjects = path.join(userUploadsDir, 'media_1789226937578.png'); // 398x1024
  const imgAllScreens = path.join(userUploadsDir, 'media_1789226937580.jpg'); // 682x1024

  // Extract Niswandi portrait from Home Hero (top right of media_1789226937535.png)
  // Dimensions 212 x 1024. Hero portrait is roughly at x: 125, y: 45, width: 80, height: 95
  const homeMeta = await sharp(imgHome).metadata();
  console.log('Home meta:', homeMeta);

  // Extract Niswandi Portrait
  await sharp(imgHome)
    .extract({
      left: Math.round(homeMeta.width * 0.58),
      top: Math.round(homeMeta.height * 0.045),
      width: Math.round(homeMeta.width * 0.40),
      height: Math.round(homeMeta.height * 0.09)
    })
    .resize(500, 500, { fit: 'cover' })
    .toFile(path.join(outputDir, 'niswandi-portrait.png'));
  console.log('Extracted niswandi-portrait.png');

  // Also extract About portrait from Screen 04 in imgAllScreens
  // imgAllScreens is 682x1024, screen 04 is row 0, col 3
  const allMeta = await sharp(imgAllScreens).metadata();
  console.log('All screens meta:', allMeta);

  // Extract from Projects Page (media_1789226937578.png, width 398, height 1024)
  // Let's get the 6 project cards:
  // In Projects page:
  // Card 01 (Fintech): left ~ 25 to 190, top ~ 120 to 225
  // Card 02 (E-Commerce): left ~ 205 to 370, top ~ 120 to 225
  // Card 03 (Company Profile): left ~ 25 to 190, top ~ 285 to 390
  // Card 04 (Travel App): left ~ 205 to 370, top ~ 285 to 390
  // Card 05 (Brand Identity): left ~ 25 to 190, top ~ 445 to 550
  // Card 06 (Task App): left ~ 205 to 370, top ~ 445 to 550
  const projMeta = await sharp(imgProjects).metadata();
  console.log('Projects meta:', projMeta);

  // 1. Fintech App
  await sharp(imgProjects)
    .extract({
      left: Math.round(projMeta.width * 0.05),
      top: Math.round(projMeta.height * 0.12),
      width: Math.round(projMeta.width * 0.42),
      height: Math.round(projMeta.height * 0.10)
    })
    .resize(600, 400, { fit: 'cover' })
    .toFile(path.join(outputDir, 'fintech-app.png'));

  // 2. E-Commerce Dashboard
  await sharp(imgProjects)
    .extract({
      left: Math.round(projMeta.width * 0.52),
      top: Math.round(projMeta.height * 0.12),
      width: Math.round(projMeta.width * 0.42),
      height: Math.round(projMeta.height * 0.10)
    })
    .resize(600, 400, { fit: 'cover' })
    .toFile(path.join(outputDir, 'ecommerce-dashboard.png'));

  // 3. Company Profile
  await sharp(imgProjects)
    .extract({
      left: Math.round(projMeta.width * 0.05),
      top: Math.round(projMeta.height * 0.285),
      width: Math.round(projMeta.width * 0.42),
      height: Math.round(projMeta.height * 0.10)
    })
    .resize(600, 400, { fit: 'cover' })
    .toFile(path.join(outputDir, 'company-profile.png'));

  // 4. Travel Mobile App
  await sharp(imgProjects)
    .extract({
      left: Math.round(projMeta.width * 0.52),
      top: Math.round(projMeta.height * 0.285),
      width: Math.round(projMeta.width * 0.42),
      height: Math.round(projMeta.height * 0.10)
    })
    .resize(600, 400, { fit: 'cover' })
    .toFile(path.join(outputDir, 'travel-app.png'));

  // 5. Brand Identity
  await sharp(imgProjects)
    .extract({
      left: Math.round(projMeta.width * 0.05),
      top: Math.round(projMeta.height * 0.445),
      width: Math.round(projMeta.width * 0.42),
      height: Math.round(projMeta.height * 0.10)
    })
    .resize(600, 400, { fit: 'cover' })
    .toFile(path.join(outputDir, 'brand-identity.png'));

  // 6. Task Management App
  await sharp(imgProjects)
    .extract({
      left: Math.round(projMeta.width * 0.52),
      top: Math.round(projMeta.height * 0.445),
      width: Math.round(projMeta.width * 0.42),
      height: Math.round(projMeta.height * 0.10)
    })
    .resize(600, 400, { fit: 'cover' })
    .toFile(path.join(outputDir, 'task-app.png'));

  // 7. Astronaut 404 from Screen 08 (Row 1, Screen 4 in imgAllScreens)
  // Col 4 of 4 columns in row 1, or roughly x: 0.82 to 0.98, y: 0.65 to 0.85
  await sharp(imgAllScreens)
    .extract({
      left: Math.round(allMeta.width * 0.84),
      top: Math.round(allMeta.height * 0.67),
      width: Math.round(allMeta.width * 0.14),
      height: Math.round(allMeta.height * 0.09)
    })
    .resize(400, 400, { fit: 'contain', background: { r: 10, g: 11, b: 14, alpha: 1 } })
    .toFile(path.join(outputDir, 'astronaut-404.png'));

  console.log('Successfully extracted all project assets!');
}

extract().catch(console.error);

