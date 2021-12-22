<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li><router-link :to="{ name: 'login' }">登入</router-link></li>
          <li class="layui-this">注册</li>
        </ul>
        <Form v-slot="{ errors }" @submit="submit">
          <div class="layui-form layui-tab-content" style="padding: 20px 0">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">

                  <div class="layui-form-item">
                    <label class="layui-form-label">邮箱</label>

                      <div class="layui-input-inline">
                        <Field
                          as="input"
                          type="text"
                          name="username"
                          autocomplete="off"
                          rules="required|email"
                          class="layui-input"
                          placeholder="请输入邮箱地址"
                          v-model.trim="state.username"
                        />
                      </div>
                      <div class="layui-form-mid layui-word-aux">
                        将会成为您唯一的登入名
                      </div>
                      <div class="layui-row">
                        <span style="color: #c00">{{ errors.username }}</span>
                      </div>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_username" class="layui-form-label"
                      >昵称</label
                    >

                      <div class="layui-input-inline">
                        <Field
                          as="input"
                          type="text"
                          name="name"
                          autocomplete="off"
                          v-model.trim="state.name"
                          rules="required|min:4|max:16"
                          placeholder="请输入昵称"
                          class="layui-input"
                        />
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00">{{ errors.name }}</span>
                      </div>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_pass" class="layui-form-label">密码</label>
                      <div class="layui-input-inline">
                        <Field
                          as="input"
                          type="password"
                          name="password"
                          autocomplete="off"
                          v-model.trim="state.password"
                          rules="required|min:6|max:16"
                          placeholder="请输入密码"
                          class="layui-input"
                        />
                      </div>
                      <div class="layui-form-mid layui-word-aux">
                        6到16个字符
                      </div>
                      <div class="layui-row">
                        <span style="color: #c00">{{ errors.password }}</span>
                      </div>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_repass" class="layui-form-label"
                      >确认密码</label
                    >

                      <div class="layui-input-inline">
                        <Field
                          as="input"
                          type="password"
                          name="repassword"
                          autocomplete="off"
                          rules="confirmed:@password"
                          v-model="state.repassword"
                          placeholder="请再次输入密码"
                          class="layui-input"
                        />
                      </div>
                      <div class="layui-row">
                        <span style="color: #c00">{{ errors.repassword }}</span>
                      </div>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_vercode" class="layui-form-label"
                      >验证码</label
                    >

                      <div class="layui-input-inline">
                        <Field
                          as="input"
                          type="text"
                          name="code"
                          rules="required|length:4"
                          placeholder="请输图片入验证码"
                          autocomplete="off"
                          class="layui-input"
                          v-model.trim="state.code"
                        />
                      </div>
                      <div class="svg" v-html="state.svg" @click="getCaptcha"></div>
                      <div class="layui-row">
                        <span style="color: #c00">{{ errors.code }}</span>
                      </div>
                  </div>
                  <div class="layui-form-item">
                    <button class="layui-btn" type="submit">
                      立即注册
                    </button>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者直接使用社交账号快捷注册</span>
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
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { HttpResponse } from '@/common/interface'
import { loginService } from '@/common/provides/login'
import { alert } from '@/components/modules/alert'
import { Field, Form, SubmissionHandler } from 'vee-validate'
import { defineComponent, onMounted } from 'vue'
export default defineComponent({
  name: 'reg',
  components: {
    Form,
    Field
  },
  setup () {
    const { getCaptcha, state, regHandle } = loginService()

    const submit:SubmissionHandler = async (value, form) => {
      console.log('TCl: -> constsubmit:SubmissionHandler= -> value', value)
      const { setErrors, resetForm } = form
      setErrors({
        code: '图形验证码错误'
      })
      const res = await regHandle()
      const { code, msg } = res as HttpResponse
      if (code === 200) {
        alert('注册成功')
        requestAnimationFrame(() => {
          resetForm()
        })
      } else if (typeof msg === 'object') {
        setErrors({
          ...msg
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
