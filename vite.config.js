import { defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

/* const env = loadEnv(
  'all',
  process.cwd()
);
 */
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: "https://kelmauth.onrender.com",
        changeOrigin: true
      }
    }
  }
})
