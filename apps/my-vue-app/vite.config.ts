import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/my-vue-app',
  plugins: [ vue(),
    tailwindcss()
    // tailwindcss({
    //   /* optional configs */
    //   cssPath: path.resolve(__dirname, '../../libs/shared/ui-styles/src/lib/index.css'),
    //   applyBaseStyles: true, // برای اطمینان از import base styles
    // }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@shared/ui-styles': fileURLToPath(new URL("../../libs/shared/ui-styles/src", import.meta.url)),
      '@components': fileURLToPath(new URL("../../libs/components/src", import.meta.url)),
    },
  },

  server: {
    port: 4200,
    host: 'localhost',
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
}));
