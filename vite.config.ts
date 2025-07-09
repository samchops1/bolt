import { cloudflareDevProxyVitePlugin as remixCloudflareDevProxy, vitePlugin as remixVitePlugin } from '@remix-run/dev';
import UnoCSS from 'unocss/vite';
import { defineConfig, type ViteDevServer } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { optimizeCssModules } from 'vite-plugin-optimize-css-modules';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig((config) => {
  return {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    },
    build: {
      target: 'esnext',
    },
    server: {
      host: process.env.REPLIT_ENVIRONMENT ? '0.0.0.0' : 'localhost',
      port: process.env.REPLIT_ENVIRONMENT ? 5000 : undefined,
      hmr: {
        port: process.env.REPLIT_ENVIRONMENT ? 5001 : undefined,
      },
      watch: process.env.REPLIT_ENVIRONMENT ? {
        usePolling: true,
        interval: 2000,
        ignored: [
          '**/node_modules/**', 
          '**/.git/**', 
          '**/dist/**', 
          '**/build/**', 
          '**/.cache/**', 
          '**/.local/**',
          '**/pnpm-lock.yaml',
          '**/.pnpm/**',
          '**/package-lock.json',
          '**/yarn.lock',
          '**/.husky/**',
          '**/.github/**',
          '**/docs/**',
          '**/electron/**',
          '**/functions/**',
          '**/public/icons/**',
          '**/assets/**'
        ]
      } : undefined,
    },
    optimizeDeps: process.env.REPLIT_ENVIRONMENT ? {
      exclude: ['@webcontainer/api'],
      include: ['buffer', 'process']
    } : undefined,
    plugins: [
      nodePolyfills({
        include: ['buffer', 'process', 'util', 'stream'],
        globals: {
          Buffer: true,
          process: true,
          global: true,
        },
        protocolImports: true,
        exclude: ['child_process', 'fs', 'path'],
      }),
      {
        name: 'buffer-polyfill',
        transform(code, id) {
          if (id.includes('env.mjs')) {
            return {
              code: `import { Buffer } from 'buffer';\n${code}`,
              map: null,
            };
          }

          return null;
        },
      },
      config.mode !== 'test' && !process.env.REPLIT_ENVIRONMENT && remixCloudflareDevProxy(),
      remixVitePlugin({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
          v3_lazyRouteDiscovery: true,
        },
      }),
      UnoCSS(),
      tsconfigPaths(),
      chrome129IssuePlugin(),
      config.mode === 'production' && optimizeCssModules({ apply: 'build' }),
    ],
    envPrefix: [
      'VITE_',
      'OPENAI_LIKE_API_BASE_URL',
      'OLLAMA_API_BASE_URL',
      'LMSTUDIO_API_BASE_URL',
      'TOGETHER_API_BASE_URL',
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  };
});

function chrome129IssuePlugin() {
  return {
    name: 'chrome129IssuePlugin',
    configureServer(server: ViteDevServer) {
      server.middlewares.use((req, res, next) => {
        const userAgent = req.headers['user-agent'] || '';
        const raw = userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);

        if (raw) {
          const version = parseInt(raw[2], 10);

          if (version === 129) {
            res.setHeader('content-type', 'text/html');
            res.end(
              `<body style="font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px;">
                <h1 style="color: #e74c3c;">Browser Compatibility Issue</h1>
                <p>Chrome 129 has known issues with JavaScript modules & Vite local development.</p>
                <h2>Solutions:</h2>
                <ul>
                  <li><strong>Recommended:</strong> Use Chrome Canary, Firefox, or Safari for development</li>
                  <li>Or wait for Chrome 130+ which fixes this issue</li>
                  <li>Or use the production build: <code>npm run build && npm run start</code></li>
                </ul>
                <p>For more information, see <a href="https://github.com/stackblitz/bolt.new/issues/86#issuecomment-2395519258">this GitHub issue</a>.</p>
                <p><b>Note:</b> This only impacts local development. Production builds work fine in this browser.</p>
              </body>`,
            );

            return;
          }
        }

        next();
      });
    },
  };
}