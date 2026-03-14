import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    plugins: [
      react(),
      // Only use legacy plugin in production (it injects inline scripts that conflict with CSP in dev)
      !isDev && legacy({
        targets: ['Safari >= 12', 'Chrome >= 70', 'Firefox >= 68', 'Edge >= 79'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        modernPolyfills: true,
      }),
      cloudflare({
        experimental: {
          headersAndRedirectsDevModeSupport: true,
        },
      }),
    ].filter(Boolean),
    // Transpile modern syntax (?. ??) in dev mode for older browsers
    esbuild: {
      target: 'es2018',
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2018',
      },
    },
    build: {
      // Target older browsers (Chrome 70+, Safari 12+)
      target: ['es2018', 'chrome70', 'firefox68', 'safari12', 'edge79'],
      // CSS target for older browsers
      cssTarget: ['chrome70', 'firefox68', 'safari12', 'edge79'],
    },
  };
})