<template>
  <div class="fly-panel"  v-if="state.lists.length > 0">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a
        href="#signin"
        class="layui-hide-sm layui-show-xs-block fly-right"
        id="LAY_goSignin"
        style="color: #ff5722"
        >去签到</a
      >
    </div>
    <list-item :lists="state.lists" :isShow="false"></list-item>
  </div>
</template>

<script lang="ts">
import { listService } from '@/common/provides/list'
import { defineComponent, onMounted } from '@vue/runtime-core'
import ListItem from './ListItem.vue'
export default defineComponent({
  name: 'top',
  components: {
    ListItem
  },

  setup () {
    const { state, handleGetList } = listService()
    state.isTop = 1
    onMounted(() => {
      handleGetList()
    })
    return {
      state
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
