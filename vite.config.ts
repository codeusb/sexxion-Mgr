import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { Plugin as importToCDN } from 'vite-plugin-cdn-import'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    importToCDN({
      modules: [
        {
          name: 'react',
          var: 'React',
          path: `umd/react.production.min.js`,
        },
        {
          name: 'react-dom',
          var: 'ReactDOM',
          path: `umd/react-dom.production.min.js`,
        },
      ],
    }),
  ],
})
