/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getList } from '@/api/content'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { HttpResponse } from '../interface'

export const listService = () => {
  const state = reactive({
    isEnd: false,
    isRepeat: false,
    status: '',
    tag: '',
    sort: 'created',
    page: 0,
    limit: 20,
    catalog: '',
    isTop: 0,
    current: '',
    lists: []
  })
  const search = (val: number | null) => {
    if (typeof val === 'undefined' && state.current === '') return
    state.current = val ? val + '' : ''
    switch (val) {
      case 0:
        state.status = '0'
        state.tag = ''
        break
      case 1:
        state.status = '1'
        state.tag = ''
        break
      case 2:
        state.status = ''
        state.tag = '精华'
        break
      case 3:
        state.sort = 'created'
        break
      case 4:
        state.sort = 'answer'
        break
      default:
        state.status = ''
        state.tag = ''
        state.current = ''
    }
  }

  const route = useRoute()
  // console.log('TCl: -> setup -> route', route.params)
  const catalog = route?.params?.catalog as string
  if (typeof catalog !== 'undefined' && catalog !== '') {
    state.catalog = catalog
  }

  const handleGetList = async () => {
    if (state.isRepeat) return
    if (state.isEnd) return
    state.isRepeat = true
    const options = {
      catalog: state.catalog,
      isTop: state.isTop,
      page: state.page,
      limit: state.limit,
      sort: state.sort,
      tag: state.tag,
      status: state.status
    }
    try {
      const res = await getList(options)
      const { code, data } = res as HttpResponse
      // 加入一个请求锁，防止用户多次点击，等待数据返回，再打开
      state.isRepeat = false

      // 对于异常的判断，res.code 非200，我们给用户一个提示
      // 判断lists长度是否为0，如果为0直接赋值
      // 当lists长度不为0，后面请求的数据，加入到lists里面来
      if (code === 200) {
        // 判断res.data长度，如果小于20条，则是最后一页
        if (data.length < state.limit) {
          state.isEnd = true
        }
        if (state.lists.length === 0) {
          state.lists = res.data
        } else {
          state.lists = state.lists.concat(res.data)
        }
      }
    } catch (error) {
      state.isRepeat = false
      if (error) {
        //  this.$alert(err.message)
      }
    }
  }

  const init = () => {
    state.page = 0
    state.lists = []
    state.isEnd = false
    handleGetList()
  }
  const nextPage = () => {
    handleGetList()
  }
  // watch(
  //   () => route.params,
  //   () => {
  //     init()
  //   }
  // )
  return {
    state,
    search,
    init,
    handleGetList,
    nextPage
  }
}
