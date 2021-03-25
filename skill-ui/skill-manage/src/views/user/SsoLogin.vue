<script>
import { mapActions } from 'vuex'
import { getSsoUrl } from '@/utils/ssoLogin'
import { timeFix } from '@/utils/util'
export default {
  name: 'SsoLogin',
  data () {
    return {
      code: ''
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
    this.code = this.$route.query.code
    this.state = this.$route.query.state
    this.ssoLogin()
  },
  methods: {
    ...mapActions(['SsoLogin']),
    ssoLogin () {
      if (this.code && this.state) {
        this.SsoLogin({ code: this.code, state: this.state })
          .then(res => this.loginSuccess(res))
          .catch(err => this.requestFailed(err))
          .finally(() => {
          })
      } else {
        getSsoUrl().then((res) => {
          window.location.href = res
        })
      }
    },
    loginSuccess (res) {
      if (res.code === 0) {
        if (!res.token) {
          // if (res.msgCode && res.msgCode === 'disable') {
          //   this.$notification.warning({
          //     message: this.$t('global.message.warning'),
          //     description: this.$t('global.message.warning.user.disable.msg'),
          //     duration: 5
          //   })
          // }

          this.$router.push({ path: '/homeNoPermission',
          query: {
            type: res.msgCode || 'noPermission'
          } })
          return
        }
        this.$router.push({ path: '/home' }, () => {
          this.$notification.success({
            message: this.$t('global.message.welcome'),
            description: `${timeFix()}，` + this.$t('global.message.welcome')
          })
        })
      } else {
        this.requestFailed(res)
      }
    },
    requestFailed (err) {
      this.errorMsg = ((err.response || {}).data || {}).msg || err.msg || this.$t('global.message.error')
      this.$notification['error']({
        message: this.$t('global.message.error.title'),
        description: this.errorMsg,
        duration: 4
      })
    }
  }
}
</script>