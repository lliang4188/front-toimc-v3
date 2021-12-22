<template>
  <div class="model" v-show="isShow">
    <div class="mask" @click="close()"></div>
    <div class="layui-layer layui-layer-page" :class="{ active: isShow }">
      <div class="layui-layer-title">
        签到活跃榜-TOP20<i
          class="layui-icon layui-icon-close pull-right"
          @click="close()"
        ></i>
      </div>
      <div class="layui-layer-content pd0">
        <div class="layui-tab layui-tab-brief">
          <ul class="layui-tab-title">
            <li :class="{ 'layui-this': state.current === 2 }" @click="choose(2)">
              最新签到
            </li>
            <li :class="{ 'layui-this': state.current === 1 }" @click="choose(1)">
              今日最快
            </li>
            <li :class="{ 'layui-this': state.current === 0 }" @click="choose(0)">
              签到总榜
            </li>
          </ul>
          <div class="layui-tab-content fly-signin-list">
            <ul class="layui-tab-item layui-show">
              <li v-for="(item, index) in state.lists" :key="'sign' + index">
                <img v-if="state.current=== 0" :src="item.pic ? item.pic : '/img/head.jpeg' " class="mr10"/>
                <img v-else :src="item.uid ? item.uid.pic : '/img/head.jpeg' " class="mr10" />
                <cite class="fly-link">{{ item.name ? item.name : item.uid.name}}</cite>
                <span class="fly-grey" v-if="current !== 0"
                  >签到于 {{ hours(item.created) }}</span
                >
                <span class="fly-grey" v-else >已经连续签到 <i class="orange">{{ item.count }}</i>天</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getHotSignRecord } from '@/api/hot'
import { hours } from '@/utils/formatDate'
import { defineComponent, onMounted, reactive } from '@vue/runtime-core'
import { HttpResponse } from '@/common/interface'
export default defineComponent({
  name: 'sign-list',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const state = reactive({
      current: 2,
      lists: [],
      page: 0,
      limit: 20
    })
    const getList = async () => {
      const res = await getHotSignRecord({
        page: state.page,
        limit: state.limit,
        index: state.current
      })
      const { code, data } = res as HttpResponse

      if (code === 200) {
        state.lists = data
      }
    }
    const close = () => {
      emit('close-modal')
    }

    const choose = (val: number) => {
      state.current = val
      getList()
    }
    onMounted(() => {
      getList()
    })
    return {
      state,
      close,
      choose,
      hours
    }
  }
  // data () {
  //   return {
  //     current: 2,
  //     lists: [],
  //     page: 0,
  //     limit: 20
  //   }
  // },
  // mounted () {
  //   this.getList()
  // },

  // methods: {
  //   close () {
  //     this.$emit('closeModal')
  //   },
  //   choose (val) {
  //     this.current = val
  //     this.getList()
  //   },
  //   getList () {
  //     getHotSignRecord({
  //       page: this.page,
  //       limit: this.limit,
  //       index: this.current
  //     }).then((res) => {
  //       if (res.code === 200) {
  //         this.lists = res.data
  //       }
  //     })
  //   }
  // }
})
</script>

<style lang="scss" scoped>
</style>
