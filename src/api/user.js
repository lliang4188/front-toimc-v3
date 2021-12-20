import axios from '@/utils/request'
import qs from 'qs'
// 签到接口
const userSign = () => axios.get('/user/fav')

/**
 * 更新用户基本信息
 * @param {Object} data 更新数据
 * @returns
 */

const updateUserInfo = (data) => axios.post('/user/basic', data)

// 确认修改用户名
const updateUsername = (data) => axios.get('/public/reset-email?' + qs.stringify(data))

// 修改用户密码
const changePasswd = (data) => axios.post('/user/change-password', {
  ...data
})

// 设置收藏 & 取消收藏
const addCollect = (data) => axios.get('/user/set-collect?' + qs.stringify(data))

// 获取收藏列表
const getCollect = data => axios.get('/user/collect?' + qs.stringify(data))

// 获取我发表的贴
const getPostListByUid = (data) => axios.get('/user/post?' + qs.stringify(data))

// 删除指定文章的贴子
const deletePostByUid = data => axios.get('/user/delete-post?' + qs.stringify(data))

// 获取用户的基本信息
const getInfo = (data) => axios.get('/public/info?' + qs.stringify(data))

// 获取用户最近评论列表
const getCommentList = data => axios.get('/public/latest-comment?' + qs.stringify(data))

// 获取用户最近发帖列表
const getPostPublic = data => axios.get('/public/latest-post?' + qs.stringify(data))

// 获取用户未读消息
const getMsg = data => axios.get('/user/getmsg?' + qs.stringify(data))
// 设置用户未读消息
const setMsg = data => axios.get('/user/setmsg?' + qs.stringify(data))

export {
  userSign,
  updateUserInfo,
  updateUsername,
  changePasswd,
  addCollect,
  getCollect,
  getPostListByUid,
  deletePostByUid,
  getInfo,
  getCommentList,
  getPostPublic,
  getMsg,
  setMsg
}
