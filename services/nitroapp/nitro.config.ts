import { defineNitroConfig } from "nitropack/config"

// https://nitro.build/config
export default defineNitroConfig({
  compatibilityDate: "latest",
  srcDir: "server",
  imports: false,
  experimental: {
    tasks: true,
    websocket: true,
    database: true,
    asyncContext: true
  },
  database: {
    default: {
      connector: "sqlite",
      options: {
        name: 'db'
      }
    }
  },
  storage: {
    db: {
      driver: "fs",
      base: "./data/db"
    }
  },
  devStorage: {
    db: {
      driver: "fs",
      base: "./data/testdb"
    }
  }
})
