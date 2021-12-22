<template>
  <imooc-header></imooc-header>
  <router-view/>
  <imooc-footer></imooc-footer>
</template>
<script>
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    'imooc-header': Header,
    'imooc-footer': Footer
  },
  mounted () {
    window.vue = this
  }
})
</script>
<style lang="scss">
@import "./assets/css/global.css";
@import "./assets/css/layui-layer/layer.css";
.svg {
  float: left;
  position: relative;
  top: -4px;
}
.gray{
  color: #999;
}
.text-center{
  text-align: center;
}
.text-left{
  text-align: left;
}
.text-right{
  text-align: right;
}
@for $i from 0 to 5 {
  .pd#{$i * 10} {
    padding: $i * 10 + px !important;
  }
  .pt#{$i * 10} {
    padding-top: $i * 10 + px !important;
  }
  .pl#{$i * 10} {
    padding-left: $i * 10 + px !important;
  }
  .pr#{$i * 10} {
    padding-right: $i * 10 + px !important;
  }
  .mr#{$i * 10} {
    margin-right: $i * 10px !important;
  }
  .ml#{$i * 10} {
     margin-left: $i * 10px !important;
  }
}
.orange{
  color: #ff5722;
}
.pull-right{
  float: right;
}
.d-hide{
  position: absolute;
  overflow: hidden;
  height: 0;
}
.d-flex{
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  &.flex-start{
    justify-content: flex-start;
  }
  &.flex-end{
    justify-content: flex-end;
  }
  &.flex-center{
    justify-content: center;
  }
}
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes bounceOut {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.05);
  }
  100% {
    opacity: 0;
    transform: scale(0.7);
  }
}
</style>
