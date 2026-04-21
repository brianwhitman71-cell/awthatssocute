import { createWriteStream, mkdirSync, existsSync } from 'fs';
import { get } from 'https';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const images = [
  // Logo / brand
  { url: 'https://static.wixstatic.com/media/d7ffe259c9e54f59837481b3dd0130eb.png', name: 'instagram-icon.png' },
  // Hero / brand images
  { url: 'https://static.wixstatic.com/media/6a13e4_ca6a43193fb1461fb62abbe96b2f2d92~mv2.jpg', name: 'hero-1.jpg' },
  { url: 'https://static.wixstatic.com/media/6a13e4_fd4d938421b04edf86197024e7e2e68d~mv2.jpg', name: 'hero-2.jpg' },
  { url: 'https://static.wixstatic.com/media/6a13e4_feb1260dc9bc4e28a9faa0c52da8f344~mv2.jpg', name: 'hero-3.jpg' },
  { url: 'https://static.wixstatic.com/media/6a13e4_a2fd31fc941d415a9a3fdbd7562cbc22~mv2.png', name: 'hero-4.png' },
  // Product images
  { url: 'https://static.wixstatic.com/media/6a13e4_f7b65150b5434a0cb9ae3ef11d2dbd25~mv2.jpg', name: 'product-pink-tree.jpg' },
  { url: 'https://static.wixstatic.com/media/6a13e4_e7bff3b3e3da4afd8e3bc9cd2467efc5~mv2.jpg', name: 'product-green-tree.jpg' },
  { url: 'https://static.wixstatic.com/media/6a13e4_97689ab13a46459e8b14082f31954bbd~mv2.jpg', name: 'product-pink-gray-tree.jpg' },
  { url: 'https://static.wixstatic.com/media/6a13e4_9e039e202fd849aa92f738501b8270f6~mv2.jpg', name: 'product-baubles-1.jpg' },
  { url: 'https://static.wixstatic.com/media/6a13e4_3cbae2858ee14a009e020d200e554668~mv2.jpg', name: 'product-baubles-2.jpg' },
  { url: 'https://static.wixstatic.com/media/6a13e4_9490d2767596465bb5c2d22176325cd1~mv2.jpg', name: 'product-santa-belly.jpg' },
  { url: 'https://static.wixstatic.com/media/6a13e4_3d51b7f767924c4b9842616d5379ecc6~mv2.jpg', name: 'product-santa-belly-2.jpg' },
  { url: 'https://static.wixstatic.com/media/6a13e4_e6af83464ca8496d87fc920177b04b90~mv2.jpg', name: 'product-reindeer.jpg' },
  { url: 'https://static.wixstatic.com/media/6a13e4_555bfdaf4a054e528f2645702d145703~mv2.jpg', name: 'product-polar-bear.jpg' },
  { url: 'https://static.wixstatic.com/media/6a13e4_898241c92bcb4601a8f27cfbc48a9a16~mv2.jpg', name: 'product-mitten.jpg' },
  { url: 'https://static.wixstatic.com/media/6a13e4_8268481d9d914f4ea9fc1c5ed1cd02b6~mv2.jpg', name: 'product-mouse.jpg' },
  { url: 'https://static.wixstatic.com/media/6a13e4_d69bb9f7781f47889c555bef5bf61a61~mv2.jpg', name: 'product-extra-1.jpg' },
  { url: 'https://static.wixstatic.com/media/6a13e4_52f2a1559c914b7ca865fe707955c223~mv2.jpg', name: 'product-extra-2.jpg' },
  { url: 'https://static.wixstatic.com/media/6a13e4_0c2414d71054484e9b321c06c8916264~mv2.jpg', name: 'product-extra-3.jpg' },
  { url: 'https://static.wixstatic.com/media/6a13e4_77e4ad00823e494ab64c678903d93b9c~mv2.jpg', name: 'product-extra-4.jpg' },
  { url: 'https://static.wixstatic.com/media/6a13e4_d81774bb38ac4381867a39200c1d01ee~mv2.jpg', name: 'product-extra-5.jpg' },
  { url: 'https://static.wixstatic.com/media/6a13e4_db77f4ec31984bbf86bf7672ec60af73~mv2.jpg', name: 'product-extra-6.jpg' },
  { url: 'https://static.wixstatic.com/media/6a13e4_3f3753767027471e81573731a40781fc~mv2.jpg', name: 'product-extra-7.jpg' },
  { url: 'https://static.wixstatic.com/media/6a13e4_65b7fc8048394cd08ec5bb7ab03842b3~mv2.jpg', name: 'product-extra-8.jpg' },
  { url: 'https://static.wixstatic.com/media/6a13e4_de44d4d2f7bd42ebb06f168ea8bed4c4~mv2.jpg', name: 'product-extra-9.jpg' },
  { url: 'https://static.wixstatic.com/media/6a13e4_6bc6599b60244874808d3eaa087a6534~mv2.jpg', name: 'product-extra-10.jpg' },
  { url: 'https://static.wixstatic.com/media/6a13e4_3fa6e99061db40c888876b9c5664a558~mv2.jpg', name: 'product-extra-11.jpg' },
  { url: 'https://static.wixstatic.com/media/6a13e4_90f614cb16d44f3fa6e6299b0a5a6379~mv2.jpg', name: 'product-extra-12.jpg' },
  // Background / decorative
  { url: 'https://static.wixstatic.com/media/11062b_35882d0dcdde4c8f9a0d9a4a38e18fb5~mv2.jpg', name: 'background.jpg' },
  { url: 'https://static.wixstatic.com/media/6a13e4_5df5c1c526944404be069178914ddf44~mv2.png', name: 'decorative-1.png' },
  { url: 'https://static.wixstatic.com/media/6a13e4_b55c992c3e7143ba8806b1e278710f11~mv2.png', name: 'decorative-2.png' },
  { url: 'https://static.wixstatic.com/media/6a13e4_5cb5c503c4774ec1a100d46cb0bb2c10~mv2.png', name: 'decorative-3.png' },
  { url: 'https://static.wixstatic.com/media/6a13e4_0775c6692db24e608ef2760308a10f84~mv2.png', name: 'decorative-4.png' },
  { url: 'https://static.wixstatic.com/media/6a13e4_bbf241040d8640d19c902906fb29e5aa~mv2.png', name: 'decorative-5.png' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    if (existsSync(dest)) { resolve(); return; }
    const dir = dirname(dest);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    const file = createWriteStream(dest);
    get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => {
      file.close();
      reject(err);
    });
  });
}

async function downloadBatch(items, batchSize = 4) {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    await Promise.allSettled(
      batch.map(({ url, name }) => {
        const dest = join(root, 'public/images', name);
        return download(url, dest).then(() => console.log(`✓ ${name}`)).catch(e => console.error(`✗ ${name}: ${e.message}`));
      })
    );
  }
}

downloadBatch(images).then(() => console.log('Done!'));
