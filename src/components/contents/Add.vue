<template>
  <div class="layui-container" :class="{ 'd-hide': isHide }">
    <div class="layui-form layui-form-pane">
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">发表新帖<!-- 编辑帖子 --></li>
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
                    <validation-provider
                      name="catalog"
                      rules="is_not:请选择"
                      v-slot="{ errors }"
                    >
                      <div class="layui-row">
                        <label class="layui-form-label">所在专栏</label>
                        <div class="layui-input-block" @click="changeSelect()">
                          <div
                            class="layui-unselect layui-form-select"
                            :class="{ 'layui-form-selected': isSelect }"
                          >
                            <div class="layui-select-title">
                              <input
                                type="text"
                                placeholder="请选择"
                                readonly
                                v-model="catalogs[cataIndex].text"
                                class="layui-input layui-unselect"
                              />
                              <i class="layui-edge"></i>
                            </div>
                            <dl class="layui-anim layui-anim-upbit">
                              <dd
                                v-for="(item, index) in catalogs"
                                :key="'catalog' + index"
                                :class="{ 'layui-this': index === cataIndex }"
                                @click="chooseCatalog(item, index)"
                              >
                                {{ item.text }}
                              </dd>
                            </dl>
                          </div>

                        </div>
                      </div>
                      <div class="layui-row">
                          <span style="color: #c00">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-col-md9">
                    <validation-provider
                      name="title"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <div class="layui-row">
                        <label class="layui-form-label">标题</label>
                        <div class="layui-input-block">
                          <input
                            type="text"
                            v-model="title"
                            class="layui-input"
                          />
                        </div>
                        <div class="layui-row">
                          <span style="color: #c00">{{ errors[0] }}</span>
                        </div>
                      </div>
                    </validation-provider>
                  </div>
                </div>
                <imooc-editor @changeContent="add" :initContent="content"></imooc-editor>
                <div class="layui-form-item">
                  <div class="layui-inline">
                    <label class="layui-form-label">悬赏飞吻</label>
                    <div class="layui-input-inline">
                      <div
                        class="layui-unselect layui-form-select"
                        :class="{ 'layui-form-selected': isSelect_fav }"
                        @click="changeFav()"
                      >
                        <div class="layui-select-title">
                          <input
                            type="text"
                            placeholder="请选择"
                            readonly
                            v-model="favList[favIndex]"
                            class="layui-input layui-unselect"
                          /><i class="layui-edge"></i>
                        </div>
                        <dl class="layui-anim layui-anim-upbit">
                          <dd
                            v-for="(item, index) in favList"
                            :key="'fav' + index"
                            :class="{ 'layui-this': index === favIndex }"
                            @click="chooseFav(item, index)"
                          >
                            {{ item }}
                          </dd>
                        </dl>
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
import { addPost } from '@/api/content'
export default {
  mixins: [CodeMixin],
  name: 'add',
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
    const saveData = localStorage.getItem('addData')
    if (saveData && saveData !== '') {
      this.$confirm('是否加载未编辑完的内容？', () => {
        const obj = JSON.parse(saveData)
        this.content = obj.content
        this.title = obj.title
        this.cataIndex = obj.cataIndex
        this.favIndex = obj.favIndex
      }, () => {
        localStorage.setItem('addData', '')
      })
    }
  },
  computed: {
    isHide () {
      return this.$store.state.isHide
    }
  },
  methods: {
    changeSelect () {
      this.isSelect = !this.isSelect
    },
    changeFav () {
      this.isSelect_fav = !this.isSelect_fav
    },
    chooseCatalog (item, index) {
      this.cataIndex = index
    },
    chooseFav (item, index) {
      this.favIndex = index
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
      // 添加新的文章
      addPost({
        title: this.title,
        catalog: this.catalogs[this.cataIndex].value,
        content: this.content,
        fav: this.favList[this.favIndex],
        code: this.code,
        sid: this.$store.state.sid
      }).then((res) => {
        if (res.code === 200) {
          localStorage.setItem('addData', '')
          this.$pop('', '发帖成功！')
          setTimeout(() => {
            this.$router.push({ name: 'detail', params: { tid: res.data._id } })
          }, 2000)
        } else {
          this.$pop('', res.msg)
        }
      })
    },
    add (val) {
      this.content = val
      const saveData = {
        cataIndex: this.cataIndex,
        title: this.title,
        content: this.content,
        favIndex: this.favIndex
      }

      if (this.title.trim() !== '' && this.content.trim() !== '') {
        localStorage.setItem('addData', JSON.stringify(saveData))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
