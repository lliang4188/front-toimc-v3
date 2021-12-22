<template>
  <div v-if="state.on">
    <div class="alert">
      <div class="flex">{{ state.msg }}</div>
      <div v-if="state.type === 'alert'">
        <div class="btnCommon success" @click="close()">确定</div>
      </div>
      <div class="space-round" v-else>
        <div class="btnCommon cancel" @click="cancelEvent()">取消</div>
        <div class="btnCommon success" @click="successEvent()">确定</div>
      </div>
    </div>
    <div class="mask" @click="close()"></div>
  </div>
</template>

<script lang="ts">
import toggleUtils from '@/utils/toggle'
import { computed, defineComponent, reactive } from 'vue'
export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'alert'
    },
    isShow: {
      type: Boolean,
      default: false
    },
    msg: {
      type: String,
      default: '这是Alert弹窗'
    },
    success: {
      type: Function,
      default: () => {
        console.log('点击了确定')
      }
    },
    cancel: {
      type: Function,
      default: () => {
        console.log('点击了取消')
      }
    },
    unmount: {
      type: Function,
      default: () => {
        console.log('unmount 根节点')
      }
    }
  },
  setup (props) {
    const { toggle, on } = toggleUtils(true, 0)
    const state = reactive({
      toggle,
      on,
      msg: computed(() => props.msg),
      type: computed(() => props.type)
    })
    const close = () => {
      state.toggle(false)
      // 删除对应的节点
      props.unmount()
    }

    const cancelEvent = () => {
      props.cancel && props.cancel()
      close()
    }

    const successEvent = () => {
      props.success && props.success()
      close()
    }
    return {
      state,
      close,
      cancelEvent,
      successEvent
    }
  }
})
</script>

<style lang="scss" scoped>
  .alert{
    width: 300px;
    height: 150px;
    background-color: #fff;
    border-radius: 6px;
    position: fixed;
    top:50%;
    left: 50%;
    padding: 20px 10px;
    transform: translate(-50%, -50%);
    box-shadow: 0 5px 8px rgba(0,0,0,0.05);
    z-index: 3000;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
  }
  .flex {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .space-round{
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    padding: 0 10px;
  }
  .btnCommon{
    width: 105px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-radius: 6px;
    cursor: pointer;
    &.success{
      background-color: #009688;
      color: #fff;
      &:hover {
        background-color: darken(#009688,  5%);
      }
    }
    &.cancel{
      background-color: #ededed;
      color: #333;
    }
  }
  .mask {
    width: 100%;
    height: 100%;
    position:fixed;
    left: 0;
    top:0;
    background-color: rgba(0,0,0,0.6);
    overflow: hidden;
    z-index: 2000;
  }
</style>
