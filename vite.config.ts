import path, { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, resolve(__dirname, 'env'))

  const baseApiProxy = env.VITE_APP_BASE_API ? {
    [env.VITE_APP_BASE_API]: {
      target: 'https://admin.uat.dusto-yc.com',
      changeOrigin: true,
      secure: false,
      rewrite: (path) => path.replace(`^${env.VITE_APP_BASE_API}`, '')
    }
  } : {}

  return defineConfig({
    base: './',
    envDir: resolve(__dirname, 'env'),
    server: {
      port: 9527,
      cors: true, // 允许跨域
      // 设置代理，根据我们项目实际情况配置
      proxy: {
        ...baseApiProxy
      }
    },
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],
        symbolId: 'icon-[dir]-[name]'
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json']
    }
  })
}
