// vite.config.ts
import { dirname, resolve } from "path";
import { defineConfig, loadEnv } from "file:///D:/mywebsites/django_kubes/frontend/node_modules/.pnpm/vite@5.4.15_@types+node@22._98b700f0e579bdfa378f14e419bf3e5b/node_modules/vite/dist/node/index.js";
import { fileURLToPath } from "url";
import { VitePWA } from "file:///D:/mywebsites/django_kubes/frontend/node_modules/.pnpm/vite-plugin-pwa@0.20.5_@vit_056543768afc56853db5791137124a4b/node_modules/vite-plugin-pwa/dist/index.js";
import { unheadVueComposablesImports } from "file:///D:/mywebsites/django_kubes/frontend/node_modules/.pnpm/@unhead+vue@2.0.2_vue@3.5.13_typescript@5.8.2_/node_modules/@unhead/vue/dist/index.mjs";
import vue from "file:///D:/mywebsites/django_kubes/frontend/node_modules/.pnpm/@vitejs+plugin-vue@5.2.3_vi_f23cccdd0228b3b420447ba30a08b420/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import eslint from "file:///D:/mywebsites/django_kubes/frontend/node_modules/.pnpm/vite-plugin-eslint@1.8.1_es_6c052945c470eb9c978c89a3a7db832a/node_modules/vite-plugin-eslint/dist/index.mjs";
import vueI18n from "file:///D:/mywebsites/django_kubes/frontend/node_modules/.pnpm/@intlify+unplugin-vue-i18n@_dc58825f0338ce07e6d4c0586a59077a/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
import unheadAddons from "file:///D:/mywebsites/django_kubes/frontend/node_modules/.pnpm/@unhead+addons@2.0.2_rollup@2.79.2/node_modules/@unhead/addons/dist/vite.mjs";
import unpluginViteComponents from "file:///D:/mywebsites/django_kubes/frontend/node_modules/.pnpm/unplugin-vue-components@28._63018fd109f3d6bf8a0caf47e0c80a0a/node_modules/unplugin-vue-components/dist/vite.js";
import autoImport from "file:///D:/mywebsites/django_kubes/frontend/node_modules/.pnpm/unplugin-auto-import@19.2.0_3555d0886d0f8edcc7bc80ca039a7a74/node_modules/unplugin-auto-import/dist/vite.js";
var __vite_injected_original_dirname = "D:\\mywebsites\\django_kubes\\frontend";
var __vite_injected_original_import_meta_url = "file:///D:/mywebsites/django_kubes/frontend/vite.config.ts";
var vite_config_default = defineConfig(({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  process.env = { ...process.env, ...env };
  return {
    root,
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(__vite_injected_original_dirname, "src")
        },
        {
          find: "src",
          replacement: resolve(__vite_injected_original_dirname, "src")
        }
      ]
    },
    plugins: [
      vue(),
      eslint(),
      unheadAddons(),
      unpluginViteComponents({
        deep: true,
        dts: "src/types/components.d.ts",
        dirs: [
          "src/components",
          "src/layouts"
        ],
        extensions: [
          "vue"
        ]
      }),
      autoImport({
        dts: "src/types/auto-imports.d.ts",
        vueTemplate: true,
        imports: [
          "vue",
          "pinia",
          "@vueuse/core",
          unheadVueComposablesImports
        ],
        dirs: [
          "src/plugins",
          "src/stores",
          "src/composables"
        ]
      }),
      VitePWA({
        registerType: "autoUpdate",
        injectRegister: false,
        pwaAssets: {
          disabled: false,
          config: true
        },
        manifest: {
          name: "Frontend",
          short_name: "Frontend",
          description: "Frontend application",
          theme_color: "#ffffff"
        },
        workbox: {
          globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
          cleanupOutdatedCaches: true,
          clientsClaim: true
        },
        devOptions: {
          enabled: false,
          navigateFallback: "index.html",
          suppressWarnings: true,
          type: "module"
        }
      }),
      vueI18n({
        include: resolve(dirname(fileURLToPath(__vite_injected_original_import_meta_url)), "./src/locales/**"),
        fullInstall: false,
        compositionOnly: true
      })
    ],
    test: {
      globals: true,
      environment: "happy-dom",
      setupFiles: "./tests/setup.ts"
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxteXdlYnNpdGVzXFxcXGRqYW5nb19rdWJlc1xcXFxmcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcbXl3ZWJzaXRlc1xcXFxkamFuZ29fa3ViZXNcXFxcZnJvbnRlbmRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L215d2Vic2l0ZXMvZGphbmdvX2t1YmVzL2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9J3ZpdGVzdCcgLz5cblxuaW1wb3J0IHsgZGlybmFtZSwgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ3VybCdcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnXG5pbXBvcnQgeyB1bmhlYWRWdWVDb21wb3NhYmxlc0ltcG9ydHMgfSBmcm9tICdAdW5oZWFkL3Z1ZSdcblxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgZXNsaW50IGZyb20gJ3ZpdGUtcGx1Z2luLWVzbGludCdcbmltcG9ydCB2dWVJMThuIGZyb20gJ0BpbnRsaWZ5L3VucGx1Z2luLXZ1ZS1pMThuL3ZpdGUnXG5pbXBvcnQgdW5oZWFkQWRkb25zIGZyb20gJ0B1bmhlYWQvYWRkb25zL3ZpdGUnXG5pbXBvcnQgdW5wbHVnaW5WaXRlQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IHRhaWx3aW5kIGZyb20gJ0B0YWlsd2luZGNzcy92aXRlJ1xuaW1wb3J0IGF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcblxuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICBjb25zdCByb290ID0gcHJvY2Vzcy5jd2QoKVxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHJvb3QpXG4gIHByb2Nlc3MuZW52ID0geyAuLi5wcm9jZXNzLmVudiwgLi4uZW52IH1cblxuICByZXR1cm4ge1xuICAgIHJvb3QsXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6ICdAJyxcbiAgICAgICAgICByZXBsYWNlbWVudDogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZmluZDogJ3NyYycsXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJylcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgdnVlKCksXG4gICAgICBlc2xpbnQoKSxcbiAgICAgIHVuaGVhZEFkZG9ucygpLFxuICAgICAgdW5wbHVnaW5WaXRlQ29tcG9uZW50cyh7XG4gICAgICAgIGRlZXA6IHRydWUsXG4gICAgICAgIGR0czogJ3NyYy90eXBlcy9jb21wb25lbnRzLmQudHMnLFxuICAgICAgICBkaXJzOiBbXG4gICAgICAgICAgJ3NyYy9jb21wb25lbnRzJyxcbiAgICAgICAgICAnc3JjL2xheW91dHMnXG4gICAgICAgIF0sXG4gICAgICAgIGV4dGVuc2lvbnM6IFtcbiAgICAgICAgICAndnVlJ1xuICAgICAgICBdXG4gICAgICB9KSxcbiAgICAgIGF1dG9JbXBvcnQoe1xuICAgICAgICBkdHM6ICdzcmMvdHlwZXMvYXV0by1pbXBvcnRzLmQudHMnLFxuICAgICAgICB2dWVUZW1wbGF0ZTogdHJ1ZSxcbiAgICAgICAgaW1wb3J0czogW1xuICAgICAgICAgICd2dWUnLFxuICAgICAgICAgICdwaW5pYScsXG4gICAgICAgICAgJ0B2dWV1c2UvY29yZScsXG4gICAgICAgICAgdW5oZWFkVnVlQ29tcG9zYWJsZXNJbXBvcnRzXG4gICAgICAgIF0sXG4gICAgICAgIGRpcnM6IFtcbiAgICAgICAgICAnc3JjL3BsdWdpbnMnLFxuICAgICAgICAgICdzcmMvc3RvcmVzJyxcbiAgICAgICAgICAnc3JjL2NvbXBvc2FibGVzJ1xuICAgICAgICBdXG4gICAgICB9KSxcbiAgICAgIFZpdGVQV0Eoe1xuICAgICAgICByZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcbiAgICAgICAgaW5qZWN0UmVnaXN0ZXI6IGZhbHNlLFxuXG4gICAgICAgIHB3YUFzc2V0czoge1xuICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgICBjb25maWc6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgbWFuaWZlc3Q6IHtcbiAgICAgICAgICBuYW1lOiAnRnJvbnRlbmQnLFxuICAgICAgICAgIHNob3J0X25hbWU6ICdGcm9udGVuZCcsXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdGcm9udGVuZCBhcHBsaWNhdGlvbicsXG4gICAgICAgICAgdGhlbWVfY29sb3I6ICcjZmZmZmZmJ1xuICAgICAgICB9LFxuICAgICAgICB3b3JrYm94OiB7XG4gICAgICAgICAgZ2xvYlBhdHRlcm5zOiBbJyoqLyoue2pzLGNzcyxodG1sLHN2ZyxwbmcsaWNvfSddLFxuICAgICAgICAgIGNsZWFudXBPdXRkYXRlZENhY2hlczogdHJ1ZSxcbiAgICAgICAgICBjbGllbnRzQ2xhaW06IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgZGV2T3B0aW9uczoge1xuICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgIG5hdmlnYXRlRmFsbGJhY2s6ICdpbmRleC5odG1sJyxcbiAgICAgICAgICBzdXBwcmVzc1dhcm5pbmdzOiB0cnVlLFxuICAgICAgICAgIHR5cGU6ICdtb2R1bGUnXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgdnVlSTE4bih7XG4gICAgICAgIGluY2x1ZGU6IHJlc29sdmUoZGlybmFtZShmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCkpLCAnLi9zcmMvbG9jYWxlcy8qKicpLFxuICAgICAgICBmdWxsSW5zdGFsbDogZmFsc2UsXG4gICAgICAgIGNvbXBvc2l0aW9uT25seTogdHJ1ZVxuICAgICAgfSlcbiAgICBdLFxuICAgIHRlc3Q6IHtcbiAgICAgIGdsb2JhbHM6IHRydWUsXG4gICAgICBlbnZpcm9ubWVudDogJ2hhcHB5LWRvbScsXG4gICAgICBzZXR1cEZpbGVzOiAnLi90ZXN0cy9zZXR1cC50cydcbiAgICB9XG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsU0FBUyxTQUFTLGVBQWU7QUFDakMsU0FBUyxjQUFjLGVBQWU7QUFDdEMsU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsbUNBQW1DO0FBRTVDLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sa0JBQWtCO0FBQ3pCLE9BQU8sNEJBQTRCO0FBRW5DLE9BQU8sZ0JBQWdCO0FBZHZCLElBQU0sbUNBQW1DO0FBQTRJLElBQU0sMkNBQTJDO0FBa0J0TyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxRQUFNLE9BQU8sUUFBUSxJQUFJO0FBQ3pCLFFBQU0sTUFBTSxRQUFRLE1BQU0sSUFBSTtBQUM5QixVQUFRLE1BQU0sRUFBRSxHQUFHLFFBQVEsS0FBSyxHQUFHLElBQUk7QUFFdkMsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixhQUFhLFFBQVEsa0NBQVcsS0FBSztBQUFBLFFBQ3ZDO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYSxRQUFRLGtDQUFXLEtBQUs7QUFBQSxRQUN2QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxhQUFhO0FBQUEsTUFDYix1QkFBdUI7QUFBQSxRQUNyQixNQUFNO0FBQUEsUUFDTixLQUFLO0FBQUEsUUFDTCxNQUFNO0FBQUEsVUFDSjtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsUUFDQSxZQUFZO0FBQUEsVUFDVjtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQSxNQUNELFdBQVc7QUFBQSxRQUNULEtBQUs7QUFBQSxRQUNMLGFBQWE7QUFBQSxRQUNiLFNBQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLFFBQ0EsTUFBTTtBQUFBLFVBQ0o7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQSxNQUNELFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxRQUNkLGdCQUFnQjtBQUFBLFFBRWhCLFdBQVc7QUFBQSxVQUNULFVBQVU7QUFBQSxVQUNWLFFBQVE7QUFBQSxRQUNWO0FBQUEsUUFDQSxVQUFVO0FBQUEsVUFDUixNQUFNO0FBQUEsVUFDTixZQUFZO0FBQUEsVUFDWixhQUFhO0FBQUEsVUFDYixhQUFhO0FBQUEsUUFDZjtBQUFBLFFBQ0EsU0FBUztBQUFBLFVBQ1AsY0FBYyxDQUFDLGdDQUFnQztBQUFBLFVBQy9DLHVCQUF1QjtBQUFBLFVBQ3ZCLGNBQWM7QUFBQSxRQUNoQjtBQUFBLFFBQ0EsWUFBWTtBQUFBLFVBQ1YsU0FBUztBQUFBLFVBQ1Qsa0JBQWtCO0FBQUEsVUFDbEIsa0JBQWtCO0FBQUEsVUFDbEIsTUFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGLENBQUM7QUFBQSxNQUNELFFBQVE7QUFBQSxRQUNOLFNBQVMsUUFBUSxRQUFRLGNBQWMsd0NBQWUsQ0FBQyxHQUFHLGtCQUFrQjtBQUFBLFFBQzVFLGFBQWE7QUFBQSxRQUNiLGlCQUFpQjtBQUFBLE1BQ25CLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxNQUFNO0FBQUEsTUFDSixTQUFTO0FBQUEsTUFDVCxhQUFhO0FBQUEsTUFDYixZQUFZO0FBQUEsSUFDZDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
