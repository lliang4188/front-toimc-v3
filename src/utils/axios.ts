/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// 封装axios的请求，返回重新封装的数据格式
// 对错误对统一处理

import { HttpResponse } from '@/common/interface'
import PublicConfig from '@/config'
import store from '@/store'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Canceler } from 'axios'
import errorHandle from './errorHandle'
const CancelToken = axios.CancelToken

class HttpRequest {
  private baseUrl: string;
  private pending: Record<string, Canceler>

  constructor (baseUrl:string) {
    this.baseUrl = baseUrl
    this.pending = {}
  }

  // 获取 axios 配置
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000
    }
    return config
  }

  removePending (key: string, isRequest = false) {
    if (this.pending[key] && isRequest) {
      this.pending[key]('取消重复的请求')
    }
    delete this.pending[key]
  }

  // 设定拦截器
  interceptors (instance: AxiosInstance) {
    // 请求拦截器
    instance.interceptors.request.use((config: any) => {
      let isPublic = false
      PublicConfig.publicPath.map((path) => {
        isPublic = isPublic || path.test(config.url || '')
      })
      const token = store.state.token
      if (!isPublic && token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      // Do something before request is sent
      const key = config.url + '&' + config.method
      this.removePending(key, true)
      config.cancelToken = new CancelToken((c) => {
        this.pending[key] = c
      })
      // console.log('config' + config)
      return config
    },
    err => {
      errorHandle(err)
      // Do something with request error
      return Promise.reject(err)
    }
    )

    // 响应请求拦截器
    instance.interceptors.response.use(
      res => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        // console.log('res is: ' + res)
        const key = res.config.url + '&' + res.config.method
        this.removePending(key)
        if (res.status === 200) {
          return Promise.resolve(res.data)
        } else {
          return Promise.reject(res)
        }
      },
      err => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        // debugger
        errorHandle(err)
        return Promise.reject(err)
      }
    )
  }

  // 创建实例
  request (options: AxiosRequestConfig) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return instance(newOptions)
  }

  get (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> | Promise<HttpResponse> {
    const options = Object.assign(
      {
        method: 'get',
        url: url
      },
      config
    )
    return this.request(options)
  }

  post (url:string, data?: any): Promise<AxiosResponse> | Promise<HttpResponse> {
    return this.request({
      method: 'post',
      url: url,
      data: data
    })
  }
}

export default HttpRequest
