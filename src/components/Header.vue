<template>
  <div class="fly-header layui-bg-black">
    <div class="layui-container">
      <a class="fly-logo" href="/">
        <img src="../assets/img/logo-2.png" alt="layui" />
      </a>
      <ul class="layui-nav fly-nav layui-hide-xs">
        <li class="layui-nav-item layui-this">
          <a href="/"><i class="iconfont icon-jiaoliu"></i>交流</a>
        </li>
        <li class="layui-nav-item">
          <a href="case/case.html"
            ><i class="iconfont icon-iconmingxinganli"></i>案例</a
          >
        </li>
        <li class="layui-nav-item">
          <a href="/" target="_blank"><i class="iconfont icon-ui"></i>框架</a>
        </li>
      </ul>

      <ul class="layui-nav fly-nav-user">
        <!-- 未登入的状态 -->
        <template v-if="!isLogin">
          <li class="layui-nav-item">
            <a
              class="iconfont icon-touxiang layui-hide-xs"
              :to="{ name: 'login' }"
            ></a>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{ name: 'login' }">登入</router-link>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{ name: 'reg' }">注册</router-link>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a href="" title="QQ登入" class="iconfont icon-qq"></a>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a href="" title="微博登入" class="iconfont icon-weibo"></a>
          </li>
        </template>
        <template v-else>
          <li class="layui-nav-item" @mouseover="toggle(true, 200 )" @mouseout="toggle(false, 500)">
            <a class="fly-nav-avatar" :to="{ name: 'center' }">
              <cite class="layui-hide-xs">{{ userInfo.name }}</cite>
              <!-- <i
                class="iconfont icon-renzheng layui-hide-xs"
                title="认证信息：layui 作者"
              ></i> -->
              <i
                class="layui-badge fly-badge-vip layui-hide-xs"
                v-if="userInfo.isVip !== '0'"
                >VIP{{ userInfo.isVip }}</i
              >
              <img :src="userInfo.pic" />
            </a>
            <dl
              class="layui-nav-child layui-anim layui-anim-upbit"
              :class="{ 'layui-show': on }"
            >
              <dd>
                <a :to="{ name: 'info' }"
                  ><i class="layui-icon">&#xe620;</i>基本设置</a
                >
              </dd>
              <dd>
                <a :to="{ name: 'msg' }"
                  ><i class="iconfont icon-tongzhi" style="top: 4px"></i
                  >我的消息</a
                >
              </dd>
              <dd>
                <a
                  :to="{ name: 'home', params: { uid: userInfo._id } }"
                  ><i
                    class="layui-icon"
                    style="margin-left: 2px; font-size: 22px"
                    >&#xe68e;</i
                  >我的主页</a
                >
              </dd>
              <hr style="margin: 5px 0" />
              <dd>
                <a
                  href="javascript:;"
                  style="text-align: center"
                  @click="outLogin()"
                  >退出</a
                >
              </dd>
            </dl>
          </li>
          <div class="fly-nav-msg" v-show="num.message && num.message !== 0">
            {{ num.message }}
          </div>
          <transition name="fade">
            <div
              class="layui-layer-tips layui-anim layui-anim-downbit"
              v-show="hasMsg"
            >
              <div class="layui-layer-content">
                您有{{ num.message }}条未读消息
                <i class="layui-layer-TipsG layui-layer-TipsB"></i>
              </div>
            </div>
          </transition>
        </template>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import toggleUtils from '@/utils/toggle'
import { computed, defineComponent, reactive } from 'vue'
export default defineComponent({
  setup () {
    const state = reactive({
      hoverCtrl: {},
      hasMsg: false
    })
    const { toggle, on } = toggleUtils(false, 200)
    return {
      ...state,
      num: computed(() => store.state.num),
      isLogin: computed(() => store.state.isLogin),
      userInfo: computed(() => store.state.userInfo),
      toggle,
      on
    }
  }
})
</script>

<style lang="scss" scoped>
.fly-logo {
  left: -15px;
  top: -10px;
}
.layui-layer-tips {
  position: absolute;
  right: 0;
  top: 60px;
  white-space: nowrap;
  z-index: 2000;
}
</style>
