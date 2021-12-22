<template>
  <div class="layui-container" >
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8">
          <imooc-top></imooc-top>
          <imooc-list></imooc-list>
        </div>
        <div class="layui-col-md4">
          <imooc-tips></imooc-tips>
          <imooc-sign></imooc-sign>
          <imooc-hotlist></imooc-hotlist>
          <imooc-ads></imooc-ads>
          <imooc-links></imooc-links>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import List from '@/components/contents/List.vue'
import Top from '@/components/contents/Top.vue'
import Ads from '@/components/sidebar/Ads.vue'
import HotList from '@/components/sidebar/Hotlist.vue'
import Links from '@/components/sidebar/Links.vue'
import Sign from '@/components/sidebar/Sign.vue'
import Tips from '@/components/sidebar/Tips.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'index',
  components: {
    'imooc-tips': Tips,
    'imooc-sign': Sign,
    'imooc-hotlist': HotList,
    'imooc-ads': Ads,
    'imooc-links': Links,
    'imooc-list': List,
    'imooc-top': Top
  }
})
</script>

<style lang="scss" scoped>

</style>
