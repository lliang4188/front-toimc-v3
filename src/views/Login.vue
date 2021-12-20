<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li><a :to="{ name: 'reg' }">注册</a></li>
        </ul>
        <div class="layui-form layui-tab-content" style="padding: 20px 0">
          <Form v-slot="{ errors }" @submit="submit">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                  <div class="layui-form-item">
                    <label class="layui-form-label">用户名</label>

                      <div class="layui-input-inline">
                        <Field
                          as="input"
                          type="text"
                          name="username"
                          rules="required|email"
                          placeholder="请输入用户名"
                          autocomplete="off"
                          class="layui-input"
                          v-model.trim="state.username"
                        />
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00">{{ errors.username }}</span>
                      </div>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_pass" class="layui-form-label">密码</label>

                      <div class="layui-input-inline">
                        <Field
                          type="password"
                          as="input"
                          name="password"
                          placeholder="请输入密码"
                          autocomplete="off"
                          class="layui-input"
                          rules="required|min:6"
                          v-model.trim="state.password"
                        />
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00">{{ errors.password }}</span>
                      </div>
                  </div>

                  <div class="layui-form-item">

                      <div class="layui-row layui-clear">
                        <label class="layui-form-label">验证码</label>
                        <div class="layui-input-inline">
                          <Field
                            as="input"
                            type="text"
                            name="code"
                            placeholder="请输入图片验证码"
                            autocomplete="off"
                            class="layui-input"
                            rules="required|length:4"
                            v-model.trim="state.code"
                          />
                        </div>
                        <div v-html="state.svg" class="svg" @click="getCaptcha()"></div>
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00">{{ errors.code }}</span>
                      </div>
                  </div>
                  <div class="layui-form-item">
                    <button class="layui-btn" type="submit">
                      立即登录
                    </button>
                    <span style="padding-left: 20px">
                      <a :to="{ name: 'forget' }"
                        >忘记密码？</a
                      >
                    </span>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者使用社交账号登入</span>
                    <a
                      href=""
                      onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-qq"
                      title="QQ登入"
                    ></a>
                    <a
                      href=""
                      onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-weibo"
                      title="微博登入"
                    ></a>
                  </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { HttpResponse } from '@/common/interface'
import { loginUtils } from '@/utils/login'
import { Field, Form, SubmissionHandler } from 'vee-validate'
import { defineComponent, onMounted } from 'vue'
export default defineComponent({
  name: 'Login',
  components: {
    Form,
    Field
  },
  setup () {
    const { getCaptcha, state, loginHandle } = loginUtils()
    const submit:SubmissionHandler = async (value, form) => {
      console.log('TCl: -> constsubmit:SubmissionHandler= -> value', value)
      const { setErrors, resetForm } = form
      setErrors({
        code: '图形验证码错误'
      })
      const res = await loginHandle()
      const { code, msg } = res as HttpResponse
      if (code === 200) {
        requestAnimationFrame(() => {
          resetForm()
        })
      } else {
        setErrors({
          code: msg
        })
      }
    }

    onMounted(async () => {
      await getCaptcha()
    })
    return {
      state,
      getCaptcha,
      submit
    }
  }
})
</script>

<style scoped>

</style>
