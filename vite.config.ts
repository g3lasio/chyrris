import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

/**
 * Se retiraron los plugins de Replit (@replit/vite-plugin-runtime-error-modal y
 * @replit/vite-plugin-cartographer) junto con el <script> de replit-dev-banner
 * que index.html servía en producción.
 *
 * El build corre dos veces: una para el cliente y otra en modo SSR para el
 * prerender. `npm run build` encadena ambas y luego scripts/prerender.mjs.
 */
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "client", "src", "assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: isSsrBuild
    ? {
        ssr: "src/entry-server.tsx",
        outDir: path.resolve(import.meta.dirname, "dist/ssr"),
        emptyOutDir: true,
      }
    : {
        outDir: path.resolve(import.meta.dirname, "dist/public"),
        emptyOutDir: true,
        // Los assets pequeños se incrustan como data URI; los grandes salen
        // como archivo para que puedan cachearse por separado.
        assetsInlineLimit: 2048,
        rollupOptions: {
          output: {
            // El runtime de React cambia pocas veces: separarlo del código de
            // la aplicación deja que sobreviva a los despliegues en caché.
            manualChunks(id: string) {
              if (id.includes("node_modules/react-dom")) return "react-vendor";
              if (id.includes("node_modules/react/")) return "react-vendor";
              if (id.includes("node_modules/scheduler")) return "react-vendor";
              return undefined;
            },
          },
        },
      },
}));
