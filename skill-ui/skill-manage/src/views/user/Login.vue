<template>
  <div class="login-wrap">
    <a-button v-if="!isProd" type="dashed" class="toggle-show-sso" @click="handleOnToggleSSO">切换SSO登录</a-button>
    <div v-if="!isProd && !toggleSSO" class="main">
      <a-form
        id="formLogin"
        ref="formLogin"
        class="user-layout-login"
        :form="form"
        @submit="handleSubmit">
        <a-tabs
          :activeKey="customActiveKey"
          :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
          @change="handleTabClick"
        >
          <a-tab-pane key="tab1">
            <span slot="tab" style="font-size:24px;"> 用户登录 / User Login</span>
            <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;" :message="errorMsg" />
            <a-form-item>
              <a-input
                v-decorator="[
                  'username',
                  {
                    initialValue: '',
                    rules: [{ required: true, message: '请输入用户名' }, { validator: handleUsernameOrEmail }],
                    validateTrigger: 'change'
                  }
                ]"
                autocomplete="off"
                size="large"
                type="text"
                placeholder="请输入用户名"
              >
                <a-icon slot="prefix" type="user" :style="{ color: '#999' }" />
              </a-input>
            </a-form-item>

            <a-form-item style="margin-top:30px;">
              <a-input-password
                v-decorator="[
                  'password',
                  {
                    initialValue: '',
                    rules: [{ required: true, message: '请输入密码' }],
                    validateTrigger: 'blur'
                  }
                ]"
                size="large"
                placeholder="请输入密码"
              >
                <a-icon slot="prefix" type="lock" :style="{ color: '#999' }" />
              </a-input-password>
            </a-form-item>
            <a-form-item style="margin-top:50px">
              <a-button
                size="large"
                type="primary"
                htmlType="submit"
                class="login-button"
                :loading="state.loginBtn"
                :disabled="state.loginBtn"
              ><span style="font-size:16px;">确定</span></a-button>
            </a-form-item>
          </a-tab-pane>
        <!-- <a-tab-pane key="tab2" tab="手机号登录">
          <a-form-item>
            <a-input
              v-decorator="['mobile', {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }], validateTrigger: 'change'}]"
              size="large"
              type="text"
              placeholder="手机号"
            >
              <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input
                  v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]"
                  size="large"
                  type="text"
                  placeholder="验证码"
                >
                  <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha"
                tabindex="-1"
                :disabled="state.smsSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"
              ></a-button>
            </a-col>
          </a-row>
        </a-tab-pane> -->
        </a-tabs>

      <!-- <a-form-item>
        <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">自动登录</a-checkbox>
        <router-link
          :to="{ name: 'recover', params: { user: 'aaa'} }"
          class="forge-password"
          style="float: right;"
        >忘记密码</router-link>
      </a-form-item> -->


      </a-form>

      <two-step-captcha
        v-if="requiredTwoStepCaptcha"
        :visible="stepCaptchaVisible"
        @success="stepCaptchaSuccess"
        @cancel="stepCaptchaCancel"
      ></two-step-captcha>
    <!-- <Verify
      ref="verify"
      :mode="'pop'"
      :captchaType="'blockPuzzle'"
      :imgSize="{ width: '330px', height: '155px' }"
      @success="capctchaCheckSucc"
    ></Verify> -->
    </div>
    <div v-if="isProd || toggleSSO" class="user-login-other">
      <img class="user-login-other-arrow" src="../../assets/login/login-sso-arrow.png" />
      <img class="user-login-other-img" src="../../assets/login/login-sso.png" />
      <a-button
        type="primary"
        htmlType="submit"
        class="login-button-sso"
        @click.prevent="ssoLogin">去登录</a-button>
      <!-- <span>其他登录方式</span>
      <a @click="ssoLogin">
        <a-icon>
          <template>
            <svg width="100%" height="100%" fill="currentColor" viewBox="0 0 1024 1024">
              <path d="M510.5 773.6c-69.9 0-135.6-27.2-185-76.6-49.4-49.4-76.6-115.1-76.6-185s27.2-135.6 76.6-185c49.4-49.4 115.1-76.6 185-76.6s135.6 27.2 185 76.6c49.4 49.4 76.6 115.1 76.6 185s-27.2 135.6-76.6 185c-49.5 49.4-115.2 76.6-185 76.6z m0-521.2c-69.3 0-134.5 27-183.6 76-49 49-76 114.2-76 183.6s27 134.5 76 183.6c49 49 114.2 76 183.6 76 69.3 0 134.5-27 183.6-76 49-49 76-114.2 76-183.6s-27-134.5-76-183.6-114.3-76-183.6-76z" fill="" p-id="2642"></path><path d="M510.5 960.8c-60.6 0-119.4-11.9-174.7-35.3-53.4-22.6-101.4-55-142.7-96.2s-73.6-89.2-96.2-142.7c-23.4-55.2-35.2-114-35.2-174.6S73.6 392.6 97 337.3c22.6-53.4 55-101.4 96.2-142.7s89.2-73.6 142.7-96.2C391.2 75 450 63.1 510.6 63.1c60.6 0 119.4 11.9 174.7 35.3 53.4 22.6 101.4 55 142.7 96.2 41.2 41.2 73.6 89.2 96.2 142.7 23.4 55.3 35.3 114.1 35.3 174.7S947.4 631.4 924 686.7c-22.6 53.4-55 101.4-96.2 142.7-41.2 41.2-89.2 73.6-142.7 96.2-55.3 23.4-114.1 35.2-174.6 35.2z m0-895.6c-60.3 0-118.8 11.8-173.9 35.1-53.2 22.5-101 54.7-142 95.8s-73.2 88.8-95.8 142C75.5 393.2 63.7 451.7 63.7 512c0 60.3 11.8 118.8 35.1 173.9 22.5 53.2 54.7 101 95.8 142 41 41 88.8 73.2 142 95.8 55.1 23.3 113.6 35.1 173.9 35.1s118.8-11.8 173.9-35.1c53.2-22.5 101-54.7 142-95.8 41-41 73.2-88.8 95.8-142 23.3-55.1 35.1-113.6 35.1-173.9 0-60.3-11.8-118.8-35.1-173.9-22.5-53.2-54.7-101-95.8-142-41-41-88.8-73.2-142-95.8C629.3 77 570.8 65.2 510.5 65.2z" fill="" p-id="2643"></path><path d="M510.5 251.4C367.9 251.4 252 366 249.9 508h260.5V251.4zM771 508H510.5v264.6c143.9 0 260.6-116.7 260.6-260.6 0-1.3-0.1-2.6-0.1-4z" fill="#8098FF" p-id="2644"></path><path d="M223.5 269.4c-3.1-2.4-6.4-3.6-9.1-3.2-3.6 0.6-7.3 3-10.3 6.9L188.2 293l20.6 16.4 15.9-20c5.8-7.3 5.3-14.8-1.2-20zM259.5 316c6.8-8.6 6.4-16.7-1.4-22.9-3.8-3.1-7.2-4.2-10.8-3.6-4 0.7-8.1 3.5-11.6 7.9l-16.3 20.5 23.6 18.8 16.5-20.7z" fill="#8098FF" p-id="2645"></path><path d="M510.5 90.9C277.9 90.9 89.3 279.4 89.3 512s188.6 421.2 421.2 421.2S931.6 744.6 931.6 512 743.1 90.9 510.5 90.9z m-48.9 22.7l22.5 0.2c0.8 4.3 2.4 9.5 4.4 14.6l24.5 61.1 25.3-60.7c2.5-6 3.6-9.9 4.5-14.6l22.6 0.2c-0.8 5.9-1.1 9.9-1.1 18.2l-0.5 61.7c-0.1 9 0.1 13.4 0.9 17.9l-17.2-0.1c0.8-5 1.1-9.4 1.1-17.9l0.3-40.8c0.6-10.7 1-16.9 1.1-18.8-1.6 6.6-4 13.5-5.8 17.9l-18.7 43.1c-2.5 5.8-4.8 12.6-5.5 16.3l-14.5-0.1c-0.6-3.9-2.5-9.7-5.3-16.6l-17.4-42.3c-2.3-5.5-3.4-8.9-6.1-18.8 0.4 6.5 0.9 16.6 0.8 19.3l-0.3 40.3c-0.1 8.5 0.1 13.1 0.9 17.9l-17.2-0.1c0.8-4.9 1.1-9.7 1.1-17.9l0.5-61.7c0-8.1-0.2-13.3-0.9-18.3zM179 306.3c-4.4-3.5-8.1-6-12.4-8.6 3.4-3.9 4.6-5.4 9.8-12l18.1-22.7c11.9-14.9 25.2-17.9 37.3-8.3 5.9 4.7 8.8 9.8 9.3 16.2 0.3 3.7-0.2 6.1-2 10.8 5-4.1 7.7-5.5 12.1-6.2 6.8-1 13.2 0.8 19.4 5.7 13.5 10.7 13.9 25.7 1.2 41.6L253 346.4c-4.4 5.6-6.6 8.4-9.5 12.5-3.5-3.9-6.1-6.3-12.3-11.2L179 306.3z m331.5 489.4c-156.7 0-283.7-127-283.7-283.7s127-283.7 283.7-283.7 283.7 127 283.7 283.7-127.1 283.7-283.7 283.7z m289.7-423.5c-3.3 1.2-5.5 2-6.5 2.4-3.4 1.1-3.4 1.1-5.7 2.3l-9.3-13.6c2.2-2.1 5.8-6.1 8.6-9.5l30.2-36.7c3.2-3.8 6.4-7.4 10.9-11.8-6.5 2.8-11.2 4.5-15 5.9l-45 15.1c-5.4 1.9-9.2 3.3-11.8 4.7l-9.2-13.5c2.2-2.2 2.2-2.2 8.6-9.9l47.1-56c4.7-5.8 7.1-8.9 9.3-12.3l11.1 16.2c-3.3 2.6-6 5.2-9.7 9.3l-32.1 35.9c-2.7 2.9-7.1 7.5-10.2 10.6 7.2-3 10.5-4.2 13.9-5.4l46.8-15.6c5.1-1.7 8.9-3.3 11.9-4.9l8.5 12.5c-2.2 2-5.5 5.6-8.5 9.3l-31.2 38.1c-2.1 2.5-3.8 4.4-10.3 11.2 2.7-1.1 2.7-1.1 6.6-2.9 1.8-0.8 6.3-2.7 7.4-3.1l44.6-16.8c4.5-1.6 9.1-3.9 12-5.7l11.1 16.2c-4.4 0.9-7.8 1.9-14.8 4.3l-69.3 23.7z" fill="#8098FF" p-id="2646"></path>
            </svg>
          </template>
        </a-icon>
      </a> -->
    </div>
  </div>
</template>
<script>
  import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
  // import Verify from '@/components/verifition/Verify'
  import {mapActions} from 'vuex'
  import {timeFix} from '@/utils/util'
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-unused-vars
  import {get2step, getSmsCaptcha} from '@/api/login'
  import {getSsoUrl} from '@/utils/ssoLogin'

  export default {
  components: {
    TwoStepCaptcha
    //, Verify
  },
  data () {
    return {
      capctchaCheck: false,
      verify: '',
      customActiveKey: 'tab1',
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      isLoginError: false,
      errorMsg: '',
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      },
      toggleSSO: false
    }
  },
  created () {
    // get2step({ })
    //   .then(res => {
    //     this.requiredTwoStepCaptcha = res.result.stepCode
    //   })
    //   .catch(() => {
    //     this.requiredTwoStepCaptcha = false
    //   })
    // this.requiredTwoStepCaptcha = true
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    // handler
    handleUsernameOrEmail (rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    handleTabClick (key) {
      this.customActiveKey = key
      // this.form.resetFields()
    },
    capctchaCheckSucc (data) {
      this.capctchaCheck = true
      this.verify = data.captchaVerification
      this.loginForm()
    },
    handleSubmit (e) {
      e.preventDefault()
      this.loginForm()
    },
    loginForm () {
      // if (!this.capctchaCheck) {
      //   console.log(this.$refs.verify)
      //   this.$refs.verify.show()
      //   return false
      // }
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login
      } = this

      state.loginBtn = true

      const validateFieldsKey = customActiveKey === 'tab1' ? ['username', 'password', 'captcha'] : ['mobile', 'captcha']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          const loginParams = { ...values }
          delete loginParams.username
          loginParams[!state.loginType ? 'email' : 'username'] = values.username
          // loginParams.password = md5(values.password)
          const captchaVO = { captchaVerification: this.verify }
          loginParams.captchaVO = captchaVO
          Login(loginParams)
            .then(res => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
              this.capctchaCheck = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    getCaptcha (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state
      } = this

      validateFields(['mobile'], { force: true }, (err, values) => {
        if (!err) {
          state.smsSendBtn = true

          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60
              state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)

          const hide = this.$message.loading('验证码发送中..', 0)
          getSmsCaptcha({ mobile: values.mobile })
            .then(res => {
              setTimeout(hide, 2500)
              this.$notification['success']({
                message: '提示',
                description: '验证码获取成功，您的验证码为：' + res.result.captcha,
                duration: 8
              })
            })
            .catch(err => {
              setTimeout(hide, 1)
              clearInterval(interval)
              state.time = 60
              state.smsSendBtn = false
              this.requestFailed(err)
            })
        }
      })
    },
    stepCaptchaSuccess () {
      this.loginSuccess()
    },
    stepCaptchaCancel () {
      this.Logout().then(() => {
        this.loginBtn = false
        this.stepCaptchaVisible = false
      })
    },
    loginSuccess (res) {
      if (res.code === 0) {
        this.$router.push({ path: '/home' }, () => {
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
    },
    ssoLogin () {
       getSsoUrl().then((res) => {
         window.location.href = res
       })
    },
    handleOnToggleSSO () {
      this.toggleSSO = !this.toggleSSO
    }
  }
}
</script>

<style lang="less" scoped>
.login-wrap {
  position: absolute;
  top: 0;
  display: flex;
  justify-self: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
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

  /deep/.ant-tabs-ink-bar {
    background-color: transparent;
  }
  /deep/.ant-tabs-tab{
    padding-top: 0;
  }
  /deep/.ant-tabs-bar{
    margin-bottom: 55px;
  }
  /deep/.ant-input {
    background-color: #F5F5F5;
    border: none;
    outline: none;
    box-shadow: 0 0 transparent;
  }
  /deep/.ant-input-suffix {
    color: #999;
  }
}
/* sso登录 */
.user-login-other {
  position: relative;
  margin-top: -4%;
  width: 100%;
  text-align: center;
  line-height: 22px;
  &-arrow {
    position: absolute;
    display: block;
    top: -163%;
    margin-left: 10%;
    width: 4%;
  }
  &-img {
    display: block;
    margin: auto;
    width: 77.5%;
  }
  .login-button-sso {
    position: absolute;
    left: 0;
    right: 0;
    top: 307%;
    margin: auto;
    // padding-left: 18px;
    // padding-right: 18px;
    width: 12%;
    height: 142%;
    line-height: 1;
    font-size: 1.5625vw;
    background-color: rgba(0, 119, 255, 0.8);
    border: 0;
  }

  .item-icon {
    font-size: 24px;
    color: rgba(0, 0, 0, 0.2);
    margin-left: 16px;
    vertical-align: middle;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #1c69d4;
    }
  }

  .register {
    float: right;
  }
}

.toggle-show-sso {
  position: fixed;
  z-index: 2;
  top: 20px;
  right: 20px;
}
</style>
