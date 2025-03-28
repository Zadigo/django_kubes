/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/vue" />

interface ImportMetaEnv {
  readonly VITE_PROD_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
