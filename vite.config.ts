import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, resolve(__dirname, 'env'))
  console.log(loadEnv(mode, resolve(__dirname, 'env')), env.VITE_APP_BASE_API, '-')
  return defineConfig({
    base: './',
    envDir: resolve(__dirname, 'env'),
    server: {
      port: 9527,
      cors: true, // 允许跨域
      // 设置代理，根据我们项目实际情况配置
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: 'http://xxx.xxx.xxx.xxx:8000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(`^${env.VITE_APP_BASE_API}`, '')
        }
      }
    },
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json']
    }
  })
}
