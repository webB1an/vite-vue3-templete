import { createApp } from 'vue'

import 'virtual:svg-icons-register'

import App from './App.vue'
import router from './router'
import store from './store'

import SvgIcon from '@/components/SvgIcon.vue'

const app = createApp(App)

app.component('SvgIcon', SvgIcon)

app.use(store)
app.use(router)
app.mount('#app')
