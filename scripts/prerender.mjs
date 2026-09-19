// Runs after `vite build` and `vite build --ssr`: renders the app to HTML and writes it
// into dist/index.html so crawlers (and visitors before JS loads) get real content.
import { readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const indexPath = path.join(root, 'dist', 'index.html');
const ssrDir = path.join(root, 'dist-ssr');

const template = await readFile(indexPath, 'utf8');
const marker = '<div id="root"></div>';
if (!template.includes(marker)) {
  throw new Error(`Prerender: could not find ${marker} in dist/index.html`);
}

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const appHtml = render();

// A replacer function keeps "$" sequences in the markup from being treated as patterns.
await writeFile(indexPath, template.replace(marker, () => `<div id="root">${appHtml}</div>`));
await rm(ssrDir, { recursive: true, force: true });

console.log(`Prerendered ${appHtml.length.toLocaleString()} characters of HTML into dist/index.html`);
