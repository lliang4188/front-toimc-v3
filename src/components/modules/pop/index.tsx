/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { App, createApp } from 'vue'
import PopComponent from './Pop.vue'

export const pop = (type:string, msg:string) => {
  // 1、添加alert 根点
  const root = document.createElement('div')
  document.body.appendChild(root)
  // 2、添加Pop组件 -> props
  const options = {
    type,
    msg
  }

  const popCom = createApp({
    setup () {
      return () => (<PopComponent { ...options } />)
    }
  })
  popCom.mount(root)
}

export default {
  install: (app: App) => {
    app.config.globalProperties.$pop = pop
  }
}
