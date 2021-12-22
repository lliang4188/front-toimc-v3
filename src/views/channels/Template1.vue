<template>
  <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8">
          <imooc-list></imooc-list>
        </div>
        <div class="layui-col-md4">
          <imooc-hotlist></imooc-hotlist>
          <imooc-ads></imooc-ads>
          <imooc-links></imooc-links>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import List from '@/components/contents/List.vue'
import Ads from '@/components/sidebar/Ads.vue'
import HotList from '@/components/sidebar/Hotlist.vue'
import Links from '@/components/sidebar/Links.vue'
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  name: 'index',
  components: {
    'imooc-hotlist': HotList,
    'imooc-ads': Ads,
    'imooc-links': Links,
    'imooc-list': List
  }
})
</script>

<style lang="scss" scoped>

</style>
