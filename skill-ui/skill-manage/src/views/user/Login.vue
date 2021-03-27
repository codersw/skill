<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane key="tab1" tab="账号密码登录">
          <a-alert
            v-if="isLoginError"
            type="error"
            showIcon
            style="margin-bottom: 24px;"
            :message="errorMsg"
          />
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="用户名"
              v-decorator="[
                'username',
                {initialValue:'',rules: [{ required: true, message: '请输入用户名' }], validateTrigger: 'change'}
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input-password
              size="large"
              placeholder="密码"
              v-decorator="[
                'password',
                { initialValue:'',rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input-password>
          </a-form-item>
        </a-tab-pane>
      </a-tabs>

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">自动登录</a-checkbox>
        <router-link
          :to="{ name: 'recover', params: { user: 'aaa'} }"
          class="forge-password"
          style="float: right;"
        >忘记密码</router-link>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >确定</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'

export default {
  components: {
  },
  data () {
    return {
      verify: '',
      customActiveKey: 'tab1',
      loginBtn: false,
      isLoginError: false,
      errorMsg: '',
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        loginType: 0
      }
    }
  },
  created () {
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    handleSubmit (e) {
      e.preventDefault()
      this.loginForm()
    },
    loginForm () {
      const {
        form: { validateFields },
        state,
        Login
      } = this
      state.loginBtn = true
      const validateFieldsKey = ['username', 'password']
      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          console.log('login form', values)
          Login(values)
            .then(res => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    loginSuccess (res) {
      if (res.code === 0) {
        this.$router.push({ name: 'dashboard' }, () => {
          this.$notification.success({
            message: '欢迎',
            description: `${timeFix()}，欢迎回来`
          })
        })
        this.isLoginError = false
      } else {
        this.requestFailed(res)
      }
    },
    requestFailed (err) {
      this.isLoginError = true
      this.errorMsg = ((err.response || {}).data || {}).msg || err.msg || '请求出现错误，请稍后再试'
      this.$notification['error']({
        message: '错误',
        description: this.errorMsg,
        duration: 4
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
