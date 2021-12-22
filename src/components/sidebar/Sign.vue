<template>
  <div class="fly-panel fly-signin">
    <div class="fly-panel-title">
      签到
      <i class="fly-mid"></i>
      <a href="javascript:;" class="fly-link" @click="showInfo()">说明</a>
      <i class="fly-mid"></i>
      <a href="javascript:;" class="fly-link" @click="showHot()"
        >活跃榜<span class="layui-badge-dot"></span
      ></a>
      <span class="fly-signin-days" v-if="state.isSign || state.isLogin">已连续签到<cite>{{ count }}</cite>天</span>
    </div>
    <div class="fly-panel-main fly-signin-main">
      <template v-if="!state.isSign">
        <button class="layui-btn layui-btn-danger" type="button" @click="sign()">
          今日签到
        </button>
        <span>可获得<cite>{{ favs }}</cite>飞吻</span>
      </template>

      <!-- 已签到状态 -->
      <template v-else>
          <button class="layui-btn layui-btn-disabled">{{ state.msg }}</button>
          <span>获得了<cite>{{ favs }}</cite>飞吻</span>
      </template>
    </div>
    <!-- 签到说明 -->
    <sign-info :isShow="state.isShow" @close-modal="close"></sign-info>
    <!-- 签到总榜 -->
    <sign-list :isShow="state.showList" @close-modal="close"></sign-list>
  </div>
</template>

<script lang="ts">
import { userSign } from '@/api/user.js'
import { HttpResponse } from '@/common/interface'
import store from '@/store'
import dayjs from 'dayjs'
import { computed, defineComponent, onMounted, reactive } from 'vue'
import SignList from './SignList.vue'
import SignInfo from './SingInfo.vue'
export default defineComponent({
  name: 'sign',
  components: {
    SignInfo,
    SignList
  },
  setup () {
    const state = reactive({
      isShow: false,
      showList: false,
      current: 0,
      isSign: false,
      msg: '',
      userInfo: computed(() => store.state.userInfo),
      isLogin: computed(() => store.state.isLogin)
    })
    let ctrl: number
    const nextSign = () => {
      clearInterval(ctrl)
      const nowDate = dayjs().add(1, 'day').format('YYYY-MM-DD')
      let seconds = dayjs(nowDate + '00:00:00').diff(dayjs(), 'second')
      // 测试用
      // const nowDate = dayjs().add(10, 'second')
      // let seconds = dayjs(nowDate).diff(dayjs(), 'second')
      let hour = Math.floor(seconds / 3600)
      let min = Math.floor(seconds % 3600 / 60)
      let second = seconds % 60
      state.msg = `签到倒计时 ${hour}:${min < 10 ? '0' + min : min}:${second < 10 ? '0' + second : second}`
      ctrl = setInterval(() => {
        seconds = dayjs(nowDate + '00:00:00').diff(dayjs(), 'second')
        // 测试用
        // seconds = dayjs(nowDate).diff(dayjs(), 'second')
        hour = Math.floor(seconds / 3600)
        min = Math.floor(seconds % 3600 / 60)
        second = seconds % 60
        state.msg = `签到倒计时${hour}:${min < 10 ? '0' + min : min}:${second < 10 ? '0' + second : second}`
        if (seconds <= 0) {
          clearInterval(ctrl)
          state.isSign = false
          const user = store.state.userInfo
          user.isSign = false
          store.commit('setUserInfo', user)
        }
      }, 1000)
    }

    const showInfo = () => {
      state.isShow = true
    }

    const showHot = () => {
      state.showList = true
    }

    const close = () => {
      state.isShow = false
      state.showList = false
    }

    const sign = async () => {
      if (!state.isLogin) {
        // this.$pop('shake', '请先登录')
        return
      }
      const res = await userSign()
      const { code, favs, count, lastSign } = res as HttpResponse
      const user = store.state.userInfo
      if (code === 200) {
        user.favs = favs
        user.count = count
        // this.$pop('', '签到成功')
      } else {
        // 用户已经签到
        // this.$pop('', '用户已经签到')
      }
      user.isSign = true
      user.lastSign = lastSign
      state.isSign = true
      store.commit('setUserInfo', user)
      nextSign()
    }

    onMounted(() => {
      const isSign = store.state.userInfo.isSign
      const lastSign = store.state.userInfo.lastSign
      const nowDate = dayjs().format('YYYY-MM-DD')
      const lastDate = dayjs(lastSign).format('YYYY-MM-DD')
      const diff = dayjs(nowDate).diff(dayjs(lastDate), 'day')
      if (diff > 0 && isSign) {
        state.isSign = false
      } else {
        state.isSign = isSign as boolean
        if (diff === 0 && isSign) {
          nextSign()
        } else {
          state.msg = '今日已签到'
        }
      }
    })
    const count = computed(() => {
      if (Object.keys(store.state.userInfo).length !== 0) {
        if (typeof store.state.userInfo.count !== 'undefined') {
          return store.state.userInfo.count
        } else {
          return 0
        }
      } else {
        return 0
      }
    })

    const favs = computed(() => {
      let result = 0
      if (count.value < 5) {
        result = 5
      } else if (count.value >= 5 && count.value < 10) {
        result = 10
      } else if (count.value >= 10 && count.value < 30) {
        result = 15
      } else if (count.value >= 30 && count.value < 100) {
        result = 20
      } else if (count.value >= 100 && count.value < 365) {
        result = 30
      } else if (count.value >= 365) {
        result = 50
      }
      return result
    })
    return {
      state,
      favs,
      count,
      showInfo,
      showHot,
      close,
      sign
    }
  }
})
</script>

<style lang="scss">
@keyframes bounceIn {
  0%{
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.mask{
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0,0,0,.8);
  left: 0;
  top:0;
  z-index: 20000;
}
.layui-layer{
  width: 300px;
  height: 480px;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-top: -240px;
  margin-left: -150px;
  background-color: #fff;
  z-index: 21000;
  &.active{
    animation-fill-mode: both;
    animation-duration: 0.2s;
    animation-name: bounceIn;
  }
  .layui-layer-title{
    height: 42px;
    line-height: 42px;
    padding: 0 10px;
    background-color: #fafafa;
    color: #333;
  }
  .layui-layer-content{
    padding: 20px;
  }
  .layui-tab-content{
    padding: 10px;
    li{
      padding: 0 5px;
    }
  }
  .layui-tab-item{
    line-height: 46px;
    li{
      border-bottom: 1px dotted #dcdcdc;
      &:last-child{
        border-bottom: none;
      }
    }
    img{
      width: 30px;
      height: 30px;
      border-radius: 2px;
    }
  }
}
</style>
