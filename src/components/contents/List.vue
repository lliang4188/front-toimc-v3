<template>
  <div class="fly-panel" style="margin-bottom: 0">
    <div class="fly-panel-title fly-filter">
      <a href="javascript:;" :class="{'layui-this': state.status === '' && state.tag === ''}" @click="search(null)">综合</a>
      <span class="fly-mid"></span>
      <a href="javascript:;" :class="{'layui-this': state.status === '0'}" @click="search(0)">未结</a>
      <span class="fly-mid"></span>
      <a href="javascript:;" :class="{'layui-this': state.status === '1'}" @click="search(1)">已结</a>
      <span class="fly-mid"></span>
      <a href="javascript:;" :class="{'layui-this':  state.status === '' && state.tag === '精华'}" @click="search(2)">精华</a>
      <span class="fly-filter-right layui-hide-xs">
        <a href="javascript:;" :class="{'layui-this': state.sort === 'created'}" @click="search(3)">按最新</a>
        <span class="fly-mid"></span>
        <a href="javascript:;" :class="{'layui-this': state.sort === 'answer'}" @click="search(4)">按热议</a>
      </span>
    </div>
    <list-item :lists="state.lists" :isEnd="state.isEnd" @nextpage = "nextPage()"></list-item>
  </div>
</template>

<script lang="ts">

import { defineComponent, onMounted, toRef, watch } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import { listService } from '../../common/provides/list'
import ListItem from './ListItem.vue'
export default defineComponent({
  name: 'list',
  components: {
    ListItem
  },
  setup () {
    const { state, search, handleGetList, init, nextPage } = listService()
    onBeforeRouteUpdate(to => {
      state.catalog = to.params.catalog.toString()
      init()
    })
    onMounted(() => {
      handleGetList()
    })

    const current = toRef(state, 'current')
    watch(current, init)
    return {
      state,
      search,
      nextPage
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
