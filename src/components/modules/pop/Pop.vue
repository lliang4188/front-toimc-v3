<template>
   <div class="tips animation" v-show="state.isShow" :class="{'shake': type==='shake'}" ref="tips">
    <div class="content">{{ msg }}</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from 'vue'
export default defineComponent({
  name: 'Pop',
  props: {
    type: {
      type: String,
      default: ''
    },
    msg: {
      type: String,
      default: ''
    },
    unmount: {
      type: Function,
      default: () => {
        console.log('unmount 根节点')
      }
    }
  },
  setup (props) {
    const state = reactive({
      isShow: false,
      msg: computed(() => props.msg),
      type: computed(() => props.type)
    })

    const togglePop = () => {
      if (!state.isShow) {
        state.isShow = true
        setTimeout(() => {
          state.isShow = false
        }, 2000)
      }
    }
    onMounted(() => {
      togglePop()
    })
    return {
      state
    }
  }
})
</script>

<style lang="scss" scoped>
   @keyframes shake {
    0%, 100% {
      transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
      transform: translateX(-10px);
    }
    20%, 40%, 60%, 80% {
      transform: translateX(10px);
    }
  }
  @keyframes anShow {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 100;
    }
  }
  .tips{
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 2000;
  }
  .animation {
    animation-fill-mode: both;
    animation-duration: .2s;
    animation-name: anShow;
  }
  .content {
    background-color: rgba(0,0,0,0.6);
    color: #fff;
    padding: 10px 15px;
    border-radius: 6px;
  }
  .shake {
    animation-name: shake;
  }
</style>
