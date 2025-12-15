/// <reference types="vitest" />
import { defineConfig } from 'vite';

import angular from '@analogjs/vite-plugin-angular';

export default defineConfig(({ mode }: { mode: string }) => ({
  plugins: [angular()],
  test: {
    globals: true,
    setupFiles: ['src/test-setup.ts'],
    environment: 'jsdom',
    watch: false,
    include: ['src/**/*.{test,spec}.{ts,tsx, }'], // ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
     coverage: {
      provider: 'v8', // or 'istanbul',
      enabled: true,
       exclude: ['**/*.{scss,html}']
    },
  },
}));