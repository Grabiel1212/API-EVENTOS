import fs from 'fs-extra';
import { glob } from 'glob';
import path from 'path';

async function copiarArchivos() {
  try {
    const files = await glob('src/generated/client/**/*');

    files.forEach(file => {
      const dest = path.join('dist', path.relative('src/generated/client', file));
      fs.copySync(file, dest);
      console.log(`✅ Copiado: ${file} → ${dest}`);
    });
  } catch (err) {
    console.error('❌ Error al copiar archivos:', err);
  }
}

copiarArchivos();
