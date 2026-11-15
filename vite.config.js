import { cpSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => {
  const plugins = [
    react(),
    tailwindcss(),
    {
      name: 'pages-static-assets',
      writeBundle(options) {
        const output = options.dir;
        cpSync(resolve('public/assets'), resolve(output, 'assets'), { recursive: true });
        cpSync(resolve('public/_headers'), resolve(output, '_headers'));
        cpSync(resolve('public/api'), resolve(output, 'api'), { recursive: true });
      },
    },
  ];

  return {
    plugins,
    build: { copyPublicDir: false },
    server: { port: 5173, strictPort: true },
    preview: { port: 4173, strictPort: true },
  };
});
