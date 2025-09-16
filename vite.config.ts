import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    return {
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'Nonboard',
          fileName: 'index',
          formats: ['es']
        },
      }
    }
  }

  return {
    server: {
      port: 9273,
      allowedHosts: ['coracle-client.ngrok.io'],
    },
  }
})
