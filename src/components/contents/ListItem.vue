<template>
  <div>
    <ul class="fly-list">
      <li v-for="(item, index) in items" :key="'list' + index">
        <a href="user/home.html" class="fly-avatar">
          <img
            :src="item.uid.pic"
            :alt="item.uid.name"
          />
        </a>
        <h2>
          <a class="layui-badge">{{item.catalog}}</a>
          <!-- todo -->
          <a :to="{ name:'detail',params:{ tid: item._id }}">{{ item.title }}</a>
        </h2>
        <div class="fly-list-info">
          <!-- todo -->
          <a :to="{name: 'home', params:{uid: item.uid._id}}">
            <cite>{{ item.uid.name }}</cite>
            <!--<i class="iconfont icon-renzheng" title="认证信息：XXX"></i>-->
            <i class="layui-badge fly-badge-vip" v-if="item.uid.isVip !== '0'">{{'VIP' + item.uid.isVip}}</i>
          </a>
          <span>{{ formatDate (item.created) }}</span>

          <span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"
            ><i class="iconfont icon-kiss"></i>{{ item.fav }}</span
          >
          <span class="layui-badge fly-badge-accept layui-hide-xs" v-show="item.isEnd !=='0'">已结</span>
          <span class="fly-list-nums">
            <i class="iconfont icon-pinglun1" title="回答"></i> {{ item.answer }}
          </span>
        </div>
        <div class="fly-list-badge" v-if="item.tags.length > 0 && item.tags[0].name !== ''">
          <span class="layui-badge" v-for="(tag, index) in item.tags" :key="'tag'+ index" :class="tag.class">{{ tag.name }}</span>
        </div>
      </li>
    </ul>
    <div style="text-align: center" v-if="isShow">
      <div class="laypage-main" v-if="!isEnd">
        <a href="javascript:;" class="laypage-next" @click="more()">更多求解</a>
      </div>
      <div class="nomore gray" v-else>没有更多了</div>
    </div>
  </div>
</template>

<script lang="ts">
import { formatDate } from '@/utils/formatDate'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'listitem',
  props: {
    lists: {
      type: Array,
      default: () => []
    },
    isShow: {
      type: Boolean,
      default: true
    },
    isEnd: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    console.log('TCl: -> setup -> props', props)
    const more = () => {
      emit('nextpage')
    }
    return {
      formatDate,
      more
    }
  },
  computed: {
    items () {
      this.lists.map((item:any) => {
        switch (item.catalog) {
          case 'ask' :
            item.catalog = '提问'
            break
          case 'share':
            item.catalog = '分享'
            break
          case 'discuss':
            item.catalog = '讨论'
            break
          case 'advise':
            item.catalog = '建议'
            break
          case 'notice' :
            item.catalog = '公告'
            break
          case 'logs':
            item.catalog = '动态'
            break
        }
      })
      return this.lists
    }
  }
  // methods: {
  //   more () {
  //     this.$emit('nextpage')
  //   }
  // }
})
</script>

<style lang="scss" scoped>
  .nomore{
    font-size: 16px;
    padding: 30px 0;
  }
</style>
