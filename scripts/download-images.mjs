import https from 'https';
import fs from 'fs';
import path from 'path';

const images = {
  'nova-book-pro-16.webp': 'https://images.unsplash.com/photo-1496181133206-8122ed4d25b6?w=800&q=80',
  'nova-book-air-14.webp': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
  'nova-book-gaming-x.webp': 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80',
  'nova-phone-ultra.webp': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
  'nova-phone-se.webp': 'https://images.unsplash.com/photo-1598327637678-72d17d2b6d17?w=800&q=80',
  'nova-phone-fold.webp': 'https://images.unsplash.com/photo-1616344566184-426f475d8a1f?w=800&q=80',
  'nova-phone-mini.webp': 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&q=80',
  'nova-sound-pro-max.webp': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
  'nova-sound-buds-elite.webp': 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
  'nova-sound-studio.webp': 'https://images.unsplash.com/photo-1546435770-a8887b5e2612?w=800&q=80',
  'nova-strike-controller.webp': 'https://images.unsplash.com/photo-1600080972464-8e5f35f7d0cd?w=800&q=80',
  'nova-strike-mouse.webp': 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
  'nova-strike-headset.webp': 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80',
  'nova-watch-ultra.webp': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
  'nova-watch-active.webp': 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&q=80',
  'nova-watch-classic.webp': 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80',
  'nova-type-pro.webp': 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80',
  'nova-type-compact.webp': 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80',
  'nova-type-ergo.webp': 'https://images.unsplash.com/photo-1595225470214-875b4586ee5d?w=800&q=80',
  'nova-view-pro.webp': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
  'nova-view-curved.webp': 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=800&q=80',
  'nova-view-portable.webp': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
  'nova-sound-hub.webp': 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
  'nova-sound-go-mini.webp': 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
  'nova-soundbar-max.webp': 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80',
  'nova-cam-mirrorless.webp': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
  'nova-cam-action.webp': 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80',
  'nova-cam-instant.webp': 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80',
  'nova-pad-pro.webp': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
  'nova-pad-lite.webp': 'https://images.unsplash.com/photo-1632661671167-e4f4d961d25e?w=800&q=80',
};

const outputDir = 'public/images';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Follow redirect
        download(response.headers.location, dest).then(resolve).catch(reject);
      } else {
        file.close();
        fs.unlinkSync(dest);
        reject(new Error(`HTTP ${response.statusCode}: ${url}`));
      }
    }).on('error', (err) => {
      file.close();
      fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function downloadAll() {
  let success = 0;
  let failed = 0;
  
  for (const [name, url] of Object.entries(images)) {
    const dest = path.join(outputDir, name);
    if (fs.existsSync(dest)) {
      console.log(`✓ Already exists: ${name}`);
      success++;
      continue;
    }
    try {
      await download(url, dest);
      console.log(`✓ Downloaded: ${name}`);
      success++;
    } catch (err) {
      console.log(`✗ FAILED: ${name} - ${err.message}`);
      failed++;
    }
  }
  
  console.log(`\nDone! ${success} succeeded, ${failed} failed`);
}

downloadAll();