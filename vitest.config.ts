import { defineConfig } from "vitest/config";
import path from 'path'

export default defineConfig({
  test: {
    globals: true
  },
  resolve: {
    alias: [
      {
        // @my-vue/runtime-core/src
        find: /@my-vue\/(\w*)/,
        replacement: path.resolve(__dirname, "packages") + "/$1/src"
      }
    ]
  }
})