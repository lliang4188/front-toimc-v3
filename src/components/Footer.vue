<template>
   <div class="fly-footer">
    <p>
      <a href="/" target="_blank">Imooc社区</a> 2017 &copy;
      <a href="/" target="_blank">layui.com 出品</a>
    </p>
    <p>
      <a href="https://mp.weixin.qq.com/s/wDY7UuQld3U6zub5MUCtbQ" target="_blank">付费计划</a>
      <a href="https://mp.weixin.qq.com/s/H9JI0dR1jPUN12qsRZ2r5Q" target="_blank">获取Imooc社区模版</a>
      <a href="javascript:void(0)"  @mouseover="toggle(true)"
        @mouseout="toggle(false)"
        style="position:relative;" target="_blank">
        微信公众号
        <img v-if="on" class="qr" src="@/assets/img/qrcode-small.jpg" alt="">
      </a>
    </p>
  </div>
</template>

<script lang="ts">
import toggleUtils from '@/utils/toggle'
import { defineComponent } from 'vue'
export default defineComponent({
  setup () {
    const { toggle, on } = toggleUtils(false, 500)
    return {
      toggle,
      on
    }
  }
})
</script>

<style scoped>
  .qr {
  width: 120px;
  height: 120px;
  position: absolute;
  left: 0;
  top: -130px;
}
</style>
