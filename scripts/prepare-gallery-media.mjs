import { readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const root = path.resolve('public/images/projects');
async function prepare(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if(entry.isDirectory()) { await prepare(file); continue; }
    if(!entry.name.endsWith('.webp') || /-(320|640|1024|1440|1672)\.webp$/.test(entry.name)) continue;
    for(const width of [320,640,1024,1440,1672]) {
      await sharp(file).resize({width, withoutEnlargement:true}).webp({quality:92,effort:5}).toFile(file.replace(/\.webp$/, `-${width}.webp`));
    }
    console.log(`Prepared ${path.relative(root,file)}`);
  }
}
await prepare(root);
