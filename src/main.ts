import '@/common/vee-validate'
import Alert from '@/components/modules/alert'
import Pop from '@/components/modules/pop'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(Alert)
app.use(Pop)
app.use(store)
app.use(router)

app.mount('#app')
