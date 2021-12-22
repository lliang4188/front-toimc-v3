<template>
  <div>
    <imooc-panel></imooc-panel>
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8 content detail">
          <div class="fly-panel detail-box">
            <h1>{{ page.title }}</h1>
            <div class="fly-detail-info">
              <!-- <span class="layui-badge">审核中</span> -->
              <span
                class="layui-badge layui-bg-green fly-detail-column"
                v-if="page.catalog === 'ask'"
                >提问</span
              >
              <span
                class="layui-badge layui-bg-green fly-detail-column"
                v-else-if="page.catalog === 'share'"
                >分享</span
              >
              <span
                class="layui-badge layui-bg-green fly-detail-column"
                v-else-if="page.catalog === 'discuss'"
                >讨论</span
              >
              <span
                class="layui-badge layui-bg-green fly-detail-column"
                v-else-if="page.catalog === 'advise'"
                >建议</span
              >
              <span
                class="layui-badge layui-bg-green fly-detail-column"
                v-else-if="page.catalog === 'notice'"
                >公告</span
              >
              <span
                class="layui-badge layui-bg-green fly-detail-column"
                v-else-if="page.catalog === 'logs'"
                >动态</span
              >

              <span
                class="layui-badge"
                style="background-color: #999"
                v-if="page.isEnd === '0'"
                >未结</span
              >
              <span class="layui-badge" style="background-color: #5fb878" v-else
                >已结</span
              >

              <span class="layui-badge layui-bg-black" v-if="page.isTop === '1'"
                >置顶</span
              >
              <span
                class="layui-badge"
                :class="tag.class"
                v-for="(tag, index) in page.tags"
                :key="'tag' + index"
                >{{ tag.name }}</span
              >
              <!-- method1: vuex -> userInfo -> roles -> includes admin -->
              <!-- method2: 组件级别权限控制 richtext -->
              <div v-hasRole="'admin'">
                <div class="fly-admin-box">
                  <span v-hasPermission="['get', 'delete']" class="layui-btn layui-btn-xs jie-admin" type="del"
                    >删除</span
                  >

                  <span
                    class="layui-btn layui-btn-xs jie-admin"
                    type="set"
                    field="stick"
                    rank="1"
                    v-if="page.isTop === '0'"
                    >置顶</span
                  >
                  <span
                    class="layui-btn layui-btn-xs jie-admin"
                    type="set"
                    field="stick"
                    rank="0"
                    style="background-color: #ccc"
                    v-else
                    >取消置顶</span
                  >

                  <!-- <span
                    class="layui-btn layui-btn-xs jie-admin"
                    type="set"
                    field="status"
                    rank="1"
                    >加精</span
                  >
                <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="0" style="background-color:#ccc;">取消加精</span> -->
                </div>
              </div>
              <span class="fly-list-nums">
                <a href="#comment"
                  ><i class="iconfont" title="回答"></i> {{ page.answer }}</a
                >
                <i class="iconfont" title="人气"></i> {{ page.reads }}
              </span>
            </div>
            <div class="detail-about">
              <a class="fly-avatar" href="">
                <img
                  :src="page.uid ? page.uid.pic : '/img/head.jpeg'"
                  :alt="page.uid ? page.uid.name : 'imooc'"
                />
              </a>
              <div class="fly-detail-user">
                <a href="" class="fly-link">
                  <cite>{{ page.uid ? page.uid.name : "imooc" }}</cite>
                  <!-- <i class="iconfont icon-renzheng" title="认证信息："></i> -->
                  <i
                    class="layui-badge fly-badge-vip ml10"
                    v-if="
                      page.uid && page.uid.isVip !== '0'
                        ? page.uid.isVip
                        : false
                    "
                    >VIP{{ page.uid.isVip }}</i
                  >
                </a>
                <span>{{ page.created | moment }}</span>
              </div>
              <div class="detail-hits" data-id="123">
                <span style="padding-right: 10px; color: #ff7200"
                  >悬赏：{{ page.fav }}积分</span
                >
              </div>
            </div>
            <div class="layui-btn-container fly-detail-admin pt10">
              <router-link
                :to="{ name: 'edit', params: { tid: tid, page: page } }"
                class="layui-btn layui-btn-sm jie-admin"
                v-if="page.isEnd === '0' && page.uid._id === user._id"
                >编辑</router-link
              >
              <a
                class="layui-btn layui-btn-sm jie-admin jie-admin-collect"
                :class="{ 'layui-btn-primary': page.isFav }"
                @click.prevent="setCollect()"
                >{{ page.isFav ? "取消收藏" : "收藏" }}</a
              >
            </div>
            <div class="detail-body photos" v-html="content"></div>
          </div>

          <div class="fly-panel detail-box" id="flyReply">
            <fieldset
              class="layui-elem-field layui-field-title"
              style="text-align: center"
            >
              <legend>回帖</legend>
            </fieldset>

            <ul class="jieda">
              <li
                class="jieda-daan"
                v-for="(item, index) in comments"
                :key="'comments' + index"
              >
                <div class="detail-about detail-about-reply">
                  <a class="fly-avatar" href="">
                    <img
                      :src="item.cuid ? item.cuid.pic : '/img/head.jpeg'"
                      :alt="item.cuid ? item.cuid.name : 'imooc'"
                    />
                  </a>
                  <div class="fly-detail-user">
                    <router-link
                      :to="{ name: 'home', params: { uid: item.cuid._id } }"
                      class="fly-link"
                    >
                      <cite>{{ item.cuid ? item.cuid.name : "imooc" }}</cite>
                      <i
                        v-if="
                          item.cuid && item.cuid.isVip !== '0'
                            ? item.cuid.isVip
                            : false
                        "
                        class="layui-badge fly-badge-vip ml10"
                        >VIP{{ item.cuid.isVip }}</i
                      >
                    </router-link>

                    <span v-if="index === 0">(楼主)</span>
                    <!--
                  <span style="color:#5FB878">(管理员)</span>
                  <span style="color:#FF9E3F">（社区之光）</span>
                  <span style="color:#999">（该号已被封）</span>
                  --></div>

                  <div class="detail-hits">
                    <span>{{ item.created | moment }}</span>
                  </div>
                  <i
                    class="iconfont icon-caina"
                    title="最佳答案"
                    v-if="item.isBest === '1'"
                  ></i>
                </div>
                <div
                  class="detail-body jieda-body photos"
                  v-richtext="item.content"
                  v-html="item.content"
                ></div>
                <div class="jieda-reply">
                  <span class="jieda-zan" type="zan">
                    <i
                      class="iconfont icon-zan"
                      :class="{ zanok: item.handed === '1' }"
                      @click="hands(item)"
                    ></i>
                    <em>{{ item.hands }}</em>
                  </span>
                  <span @click="reply(item)">
                    <i class="iconfont icon-svgmoban53"></i>
                    回复
                  </span>
                  <div class="jieda-admin">
                    <span
                      @click="editComment(item)"
                      v-if="page.isEnd === '0' && item.cuid._id === user._id"
                      >编辑</span
                    >
                    <!-- <span type="del">删除</span> -->
                    <span
                      class="jieda-accept"
                      @click="setBest(item, index)"
                      v-if="
                        page.isEnd === '0' &&
                        user &&
                        page.uid &&
                        page.uid._id === user._id
                      "
                      >采纳</span
                    >
                  </div>
                </div>
              </li>
              <!-- 无数据时 -->
              <li class="fly-none" v-if="comments.length === 0">消灭零回复</li>
            </ul>
            <imooc-page
              v-if="comments.length > 0 && total > 0"
              :showType="'icon'"
              :hasSelect="false"
              :hasTotal="false"
              :showEnd="true"
              :total="total"
              :size="size"
              :current="current"
              @changeCurrent="handleChange"
              @changeLimit="handleLimit"
            ></imooc-page>
            <div class="layui-form layui-form-pane">
              <form>
                <validation-observer v-slot="{ validate }" ref="observer">
                  <imooc-editor
                    @changeContent="addContent"
                    :initContent="editInfo.content"
                  ></imooc-editor>
                  <div class="layui-form-item">
                    <validation-provider
                      name="code"
                      ref="codefield"
                      rules="required|length:4"
                      v-slot="{ errors }"
                    >
                      <div class="layui-row layui-clear">
                        <label class="layui-form-label">验证码</label>
                        <div class="layui-input-inline">
                          <input
                            type="text"
                            name="code"
                            placeholder="请输入图片验证码"
                            autocomplete="off"
                            class="layui-input"
                            v-model.trim="code"
                          />
                        </div>
                        <div v-html="svg" class="svg" @click="_getCode()"></div>
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <input type="hidden" name="jid" value="123" />
                    <button
                      class="layui-btn"
                      type="button"
                      @click="validate().then(submit)"
                    >
                      提交回复
                    </button>
                  </div>
                </validation-observer>
              </form>
            </div>
          </div>
        </div>
        <div class="layui-col-md4">
          <imooc-hotlist></imooc-hotlist>
          <imooc-ads></imooc-ads>
          <imooc-links></imooc-links>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDetail } from '@/api/content'
import {
  getComments,
  addComment,
  updateCommit,
  setCommentBest,
  setHands
} from '@/api/comments'
import { addCollect } from '@/api/user'
import { escapeHtml } from '@/utils/escapeHtml'
import CodeMixin from '@/mixin/code'
import HotList from '@/components/sidebar/Hotlist.vue'
import Ads from '@/components/sidebar/Ads.vue'
import Links from '@/components/sidebar/Links.vue'
import Panel from '@/components/Panel'
import Editor from '@/components/moudles/editor/Index.vue'
import Pagination from '@/components/moudles/pagination/Index.vue'
import { scrollToElem } from '@/utils/common'

export default {
  mixins: [CodeMixin],
  props: ['tid'],
  name: 'Detail',
  components: {
    'imooc-hotlist': HotList,
    'imooc-ads': Ads,
    'imooc-links': Links,
    'imooc-panel': Panel,
    'imooc-editor': Editor,
    'imooc-page': Pagination
  },
  data () {
    return {
      total: 0,
      size: 10,
      current: 0,
      page: {},
      comments: [],
      editInfo: {
        content: '',
        code: '',
        sid: ''
      }
    }
  },
  mounted () {
    // window.vue = scrollToElem
    // console.log(this.user._id)
    this.getPostDetail()
    this.getCommentList()
  },
  watch: {
    tid (newval, oldval) {
      this.getPostDetail()
      this.getCommentList()
    }
  },
  methods: {
    handleChange (val) {
      this.current = val
      this.getCommentList()
    },
    handleLimit (val) {
      this.size = val
      this.getCommentList()
    },
    getPostDetail () {
      getDetail(this.tid).then((res) => {
        if (res.code === 200) {
          this.page = res.data
        }
      })
    },
    getCommentList () {
      const params = {
        tid: this.tid,
        page: this.current,
        limit: this.size
      }
      getComments(params).then((res) => {
        if (res.code === 200) {
          this.comments = res.data
          this.total = res.total
        }
      })
    },
    addContent (val) {
      this.editInfo.content = val
    },
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      // 用户未登录
      const isLogin = this.$store.state.isLogin
      if (!isLogin) {
        this.$pop('shake', '请先登录')
        return
      }
      // 用户禁言判断
      const user = this.$store.state.userInfo
      if (user.status !== '0') {
        this.$pop('shake', '用户已经禁言，请联系管理员')
        return
      }
      this.editInfo.code = this.code
      this.editInfo.sid = this.$store.state.sid
      this.editInfo.tid = this.tid
      // 获取用户评论信息：图片、昵称、vip
      const cuid = {
        _id: user._id,
        pic: user.pic,
        name: user.name,
        isVip: user.isVip
      }
      if (
        typeof this.editInfo.cid !== 'undefined' &&
        this.editInfo.cid !== ''
      ) {
        const obj = { ...this.editInfo }
        delete obj['item']
        // 判断用户是否修改了内容
        if (this.editInfo.content === this.editInfo.item.content) {
          this.$pop('shake', '确定编辑了内容~~~')
          return
        }
        // 更新评论
        updateCommit(obj).then((res) => {
          if (res.code === 200) {
            const temp = this.editInfo.item
            temp.content = this.editInfo.content
            this.code = ''
            this.editInfo.content = ''
            this.$pop('', '更新评论成功')
            // 方法1，只用更新指定一条的content created，$set
            // 方法2，更新整个数据的这一条
            this.comments.splice(
              this.comments.indexof(this.editInfo.item),
              1,
              temp
            )
          } else {
            this.$alert(res.mag)
          }
        })
        return
      }
      // 添加评论
      addComment(this.editInfo).then((res) => {
        if (res.code === 200) {
          this.$pop('', '发表评论成功')
          // 发表评论成功后，清空回复内容
          this.code = ''
          this.editInfo.content = ''
          res.data.cuid = cuid
          // 添加新的内容到评论列表
          this.comments.push(res.data)
          requestAnimationFrame(() => {
            this.$refs.observer && this.$refs.observer.reset()
          })
          // 刷新图形验证码
          this._getCode()
        } else {
          this.$alert(res.msg)
        }
      })
    },
    // 编辑评论
    editComment (item) {
      this.editInfo.content = item.content
      // 动态滚动到输入框的位置，并且进行focus
      scrollToElem('.layui-input-block', 500, -65)
      document.getElementById('edit').focus()
      // 确定要编辑的记录
      this.editInfo.cid = item._id
      this.editInfo.item = item
    },
    // 设置最佳答案
    setBest (item) {
      this.$confirm(
        '确定采纳为最佳答案吗？',
        () => {
          setCommentBest({
            cid: item._id,
            tid: this.tid
          }).then((res) => {
            if (res.code === 200) {
              this.$pop('', '设置最佳答案成功')
              item.isBest = '1'
              this.page.isEnd = '1'
            }
          })
        },
        () => {}
      )
    },
    // 点赞功能
    hands (item) {
      setHands({ cid: item._id }).then((res) => {
        if (res.code === 200) {
          this.$pop('', '点赞成功')
          item.handed = '1'
          item.hands += 1
        } else {
          this.$pop('shake', res.msg)
        }
      })
    },
    // 回复评论
    reply (item) {
      // 插入@ + name 到 content
      // 滚动页面到输入框
      // focus 输入框
      const reg = /^@[\S]+/g
      if (this.editInfo.content) {
        if (reg.test(this.editInfo.content)) {
          this.editInfo.content = this.editInfo.content.replace(
            reg,
            '@' + item.cuid.name + ' '
          )
        } else {
          if (this.editInfo.content !== '') {
            // 评论框非空
            this.editInfo.content = `@${item.cuid.name} ${this.editInfo.content}`
          } else {
          }
        }
      } else {
        // 评论框为空
        this.editInfo.content = '@' + item.cuid.name + ' '
      }

      // 动态滚动到输入框的位置，并且进行focus
      scrollToElem('.layui-input-block', 500, -65)
      document.getElementById('edit').focus()
    },
    // 设置收藏 && 取消收藏
    setCollect () {
      const isLogin = this.$store.state.isLogin
      if (isLogin) {
        const collect = {
          tid: this.tid,
          title: this.page.title,
          isFav: this.page.isFav ? 1 : 0
        }
        addCollect(collect).then((res) => {
          if (res.code === 200) {
            this.page.isFav = !this.page.isFav
            this.$pop('', this.page.isFav ? '设置收藏成功' : '取消收藏成功')
          }
        })
      } else {
        this.$pop('shake', '请先登录后再进行收藏！')
      }
    }
  },
  computed: {
    content () {
      if (typeof this.page.content === 'undefined') {
        return ''
      }
      if (this.page.content.trim() === '') {
        return ''
      }
      return escapeHtml(this.page.content)
    },
    user () {
      return this.$store.state.userInfo
    }
  }
}
</script>

<style lang="scss" scoped>
.fly-detail-admin {
  text-align: right;
  border-top: 1px dotted #eaeaea;
  background-color: #f8f8f8;
}
.fly-detail-info {
  span {
    margin-right: 5px;
  }
}
.fly-admin-box{
  margin-left: 0;
  margin-top: 10px;
}
.jieda-body {
  margin: 25px 0 20px !important;
}
.layui-elem-field legend {
  margin-left: 0 !important;
}
</style>
