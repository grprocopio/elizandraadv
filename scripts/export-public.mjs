// Monta a pasta public/ só com o que o site publicado precisa.
// Fica de fora: skills (.claude), estado de design (.impeccable), fontes de CSS (src),
// fotos originais da raiz, node_modules e os arquivos .json de procedência das imagens.
import { cpSync, existsSync, mkdirSync, rmSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const root = process.cwd();
const out = join(root, 'public');

const pages = ['index.html', '404.html', 'politica-de-privacidade.html'];
const assetExt = new Set(['.css', '.js', '.woff', '.woff2', '.webp', '.jpg', '.jpeg', '.png', '.svg', '.txt']);

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

for (const page of pages) {
  if (!existsSync(join(root, page))) throw new Error(`Página não encontrada: ${page}`);
  cpSync(join(root, page), join(out, page));
}

cpSync(join(root, 'assets'), join(out, 'assets'), {
  recursive: true,
  filter: (src) => statSync(src).isDirectory() || assetExt.has(extname(src).toLowerCase()),
});

console.log('public/ pronto:', pages.join(', '), '+ assets/');
