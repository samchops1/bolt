// vite.config.ts
import { cloudflareDevProxyVitePlugin as remixCloudflareDevProxy, vitePlugin as remixVitePlugin } from "file:///home/project/node_modules/@remix-run/dev/dist/index.js";
import UnoCSS from "file:///home/project/node_modules/unocss/dist/vite.mjs";
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import { nodePolyfills } from "file:///home/project/node_modules/vite-plugin-node-polyfills/dist/index.js";
import { optimizeCssModules } from "file:///home/project/node_modules/vite-plugin-optimize-css-modules/dist/index.mjs";
import tsconfigPaths from "file:///home/project/node_modules/vite-tsconfig-paths/dist/index.mjs";
import * as dotenv from "file:///home/project/node_modules/dotenv/lib/main.js";
dotenv.config();
var vite_config_default = defineConfig((config2) => {
  return {
    define: {
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    },
    build: {
      target: "esnext"
    },
    server: {
      host: process.env.REPLIT_ENVIRONMENT ? "0.0.0.0" : "localhost",
      port: process.env.REPLIT_ENVIRONMENT ? 5e3 : void 0,
      hmr: {
        port: process.env.REPLIT_ENVIRONMENT ? 5001 : void 0
      },
      watch: process.env.REPLIT_ENVIRONMENT ? {
        usePolling: true,
        interval: 2e3,
        ignored: [
          "**/node_modules/**",
          "**/.git/**",
          "**/dist/**",
          "**/build/**",
          "**/.cache/**",
          "**/.local/**",
          "**/pnpm-lock.yaml",
          "**/.pnpm/**",
          "**/package-lock.json",
          "**/yarn.lock",
          "**/.husky/**",
          "**/.github/**",
          "**/docs/**",
          "**/electron/**",
          "**/functions/**",
          "**/public/icons/**",
          "**/assets/**"
        ]
      } : void 0
    },
    optimizeDeps: process.env.REPLIT_ENVIRONMENT ? {
      exclude: ["@webcontainer/api"],
      include: ["buffer", "process"]
    } : void 0,
    plugins: [
      nodePolyfills({
        include: ["buffer", "process", "util", "stream"],
        globals: {
          Buffer: true,
          process: true,
          global: true
        },
        protocolImports: true,
        exclude: ["child_process", "fs", "path"]
      }),
      {
        name: "buffer-polyfill",
        transform(code, id) {
          if (id.includes("env.mjs")) {
            return {
              code: `import { Buffer } from 'buffer';
${code}`,
              map: null
            };
          }
          return null;
        }
      },
      config2.mode !== "test" && !process.env.REPLIT_ENVIRONMENT && remixCloudflareDevProxy(),
      remixVitePlugin({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
          v3_lazyRouteDiscovery: true
        }
      }),
      UnoCSS(),
      tsconfigPaths(),
      chrome129IssuePlugin(),
      config2.mode === "production" && optimizeCssModules({ apply: "build" })
    ],
    envPrefix: [
      "VITE_",
      "OPENAI_LIKE_API_BASE_URL",
      "OLLAMA_API_BASE_URL",
      "LMSTUDIO_API_BASE_URL",
      "TOGETHER_API_BASE_URL"
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler"
        }
      }
    }
  };
});
function chrome129IssuePlugin() {
  return {
    name: "chrome129IssuePlugin",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const userAgent = req.headers["user-agent"] || "";
        const raw = userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
        if (raw) {
          const version = parseInt(raw[2], 10);
          if (version === 129) {
            res.setHeader("content-type", "text/html");
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
              </body>`
            );
            return;
          }
        }
        next();
      });
    }
  };
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBjbG91ZGZsYXJlRGV2UHJveHlWaXRlUGx1Z2luIGFzIHJlbWl4Q2xvdWRmbGFyZURldlByb3h5LCB2aXRlUGx1Z2luIGFzIHJlbWl4Vml0ZVBsdWdpbiB9IGZyb20gJ0ByZW1peC1ydW4vZGV2JztcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCB0eXBlIFZpdGVEZXZTZXJ2ZXIgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IG5vZGVQb2x5ZmlsbHMgfSBmcm9tICd2aXRlLXBsdWdpbi1ub2RlLXBvbHlmaWxscyc7XG5pbXBvcnQgeyBvcHRpbWl6ZUNzc01vZHVsZXMgfSBmcm9tICd2aXRlLXBsdWdpbi1vcHRpbWl6ZS1jc3MtbW9kdWxlcyc7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tICd2aXRlLXRzY29uZmlnLXBhdGhzJztcbmltcG9ydCAqIGFzIGRvdGVudiBmcm9tICdkb3RlbnYnO1xuXG5kb3RlbnYuY29uZmlnKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoY29uZmlnKSA9PiB7XG4gIHJldHVybiB7XG4gICAgZGVmaW5lOiB7XG4gICAgICAncHJvY2Vzcy5lbnYuTk9ERV9FTlYnOiBKU09OLnN0cmluZ2lmeShwcm9jZXNzLmVudi5OT0RFX0VOViksXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgdGFyZ2V0OiAnZXNuZXh0JyxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgaG9zdDogcHJvY2Vzcy5lbnYuUkVQTElUX0VOVklST05NRU5UID8gJzAuMC4wLjAnIDogJ2xvY2FsaG9zdCcsXG4gICAgICBwb3J0OiBwcm9jZXNzLmVudi5SRVBMSVRfRU5WSVJPTk1FTlQgPyA1MDAwIDogdW5kZWZpbmVkLFxuICAgICAgaG1yOiB7XG4gICAgICAgIHBvcnQ6IHByb2Nlc3MuZW52LlJFUExJVF9FTlZJUk9OTUVOVCA/IDUwMDEgOiB1bmRlZmluZWQsXG4gICAgICB9LFxuICAgICAgd2F0Y2g6IHByb2Nlc3MuZW52LlJFUExJVF9FTlZJUk9OTUVOVCA/IHtcbiAgICAgICAgdXNlUG9sbGluZzogdHJ1ZSxcbiAgICAgICAgaW50ZXJ2YWw6IDIwMDAsXG4gICAgICAgIGlnbm9yZWQ6IFtcbiAgICAgICAgICAnKiovbm9kZV9tb2R1bGVzLyoqJywgXG4gICAgICAgICAgJyoqLy5naXQvKionLCBcbiAgICAgICAgICAnKiovZGlzdC8qKicsIFxuICAgICAgICAgICcqKi9idWlsZC8qKicsIFxuICAgICAgICAgICcqKi8uY2FjaGUvKionLCBcbiAgICAgICAgICAnKiovLmxvY2FsLyoqJyxcbiAgICAgICAgICAnKiovcG5wbS1sb2NrLnlhbWwnLFxuICAgICAgICAgICcqKi8ucG5wbS8qKicsXG4gICAgICAgICAgJyoqL3BhY2thZ2UtbG9jay5qc29uJyxcbiAgICAgICAgICAnKioveWFybi5sb2NrJyxcbiAgICAgICAgICAnKiovLmh1c2t5LyoqJyxcbiAgICAgICAgICAnKiovLmdpdGh1Yi8qKicsXG4gICAgICAgICAgJyoqL2RvY3MvKionLFxuICAgICAgICAgICcqKi9lbGVjdHJvbi8qKicsXG4gICAgICAgICAgJyoqL2Z1bmN0aW9ucy8qKicsXG4gICAgICAgICAgJyoqL3B1YmxpYy9pY29ucy8qKicsXG4gICAgICAgICAgJyoqL2Fzc2V0cy8qKidcbiAgICAgICAgXVxuICAgICAgfSA6IHVuZGVmaW5lZCxcbiAgICB9LFxuICAgIG9wdGltaXplRGVwczogcHJvY2Vzcy5lbnYuUkVQTElUX0VOVklST05NRU5UID8ge1xuICAgICAgZXhjbHVkZTogWydAd2ViY29udGFpbmVyL2FwaSddLFxuICAgICAgaW5jbHVkZTogWydidWZmZXInLCAncHJvY2VzcyddXG4gICAgfSA6IHVuZGVmaW5lZCxcbiAgICBwbHVnaW5zOiBbXG4gICAgICBub2RlUG9seWZpbGxzKHtcbiAgICAgICAgaW5jbHVkZTogWydidWZmZXInLCAncHJvY2VzcycsICd1dGlsJywgJ3N0cmVhbSddLFxuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgQnVmZmVyOiB0cnVlLFxuICAgICAgICAgIHByb2Nlc3M6IHRydWUsXG4gICAgICAgICAgZ2xvYmFsOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBwcm90b2NvbEltcG9ydHM6IHRydWUsXG4gICAgICAgIGV4Y2x1ZGU6IFsnY2hpbGRfcHJvY2VzcycsICdmcycsICdwYXRoJ10sXG4gICAgICB9KSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ2J1ZmZlci1wb2x5ZmlsbCcsXG4gICAgICAgIHRyYW5zZm9ybShjb2RlLCBpZCkge1xuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnZW52Lm1qcycpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBjb2RlOiBgaW1wb3J0IHsgQnVmZmVyIH0gZnJvbSAnYnVmZmVyJztcXG4ke2NvZGV9YCxcbiAgICAgICAgICAgICAgbWFwOiBudWxsLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBjb25maWcubW9kZSAhPT0gJ3Rlc3QnICYmICFwcm9jZXNzLmVudi5SRVBMSVRfRU5WSVJPTk1FTlQgJiYgcmVtaXhDbG91ZGZsYXJlRGV2UHJveHkoKSxcbiAgICAgIHJlbWl4Vml0ZVBsdWdpbih7XG4gICAgICAgIGZ1dHVyZToge1xuICAgICAgICAgIHYzX2ZldGNoZXJQZXJzaXN0OiB0cnVlLFxuICAgICAgICAgIHYzX3JlbGF0aXZlU3BsYXRQYXRoOiB0cnVlLFxuICAgICAgICAgIHYzX3Rocm93QWJvcnRSZWFzb246IHRydWUsXG4gICAgICAgICAgdjNfbGF6eVJvdXRlRGlzY292ZXJ5OiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgICBVbm9DU1MoKSxcbiAgICAgIHRzY29uZmlnUGF0aHMoKSxcbiAgICAgIGNocm9tZTEyOUlzc3VlUGx1Z2luKCksXG4gICAgICBjb25maWcubW9kZSA9PT0gJ3Byb2R1Y3Rpb24nICYmIG9wdGltaXplQ3NzTW9kdWxlcyh7IGFwcGx5OiAnYnVpbGQnIH0pLFxuICAgIF0sXG4gICAgZW52UHJlZml4OiBbXG4gICAgICAnVklURV8nLFxuICAgICAgJ09QRU5BSV9MSUtFX0FQSV9CQVNFX1VSTCcsXG4gICAgICAnT0xMQU1BX0FQSV9CQVNFX1VSTCcsXG4gICAgICAnTE1TVFVESU9fQVBJX0JBU0VfVVJMJyxcbiAgICAgICdUT0dFVEhFUl9BUElfQkFTRV9VUkwnLFxuICAgIF0sXG4gICAgY3NzOiB7XG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICBhcGk6ICdtb2Rlcm4tY29tcGlsZXInLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xufSk7XG5cbmZ1bmN0aW9uIGNocm9tZTEyOUlzc3VlUGx1Z2luKCkge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICdjaHJvbWUxMjlJc3N1ZVBsdWdpbicsXG4gICAgY29uZmlndXJlU2VydmVyKHNlcnZlcjogVml0ZURldlNlcnZlcikge1xuICAgICAgc2VydmVyLm1pZGRsZXdhcmVzLnVzZSgocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICAgICAgY29uc3QgdXNlckFnZW50ID0gcmVxLmhlYWRlcnNbJ3VzZXItYWdlbnQnXSB8fCAnJztcbiAgICAgICAgY29uc3QgcmF3ID0gdXNlckFnZW50Lm1hdGNoKC9DaHJvbShlfGl1bSlcXC8oWzAtOV0rKVxcLi8pO1xuXG4gICAgICAgIGlmIChyYXcpIHtcbiAgICAgICAgICBjb25zdCB2ZXJzaW9uID0gcGFyc2VJbnQocmF3WzJdLCAxMCk7XG5cbiAgICAgICAgICBpZiAodmVyc2lvbiA9PT0gMTI5KSB7XG4gICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdjb250ZW50LXR5cGUnLCAndGV4dC9odG1sJyk7XG4gICAgICAgICAgICByZXMuZW5kKFxuICAgICAgICAgICAgICBgPGJvZHkgc3R5bGU9XCJmb250LWZhbWlseTogQXJpYWwsIHNhbnMtc2VyaWY7IG1heC13aWR0aDogODAwcHg7IG1hcmdpbjogNTBweCBhdXRvOyBwYWRkaW5nOiAyMHB4O1wiPlxuICAgICAgICAgICAgICAgIDxoMSBzdHlsZT1cImNvbG9yOiAjZTc0YzNjO1wiPkJyb3dzZXIgQ29tcGF0aWJpbGl0eSBJc3N1ZTwvaDE+XG4gICAgICAgICAgICAgICAgPHA+Q2hyb21lIDEyOSBoYXMga25vd24gaXNzdWVzIHdpdGggSmF2YVNjcmlwdCBtb2R1bGVzICYgVml0ZSBsb2NhbCBkZXZlbG9wbWVudC48L3A+XG4gICAgICAgICAgICAgICAgPGgyPlNvbHV0aW9uczo8L2gyPlxuICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgIDxsaT48c3Ryb25nPlJlY29tbWVuZGVkOjwvc3Ryb25nPiBVc2UgQ2hyb21lIENhbmFyeSwgRmlyZWZveCwgb3IgU2FmYXJpIGZvciBkZXZlbG9wbWVudDwvbGk+XG4gICAgICAgICAgICAgICAgICA8bGk+T3Igd2FpdCBmb3IgQ2hyb21lIDEzMCsgd2hpY2ggZml4ZXMgdGhpcyBpc3N1ZTwvbGk+XG4gICAgICAgICAgICAgICAgICA8bGk+T3IgdXNlIHRoZSBwcm9kdWN0aW9uIGJ1aWxkOiA8Y29kZT5ucG0gcnVuIGJ1aWxkICYmIG5wbSBydW4gc3RhcnQ8L2NvZGU+PC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDxwPkZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWUgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9zdGFja2JsaXR6L2JvbHQubmV3L2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMjM5NTUxOTI1OFwiPnRoaXMgR2l0SHViIGlzc3VlPC9hPi48L3A+XG4gICAgICAgICAgICAgICAgPHA+PGI+Tm90ZTo8L2I+IFRoaXMgb25seSBpbXBhY3RzIGxvY2FsIGRldmVsb3BtZW50LiBQcm9kdWN0aW9uIGJ1aWxkcyB3b3JrIGZpbmUgaW4gdGhpcyBicm93c2VyLjwvcD5cbiAgICAgICAgICAgICAgPC9ib2R5PmAsXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbmV4dCgpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgfTtcbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsZ0NBQWdDLHlCQUF5QixjQUFjLHVCQUF1QjtBQUNoVSxPQUFPLFlBQVk7QUFDbkIsU0FBUyxvQkFBd0M7QUFDakQsU0FBUyxxQkFBcUI7QUFDOUIsU0FBUywwQkFBMEI7QUFDbkMsT0FBTyxtQkFBbUI7QUFDMUIsWUFBWSxZQUFZO0FBRWpCLGNBQU87QUFFZCxJQUFPLHNCQUFRLGFBQWEsQ0FBQ0EsWUFBVztBQUN0QyxTQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsTUFDTix3QkFBd0IsS0FBSyxVQUFVLFFBQVEsSUFBSSxRQUFRO0FBQUEsSUFDN0Q7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxJQUNWO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNLFFBQVEsSUFBSSxxQkFBcUIsWUFBWTtBQUFBLE1BQ25ELE1BQU0sUUFBUSxJQUFJLHFCQUFxQixNQUFPO0FBQUEsTUFDOUMsS0FBSztBQUFBLFFBQ0gsTUFBTSxRQUFRLElBQUks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
