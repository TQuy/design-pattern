// vite.config.ts
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';


export default defineConfig({
  // Add plugins here for frameworks like React or Vue if needed
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node', // Use 'jsdom' for front-end projects
  },
});