<template>
  <div class="layui-container" :class="{ 'd-hide': isHide }">
    <div class="layui-form layui-form-pane">
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">编辑帖子</li>
        </ul>
        <div
          class="layui-form layui-tab-content"
          id="LAY_ucm"
          style="padding: 20px 0"
        >
          <div class="layui-tab-item layui-show">
            <form>
              <validation-observer v-slot="{ validate }" ref="observer">
                <div class="layui-row layui-col-space15 layui-form-item">
                  <div class="layui-col-md3">
                      <div class="layui-row">
                        <label class="layui-form-label">所在专栏</label>
                        <div class="layui-input-block">
                          <div
                            class="layui-unselect layui-form-select"
                          >
                            <div class="layui-select-title">
                              <input
                                type="text"
                                placeholder="请选择"
                                readonly
                                v-model="catalogs[cataIndex].text"
                                class="layui-input layui-unselect layui-disabled"
                              />
                              <i class="layui-edge"></i>
                            </div>
                          </div>

                        </div>
                      </div>
                  </div>
                  <div class="layui-col-md9">
                      <div class="layui-row">
                        <label class="layui-form-label">标题</label>
                        <div class="layui-input-block">
                          <input
                            type="text"
                            v-model="title"
                            class="layui-input"
                          />
                        </div>
                      </div>
                  </div>
                </div>
                <imooc-editor @changeContent="add" :initContent="content"></imooc-editor>
                <div class="layui-form-item">
                  <div class="layui-inline">
                    <label class="layui-form-label">悬赏飞吻</label>
                    <div class="layui-input-inline">
                      <div
                        class="layui-unselect layui-form-select"
                      >
                        <div class="layui-select-title">
                          <input
                            type="text"
                            placeholder="请选择"
                            readonly
                            v-model="favList[favIndex]"
                            class="layui-input layui-unselect layui-disabled"
                          /><i class="layui-edge"></i>
                        </div>
                      </div>
                    </div>
                    <div class="layui-form-mid layui-word-aux">
                      发表后无法更改飞吻
                    </div>
                  </div>
                </div>
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
                  <button
                    class="layui-btn"
                    type="button"
                    @click="validate().then(submit)"
                  >
                    立即发布
                  </button>
                </div>
              </validation-observer>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import CodeMixin from '@/mixin/code'
import Editor from '@/components/moudles/editor/Index.vue'
import { updatePost } from '@/api/content'
export default {
  mixins: [CodeMixin],
  name: 'Edit',
  props: ['tid', 'page'],
  components: {
    'imooc-editor': Editor
  },
  data () {
    return {
      isSelect: false,
      isSelect_fav: false,
      cataIndex: 0,
      favIndex: 0,
      catalogs: [
        {
          text: '请选择',
          value: ''
        },
        {
          text: '提问',
          value: 'ask'
        },
        {
          text: '分享',
          value: 'share'
        },
        {
          text: '讨论',
          value: 'discuss'
        },
        {
          text: '建议',
          value: 'advise'
        },
        {
          text: '公告',
          value: 'notice'
        }
      ],
      favList: [20, 30, 50, 60, 80],
      content: '',
      title: ''
    }
  },
  mounted () {
    if (this.page) {
      this.content = this.page.content
      this.title = this.page.title
      this.favIndex = this.favList.indexOf(parseInt(this.page.fav))
      this.cataIndex = this.catalogs.indexOf(this.catalogs.filter((item) => item.value === this.page.catalog)[0])
      // 缓存edit内容
      localStorage.setItem('editData', JSON.stringify(this.page))
    } else {
      // 页面上无page内容，可能是用户进行了刷新，则取本地缓存内
      const saveData = localStorage.getItem('editData')
      if (saveData && saveData !== '') {
        this.$confirm('是否加载未编辑完的内容？', () => {
          const obj = JSON.parse(saveData)
          this.content = obj.content
          this.title = obj.title
          this.cataIndex = obj.cataIndex
          this.favIndex = obj.favIndex
        }, () => {
          localStorage.setItem('editData', '')
        })
      }
    }
  },
  computed: {
    isHide () {
      return this.$store.state.isHide
    }
  },
  methods: {
    add (val) {
      this.content = val
      const saveData = {
        cataIndex: this.cataIndex,
        title: this.title,
        content: this.content,
        favIndex: this.favIndex
      }

      if (this.title.trim() !== '' && this.content.trim() !== '') {
        const editData = localStorage.getItem('editData')
        let newObj = {}
        if (editData && editData !== '') {
          newObj = { ...saveData, ...JSON.parse(editData) }
        }
        localStorage.setItem('editData', JSON.stringify(newObj))
      }
    },
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      if (this.content.trim() === '') {
        this.$alert('文章内容不能为空')
        return
      }
      // 更新文章、编辑帖子
      updatePost({
        tid: this.tid,
        title: this.title,
        content: this.content,
        code: this.code,
        sid: this.$store.state.sid
      }).then((res) => {
        if (res.code === 200) {
          localStorage.setItem('editData', '')
          this.$pop('', '更新成功！')
          setTimeout(() => {
            this.$router.push({ name: 'detail', params: { tid: this.tid } })
          }, 1000)
        } else {
          this.$alert(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
