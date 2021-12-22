<template>
  <div>
    <dl class="fly-panel fly-list-one">
      <dt class="fly-panel-title">本周热议</dt>

      <!-- 无数据时 -->
      <div class="fly-none">没有相关数据</div>
    </dl>
  </div>
</template>

<script lang="ts">
// import { getTop } from '@/api/content'
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  name: 'hotlist'
  // data () {
  //   return {
  //     lists: []
  //   }
  // },
  // mounted () {
  //   getTop().then((res) => {
  //     if (res.code === 200) {
  //       this.lists = res.data
  //     }
  //   })
  // }
})
</script>

<style lang="scss" scoped>
</style>
