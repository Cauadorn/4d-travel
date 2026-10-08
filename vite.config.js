// Configuração do Vite — o programa que roda o site no computador (localhost)
// e gera a versão final para publicar.
import { defineConfig } from 'vite';
import { resolve } from 'node:path';

const SITE = resolve(import.meta.dirname, 'site');

export default defineConfig({
  root: SITE,                 // o código do site fica na pasta site/
  base: './',                 // caminhos relativos: funciona em qualquer pasta da hospedagem
  publicDir: 'public',        // site/public/ é copiado como está (vídeos .mp4)

  // Porta exclusiva deste projeto. Cada projeto usa uma porta diferente:
  // 4D Eventos = 5173 · X3 = 4173 · 4D Travel = 5180
  server: { port: 5180, strictPort: true, host: true, open: true },
  preview: { port: 4180, strictPort: true, open: true },

  build: {
    outDir: resolve(import.meta.dirname, 'dist'),   // versão final para publicar
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: resolve(SITE, 'index.html'),
        obrigado: resolve(SITE, 'obrigado.html')
      }
    }
  }
});
