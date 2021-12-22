/* eslint-disable camelcase */
import { localize } from '@vee-validate/i18n'
import zh from '@vee-validate/i18n/dist/locale/zh_CN.json'
import { confirmed, email, is_not, length, max, min, required } from '@vee-validate/rules'
import { configure, defineRule } from 'vee-validate'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('length', length)
defineRule('confirmed', confirmed)
defineRule('max', max)
defineRule('is_not', is_not)

const config = {
  messages: {
    ...zh.messages,
    required: '请输入{field}',
    min: '请在{field}输入至少0:{length}个字符',
    confirmed: '两次输入的密码不一致'
  },
  names: {
    email: '邮箱',
    password: '密码',
    name: '昵称',
    username: '用户邮箱',
    code: '验证码',
    oldpassword: '当前密码',
    title: '标题',
    catalog: '分类'
  },
  fields: {
    catalog: {
      is_not: '请选择{_field_}'
    },
    username: {
      email: '请输入正确的邮箱'
    },
    email: {
      email: '请输入正确的{_field_}'
    }
  }
}

configure({
  generateMessage: localize('zh_CN', config)
})
