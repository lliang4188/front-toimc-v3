import axios from '@/utils/request'
import qs from 'qs'

// 热门帖子
export const getHotPost = (data) => axios.get('/public/hotPost?' + qs.stringify(data))
// 热门评论
export const getHotComments = (data) => axios.get('/public/hotComments?' + qs.stringify(data))
// 签到排行
export const getHotSignRecord = (data) => axios.get('/public/hotSignRecord?' + qs.stringify(data))
