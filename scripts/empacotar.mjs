// Gera 4d-travel-publicar.zip com o conteúdo de dist/ (pronto para subir na hospedagem).
// Usado por `npm run entrega` (roda o build antes).
import { execFileSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';

const zip = '4d-travel-publicar.zip';
if (!existsSync('dist/index.html')) {
  console.error('dist/ não encontrado. Rode `npm run build` primeiro.');
  process.exit(1);
}
rmSync(zip, { force: true });
try {
  // tar do Windows 10+ e do macOS (bsdtar) gera .zip com -a
  execFileSync('tar', ['-a', '-c', '-f', zip, '-C', 'dist', '.'], { stdio: 'inherit' });
  console.log(`\n✔ ${zip} criado. Envie o conteúdo dele para a pasta pública da hospedagem.`);
} catch {
  console.error('\nNão consegui compactar automaticamente. Compacte a pasta dist/ manualmente.');
  process.exit(1);
}
