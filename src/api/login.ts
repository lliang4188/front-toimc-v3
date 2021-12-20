/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ForgetInfo, LoginInfo, RegInfo, ResetInfo } from '@/common/interface'
import axios from '@/utils/request'
/**
 * 获取验证码接口
 * @param {} sid 唯一标识
 */
const getCode = (sid:string) => {
  return axios.get('/public/getCaptcha', {
    params: {
      sid: sid
    }
  })
}
/**
 * 找回密码接口
 * @param {} options 用户信息（邮箱、验证码）
 */
const forget = (options:ForgetInfo) => {
  return axios.post('/login/forget', {
    ...options
  })
}
/**
 * 登录接口
 * @param {} loginInfo 用户登录信息
 */
const login = (loginInfo: LoginInfo) => {
  return axios.post('/login/login', {
    ...loginInfo
  })
}
/**
 * 注册接口
 * @param {} regInfo 用户注册信息
 */
const reg = (regInfo: RegInfo) => {
  return axios.post('/login/reg', {
    ...regInfo
  })
}
/**
 * 重置密码信息
 * @param {Object} info 重置密码接口
 * @returns
 */
const reset = (info: ResetInfo) => axios.post('/login/reset', { ...info })

export {
  getCode,
  forget,
  login,
  reg,
  reset
}
