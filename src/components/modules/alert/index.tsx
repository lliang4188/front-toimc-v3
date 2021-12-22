/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { App, createApp } from 'vue'
import AlertComponent from './Alert.vue'

export const alert = (msg:string) => {
  // 1、添加alert 根点
  const root = document.createElement('div')
  document.body.appendChild(root)
  // 2、添加Alert组件 -> props

  const opions = {
    type: 'alert',
    msg
  }
  const alertCom = createApp({
    setup () {
      const unmount = () => {
        alertCom.unmount()
        document.body.removeChild(root)
      }
      const newOptions = Object.assign(opions, { unmount })
      return () => (<AlertComponent { ...newOptions } />)
    }
  })

  alertCom.mount(root)
}

export const confirm = (msg:string, success:any, cancel:any) => {
  // 1、添加alert 根点
  const root = document.createElement('div')
  document.body.appendChild(root)
  // 2、添加Alert组件 -> props

  const opions = {
    type: 'confirm',
    msg,
    success,
    cancel
  }
  const alertCom = createApp({
    setup () {
      const unmount = () => {
        alertCom.unmount()
        document.body.removeChild(root)
      }
      const newOptions = Object.assign(opions, { unmount })
      return () => (<AlertComponent { ...newOptions } />)
    }
  })

  alertCom.mount(root)
}

export default {
  install: (app: App) => {
    app.config.globalProperties.$alert = alert
    app.config.globalProperties.$confirm = confirm
  }
}
