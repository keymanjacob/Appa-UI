import { defineConfig } from 'vite';
import { resolve } from 'node:path';

/**
 * Library build config.
 *
 * Produces an ESM + CJS bundle of the component library with a single extracted
 * stylesheet (dist/style.css). React is treated as an external peer dependency
 * so consumers dedupe on their own copy. Type declarations are emitted
 * separately by `tsc` (see tsconfig.build.json) via the `build:types` script.
 */
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ComponentFactory',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    // Emit a single style.css instead of per-component chunks.
    cssCodeSplit: false,
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        assetFileNames: (asset) =>
          asset.name?.endsWith('.css') ? 'style.css' : (asset.name ?? 'asset'),
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
  },
});
