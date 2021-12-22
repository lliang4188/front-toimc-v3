/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import store from '@/store'
import axios from '@/utils/request'
import qs from 'qs'

/**
 * 读取文章列表
 * @param {*} options 读取文章列表的参数
 * @returns
 */
const getList = (options:any) => {
  return axios.get('/public/list?' + qs.stringify(options))
}

// 温馨提醒
const getTips = () => axios.get('/public/tips')

// 本周热议
const getTop = () => axios.get('/public/topWeek')

// 友情链接
const getLinks = () => axios.get('/public/links')

// 图片上传接口
const uploadImg = (formData:any) => axios.post('/content/upload', formData)

// 发帖接口
const addPost = (data:any) => axios.post('/content/add', { ...data })

// 文章详情
const getDetail = (tid:string) => {
  const token = store.state.token
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        Authorization: 'Bearer ' + store.state.token
      }
    }
  }
  return axios.get('/public/content/detail?tid=' + tid, headers)
}

// 更新文章，编辑帖子
const updatePost = (data:any) => axios.post('/content/update', { ...data })

export {
  getList,
  getTips,
  getTop,
  getLinks,
  uploadImg,
  addPost,
  getDetail,
  updatePost
}
